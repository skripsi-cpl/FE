import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
    const isAuth = localStorage.getItem('loggedRole')


    return (
        <>
            {isAuth ? <Outlet /> : <Navigate to="/" />}
        </>
    )
};

export default PrivateRoutes;