import * as z from 'zod'

import { Button, Link } from '@/components/Elements'
import { Form, InputField } from '@/components/Form'
import { useAuth } from '@/lib/auth'

const schema = z.object({
  email: z.string().min(1, '必填字段不能为空'),
  password: z.string().min(1, '必填字段不能为空'),
})

type LoginValues = {
  email: string
  password: string
}

type LoginFormProps = {
  onSuccess: () => void
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { login, isLoggingIn } = useAuth()

  return (
    <div>
      <Form<LoginValues, typeof schema>
        onSubmit={async (values) => {
          await login(values)
          onSuccess()
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="email"
              label="邮箱"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <InputField
              type="password"
              label="密码"
              error={formState.errors['password']}
              registration={register('password')}
            />
            <div>
              <Button isLoading={isLoggingIn} type="submit" className="w-full">
                Log in
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <Link className="font-medium text-blue-600 hover:text-blue-500" to={'../register'}>
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}
