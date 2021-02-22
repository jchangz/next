import { createContext, useReducer } from "react"

export const RouteContext = createContext({});

const routeReducer = (state, action) => {
    switch (action.type) {
        case 'setRoutePosts':
            return { ...state, posts: action.posts }
        case 'setRouteOpen':
            return { ...state, isRouteOpen: true, isRouteImmediate: false }
        case 'setRouteDirectOpen':
            return { ...state, isRouteOpen: true, isRouteImmediate: true }
        case 'setRouteClose':
            return { ...state, isRouteOpen: false }
        case 'setLiveOpen':
            return { ...state, isLiveOpen: true }
        case 'setLiveClose':
            return { ...state, isLiveOpen: false }
        default:
            throw new Error();
    }
};

export const RouteProvider = (props) => {
    const initialState = {
        posts: [],
        isRouteOpen: false,
        isRouteImmediate: false,
        isLiveOpen: false
    }
    const [stateRoute, dispatchRoute] = useReducer(routeReducer, initialState);

    const routeContextProps = {
        stateRoute,
        dispatchRoute
    };

    return (
        <RouteContext.Provider value={routeContextProps}>
            {props.children}
        </RouteContext.Provider>
    );
};