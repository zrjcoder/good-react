import { ContentLayout } from '@/components/Layout'

import { CreateDiscussion, DiscussionsList } from '../components'

export const Discussions = () => {
  return (
    <ContentLayout title="帖子">
      <div className="flex justify-end">
        <CreateDiscussion />
      </div>
      <div className="mt-4">
        <DiscussionsList />
      </div>
    </ContentLayout>
  )
}
