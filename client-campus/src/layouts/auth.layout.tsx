import Content from '../components/templates/content.template'
import { Outlet } from 'react-router-dom'

const Auth = () => {
  return (
    <Content title='' >
        <Outlet />
    </Content>
  )
}

export default Auth