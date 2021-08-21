import { formatDate } from '../service/formatDate'
import type { PostType } from '../types/post'

type Props = {
  post: PostType
}

const Post: React.FC<Props> = (props) => {
  const { post } = props
  return (
    <div key={post.id} className="max-w-md rounded overflow-hidden shadow-lg my-4 px-6 py-4">
      <div className="font-bold text-xl">{post.username}</div>
      <p className="text-gray-700 text-lg py-4">{post.body}</p>
      <div className="justify-end">投稿日時: {formatDate(post.createdAt)}</div>
      <div className="justify-end">更新日時: {formatDate(post.updatedAt)}</div>
    </div>
  )
}

export { Post }
