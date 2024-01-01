import { type FC } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { shopRoutes } from '@packages/shared/src/routes/shop'
import { adminRoutes } from '@packages/shared/src/routes/admin'

interface AppProps {}

export const App: FC<AppProps> = ({}) => {
  return (
    <>
      <div data-testid="APP">
        <h1>HOST</h1>
        <Link to={adminRoutes.about}>ABOUT</Link>
        <br />
        <Link to={shopRoutes.main}>SHOP</Link>
        <br />
        <Outlet />
      </div>
    </>
  )
}
