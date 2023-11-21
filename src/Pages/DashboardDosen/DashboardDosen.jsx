import React from 'react'
import { FooterComponent, NavbarComponent, NavbarDosenComponent } from '../../Components'
import './dashboarddosen.css'
import { NavLink } from 'react-router-dom'


const DashboardDosen = () => {
    return (
        <>
            <NavbarDosenComponent />
            <div className="container">
                <h1>Helo, Guys!</h1>

                <div className="content-dosen-wrapper">
                    <div className="content-dosen-1">
                        <h1>Sebagai Dosen Pengampu</h1>
                        <NavLink to="/dashboarddosen/uploaddatamhs">
                            <button>Upload {'>'}</button>
                        </NavLink>
                    </div>
                    <div className="content-dosen-2">
                        <h1>Sebagai Dosen Wali</h1>
                        <NavLink to="/dashboarddosen/dosendatamhs">
                            <button>Masuk  {'>'}</button>
                        </NavLink>
                    </div>
                </div>
            </div>
            <FooterComponent />
        </>
    )
}

export default DashboardDosen