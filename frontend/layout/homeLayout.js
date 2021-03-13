import HeaderLayout from './headerLayout'
import CloseButton from './components/js/closeButton'
import RouteContent from './components/js/routeContent'
import ImageView from './components/js/imageView'
import PlaceholderLoad from './components/js/placeholderLoad'
import useRouterEvents from './components/js/useRouterEvents'
import styles from '../styles/Home.module.css'

export default function HomeLayout({ children }) {
  const { routeLoaded, selectedImage, setSelectedImage } = useRouterEvents()

  return (
    <>
      <HeaderLayout />
      <div className={styles.container}>
        <ImageView
          routeLoaded={routeLoaded}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
        <CloseButton />
        <RouteContent>{children}</RouteContent>
        <PlaceholderLoad routeLoaded={routeLoaded} />
      </div>
    </>
  )
}
