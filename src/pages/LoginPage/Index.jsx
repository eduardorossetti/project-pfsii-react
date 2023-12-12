import { Link } from "react-router-dom";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import Logo from "./img/img_aprata.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";

const LoginPage = () => {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    login(email, password); // integração com o contexto / api
  };

  return (
    <div>
      <Container fluid>
        <Row
          style={{ height: "100vh" }}
          className="d-flex justify-content-center"
        >
          <Col className="d-flex flex-column p-0" md={4}>
            <div
              className="m-2"
              style={{
                height: "250px",
                backgroundImage: `url(${Logo})`,
                backgroundSize: "60% auto",
                backgroundRepeat: "no-repeat",
                backgroundPositionX: "center",
                backgroundPositionY: "center",
              }}
            ></div>

            <div className="text-center mb-1">
              <span>Acesse a sua conta</span>
            </div>

            <div
              className="p-4 m-0 text-center rounded-2"
              style={{ backgroundColor: "#D9D9D9" }}
            >
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Control
                    className="mb-3"
                    type="text"
                    placeholder="Usuário"
                    value={email}
                    onChange={(e) => [setEmail(e.target.value)]}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    className="mb-3"
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => [setPassword(e.target.value)]}
                  />
                </Form.Group>
                <Button
                  className="mb-3"
                  style={{ width: "100%" }}
                  type="submit"
                >
                  Entrar
                </Button>
              </Form>
              <Link to={""}>Esqueceu a senha?</Link>
            </div>
            <div
              className="position-absolute bottom-0 start-50 translate-middle fw-light"
              style={{ fontSize: "12px" }}
            >
              Desenvolvido por APACHESYS
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer
        autoClose={5000}
        position={toast.POSITION.BOTTOM_LEFT}
        theme="colored"
      />
    </div>
  );
};

export default LoginPage;
