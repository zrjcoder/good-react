import { TrashIcon } from '@heroicons/react/outline'

import { Button, ConfirmationDialog } from '@/components/Elements'
import { Authorization, ROLES } from '@/lib/authorization'

import { useDeleteDiscussion } from '../api/deleteDiscussion'

type DeleteDiscussionProps = {
  id: string
}

export const DeleteDiscussion = ({ id }: DeleteDiscussionProps) => {
  const deleteDiscussionMutation = useDeleteDiscussion()

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <ConfirmationDialog
        isDone={deleteDiscussionMutation.isSuccess}
        icon="danger"
        title="删除此帖"
        body="你是否确定想要删除此帖"
        triggerButton={
          <Button variant="danger" startIcon={<TrashIcon className="h-4 w-4" />}>
            删除此帖
          </Button>
        }
        confirmButton={
          <Button
            isLoading={deleteDiscussionMutation.isLoading}
            type="button"
            className="bg-red-600 sm:text-sm whitespace-nowrap"
            onClick={async () => await deleteDiscussionMutation?.mutateAsync({ discussionId: id })}
          >
            删除此帖
          </Button>
        }
      />
    </Authorization>
  )
}
