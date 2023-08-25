import { Container, Col, Form, Row } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import MenuFormulario from "../../components/MenuFormulario";
import Cabecalho2 from "../../components/Cabecalho2";
import { urlBase } from "../../utils/definicoes";
import axios from "axios";
import { toast } from "react-toastify";

export default function FormCargo({
  onEdit,
  setExibeTabela,
  setOnEdit,
  getCargos,
}) {
  const [validated, setValidated] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const cargo = ref.current;
      cargo.codigo.value = onEdit.codigo;
      cargo.nome.value = onEdit.nome;
      cargo.descricao.value = onEdit.descricao;
    }
  }, [onEdit]);

  const handleBackButton = () => {
    if (onEdit) setOnEdit(null);
    setExibeTabela(true);
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    const cargo = ref.current;

    if (form.checkValidity()) {
      if (onEdit) {
        await axios
          .put(urlBase + "/cargos", {
            codigo: cargo.codigo.value,
            nome: cargo.nome.value,
            descricao: cargo.descricao.value,
          })
          .then(({ data }) => toast.info(data.mensagem))
          .catch(({ data }) => toast.error(data.mensagem));
      } else {
        await axios
          .post(urlBase + "/cargos", {
            codigo: cargo.codigo.value,
            nome: cargo.nome.value,
            descricao: cargo.descricao.value,
          })
          .then(({ data }) => toast.info(data.mensagem))
          .catch(({ data }) => toast.error(data.mensagem));
      }

      cargo.codigo.value = "";
      cargo.nome.value = "";
      cargo.descricao.value = "";

      getCargos();
    } else {
      setValidated(true);
    }
  };

  return (
    <div>
      <Cabecalho2 texto1={"Cadastro"} texto2={"Cargo"} />
      <Container className="mt-3">
        <Form
          method="POST"
          action="#"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          ref={ref}
        >
          <MenuFormulario acaoBtnVoltar={() => handleBackButton()} />
          <Row>
            <Col md={6}  className="mb-3">
              <Form.Group>
                <Form.Label>Código</Form.Label>
                <Form.Control
                  type="text"
                  name="codigo"
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col  className="mb-3">
              <Form.Group>
                <Form.Label>Cargo</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  // placeholder="Digite o nome do cargo"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Nome do cargo é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col  className="mb-3">
              <Form.Group>
                <Form.Label>Descrição</Form.Label>
                <Form.Control style={{ resize: "none" }}
                  as="textarea"
                  name="descricao"
                  // placeholder="Digite uma descrição sobre o cargo"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Descrição é obrigatória!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
