import { Outlet, Navigate } from "react-router-dom";

const FilterDepartemenRoutes = () => {
    const isDepartemen = localStorage.getItem('loggedRole') === 'departemen'


    return (
        <>
            {isDepartemen ? <Outlet /> : <Navigate to={"/dashboarddepartment"} />}
        </>
    )
};

export default FilterDepartemenRoutes;