import {
  type ProviderAccount,
  providerAccountCreate,
} from '../providers/provider-account.service.server'

// In-memory storage for users
const users = new Map<string, User>()

export interface User {
  id: string
  email: string
  name: string
  imageUrl?: string
  accounts?: ProviderAccount[]
}

export async function userByEmail(email: string): Promise<User | undefined> {
  // Find first user with matching email
  for (const user of users.values()) {
    if (user.email === email) {
      return user
    }
  }
  return undefined
}

export async function userById(id: string): Promise<User | undefined> {
  return users.get(id)
}

export async function userCreate(data: {
  email: string
  name: string
  imageUrl?: string
}): Promise<User> {
  const id = crypto.randomUUID()
  const user: User = {
    id,
    ...data,
  }
  users.set(id, user)
  return user
}

export async function signup({ email, name }: { email: string; name: string }) {
  const user = await userCreate({ email, name })
  return user
}

export async function signupWithProvider({
  name,
  email,
  imageUrl,
  providerName,
  providerAccountId,
}: {
  name: string
  email: string
  imageUrl?: string
  providerName: string
  providerAccountId: string
}) {
  const user = await userCreate({ email, name, imageUrl })
  const providerAccount = await providerAccountCreate({
    userId: user.id,
    providerName,
    providerAccountId,
  })

  // update user accounts
  const accounts = user.accounts || []
  accounts.push(providerAccount)
  users.set(user.id, { ...user, accounts })
  return { user, account: providerAccount }
}
