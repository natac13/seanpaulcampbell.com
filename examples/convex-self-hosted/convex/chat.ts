import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const sendMessage = mutation({
  args: {
    user: v.string(),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    console.log('This TypeScript function is running on the server.')
    await ctx.db.insert('messages', {
      user: args.user,
      body: args.body,
    })
  },
})

export const getMessages = query({
  args: {},
  handler: async (ctx) => {
    const messages = await ctx.db.query('messages').order('desc').take(50)
    return messages.reverse()
  },
})
