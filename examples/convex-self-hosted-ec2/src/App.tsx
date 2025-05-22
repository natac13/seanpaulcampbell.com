import { faker } from '@faker-js/faker'
import { useMutation, useQuery } from 'convex/react'
import { useEffect, useState } from 'react'
import { api } from '../convex/_generated/api'
import type { Id } from '../convex/_generated/dataModel'

// For demo purposes. In a real app, you'd have real user data.
const NAME = getOrSetFakeName()

export default function App() {
  const messages = useQuery(api.chat.getMessages)
  const sendMessage = useMutation(api.chat.sendMessage)
  const generateUploadUrl = useMutation(api.chat.generateUploadUrl)
  const [file, setFile] = useState<File | null>(null)

  const [newMessageText, setNewMessageText] = useState('')

  useEffect(() => {
    // Make sure scrollTo works on button click in Chrome
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    }, 0)
  }, [messages])

  const handleFileChange = async () => {
    const postUrl = await generateUploadUrl()
    const result = await fetch(postUrl, {
      method: 'POST',
      body: file,
    })
    const data = await result.json()
    console.log(data)
    return data.storageId
  }

  return (
    <main className="chat">
      <header>
        <h1>Convex Chat</h1>
        <p>
          Connected as <strong>{NAME}</strong>
        </p>
      </header>
      {messages?.map((message) => (
        <article key={message._id} className={message.user === NAME ? 'message-mine' : ''}>
          <div>{message.user}</div>

          <p>{message.body}</p>
          {message.file && <img src={message.file} alt="File" width={100} height={100} />}
        </article>
      ))}
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          let fileId: Id<'_storage'> | undefined
          if (file) {
            fileId = await handleFileChange()
          }
          console.log(fileId)
          await sendMessage({
            user: NAME,
            body: newMessageText,
            fileId: fileId ?? undefined,
          })
          setNewMessageText('')
        }}
        style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '10px' }}
      >
        <div>
          <label htmlFor="file">Upload a file</label>
          <input type="file" id="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </div>
        <input
          value={newMessageText}
          onChange={async (e) => {
            const text = e.target.value
            setNewMessageText(text)
          }}
          placeholder="Write a message…"
          autoFocus
        />
        <button type="submit" disabled={!newMessageText}>
          Send
        </button>
      </form>
    </main>
  )
}

function getOrSetFakeName() {
  const NAME_KEY = 'tutorial_name'
  const name = sessionStorage.getItem(NAME_KEY)
  if (!name) {
    const newName = faker.person.firstName()
    sessionStorage.setItem(NAME_KEY, newName)
    return newName
  }
  return name
}
