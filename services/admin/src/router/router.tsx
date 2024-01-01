import { App } from '@/components/App'
import { AboutPage } from '@/pages/About'
import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const routes = [
  {
    path: '/admin',
    element: <App />,
    children: [
      {
        path: 'about',
        element: (
          <Suspense fallback="Loading...">
            <AboutPage />
          </Suspense>
        )
      }
    ]
  }
]

export const router = createBrowserRouter(routes)

export default routes
