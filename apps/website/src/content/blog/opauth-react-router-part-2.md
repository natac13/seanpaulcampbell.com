---
title: "OpenAuth with React Router Part 2"
description: "A guide to using OpenAuth with React Router for Authentication. Setting up custom UI and an social provider."
publishDate: 2025-05-09 14:00:00
tags: ["OpenAuth", "React Router", "SST"]
---

In our [previous journey](/blog/openauth-react-router), we set up an [OpenAuth]() server, and our [React Router]() web application's authentication and authorization. We used the `CodeUI` component which comes with OpenAuth to handle the authentication flow. There were promises made at the end of that guide to continue our journey, with a custom UI and a social provider.

Our journey will take us into the depths of the [OpenAuth]() codebase. We will explore the `CodeUI` component, as well as the `CodeProvider` to find what we need to create a custom UI. Then we will set up a social provider to round out our authentication system. And to finish off, I will go over a few things that I have learned along the way.

## Prerequisites

- [Previous Guide](/blog/openauth-react-router)
- Node.js and npm/yarn/bun installed
- Basic familiarity with React and React Router
- Understanding of SST fundamentals
- An AWS account (for SST deployment)

## Custom UI

The first stop on our journey is the `CodeUI` component. Thankfully, the [creators of OpenAuth]() have provided pre-built components for OpenAuth to function without any required UI. However, say we want to have a custom UI, or even just make the routes all on our web domain. We can do that by still using the `CodeProvider` but create our own UI.

So what does that look like? Let's take a look at the `CodeUI` component and see what we need to create a custom UI.

```tsx title="CodeUI.tsx" {16,17,46} collapse={18-38, 48-96}
/**
 * Creates a UI for the Code provider flow.
 * @param props - Configure the UI.
 */
export function CodeUI(props: CodeUIOptions): CodeProviderOptions {
  const copy = {
    ...DEFAULT_COPY,
    ...props.copy,
  };

  const mode = props.mode ?? "email";

  return {
    sendCode: props.sendCode,
    length: 6,
    request: async (_req, state, _form, error): Promise<Response> => {
      if (state.type === "start") {
        const jsx = (
          <Layout>
            <form data-component="form" method="post">
              {error?.type === "invalid_claim" && (
                <FormAlert message={copy.email_invalid} />
              )}
              <input type="hidden" name="action" value="request" />
              <input
                data-component="input"
                autofocus
                type={mode === "email" ? "email" : "tel"}
                name={mode === "email" ? "email" : "phone"}
                inputmode={mode === "email" ? "email" : "numeric"}
                required
                placeholder={copy.email_placeholder}
              />
              <button data-component="button">{copy.button_continue}</button>
            </form>
            <p data-component="form-footer">{copy.code_info}</p>
          </Layout>
        );
        return new Response(jsx.toString(), {
          headers: {
            "Content-Type": "text/html",
          },
        });
      }

      if (state.type === "code") {
        const jsx = (
          <Layout>
            <form data-component="form" class="form" method="post">
              {error?.type === "invalid_code" && (
                <FormAlert message={copy.code_invalid} />
              )}
              {state.type === "code" && (
                <FormAlert
                  message={
                    (state.resend ? copy.code_resent : copy.code_sent) +
                    state.claims.email
                  }
                  color="success"
                />
              )}
              <input type="hidden" name="action" value="verify" />
              <input
                data-component="input"
                autofocus
                minLength={6}
                maxLength={6}
                type="text"
                name="code"
                required
                inputmode="numeric"
                autocomplete="one-time-code"
                placeholder={copy.code_placeholder}
              />
              <button data-component="button">{copy.button_continue}</button>
            </form>
            <form method="post">
              {Object.entries(state.claims).map(([key, value]) => (
                <input
                  key={key}
                  type="hidden"
                  name={key}
                  value={value}
                  className="hidden"
                />
              ))}
              <input type="hidden" name="action" value="request" />
              <div data-component="form-footer">
                <span>
                  {copy.code_didnt_get}{" "}
                  <button data-component="link">{copy.code_resend}</button>
                </span>
              </div>
            </form>
          </Layout>
        );
        return new Response(jsx.toString(), {
          headers: {
            "Content-Type": "text/html",
          },
        });
      }

      throw new UnknownStateError();
    },
  };
}
```

The important part of this is the `request` function. This takes in the request, the `state`, form data, and an error. The `state` have the following type:

```typescript title="./src/provider/code.ts" {3,6}
export type CodeProviderState =
  | {
      type: "start";
    }
  | {
      type: "code";
      resend?: boolean;
      code: string;
      claims: Record<string, string>;
    };
```

From this we have learned that we need to handle the `start` and `code` states. And we do this by returning a `Response`. However, instead of the `Response` object, pointing to the OpenAuth server, we can return a `Response` object with a redirect to our own UI routes. Next stop is our `issuer.ts` file. The `start` state form has 2 inputs: `email` and `action`. The `code` state form has 3 inputs: `code`, `action`, and `email`. We also need to handle the ability to resend the code.

### Issuer Updates

```typescript title="packages/functions/src/auth/issuer.ts" {16,22,28-32}
import { issuer } from "@openauthjs/openauth";
import { UnknownStateError } from "@openauthjs/openauth/error";
import { CodeProvider } from "@openauthjs/openauth/provider/code";
import { handle } from "hono/aws-lambda";
import { authSubjects } from "./subjects";

const app = issuer({
  subjects: authSubjects,
  allow: async () => true,
  providers: {
    email: CodeProvider({
      length: 6,
      sendCode: async (email, code) => {
        console.log("send code: ", email, code);
      },
      async request(_req, state, _form, error) {
        const params = new URLSearchParams();
        // we pass the error to the frontend with a query param
        if (error) {
          params.set("error", error.type);
        }
        if (state.type === "start") {
          return Response.redirect(
            `${process.env.AUTH_FRONTEND_URL}/auth/email?${params.toString()}`,
            302
          );
        }
        if (state.type === "code") {
          params.set("claims", JSON.stringify(state.claims));
          if (state.resend) {
            params.set("resend", "true");
          }
          return Response.redirect(
            `${process.env.AUTH_FRONTEND_URL}/auth/code?${params.toString()}`,
            302
          );
        }

        // OpenAuth throws a UnknownStateError here, so we just mimic it
        throw new UnknownStateError();
      },
    }),
  },
  success: async (ctx, value) => {
    console.log("Success", JSON.stringify(value));
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

Ookie Dookie, what's going on here? In the `request` function, we are redirecting to our own UI routes: `/auth/email` and `/auth/code`. We are also passing the error to the frontend with a query param. This is so we can handle the potential error on the frontend. For the `code` state, we add in the `claims` and `resend` query params. The `claims` contains the email address and the `resend` is a boolean to indicate if the code was resent.

Be sure to update the `sst.config.ts` file to include the `AUTH_FRONTEND_URL` environment variable. This is the URL of our frontend. We will use this to redirect to our own UI routes.

```typescript title="sst.config.ts" {22-24}
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
          profile: "your-aws-profile", // replace with your AWS profile
        },
      },
    };
  },
  async run() {
    const auth = new sst.aws.Auth("AuthServer", {
      issuer: {
        handler: "./packages/functions/src/auth/issuer.handler",
        environment: {
          AUTH_FRONTEND_URL: "http://localhost:5173",
        },
      },
    });

    new sst.aws.React("Web", {
      environment: {
        VITE_AUTH_URL: auth.url,
        VITE_SITE_URL: "http://localhost:5173",
      },
    });
  },
});
```

### Email Route

Alrighty then, let's create our email route.

```tsx title="app/routes/auth/email.tsx" {19,24,27-34}
import { useNavigation, useSearchParams } from "react-router";
import { Card, CardContent, CardFooter } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { StatusButton } from "../../components/ui/status-button";

export default function EmailAuthRoute() {
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error");
  const isPending = useNavigation().state !== "idle";

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-lg">
        <CardContent className="pt-6">
          <form
            method="post"
            className="grid gap-4"
            action={`${import.meta.env.VITE_AUTH_URL}/email/authorize`}
          >
            {error === "invalid_claim" && (
              <FormAlert message={"Invalid email address"} />
            )}
            <input type="hidden" name="action" value="request" />
            <div className="grid gap-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                type="email"
                name="email"
                id="email"
                autoFocus
                autoComplete="email"
                placeholder="Email address"
              />
            </div>
            <StatusButton
              type="submit"
              status={isPending ? "pending" : error ? "error" : "idle"}
            >
              Continue
            </StatusButton>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            We&apos;ll send you a code to your email address
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

function FormAlert({ message }: { message: string }) {
  return (
    <div
      data-component="alert"
      className="bg-red-100 text-red-700 border border-red-300 rounded p-4 mb-4"
    >
      {message}
    </div>
  );
}
```

First we make sure to set the `form` `action` to the OpenAuth server's email authorize route. This is so we can handle the request and verify the email address. I also want to call out the hidden input for the `action` and the `input` for the `email` address.

### Code Route

For the code route, we need to handle two things:

1. A OTP input field to verify the codes
   - hidden `action` input of `verify`
2. A form to allow the user to request a new code
   - hidden `action` input of `resend`

We want to follow OpenAuth's `CodeUI` component functionality, so let's review the important parts.

```tsx title="CodeUI.tsx" {16,23,32-41}
if (state.type === "code") {
  <Layout>
    <form data-component="form" class="form" method="post">
      {error?.type === "invalid_code" && (
        <FormAlert message={copy.code_invalid} />
      )}
      {state.type === "code" && (
        <FormAlert
          message={
            (state.resend ? copy.code_resent : copy.code_sent) +
            state.claims.email
          }
          color="success"
        />
      )}
      <input type="hidden" name="action" value="verify" />
      <input
        data-component="input"
        autofocus
        minLength={6}
        maxLength={6}
        type="text"
        name="code"
        required
        inputmode="numeric"
        autocomplete="one-time-code"
        placeholder={copy.code_placeholder}
      />
      <button data-component="button">{copy.button_continue}</button>
    </form>
    <form method="post">
      {Object.entries(state.claims).map(([key, value]) => (
        <input
          key={key}
          type="hidden"
          name={key}
          value={value}
          className="hidden"
        />
      ))}
      {/* the value I think should be resend, so I'll be submitting a PR to fix 🚧 */}
      <input type="hidden" name="action" value="request" />
      <div data-component="form-footer">
        <span>
          {copy.code_didnt_get}{" "}
          <button data-component="link">{copy.code_resend}</button>
        </span>
      </div>
    </form>
  </Layout>;
}
```

Now let's create our code route.

```tsx title="app/routes/auth/code.tsx" {59,66,89-98}
import { Loader2Icon } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigation, useSearchParams } from "react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { OTPField } from "../../components/ui/forms";

export default function CodeAuthRoute() {
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error");
  const resend = searchParams.get("resend");
  const claims = useClaims();
  const isPending = useNavigation().state !== "idle";

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickAway() {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }

    const el = wrapperRef.current;
    if (!el) return;
    el.addEventListener("click", handleClickAway);

    return () => {
      el.removeEventListener("click", handleClickAway);
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl">Enter pin code</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            ref={formRef}
            method="post"
            action={`${import.meta.env.VITE_AUTH_URL}/email/authorize`}
            className="grid gap-4"
          >
            {error === "invalid_code" && <FormAlert message={"Invalid code"} />}
            <FormMessage
              message={`${resend ? "Code resent" : "Code sent"} to ${
                claims?.email
              }`}
            />
            <input type="hidden" name="action" value="verify" />
            <OTPField
              className="place-self-center"
              ref={inputRef}
              inputProps={{
                type: "text",
                className: "uppercase",
                name: "code",
                required: true,
                autoComplete: "one-time-code",
                autoFocus: true,
                onComplete: () => {
                  if (!formRef.current) return;
                  formRef.current.submit();
                },
              }}
            />
            {isPending ? (
              <div className="flex items-center justify-center">
                <Loader2Icon className="animate-spin size-8" />
              </div>
            ) : null}
          </form>
        </CardContent>
        <CardFooter>
          <form
            method="post"
            action={`${import.meta.env.VITE_AUTH_URL}/email/authorize`}
            className="w-full"
          >
            {Object.entries(claims).map(([key, value]) => (
              <input
                key={key}
                type="hidden"
                name={key}
                value={value as string}
                className="hidden"
              />
            ))}
            <input type="hidden" name="action" value="resend" />
            <p className="text-sm text-muted-foreground text-center w-full">
              Did not receive a code?{" "}
              <button type="submit" className="text-primary hover:underline">
                Resend code
              </button>
            </p>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}

function FormAlert({ message }: { message: string }) {
  return (
    <div
      data-component="alert"
      className="bg-red-100 text-red-700 border border-red-300 rounded p-4 mb-4"
    >
      {message}
    </div>
  );
}

function FormMessage({ message }: { message: string }) {
  return (
    <div
      data-component="alert"
      className="bg-green-100 text-center text-green-700 border border-green-300 rounded p-4 mb-4"
    >
      {message}
    </div>
  );
}

function useClaims() {
  const [searchParams] = useSearchParams();
  const claims = searchParams.get("claims");
  try {
    return claims ? JSON.parse(claims) : null;
  } catch {
    return null;
  }
}
```

### Test it out

At this point, we can test out our new UI routes for the email and code routes.

```bash title="sst dev"
bun sst dev
```

## Slight Detour back to the OpenAuth codebase

The way the OpenAuth `issuer` is currently written, is that when there is only one provider, it will automatically pick that provider as the authorizer. However, when there are multiple providers, OpenAuth will show a _select_ route, which shows the available options based on what you have configured in your `issuer` file.

```typescript title="openauth/packages/openauth/src/issuer.ts" {3,55-57,60-65} showLineNumbers startLineNumber=1012
// ...
app.get("/authorize", async (c) => {
  const provider = c.req.query("provider");
  const response_type = c.req.query("response_type");
  const redirect_uri = c.req.query("redirect_uri");
  const state = c.req.query("state");
  const client_id = c.req.query("client_id");
  const audience = c.req.query("audience");
  const code_challenge = c.req.query("code_challenge");
  const code_challenge_method = c.req.query("code_challenge_method");
  const authorization: AuthorizationState = {
    response_type,
    redirect_uri,
    state,
    client_id,
    audience,
    pkce:
      code_challenge && code_challenge_method
        ? {
            challenge: code_challenge,
            method: code_challenge_method,
          }
        : undefined,
  } as AuthorizationState;
  c.set("authorization", authorization);

  if (!redirect_uri) {
    return c.text("Missing redirect_uri", { status: 400 });
  }

  if (!response_type) {
    throw new MissingParameterError("response_type");
  }

  if (!client_id) {
    throw new MissingParameterError("client_id");
  }

  if (input.start) {
    await input.start(c.req.raw);
  }

  if (
    !(await allow()(
      {
        clientID: client_id,
        redirectURI: redirect_uri,
        audience,
      },
      c.req.raw
    ))
  )
    throw new UnauthorizedClientError(client_id, redirect_uri);
  await auth.set(c, "authorization", 60 * 60 * 24, authorization);
  if (provider) return c.redirect(`/${provider}/authorize`);
  const providers = Object.keys(input.providers);
  if (providers.length === 1) return c.redirect(`/${providers[0]}/authorize`);
  return auth.forward(
    c,
    await select()(
      Object.fromEntries(
        Object.entries(input.providers).map(([key, value]) => [key, value.type])
      ),
      c.req.raw
    )
  );
});
```

The important parts for us right now are:

- if a `provider` is supplied, the OpenAuth issuer will redirect to the `/${provider}/authorize` route
- else if there is only one provider, the OpenAuth issuer will redirect to the `/${provider}/authorize` route
- otherwise, the OpenAuth issuer will forward the request to the `select` route, passing in the available providers and the request

So the question at this point is; what does the OpenAuth `select` route look like?

```tsx title="openauth/packages/openauth/src/ui/select.tsx" {9,10,12,15} showLineNumbers startLineNumber=62
export function Select(props?: SelectProps) {
  return async (
    providers: Record<string, string>,
    _req: Request
  ): Promise<Response> => {
    const jsx = (
      <Layout>
        <div data-component="form">
          {Object.entries(providers).map(([key, type]) => {
            const match = props?.providers?.[key];
            if (match?.hide) return;
            const icon = ICON[key];
            return (
              <a
                href={`/${key}/authorize`}
                data-component="button"
                data-color="ghost"
              >
                {icon && <i data-slot="icon">{icon}</i>}
                Continue with {match?.display || DISPLAY[type] || type}
              </a>
            );
          })}
        </div>
      </Layout>
    );

    return new Response(jsx.toString(), {
      headers: {
        "Content-Type": "text/html",
      },
    });
  };
}
```

Our exploration has given us a few things:

- We need to create links for each available provider to the `/${provider}/authorize` route on the OpenAuth server
- We will need to show icons based on the provider as well as a label

```tsx title="app/routes/auth/select.tsx" {1,2,4,5}

```

### Select Route

## Social Provider

### GitHub

## Not all Sunshine and Rainbows

### All Good Things Come to those who Wait
