import { useEffect, useContext } from 'react'
import { fetchQuery } from '../../utils'
import { RouteContext } from '../../context/routeContext'

export default function Posts({ posts }) {
  const { dispatchRoute } = useContext(RouteContext)

  useEffect(() => {
    dispatchRoute({
      type: 'setRoutePosts',
      posts,
    })
  }, [dispatchRoute, posts])

  return (
    <></>
  )
}

export async function getStaticProps() {
  const posts = await fetchQuery('posts')
  return {
    props: { posts },
    revalidate: 1,
  }
}
