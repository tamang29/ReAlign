import { Container} from "react-bootstrap";
import Header from "../components/Dashboard/Header";
import BreadCrumbRow from "../components/Dashboard/BreadCrumbRow";


const Settings = () =>{
    return(
        <Container fluid className="settings-container">
            <BreadCrumbRow/>
           <Header title="Settings Page"/>
        </Container>
    )
}

export default Settings;