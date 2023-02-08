import { PlusIcon } from '@heroicons/react/outline'
import * as z from 'zod'

import { Button } from '@/components/Elements'
import { Form, FormDrawer, InputField, TextAreaField } from '@/components/Form'
import { Authorization, ROLES } from '@/lib/authorization'

import { CreateDiscussionDTO, useCreateDiscussion } from '../api/createDiscussion'

const schema = z.object({
  title: z.string().min(1, '标题不能为空'),
  body: z.string().min(1, '内容不能为空'),
})

export const CreateDiscussion = () => {
  const createDiscussionMutation = useCreateDiscussion()

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        title="创建帖子"
        isDone={createDiscussionMutation.isSuccess}
        triggerButton={
          <Button size="sm" startIcon={<PlusIcon className="h-4 w-4" />}>
            新建帖子
          </Button>
        }
        submitButton={
          <Button
            form="create-discussion"
            type="submit"
            size="sm"
            isLoading={createDiscussionMutation.isLoading}
          >
            提交
          </Button>
        }
      >
        <Form<CreateDiscussionDTO['data'], typeof schema>
          id="create-discussion"
          onSubmit={async (values) => {
            await createDiscussionMutation.mutateAsync({ data: values })
          }}
          schema={schema}
        >
          {({ register, formState }) => {
            return (
              <>
                <InputField
                  label="标题"
                  error={formState.errors['title']}
                  registration={register('title')}
                />

                <TextAreaField
                  label="内容"
                  error={formState.errors['body']}
                  registration={register('body')}
                />
              </>
            )
          }}
        </Form>
      </FormDrawer>
    </Authorization>
  )
}
