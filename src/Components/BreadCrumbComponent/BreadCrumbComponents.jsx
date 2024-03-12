import React from "react";
import { Link, useLocation } from 'react-router-dom';
import './BreadCrumbs.css';

const BreadCrumbComponents = () => {
    const location = useLocation();

    let currentPath = '';

    const crumbs = location.pathname.split('/').filter((crumb) => crumb !== '').map((crumb) => {
        const crumbText = crumb.replace(/-/g, ' '); // Replace hyphens with spaces
        currentPath += `/${crumb}`;
        return (
            <div className="crumb" key={crumb}>
                <Link to={currentPath}>{crumbText}</Link>
            </div>
        );
    });

    return (
        <div className="breadcrumbs">
            {crumbs}
        </div>
    );
}

export default BreadCrumbComponents;
