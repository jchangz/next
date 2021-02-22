import { fetchQuery } from '../../../utils'
import dynamic from 'next/dynamic'

export default function PostContent({ post }) {
  const PostLayout = dynamic(() => import('../../../layout/postLayout'))

  return (
    <>
      <PostLayout post={post} />
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