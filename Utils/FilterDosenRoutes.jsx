import { Outlet, Navigate } from "react-router-dom";

const FilterDosenRoutes = () => {
    const isDosen = localStorage.getItem('loggedRole') === 'dosen'


    return (
        <>
            {isDosen ? <Outlet /> : <Navigate to={"/dashboarddosen"} />}
        </>
    )
};

export default FilterDosenRoutes;