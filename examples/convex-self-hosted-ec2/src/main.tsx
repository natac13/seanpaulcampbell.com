import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import App from './App'

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <App />
    </ConvexProvider>
  </StrictMode>,
)
