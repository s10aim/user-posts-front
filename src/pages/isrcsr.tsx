import type { NextPage, GetStaticProps } from 'next'
import { useState, useEffect, useCallback } from 'react'
import { MetaHead } from '../components/MetaHead'
import { errorHandring } from '../service/globalAxios'
import { Post } from '../components/Post'
import { fetchPostsService } from '../service/posts'
import type { PostType } from '../types/post'

type Props = {
  postList: PostType[]
}

const IsrCsr: NextPage<Props> = (props) => {
  const title = '投稿一覧(ISR + CSR)'
  const { postList } = props

  const [posts, setPosts] = useState<PostType[]>(postList)
  const fetchPosts = useCallback(async () => {
    try {
      const posts = await fetchPostsService()
      setPosts(posts)
    } catch (error) {
      errorHandring(error)
    }
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return (
    <div>
      <MetaHead title={title} />

      <main>
        <h1>{title}</h1>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const postList = await fetchPostsService()
    return {
      props: { postList },
      revalidate: 3,
    }
  } catch (e) {
    return { notFound: true }
  }
}

export default IsrCsr
