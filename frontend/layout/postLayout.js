import { useTransition, a } from 'react-spring'
import Link from 'next/link'
import styles from './components/Component.module.css'

export default function PostLayout({ post }) {
  const transitions = useTransition(post, null, {
    from: { transform: 'translate3d(0,0%,0) scale(0.9)', opacity: 0 },
    enter: { transform: 'translate3d(0,0%,0) scale(1)', opacity: 1 },
    leave: { transform: 'translate3d(0,0%,0) scale(0.9)', opacity: 0 },
  })

  return (
    <>
      <div
        className={styles.card}
        style={{ background: post.hero }}
      />
      {transitions.map(({ item, key, props }) => item && (
        <a.div className={styles.landing} style={props} key={key}>
          <h1>{post.title}</h1>
          <Link href={`/posts/${post.slug}/live`}>
            <a>LIVE</a>
          </Link>
        </a.div>
      ))}
    </>
  )
}
