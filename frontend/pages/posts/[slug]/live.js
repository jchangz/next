import dynamic from 'next/dynamic'

export default function LivePost() {
  const Live = dynamic(() => import('../../../live/index'))

  return (
    <>
      <Live />
    </>
  )
}
