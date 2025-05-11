// In-memory storage for provider accounts
const providerAccounts = new Map<string, ProviderAccount>()

export interface ProviderAccount {
  userId: string
  providerName: string
  providerAccountId: string
}

/**
 * Retrieves a provider account by its provider name and provider account ID.
 * The key for the map is a composite of providerName and providerAccountId.
 */
export async function providerAccountById(data: {
  providerName: string
  providerAccountId: string
}): Promise<ProviderAccount | undefined> {
  const key = `${data.providerName}:${data.providerAccountId}`
  return providerAccounts.get(key)
}

/**
 * Creates a new provider account.
 * The key for the map is a composite of providerName and providerAccountId.
 */
export async function providerAccountCreate(data: {
  userId: string
  providerName: string
  providerAccountId: string
}): Promise<ProviderAccount> {
  const key = `${data.providerName}:${data.providerAccountId}`
  const providerAccount: ProviderAccount = { ...data }
  providerAccounts.set(key, providerAccount)
  return providerAccount
}
