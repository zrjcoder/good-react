import { useNavigate } from 'react-router-dom'

import { AuthProvider } from '@/lib/auth'

import { Layout } from '../components/Layout'
import { LoginForm } from '../components/LoginForm'

export const Login = () => {
  const navigate = useNavigate()

  return (
    <AuthProvider>
      <Layout title="Log in to your account">
        <LoginForm onSuccess={() => navigate('/app')} />
      </Layout>
    </AuthProvider>
  )
}
