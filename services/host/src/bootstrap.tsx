import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'

const root = document.getElementById('root')

createRoot(root).render(<RouterProvider router={router} />)
