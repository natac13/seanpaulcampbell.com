// In-memory storage for users
const users = new Map<string, User>()

export interface User {
  id: string
  email: string
  name: string
  imageUrl?: string
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
  return { user, provider: { name: providerName, id: providerAccountId } }
}
