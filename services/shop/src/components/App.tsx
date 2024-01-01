import { type FC } from 'react'
import { Outlet } from 'react-router-dom'

interface AppProps {}

export const App: FC<AppProps> = ({}) => {
  return (
    <>
      <div>SHOP MODULE</div>
      <Outlet />
    </>
  )
}
