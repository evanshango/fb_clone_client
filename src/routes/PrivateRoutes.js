import Signin from "../pages/account/signin"

const PrivateRoutes = ({Component, user}) => {
    return user ? <Component/> : <Signin/>
}

export default PrivateRoutes
