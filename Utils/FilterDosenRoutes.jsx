import { Outlet, Navigate } from "react-router-dom";

const FilterDosenRoutes = () => {
    const isDosen = localStorage.getItem('loggedRole') === 'dosen'


    return (
        <>
            {isDosen ? <Outlet /> : <Navigate to={"/dasdas"} />}
        </>
    )
};

export default FilterDosenRoutes;