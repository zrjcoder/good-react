import { Table, Spinner, Link } from '@/components/Elements'
import { formatDate } from '@/utils/format'

import { useDiscussions } from '../api/getDiscussions'
import { Discussion } from '../types'

import { DeleteDiscussion } from './DeleteDiscussion'

export const DiscussionsList = () => {
  const discussionsQuery = useDiscussions()

  if (discussionsQuery.isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-48">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!discussionsQuery.data) return null

  return (
    <Table<Discussion>
      data={discussionsQuery.data}
      columns={[
        {
          title: '标题',
          field: 'title',
        },
        {
          title: '创建时间',
          field: 'createdAt',
          Cell({ entry: { createdAt } }) {
            return <span>{formatDate(createdAt)}</span>
          },
        },
        {
          title: '',
          field: 'id',
          Cell({ entry: { id } }) {
            return <Link to={`./${id}`}>预览</Link>
          },
        },
        {
          title: '',
          field: 'id',
          Cell({ entry: { id } }) {
            return <DeleteDiscussion id={id} />
          },
        },
      ]}
    />
  )
}
