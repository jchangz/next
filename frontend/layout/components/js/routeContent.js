import React, { useContext } from "react"
import { useSpring, a } from 'react-spring'
import { RouteContext } from "../../../context/routeContext"
import styles from '../Component.module.css'

export default function RouteContent({ ...props }) {
    const { stateRoute } = useContext(RouteContext);

    const spring = useSpring({
        opacity: stateRoute.isRouteOpen === true ? 1 : 0,
        transform: stateRoute.isRouteOpen === true ? "translateY(0%)" : "translateY(100%)",
        immediate: stateRoute.isRouteImmediate
    })

    return (
        <>
            <a.div className={styles.content} style={spring}>
                {props.children}
            </a.div>
        </>
    )
}