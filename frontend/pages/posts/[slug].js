import { useContext, useEffect } from 'react'
import { fetchQuery } from '../../utils'
import { RouteContext } from "../../context/routeContext"

export default function PostContent({ post }) {
  const { stateRoute, dispatchRoute } = useContext(RouteContext);

  useEffect(() => {
    if (stateRoute.isRouteOpen !== true) {
      dispatchRoute({ type: 'setRouteDirectOpen' })
    }
  }, [])

  return (
    <>
      <h1>{post.title}</h1>
    </>
  )
}

export async function getStaticPaths() {
  const posts = await fetchQuery('posts');
  return {
    paths: posts.map((article) => ({
      params: {
        slug: article.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const posts = await fetchQuery('posts', params.slug);
  return {
    props: { post: posts },
    revalidate: 1,
  };
}