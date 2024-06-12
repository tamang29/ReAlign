import {Container, Row, Col, Image, Button} from 'react-bootstrap'
import {useNavigate} from "react-router-dom"
import SideBarItems from './SideBarItems';


const SideBar = () =>{
    //lets you navigate like <Link to/>. adds to history stack
    let navigate = useNavigate();

    const handleUpgradePress = () =>{
        navigate("/dashboard/settings", { state: { openSubscription: true } });
    }


    return (
        <Container className="sidebar-container p-0 d-flex flex-column" style={{ height: '100vh' }}>
            <Row className='p-5' role='button' onClick={()=> navigate("/dashboard")}>
                Company Name/Logo
            </Row>
            <Row className="flex-grow-1">
                <SideBarItems/>
            </Row>
            <Row className="mx-5 my-4 ">
                <Col className="mt-auto">
                    <Row className='mx-3 my-3'>
                        <Image src='' alt="User" roundedCircle />
                    </Row>
                    <Row>
                        <Button style={{ backgroundColor: "rgb(62,30,65)", border: 'none' }} onClick={handleUpgradePress}>Upgrade</Button>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default SideBar;
