import Content from '../components/molecules/content.molecule'
import { Outlet } from 'react-router-dom'

const Auth = () => {
  return (
    <Content title='' >
        <Outlet />
    </Content>
  )
}

export default Auth