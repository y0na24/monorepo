import { createBrowserRouter } from 'react-router-dom'
import { App } from '@/components/App'
// @ts-ignore
import shopRoutes from 'shop/Router'
// @ts-ignore
import adminRoutes from 'admin/Router'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // children: [...shopRoutes[0].children, ...adminRoutes[0].children]
    children: [...shopRoutes, ...adminRoutes]
  }
])
