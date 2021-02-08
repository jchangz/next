import React, { useState, useEffect } from "react"
import CloseButton from './components/js/closeButton'
import RouteContent from './components/js/routeContent'
import ImageView from './components/js/imageView'
import styles from '../styles/Home.module.css'

export default function HomeLayout({ children }) {
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        setSelectedImage(null)
    }, [])

    return (
        <>
            <div className={styles.container} >
                <ImageView
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage} />
                <CloseButton
                    setSelectedImage={setSelectedImage} />
                <RouteContent
                    children={children} />
            </div>
        </>
    )
}