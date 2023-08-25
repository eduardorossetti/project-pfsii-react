import { Card, Row, Container, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faFile, faBell, faGear } from '@fortawesome/free-solid-svg-icons';
import Logo from "../../img/logo_1.png";
import { Link } from "react-router-dom";

const Home = () => {

  return (
    <Container className="mt-3">
      <div className="d-flex justify-content-center align-center">
        <img src={Logo} alt="" />
      </div>
      <h2>Bem vindos, usuários!</h2>
      <Row className="mt-3">
        <Col className="p-2 col-3">
          <Link to="/">
            <Card>
              <Card.Body className=" bg-light card">
                <h3 className="text-center">Cadastros</h3>
                <FontAwesomeIcon icon={faPenToSquare} size="2xl" />
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col className="p-2 col-3">
          <Link to="/">
            <Card >
              <Card.Body className=" bg-light card">
                <h3 className="text-center">Relatórios</h3>
                <FontAwesomeIcon icon={faFile} size="2xl" />
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col className="p-2 col-3">
          <Link to="/">
            <Card>
              <Card.Body className="bg-light card">
                <h3 className="text-center">Notificações</h3>
                <FontAwesomeIcon icon={faBell} size="2xl" />
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col className="p-2 col-3">
          <Link to="/">
            <Card>
              <Card.Body className="bg-light card">
                <h3 className="text-center">Configurações</h3>
                <FontAwesomeIcon icon={faGear} size="2xl" />
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </Container>
  )
};

export default Home;
