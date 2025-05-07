---
title: "OpenAuth with React Router"
description: "A guide to using OpenAuth with React Router for Authentication"
publishDate: 2025-05-07
tags: ["OpenAuth", "React Router", "SST"]
---

In this guide, we will walk through a possible implementation of OpenAuth with React Router, I wanted to write this guide as it took me a little bit to wrap my head around how to implement this, so I hope this guide helps you out! Please note that this is only the way I've implemented this, and there are many other ways to do this as well.

## What We'll Cover

- Setting up an SST for our web and authentication server
- Configuring the authentication issuer with the provider options
- Implementing authentication flows in React Router
- Managing authenticated sessions
- Handling callbacks and redirects
- Creating protected routes
- How to handle onboarding with creating a user

## Prerequisites

Before we begin, make sure you have:

- Node.js and npm/yarn/bun installed
- Basic familiarity with React and React Router
- Understanding of SST fundamentals
- An AWS account (for SST deployment)

## Project Setup

Let's start by creating a new SST project with React Router:

```bash
# Create a new React Router project
mkdir openauth-react-router
cd openauth-react-router
bunx create-react-router@latest

# Setup SST
bunx sst init

# Install openauth
bun add @openauth/openauth
```

## Setting Up SST Authentication

Our first step is to set up the authentication server using SST. Open your `sst.config.ts` file and add the following configuration:

```typescript title="sst.config.ts"
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "openauth-react-router",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          region: "us-east-1",
          // Replace with your AWS profile
          profile: "your-aws-profile",
        },
      },
    };
  },
  async run() {
    const auth = new sst.aws.Auth("AuthServer", {
      issuer: {
        handler: "./packages/functions/src/auth/issuer.handler",
      },
    });

    const web = new sst.aws.React("Web", {
      environment: {
        VITE_AUTH_URL: auth.url,
        VITE_SITE_URL: "http://localhost:5173",
      },
    });
  },
});
```

This configuration:

1. Creates an SST Auth construct named "AuthServer"
2. Points to our issuer handler function
3. Sets up a React application with environment variables for the auth URL and site URL

## Creating the Auth Handler

Next, we need to create the authentication handler. Create a directory structure:

```
packages/
  functions/
    src/
      auth/
        issuer.ts
```

Now, let's implement the basic issuer handler:

```typescript title="packages/functions/src/auth/issuer.ts"
import { issuer } from "@openauthjs/openauth";
import { CodeProvider } from "@openauthjs/openauth/provider/code";
import { CodeUI } from "@openauthjs/openauth/ui/code";
import { handle } from "hono/aws-lambda";
import { authSubjects } from "./subjects";

const app = issuer({
  subjects: authSubjects,
  allow: async () => true,
  providers: {
    email: CodeProvider(
      CodeUI({
        sendCode: async (email, code) => {
          console.log("send code: ", email, code);
        },
      })
    ),
  },
  success: async (ctx, value) => {
    if (value.provider === "email") {
      const email = value.claims.email;
      if (!email) {
        throw new Error("No email found");
      }

      return ctx.subject(
        "account",
        { type: "email", email },
        { subject: email }
      );
    }

    throw new Error("Invalid provider");
  },
});

export const handler = handle(app);
```

### Auth Subjects

```typescript title="packages/functions/src/auth/subjects.ts"
import { createSubjects } from "@openauthjs/openauth/subject";
import { z } from "zod";

const EmailAccount = z.object({
  type: z.literal("email"),
  email: z.string(),
});

export type EmailAccount = z.infer<typeof EmailAccount>;
export type Account = EmailAccount;

const AccountSchema = z.discriminatedUnion("type", [EmailAccount]);

export const authSubjects = createSubjects({
  account: AccountSchema,
});
```

## Setting Up Authentication Modules in React Router

Now, let's set up the authentication modules in our React application. We'll create several key files:

### 1. Authentication Session Storage

Next, we'll create a server-side authentication store to manage sessions. Some of this code is inspired by [The Epic Stack](https://github.com/epicweb-dev/epic-stack). Thank you to [Kent C. Dodds](https://github.com/kentcdodds) for the great work! This session storage will be used to store the jwt `tokens` we get from the OpenAuth server.

```typescript title="app/modules/auth/auth-session-storage.server.ts"
import type { Tokens } from "@openauthjs/openauth/client";
import { type SessionStorage, createCookieSessionStorage } from "react-router";

interface SessionData {
  tokens: Tokens;
  expires?: Date;
}

type SessionFlashData = {
  error: string;
};

const AUTH_SESSION_KEY = "en_session";

export const authSessionStorage = createCookieSessionStorage<
  SessionData,
  SessionFlashData
>({
  cookie: {
    name: AUTH_SESSION_KEY,
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: ["secret"],
    secure: process.env.NODE_ENV === "production",
  },
});

export function getSessionDefaultExpiration() {
  return new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days
}

// we have to do this because every time you commit the session you overwrite it
// so we store the expiration time in the cookie and reset it every time we commit
const originalCommitSession = authSessionStorage.commitSession;

Object.defineProperty(authSessionStorage, "commitSession", {
  value: async function commitSession(
    ...args: Parameters<typeof originalCommitSession>
  ) {
    const [session, options] = args;
    if (options?.expires) {
      session.set("expires", options.expires);
    }
    if (options?.maxAge) {
      session.set("expires", new Date(Date.now() + options.maxAge * 1000));
    }
    const expires = session.has("expires")
      ? new Date(session.get("expires") as Date)
      : undefined;
    const setCookieHeader = await originalCommitSession(session, {
      ...options,
      expires,
    });
    return setCookieHeader;
  },
});

export class AuthSessionController {
  #sessionStorage: SessionStorage<SessionData, SessionFlashData>;

  constructor(sessionStorage: SessionStorage<SessionData, SessionFlashData>) {
    this.#sessionStorage = sessionStorage;
  }

  get sessionStorage() {
    return this.#sessionStorage;
  }

  async getSession(request: Request) {
    return this.#sessionStorage.getSession(request.headers.get("Cookie"));
  }

  async getSessionData(request: Request): Promise<Partial<SessionData>> {
    const session = await this.getSession(request);
    const tokens = session.get("tokens");
    const expires = session.get("expires");

    return {
      tokens,
      expires,
    };
  }

  async setSessionData(data: SessionData) {
    const session = await this.#sessionStorage.getSession();
    session.set("tokens", data.tokens);
    if (data.expires) {
      session.set("expires", data.expires);
    }
    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      await this.#sessionStorage.commitSession(session)
    );
    return headers;
  }

  async destroySession(request: Request) {
    const session = await this.getSession(request);
    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      await this.#sessionStorage.destroySession(session)
    );
    return headers;
  }
}
```

### 2. Authenticator

Next is a small helper class around the OpenAuth `client` to help with the authentication flow for React Router. This was heavily inspired by [Remix Auth OpenAuth](https://github.com/sergiodxa/remix-auth-openauth). Thank you to [Sergio Xalambrí](https://github.com/sergiodxa) for the great work!

```typescript title="app/modules/auth/authenticator.server.ts"
import type { SetCookieInit } from "@mjackson/headers";
import { type Tokens, createClient } from "@openauthjs/openauth/client";
import * as OpenAuthError from "@openauthjs/openauth/error";
import type { SubjectSchema } from "@openauthjs/openauth/subject";
import { redirect } from "react-router";
import { combineHeaders } from "../../utils/misc.server";
import { StateStore } from "./store.server";

type FetchLike = NonNullable<Parameters<typeof createClient>["0"]["fetch"]>;

export interface AuthenticatorOption<T extends SubjectSchema = SubjectSchema> {
  /**
   * The redirect URI of the application you registered in the OpenAuth
   * server.
   *
   * This is where the user will be redirected after they authenticate.
   *
   * @example
   * "https://example.com/auth/callback"
   */
  redirectUri: string;

  /**
   * The client ID of the application you registered in the OpenAuth server.
   * @example
   * "my-client-id"
   */
  clientId: string;

  /**
   * The issuer of the OpenAuth server you want to use.
   * This is where your OpenAuth server is hosted.
   * @example
   * "https://openauth.example.com"
   */
  issuer: string;

  /**
   * The name of the cookie used to keep state and code verifier around.
   *
   * The OAuth2 flow requires generating a random state and code verifier, and
   * then checking that the state matches when the user is redirected back to
   * the application. This is done to prevent CSRF attacks.
   *
   * The state and code verifier are stored in a cookie, and this option
   * allows you to customize the name of that cookie if needed.
   * @default "oauth2"
   */
  cookie?: string | (Omit<SetCookieInit, "value"> & { name: string });

  /**
   * A custom fetch implementation to use when making requests to the OAuth2
   * server. This can be useful when you need to replace the default fetch
   * to use a proxy, for example.
   */
  fetch?: FetchLike;
  subjects: T;
}

export class Authenticator<T extends SubjectSchema> {
  name = "openauth";
  #client: ReturnType<typeof createClient>;
  #options: AuthenticatorOption<T>;
  #subjects: T;

  constructor(options: AuthenticatorOption<T>) {
    this.#options = options;
    this.#client = createClient({
      clientID: options.clientId,
      issuer: options.issuer,
      fetch: options.fetch,
    });
    this.#subjects = options.subjects;
  }

  get #cookieName() {
    if (typeof this.#options.cookie === "string") {
      return this.#options.cookie || "oauth2";
    }
    return this.#options.cookie?.name ?? "oauth2";
  }

  get #cookieOptions() {
    if (typeof this.#options.cookie !== "object") return {};
    return this.#options.cookie ?? {};
  }

  /**
   * Throws a redirect to the authorization endpoint.
   */
  async authorize(
    _request: Request,
    options?: {
      provider?: string;
      redirectUri?: string;
      type?: "login" | "email-verify";
      headers?: Headers;
    }
  ): Promise<void> {
    const { state, verifier, url, redirectUri } =
      await this.#createAuthorizationURL(options);

    // Create a cookie prefix based on type
    const cookiePrefix = options?.type
      ? `${this.#cookieName}-${options.type}`
      : this.#cookieName;

    const store = new StateStore();
    store.set(state, verifier, redirectUri);

    const setCookie = store.toSetCookie(cookiePrefix, this.#cookieOptions);

    const headers = new Headers();
    headers.append("Set-Cookie", setCookie.toString());

    throw redirect(url.toString(), {
      headers: combineHeaders(headers, options?.headers),
    });
  }

  async exchange(
    request: Request,
    options?: {
      type?: "login" | "email-verify";
    }
  ) {
    const url = new URL(request.url);

    const code = url.searchParams.get("code");
    const stateUrl = url.searchParams.get("state");

    // Create a cookie prefix based on type
    const cookiePrefix = options?.type
      ? `${this.#cookieName}-${options.type}`
      : this.#cookieName;

    const store = StateStore.fromRequest(request, cookiePrefix);

    if (!code) throw new ReferenceError("Missing authorization code.");
    if (!stateUrl) throw new ReferenceError("Missing state in URL.");
    if (!store.state) throw new ReferenceError("Missing state in cookie.");
    if (store.state !== stateUrl) {
      throw new RangeError(
        `State mismatch. Cookie: ${store.state}, URL: ${stateUrl}`
      );
    }
    if (!store.codeVerifier) {
      throw new ReferenceError("Missing code verifier in cookie.");
    }

    // Get the redirect URI that was saved during authorization
    const redirectUri = store.redirectUri ?? this.#options.redirectUri;

    const result = await this.#client.exchange(
      code,
      redirectUri,
      store.codeVerifier
    );

    if (result.err) throw result.err;

    const cleanCookie = StateStore.cleanCookie(cookiePrefix);
    const headers = new Headers();
    headers.append("Set-Cookie", cleanCookie.toString());

    return {
      tokens: result.tokens,
      headers,
    };
  }

  /**
   * Refreshes the access token using the provided refresh token.
   *
   * @param refresh - The refresh token to use for obtaining a new access token.
   * @param access - An optional access token to validate if it needs to be refreshed.
   * @returns The new tokens obtained after refreshing.
   */
  async refreshToken(
    refresh: string,
    access?: string
  ): Promise<Tokens | undefined> {
    const result = await this.#client.refresh(refresh, { access });
    if (result.err) throw result.err;
    if (!result.tokens && access) return { access, refresh, expiresIn: 0 };
    if (!access && !result.tokens) throw new Error("No tokens returned");
    return result.tokens;
  }

  async verifyToken(
    token: string,
    options?: { refresh: string; audience?: string }
  ) {
    const result = await this.#client.verify(this.#subjects, token, {
      ...options,
      issuer: this.#options.issuer,
      fetch: this.#options.fetch as typeof fetch,
    });
    const clone = structuredClone(result);
    return clone;
  }

  async #createAuthorizationURL(options?: {
    provider?: string;
    redirectUri?: string;
  }) {
    const redirectUri = options?.redirectUri ?? this.#options.redirectUri;
    const provider = options?.provider;
    const result = await this.#client.authorize(redirectUri, "code", {
      pkce: true,
      provider: provider,
    });

    const url = new URL(result.url);
    url.searchParams.set("state", result.challenge.state);

    return { ...result.challenge, url, redirectUri };
  }
}

export class OAuth2RequestError extends Error {
  code: string;
  description: string | null;
  uri: string | null;
  state: string | null;

  constructor(
    code: string,
    description: string | null,
    uri: string | null,
    state: string | null
  ) {
    super(`OAuth request error: ${code}`);
    this.code = code;
    this.description = description;
    this.uri = uri;
    this.state = state;
  }
}

export { OpenAuthError };
```

#### State Store

The state store is used to store the state and code verifier for the OAuth flow. It will handle the cookie storage for the code verifier and state.

```typescript title="app/modules/auth/store.server.ts"
import { Cookie, SetCookie, type SetCookieInit } from "@mjackson/headers";

/**
 * This class stores all necessary information for the OAuth flow.
 * It follows the same pattern as the OpenAuth SPA implementation.
 */
export class StateStore {
  state: string | undefined;
  codeVerifier: string | undefined;
  redirectUri: string | undefined;

  constructor(state?: string, codeVerifier?: string, redirectUri?: string) {
    this.state = state;
    this.codeVerifier = codeVerifier;
    this.redirectUri = redirectUri;
  }

  /**
   * Set the state, code verifier, and redirect URI
   */
  set(state: string, verifier?: string, redirectUri?: string) {
    this.state = state;
    this.codeVerifier = verifier;
    this.redirectUri = redirectUri;
  }

  /**
   * Check if the store has a specific state
   */
  has(checkState?: string) {
    if (!this.state) return false;
    return checkState ? this.state === checkState : true;
  }

  /**
   * Get the code verifier for the current state
   */
  get(checkState: string) {
    if (checkState === this.state) {
      return this.codeVerifier;
    }
    return undefined;
  }

  /**
   * Get the redirect URI that was used for this auth flow
   */
  getRedirectUri() {
    return this.redirectUri;
  }

  toString() {
    if (!this.state) return "";
    if (!this.codeVerifier) return "";

    const params = new URLSearchParams();

    params.set("state", this.state);
    params.set("codeVerifier", this.codeVerifier);
    if (this.redirectUri) {
      params.set("redirectUri", this.redirectUri);
    }

    return params.toString();
  }

  /**
   * Convert the store to cookie for storage
   */
  toSetCookie(
    cookieName = "oauth2",
    options: Omit<SetCookieInit, "value"> = {}
  ) {
    return new SetCookie({
      value: this.toString(),
      httpOnly: true, // Prevents JavaScript from accessing the cookie
      maxAge: 60 * 5, // 5 minutes
      path: "/",
      sameSite: "Lax",
      ...options,
      name: cookieName,
    });
  }

  /**
   * Create a new instance from a Request object
   */
  static fromRequest(request: Request, cookieName = "oauth2") {
    const cookie = new Cookie(request.headers.get("cookie") ?? "");
    const cookieValue = cookie.get(cookieName);

    if (!cookieValue) {
      return new StateStore();
    }

    const params = new URLSearchParams(cookieValue);
    const state = params.get("state") || undefined;
    const verifier = params.get("codeVerifier") || undefined;
    const redirectUri = params.get("redirectUri") || undefined;

    return new StateStore(state, verifier, redirectUri);
  }

  static cleanCookie(cookieName = "oauth2") {
    return new SetCookie({
      value: "",
      maxAge: 0,
      httpOnly: true,
      expires: new Date(0),
      path: "/",
      sameSite: "Lax",
      name: cookieName,
    });
  }
}
```

### 3. Authentication & Authorization Functions

This is where we will handle the authentication and authorization flows. We will use the `authenticator` in our helper functions to handle the authentication and authorization flows for our routes.

We have helpers like:

- `getSessionDataWithUser` - This will get the session data and user if they are authenticated
- `requireSessionData` - This will require the session data and throw a redirect to the login page if they are not authenticated
- `requireSessionWithUser` - This will require the session data and user if they are authenticated
- `requireAnonymous` - This will require the session data and throw a redirect to the home page if they are authenticated

We also have a `sessionController` that will handle the session data and user if they are authenticated.

```typescript title="app/modules/auth/auth.server.ts"
import type { Tokens } from "@openauthjs/openauth/client";
import { redirect } from "react-router";
import {
  type EmailAccount,
  type OAuthAccount,
  authSubjects,
} from "../../../packages/functions/src/auth/subjects";
import { combineHeaders } from "../../utils/misc.server";
import type { User } from "../users/service.server";
import * as UserService from "../users/service.server";
import {
  AuthSessionController,
  authSessionStorage,
  getSessionDefaultExpiration,
} from "./auth-session-storage.server";
import { Authenticator } from "./authenticator.server";

export const authenticator = new Authenticator<typeof authSubjects>({
  clientId: "web",
  redirectUri: `${import.meta.env.VITE_SITE_URL}/auth/callback`,
  issuer: import.meta.env.VITE_AUTH_URL,
  subjects: authSubjects,
});

export async function handleAuthCallback(request: Request) {
  try {
    const { tokens, headers: exchangeHeaders } = await authenticator.exchange(
      request
    );
    const verified = await authenticator.verifyToken(tokens.access, {
      refresh: tokens.refresh,
    });

    if (verified.err) {
      throw redirect("/", {
        headers: combineHeaders(
          await sessionController.destroySession(request),
          exchangeHeaders
        ),
      });
    }

    if (verified.subject.type !== "account") {
      throw new Error("Invalid subject type");
    }

    if (verified.subject.properties.type === "email") {
      return handleEmailFlow({
        tokens,
        verified: verified.subject.properties,
        exchangeHeaders,
      });
    }

    throw new Error("Invalid subject type");
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
    console.error("Error handling callback:", error);
    throw redirect("/logout");
  }
}

async function handleEmailFlow({
  tokens,
  verified,
  exchangeHeaders,
}: {
  tokens: Tokens;
  verified: EmailAccount;
  exchangeHeaders: Headers;
}) {
  const user = await UserService.userByEmail(verified.email);

  if (!user) {
    const headers = await sessionController.setSessionData({
      tokens: tokens,
      expires: getSessionDefaultExpiration(),
    });

    throw redirect("/onboarding", {
      headers: combineHeaders(headers, exchangeHeaders),
    });
  }

  const headers = await sessionController.setSessionData({
    tokens: tokens,
    expires: getSessionDefaultExpiration(),
  });

  return {
    user,
    headers: combineHeaders(headers, exchangeHeaders),
  };
}

const sessionController = new AuthSessionController(authSessionStorage);

interface SessionData {
  tokens: Tokens;
  properties: EmailAccount | OAuthAccount;
  headers: Headers;
}

export async function getSessionData(request: Request) {
  const sessionData = await sessionController.getSessionData(request);
  if (!sessionData.tokens) {
    return undefined;
  }

  let headers = new Headers();
  const verified = await authenticator.verifyToken(sessionData.tokens.access, {
    refresh: sessionData.tokens.refresh,
  });
  // if the token is invalid, destroy the session
  // and redirect to the home page where we can login
  if (verified.err || verified.subject.type !== "account") {
    throw redirect("/", {
      headers: await sessionController.destroySession(request),
    });
  }
  // if there are new tokens from the refreshing, update the session
  if (verified.tokens) {
    sessionData.tokens = verified.tokens;
    headers = await sessionController.setSessionData({
      tokens: verified.tokens,
      expires: getSessionDefaultExpiration(),
    });
  }

  return {
    tokens: sessionData.tokens,
    properties: verified.subject.properties,
    headers,
  };
}

export async function requireSessionData(
  request: Request,
  { redirectTo }: { redirectTo?: string | null } = {}
) {
  const sessionData = await getSessionData(request);
  if (!sessionData) {
    throw redirect(getLoginRedirectUrl(request, redirectTo));
  }
  return sessionData;
}

/**
 * Get the session data from the request
 * @param request - The request object
 * @throws redirect to the onboarding page if we have a valid session but no user
 * @returns The session data
 */
export async function getSessionWithUser(request: Request): Promise<
  | {
      sessionData: SessionData;
      user: User;
    }
  | undefined
> {
  const sessionData = await getSessionData(request);
  if (!sessionData) {
    return undefined;
  }
  const user = await UserService.userByEmail(sessionData.properties.email);
  if (!user) {
    throw redirect("/onboarding");
  }

  return {
    sessionData,
    user,
  };
}

export async function requireSessionWithUser(
  request: Request,
  { redirectTo }: { redirectTo?: string | null } = {}
) {
  const sessionData = await requireSessionData(request, { redirectTo });
  const user = await UserService.userByEmail(sessionData.properties.email);
  if (!user) {
    throw redirect("/onboarding");
  }

  return {
    sessionData,
    user,
  };
}

export async function requireAnonymous(request: Request) {
  const sessionData = await getSessionData(request);
  if (sessionData) {
    throw redirect("/");
  }
}

function getLoginRedirectUrl(
  request: Request,
  redirectTo?: string | null
): string {
  const requestUrl = new URL(request.url);
  const to =
    redirectTo === null
      ? null
      : redirectTo ?? `${requestUrl.pathname}${requestUrl.search}`;
  const params = to ? new URLSearchParams({ redirectTo: to }) : null;
  const loginRedirect = ["/login", params?.toString()]
    .filter(Boolean)
    .join("?");
  return loginRedirect;
}

export async function handleLogout(
  request: Request,
  {
    redirectTo = "/",
    responseInit,
  }: {
    redirectTo?: string;
    responseInit?: ResponseInit;
  } = {}
) {
  const headers = await sessionController.destroySession(request);

  throw redirect(redirectTo, {
    ...responseInit,
    headers: combineHeaders(headers, responseInit?.headers),
  });
}

export async function handleSignup({
  email,
  name,
  tokens,
}: {
  email: string;
  name: string;
  tokens: Tokens;
}) {
  const user = await UserService.signup({ email, name });
  const headers = await sessionController.setSessionData({
    tokens,
    expires: getSessionDefaultExpiration(),
  });
  return { user, headers };
}
```

## Implementing Auth Routes in React Router

Now that we have our authentication modules, let's implement the necessary routes:

### 1. Login Route

The job of the login route is to simply redirect the user to the OpenAuth server to start the OAuth flow. This will set the state and code verifier in the cookie and then redirect the user to the OpenAuth server.

```typescript title="app/routes/auth/login.ts"
import {
  authenticator,
  requireAnonymous,
} from "../../modules/auth/auth.server";
import type { Route } from "./+types/login";

export async function loader({ request }: Route.LoaderArgs) {
  await requireAnonymous(request);

  throw await authenticator.authorize(request);
}
```

### 2. Callback Route

In our callback route, we will handle the response from the OpenAuth server. We will verify the tokens and then set the session data.

```typescript title="app/routes/auth/callback.ts"
import type { LoaderFunctionArgs } from "react-router";
import { redirect } from "react-router";
import { handleAuthCallback } from "../../modules/auth/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const { headers } = await handleAuthCallback(request);

  return redirect("/protected", {
    // this could be any route you want
    headers: headers,
  });
}
```

### 3. Logout Route

The logout route will destroy the session and redirect the user to the home page.

```typescript title="app/routes/auth/logout.ts"
import { handleLogout } from "../../modules/auth/auth.server";
import type { Route } from "./+types/logout";

export async function loader({ request }: Route.LoaderArgs) {
  return handleLogout(request);
}

export async function action({ request }: Route.ActionArgs) {
  return handleLogout(request);
}
```

## Creating the Onboarding Component

You will notice in the `handleAuthCallback` function that we are checking if there is a user in our 'database' and if not, we will redirect them to the onboarding page. Regardless of them being a new user or not, we will set the session data with the tokens and redirect the user accordingly.

We will make sure that there is a valid session when on the onboarding page by using the `requireSessionData` function. This will return the email of the user which we can use to fill out the form and check if the user already exists in our 'database'.

For new users, we'll create an onboarding component:

```tsx title="app/routes/auth/onboarding.tsx"
import {
  type SubmissionResult,
  getFormProps,
  getInputProps,
  useForm,
} from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import {
  Form,
  data,
  redirect,
  useActionData,
  useLoaderData,
  useSearchParams,
} from "react-router";
import { HoneypotInputs } from "remix-utils/honeypot/react";
import { safeRedirect } from "remix-utils/safe-redirect";
import { z } from "zod";
import { ErrorList, Field } from "../../components/ui/forms";
import { StatusButton } from "../../components/ui/status-button";
import { authSessionStorage } from "../../modules/auth/auth-session-storage.server";
import {
  handleSignup,
  requireSessionData,
} from "../../modules/auth/auth.server";
import * as UserService from "../../modules/users/service.server";
import { useIsPending } from "../../utils/misc";
import type { Route } from "./+types/onboarding";

export const OnboardingSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  redirectTo: z.string().optional(),
});

export async function loader({ request }: Route.LoaderArgs) {
  const { email } = await requireOnboardingData(request);
  const authSession = await authSessionStorage.getSession(
    request.headers.get("cookie")
  );

  const formError = authSession.get("error");
  const hasError = typeof formError === "string";

  return data({
    email: email,
    status: "idle",
    submission: {
      status: hasError ? "error" : undefined,
      initialValue: {
        email: email,
      },
      error: { "": hasError ? [formError] : [] },
    } as SubmissionResult,
  });
}

export async function action({ request }: Route.ActionArgs) {
  const onboardingData = await requireOnboardingData(request);
  const formData = await request.formData();

  const submission = await parseWithZod(formData, {
    async: true,
    schema: (intent) =>
      OnboardingSchema.superRefine(async (data, ctx) => {
        try {
          const existingUser = await UserService.userByEmail(data.email);
          if (existingUser) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "A user with this email already exists.",
              path: ["email"],
            });
            return;
          }
          if (data.email !== onboardingData.email) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Email does not match the email provided.",
              path: ["email"],
            });
            return;
          }
        } catch (error) {
          console.error("Error verifying token:", error);
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "An error occurred while verifying the token.",
            path: ["email"],
          });
        }
      }).transform(async (data) => {
        if (intent !== null) return { ...data, headers: null };

        const { headers } = await handleSignup({
          email: data.email,
          name: data.name,
          tokens: onboardingData.tokens,
        });
        return { ...data, headers };
      }),
  });

  if (submission.status !== "success" || !submission.value.headers) {
    return data(
      { result: submission.reply() },
      { status: submission.status === "error" ? 400 : 200 }
    );
  }

  const { redirectTo, headers } = submission.value;

  return redirect(safeRedirect(redirectTo, "/protected"), { headers });
}

export default function OnboardingProviderRoute() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  const isPending = useIsPending();

  const [form, fields] = useForm({
    id: "onboarding-form",
    constraint: getZodConstraint(OnboardingSchema),
    lastResult: actionData?.result ?? loaderData.submission,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: OnboardingSchema });
    },
    shouldRevalidate: "onBlur",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className=" flex p-8 flex-col items-center justify-center gap-6 rounded-lg shadow-md w-full max-w-xl bg-card">
        <header className="mb-2 flex flex-col gap-2">
          <h1 className="font-display text-center text-5xl font-semibold text-foreground">
            Create your account
          </h1>
          <p className="text-center text-base font-normal text-muted-foreground">
            Join thousands of users today
          </p>
        </header>

        <div className="space-y-8 w-full">
          <Form
            method="POST"
            autoComplete="off"
            className="flex w-full flex-col items-start gap-1"
            {...getFormProps(form)}
          >
            <HoneypotInputs />
            {redirectTo ? (
              <input
                {...getInputProps(fields.redirectTo, { type: "hidden" })}
                value={redirectTo}
              />
            ) : null}
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-6">
              <div className="col-span-full md:col-span-full md:col-start-1">
                <Field
                  labelProps={{
                    children: "Name",
                  }}
                  inputProps={{
                    ...getInputProps(fields.name, {
                      type: "text",
                    }),
                    autoFocus: true,
                  }}
                  errors={fields.name.errors}
                />
              </div>

              <div className="col-span-full md:col-span-full">
                <Field
                  labelProps={{
                    children: "Email",
                  }}
                  inputProps={{
                    ...getInputProps(fields.email, { type: "email" }),
                    className: "lowercase",
                    autoComplete: "email",
                    readOnly: true,
                  }}
                  errors={fields.email.errors}
                />
              </div>
            </div>
            <div>
              <ErrorList errors={form.errors} id={form.errorId} />
            </div>
            <div className="mt-8 w-full">
              <StatusButton
                type="submit"
                status={isPending ? "pending" : form.status ?? "idle"}
                className="w-full"
              >
                Create Account
              </StatusButton>
            </div>
          </Form>

          <Form method="POST" action="/logout">
            <p className="text-body-sm text-muted-foreground">
              Want to use a different email?{" "}
              <button
                type="submit"
                className="text-body-sm text-muted-foreground hover:underline"
              >
                Sign out
              </button>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}

async function requireOnboardingData(request: Request) {
  const sessionData = await requireSessionData(request);
  if (!sessionData.tokens) {
    throw new Error("No tokens found");
  }
  const result = z
    .object({
      email: z.string().email(),
      tokens: z.object({
        access: z.string(),
        refresh: z.string(),
        expiresIn: z.number(),
      }),
    })
    .safeParse({
      email: sessionData.properties.email,
      tokens: sessionData.tokens,
    });
  if (!result.success) {
    console.log("requireOnboardingData: result", result);
    throw redirect("/");
  }
  return result.data;
}
```

## Protecting Routes

Now that we have our authentication system in place, let's create a utility to protect routes. If the user is not authenticated, they will be redirected to the login page to start the authentication flow.

```tsx title="app/routes/protected.tsx"
import { requireSessionWithUser } from "../modules/auth/auth.server";
import type { Route } from "./+types/protected";

export async function loader({ request }: Route.LoaderArgs) {
  const { user } = await requireSessionWithUser(request);

  return { user };
}

export default function Protected({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1>Protected</h1>
      <pre>{JSON.stringify(loaderData, null, 2)}</pre>
    </div>
  );
}
```

## Trying It Out

Now that we have everything set up, let's deploy our application:

```bash
bunx sst dev
```

After deployment, you can navigate to your application URL and try out the authentication flow:

1. Click "Sign In" to start the authentication process
2. Enter your email
3. Complete verification code step
4. Get redirected back to your application
5. Complete onboarding (if a new user)
6. Access protected routes!

## Conclusion

In this guide, we've built a complete authentication system using OpenAuth with React Router and SST. This approach provides several benefits:

- Secure authentication with JWT tokens
- Support for multiple authentication providers
- Protected routes with minimal boilerplate
- Serverless authentication infrastructure

You can extend this implementation by adding more providers, enhancing the user experience, or integrating with additional services. The core authentication flow will remain the same, making your system both robust and flexible.

In the next guide, we will add in a GitHub provider and show how to handle the callback for that flow. And also we will create custom UI pages for the OpenAuth OAuth flow.

Check out the [full example on GitHub](https://github.com/natac13/seanpaulcampbell.com/tree/main/examples/openauth-react-router) for the complete code.
