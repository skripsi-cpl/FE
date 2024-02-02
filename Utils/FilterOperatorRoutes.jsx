import { Outlet, Navigate } from "react-router-dom";

const FilterOperatorRoutes = () => {
    const isOperator = localStorage.getItem('loggedRole') === 'operator'


    return (
        <>
            {isOperator ? <Outlet /> : <Navigate to={"/"} />}
        </>
    )
};

export default FilterOperatorRoutes;