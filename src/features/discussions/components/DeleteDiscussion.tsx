import { TrashIcon } from '@heroicons/react/outline'

import { Button } from '@/components/Elements'
import { Authorization, ROLES } from '@/lib/authorization'

type DeleteDiscussionProps = {
  id: string
}

export const DeleteDiscussion = ({ id }: DeleteDiscussionProps) => {
  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <Button variant="danger" startIcon={<TrashIcon className="h-4 w-4" />}>
        删除此帖
      </Button>
      {/* <Button isLoading={false} type="button" className="bg-red-600" onClick={() => {}}>
        删除此帖
      </Button> */}
    </Authorization>
  )
}
