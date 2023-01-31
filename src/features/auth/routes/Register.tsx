import { useNavigate } from 'react-router-dom'

import { AuthProvider } from '@/lib/auth'

import { Layout } from '../components/Layout'
import { RegisterForm } from '../components/RegisterForm'

export const Register = () => {
  const navigate = useNavigate()

  return (
    <AuthProvider>
      <Layout title="Register your account">
        <RegisterForm onSuccess={() => navigate('/app')} />
      </Layout>
    </AuthProvider>
  )
}
