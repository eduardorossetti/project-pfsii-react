import { Card, Row, Container, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePen,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "./img/img_aprata.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container className="mt-3">
      <div className="d-flex justify-content-center align-center">
        <img src={Logo} alt="logo" className="img-fluid" />
      </div>

      <Row className="mt-3 justify-content-center align-center">
        <Col className="p-2 col-md-2 col-sm-6">
          <Link to="/project-pfsii-react/cadastro/cargos">
            <Card className="bg-light">
              <Card.Body className="text-center">
                <h5>Cargos</h5>
                <FontAwesomeIcon icon={faFilePen} size="2x" />
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col className="p-2 col-md-2 col-sm-6">
          <Link to="/project-pfsii-react/cadastro/funcionarios">
            <Card className="bg-light">
              <Card.Body className="text-center">
                <h5>Funcionarios</h5>
                <FontAwesomeIcon icon={faUserPlus} size="2x" />
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
