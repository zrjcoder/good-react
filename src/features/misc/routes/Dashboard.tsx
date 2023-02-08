import { ContentLayout } from '@/components/Layout'
import { useAuth } from '@/lib/auth'
import { ROLES } from '@/lib/authorization'

export const Dashboard = () => {
  const { user } = useAuth()
  return (
    <ContentLayout title="首页">
      <h1 className="text-xl mt-2">
        欢迎 <b>{user?.name}</b>
      </h1>

      <h4 className="my-3">
        你的角色是 : <b>{user?.role}</b>
      </h4>

      <p className="font-medium">在该网站下你可以：</p>

      {user?.role === ROLES.ADMIN && (
        <ul className="my-4 list-inside list-disc">
          <li>在帖子下进行评论</li>
          <li>删除自己的评论</li>
        </ul>
      )}

      {user?.role === ROLES.USER && (
        <ul className="my-4 list-inside list-disc">
          <li>创建一个帖子</li>
          <li>编辑帖子</li>
          <li>删除帖子</li>
          <li>在帖子下进行评论</li>
          <li>删除所有帖子</li>
        </ul>
      )}
    </ContentLayout>
  )
}
