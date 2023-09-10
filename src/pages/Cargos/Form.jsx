import { Container, Col, Form, Row, Button } from "react-bootstrap";
import { useEffect, useRef } from "react";
import Cabecalho2 from "../../components/Cabecalho2";
import { urlBase } from "../../utils/definicoes";
import axios from "axios";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";
import FormTextField from "../../components/Form/form-field";
import FormTextAreaField from "../../components/Form/form-textarea";

const schema = Yup.object().shape({
  nome: Yup.string().required("Nome é obrigatório"),
  descricao: Yup.string().required("Descrição é obrigatório"),
});

const initialValues = {
  codigo: "",
  nome: "",
  descricao: "",
};

const options = {
  headers: { "content-type": "application/json" },
};

export default function FormCargo({
  onEdit,
  setExibeTabela,
  setOnEdit,
  cargos,
  setCargos,
}) {
  const formRef = useRef();
  const formikRef = useRef();

  useEffect(() => {
    if (onEdit) {
      for (const key in onEdit) {
        // Set this condition only if the form has possibly nullable fields
        if (onEdit[key] !== null) {
          formikRef.current.setFieldValue(key, onEdit[key]);
        }
      }
    }
  }, [onEdit]);

  const handleBackButton = () => {
    if (onEdit) setOnEdit(null);
    setExibeTabela(true);
  };

  const handleSubmit = async (values, actions) => {
    const updatedCargos = cargos;

    if (onEdit) {
      axios
        .put(`${urlBase}/cargos/`, JSON.stringify(values), options)
        .then((response) => {
          const index = updatedCargos.findIndex(
            (i) => i.codigo === onEdit.codigo
          );
          updatedCargos[index] = values;
          setCargos(updatedCargos);
          toast.success(response.data.message);
        })
        .catch(({ response }) => {
          toast.error(response.data.message);
        });
    } else {
      axios
        .post(`${urlBase}/cargos/`, JSON.stringify(values), options)
        .then((response) => {
          formikRef.current.setFieldValue("codigo", response.data.id);
          values.codigo = response.data.id;
          updatedCargos.push(values);
          setCargos(updatedCargos);
          toast.success(response.data.message);
        })
        .catch(({ response }) => {
          toast.error(response.data.message);
        });
    }
  };

  return (
    <div>
      <Cabecalho2 texto1={"Cadastro"} texto2={"Cargo"} />
      <Container
        className="my-4 p-3 overflow-auto"
        style={{ maxHeight: "75vh" }}
      >
        <Formik
          innerRef={formikRef}
          validationSchema={schema}
          onSubmit={handleSubmit}
          initialValues={initialValues}
          enableReinitialize={true}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
            isValid,
            isSubmitting,
            dirty,
          }) => (
            <Form noValidate onSubmit={handleSubmit} ref={formRef}>
              <Row>
                <Col sm={2} md={2} lg={2} className="mb-3">
                  <FormTextField
                    controlId="formCargo.codigo"
                    label="Código"
                    name="codigo"
                    value={values.codigo}
                    isDisabled={true}
                  />
                </Col>
              </Row>

              <Row>
                <Col className="mb-3">
                  <FormTextField
                    controlId="formCargo.nome"
                    label="Nome"
                    name="nome"
                    placeholder="Informe o nome do cargo"
                    value={values.nome}
                    required
                  />
                </Col>
              </Row>

              <Row>
                <Col className="mb-3">
                  <FormTextAreaField
                    controlId="formCargo.descricao"
                    label="Descrição"
                    name="descricao"
                    value={values.descricao}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col className="d-flex">
                  <Button
                    disabled={isSubmitting}
                    as="input"
                    size="md"
                    type="submit"
                    value="Salvar"
                    className="me-2"
                  />
                  <Button
                    variant="outline-secondary"
                    as="input"
                    size="md"
                    type="button"
                    value="Voltar"
                    onClick={handleBackButton}
                  />
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
}
