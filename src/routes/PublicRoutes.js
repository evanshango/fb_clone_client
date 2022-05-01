import Signin from "../pages/account/signin"

export const PublicRoutes = ({Component, user, ...props}) => {
    return user ? <Component {...props}/> : <Signin/>
}
