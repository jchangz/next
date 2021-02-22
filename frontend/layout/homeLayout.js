import { useState, useEffect } from 'react'
import HeaderLayout from './headerLayout'
import CloseButton from './components/js/closeButton'
import RouteContent from './components/js/routeContent'
import ImageView from './components/js/imageView'
import PlaceholderLoad from './components/js/placeholderLoad'
import styles from '../styles/Home.module.css'

export default function HomeLayout({ children }) {
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        setSelectedImage(null)
    }, [])

    return (
        <>
            <HeaderLayout />
            <div className={styles.container} >
                <ImageView
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage} />
                <CloseButton
                    setSelectedImage={setSelectedImage} />
                <RouteContent
                    children={children} />
                <PlaceholderLoad />
            </div>
        </>
    )
}