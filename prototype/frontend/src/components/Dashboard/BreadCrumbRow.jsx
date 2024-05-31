import { useEffect } from "react";
import { useState } from "react";
import { Row, Breadcrumb } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const BreadCrumbRow = () =>{

    const location = useLocation();
    const [breadcrumbs, setBreadCrumbs]= useState([]);

    useEffect(()=>{
        updateBreadCrumbs(location.pathname);
    }, [location.pathname])

    const updateBreadCrumbs = (pathname) =>{
        const segments = pathname.split('/').filter(segment=> segment !== '');

        const breadcrumbItems = segments.map((segment, index) => ({
            label: segment,
            path: `/${segments.slice(0, index + 1).join('/')}` // Construct path for each breadcrumb
        }));

        setBreadCrumbs(breadcrumbItems);

    }

    return(
            <Row>
                <Breadcrumb>
                    {breadcrumbs.map((breadcrumb, index) => (
                        //create dynamic breadcrum
                        //If current index is the last one set active as true (unclickable).
                        //
                        <Breadcrumb.Item key={index} active={index === breadcrumbs.length - 1} href={breadcrumb.path}>
                            <span>{breadcrumb.label}</span>
                        </Breadcrumb.Item>
                    ))}
                </Breadcrumb>
            </Row>
    )
}

export default BreadCrumbRow;