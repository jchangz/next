import { fetchQuery } from '../../../utils'

export default function PostContent() {
  return (
    <>
    </>
  )
}

export async function getStaticPaths() {
  const posts = await fetchQuery('posts')
  return {
    paths: posts.map((article) => ({
      params: { slug: article.slug },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const posts = await fetchQuery('posts', params.slug)
  return {
    props: { post: posts },
    revalidate: 1,
  }
}
