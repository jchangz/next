import React, { useState, useContext, useEffect, useRef } from "react"
import { useSpring, useSprings, a } from 'react-spring'
import { useRouter } from 'next/router'
import { RouteContext } from "../context/routeContext"
import styles from '../styles/Home.module.css'

export default function HomeLayout({ children }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const currentRoute = useRef() // Keep status of current route to push back to when closing content
    const router = useRouter()
    const { stateRoute, dispatchRoute } = useContext(RouteContext);

    useEffect(() => {
        // On first load of routes, show images and store current path
        setSelectedImage(null)
        currentRoute.current = router.asPath
    }, [])

    const selectRoute = (e) => {
        const index = parseInt(e.target.dataset.index)
        const route = e.target.dataset.title
        router.push(`/posts/${route}`)
        setSelectedImage(index)
        dispatchRoute({ type: 'setRouteOpen' })
    }
    const reset = () => {
        router.push(currentRoute.current)
        setSelectedImage(null)
        dispatchRoute({ type: 'setRouteClose' })
    }

    const props = useSpring({
        opacity: stateRoute.isRouteOpen === true ? 1 : 0,
        transform: stateRoute.isRouteOpen === true ? "translateY(0%)" : "translateY(100%)",
        immediate: stateRoute.isRouteImmediate
    })
    const springs = useSprings(stateRoute.posts.length, stateRoute.posts.map((item, i) => ({
        config: { mass: 1, tension: 200, friction: 20 },
        transform: (selectedImage === null) ? "scale(1)" : ((i !== selectedImage) ? "scale(1)" : "scale(1.1)"),
        opacity: (selectedImage === null) ? 1 : ((i !== selectedImage) ? 0 : 1)
    })))

    return (
        <>
            <div className={styles.container}>
                {stateRoute.posts.length !== 0 ?
                    <div className="images">
                        {springs.map(({ opacity, transform }, i) => (
                            <a.div
                                style={{ transform, opacity }}
                                onClick={selectRoute}
                                data-title={stateRoute.posts[i].slug}
                                data-index={i}
                                key={i}>
                                <div className={styles.card}
                                    style={{ background: stateRoute.posts[i].hero }}>
                                </div>
                            </a.div>
                        ))}
                    </div>
                    : null}
                <button onClick={reset}>Reset</button>
                <a.div className={styles.content} style={props}>
                    {children}
                </a.div>
            </div>
        </>
    )
}