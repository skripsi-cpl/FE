import { Outlet, Navigate } from "react-router-dom";

const FilterMahasiswaRoutes = () => {
    const isMahasiswa = localStorage.getItem('loggedRole') === 'mahasiswa'


    return (
        <>
            {isMahasiswa ? <Outlet /> : <Navigate to={"/"} />}
        </>
    )
};

export default FilterMahasiswaRoutes;