import { App } from '@/components/App'
import { createBrowserRouter } from 'react-router-dom'
import { ShopPage } from '@/pages/Shop'
import { Suspense } from 'react'

const routes = [
  {
    path: '/shop',
    element: <App />,
    children: [
      {
        path: 'main',
        element: (
          <Suspense fallback="Loading...">
            <ShopPage />
          </Suspense>
        )
      },
      {
        path: 'second',
        element: (
          <Suspense fallback="Loading...">
            <div style={{ color: 'red' }}>shop/second</div>
          </Suspense>
        )
      }
    ]
  }
]

export const router = createBrowserRouter(routes)

export default routes
