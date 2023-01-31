import { Switch } from '@headlessui/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import * as z from 'zod'

import { Button } from '@/components/Elements'
import { Form, InputField } from '@/components/Form'
import { useAuth } from '@/lib/auth'

// import { useTeams } from '@/features/teams'
const schema = z
  .object({
    email: z.string().min(1, '必填字段不能为空'),
    name: z.string().min(1, '必填字段不能为空'),
    password: z.string().min(1, '必填字段不能为空'),
  })
  .and(
    z
      .object({
        teamId: z.string().min(1, '必填字段不能为空'),
      })
      .or(z.object({ teamName: z.string().min(1, '必填字段不能为空') }))
  )

type RegisterValues = {
  name: string
  email: string
  password: string
  teamId?: string
  teamName?: string
}

type RegisterFormProps = {
  onSuccess: () => void
}

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { register, isRegistering } = useAuth()
  const [chooseTeam, setChooseTeam] = useState(false)

  return (
    <div>
      <Form<RegisterValues, typeof schema>
        onSubmit={async (values) => {
          await register(values)
          onSuccess()
        }}
        schema={schema}
        options={{
          shouldUnregister: true,
        }}
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="text"
              label="姓名"
              error={formState.errors['name']}
              registration={register('name')}
            />
            <InputField
              type="email"
              label="电子邮箱"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <InputField
              type="password"
              label="密码"
              error={formState.errors['password']}
              registration={register('password')}
            />

            <Switch.Group>
              <div className="flex items-center">
                <Switch
                  checked={chooseTeam}
                  onChange={setChooseTeam}
                  className={`${
                    chooseTeam ? 'bg-blue-600' : 'bg-gray-200'
                  } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  <span
                    className={`${
                      chooseTeam ? 'translate-x-6' : 'translate-x-1'
                    } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                  />
                </Switch>
                <Switch.Label className="ml-4">加入已有的小组</Switch.Label>
              </div>
            </Switch.Group>

            <InputField
              type="text"
              label="小组名"
              error={formState.errors['teamName']}
              registration={register('teamName')}
            />

            <div>
              <Button isLoading={isRegistering} type="submit" className="w-full">
                注册
              </Button>
            </div>
          </>
        )}
      </Form>

      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <Link to="../login" className="font-medium text-blue-600 hover:text-blue-500">
            Log In
          </Link>
        </div>
      </div>
    </div>
  )
}
