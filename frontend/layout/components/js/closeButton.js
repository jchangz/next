import React, { useContext } from "react"
import { useRouter } from 'next/router'
import { RouteContext } from "../../../context/routeContext"
import styles from '../Component.module.css'

export default function CloseButton({ ...props }) {
    const router = useRouter()
    const { dispatchRoute } = useContext(RouteContext);

    const close = () => {
        router.push("/")
        dispatchRoute({ type: 'setRouteClose' })
        props.setSelectedImage(null)
    }

    return (
        <>
            <button className={styles.close}
                onClick={close}>
                Reset
            </button>
        </>
    )
}