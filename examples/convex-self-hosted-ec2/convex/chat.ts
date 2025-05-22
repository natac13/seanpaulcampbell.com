import { v } from 'convex/values'
import type { Id } from './_generated/dataModel'
import { mutation, query } from './_generated/server'

export const sendMessage = mutation({
  args: {
    user: v.string(),
    body: v.string(),
    fileId: v.optional(v.id('_storage')),
  },
  handler: async (ctx, args) => {
    console.log('This TypeScript function is running on the server.')
    await ctx.db.insert('messages', {
      user: args.user,
      body: args.body,
      fileId: args.fileId,
    })
  },
})

export const getMessages = query({
  args: {},
  handler: async (ctx) => {
    const messages = await ctx.db.query('messages').order('desc').take(50)

    const messagesWithFiles = await Promise.all(
      messages.map(async (message) => {
        if (message.fileId) {
          const file = await ctx.storage.getUrl(message.fileId as Id<'_storage'>)
          return { ...message, file }
        }
        return message
      }),
    )

    return messagesWithFiles.reverse()
  },
})

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl()
  },
})
