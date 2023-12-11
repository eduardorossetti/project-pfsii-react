import { Container, Col, Row, Button } from "react-bootstrap";
import { useEffect } from "react";
import HeaderBelow from "../../components/HeaderBelow";
import { urlBase } from "../../utils/definitions";
import axios from "axios";
import { toast } from "react-toastify";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import FormTextField from "../../components/Form/form-field";
import FormSelectField from "../../components/Form/form-select-field";
import MaskedFormTextField from "../../components/Form/masked-form-field";
import { emailRegex } from "../../utils/expressions";
import NewMultiSelect from "../../components/NewMultiSelect/Index";

const schema = Yup.object().shape({
  nome: Yup.string().required("Nome é obrigatório"),
  cpf: Yup.string().required("CPF é obrigatório"),
  dataNascimento: Yup.string().required("Data de nascimento é obrigatório"),
  status: Yup.string().required("Status é obrigatório"),
  nomeUsuario: Yup.string().required("Usuário é obrigatório"),
  senhaUsuario: Yup.string().required("Senha é obrigatório"),
  atribuicoes: Yup.array().min(1, "Selecione, no mínimo, um cargo"),
  info_telefone1: Yup.string().required(1, "Telefone é obrigatório"),
  info_telefone2: Yup.string(),
  info_email: Yup.string()
    .required("E-mail é obrigatório")
    .matches(emailRegex, "Endereço de email inválido"),
  info_endereco: Yup.string().required("Endereço é obrigatório"),
  info_bairro: Yup.string().required("Bairro é obrigatório"),
  info_cidade: Yup.string().required("Cidade é obrigatório"),
  info_cep: Yup.string().required("CEP é obrigatório"),
  info_uf: Yup.string().required("UF é obrigatório"),
});

const initialValues = {
  codigo: "",
  nome: "",
  cpf: "",
  dataNascimento: "",
  status: "",
  nomeUsuario: "",
  senhaUsuario: "",
  info_codigo: "",
  info_telefone: [],
  info_telefone1: "",
  info_telefone2: "",
  info_email: "",
  info_endereco: "",
  info_bairro: "",
  info_cidade: "",
  info_cep: "",
  info_uf: "",
  atribuicoes: [],
};

const options = {
  headers: { "content-type": "application/json" },
};

export default function FormFuncionario({
  cargos,
  onEdit,
  setExibeTabela,
  setOnEdit,
  funcionarios,
  setFuncionarios,
}) {
  const handleSubmit = async (values, actions) => {
    const updatedFuncionarios = funcionarios;

    formik.values.info_telefone = [
      formik.values.info_telefone1,
      formik.values.info_telefone2 === null ? "" : formik.values.info_telefone2,
    ];

    if (onEdit) {

      axios
        .put(`${urlBase}/funcionarios/`, JSON.stringify(values), options)
        .then((response) => {
          // Get index of item on edition
          const index = updatedFuncionarios.findIndex(
            (i) => i.codigo === onEdit.codigo
          );
          // Replace old values
          updatedFuncionarios[index] = values;
          // Set new list
          setFuncionarios(updatedFuncionarios);
          
          let telefones = { numeros: [formik.values.info_telefone1, formik.values.info_telefone2], pessoaId: formik.values.info_codigo };

          return axios.put(`${urlBase}/telefones/`, JSON.stringify(telefones), options)
            .then((response) => {
              toast.success(response.data.message);
            })
            .catch(({ response }) => {
              toast.error(response.data.message);
            });

        })
        .catch(({ response }) => {
          toast.error(response.data.message);
        });
    } else {
      
      axios
        .post(`${urlBase}/funcionarios/`, JSON.stringify(values), options)
        .then((response) => {
          console.log(response);
          formik.setFieldValue("codigo", response.data.funcionarioId);
          formik.setFieldValue("info_codigo", response.data.pessoaId);
          values.codigo = response.data.funcionarioId;
          updatedFuncionarios.push(values);
          setFuncionarios(updatedFuncionarios);
          // toast.success(response.data.message);
          // After pushing new item to list, it goes to the end of it
          // It must be treated on list

          let telefones = { numeros: [formik.values.info_telefone1, formik.values.info_telefone2], pessoaId: response.data.pessoaId };

          return axios.post(`${urlBase}/telefones/`, JSON.stringify(telefones), options)
            .then((response) => {
              toast.success(response.data.message);
            })
            .catch(({ response }) => {
              toast.error(response.data.message);
            });

        })
        .catch(({ response }) => {
          toast.error(response.data.message);
        });
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (onEdit) {
      for (const key in onEdit) {
        if (key === "info") {
          for (const key2 in onEdit["info"]) {
            if (key2 === "telefone") {
              formik.setFieldValue(`info_${key2}1`, onEdit[key][key2][0]);
              formik.setFieldValue(`info_${key2}2`, onEdit[key][key2][1]);
            } else {
              formik.setFieldValue(`info_${key2}`, onEdit[key][key2]);
            }
          }
        } else {
          formik.setFieldValue(key, onEdit[key]);
        }
      }
    }
    // eslint-disable-next-line
  }, [onEdit]);

  const handleBackButton = () => {
    if (onEdit) setOnEdit(null);
    setExibeTabela(true);
  };

  return (
    <div>
      <HeaderBelow texto1={"Cadastro"} texto2={"Funcionario"} />
      <Container
        className="my-4 p-3 overflow-auto"
        style={{ maxHeight: "75vh" }}
      >
        <FormikProvider value={formik}>
          <Row>
            <Col sm={2} md={2} lg={2} className="mb-3">
              <FormTextField
                controlId="formFuncionario.codigo"
                label="Código"
                name="codigo"
                isDisabled={true}
              />
            </Col>
            <Col sm={2} md={2} lg={2} className="mb-3">
              <FormTextField
                controlId="formFuncionario.info_codigo"
                name="info_codigo"
                // label="Pessoa Código"
                isDisabled={true}
                type="hidden"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <FormTextField
                controlId="formFuncionario.nome"
                label="Nome"
                name="nome"
                placeholder="Informe o nome do funcionário"
                required
              />
            </Col>

            <Col md={6} className="mb-3">
              <MaskedFormTextField
                controlId="formFuncionario.cpf"
                label="CPF"
                name="cpf"
                placeholder="Informe o CPF do funcionário"
                format="###.###.###-##"
                mask="_"
                required
              />
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <FormTextField
                controlId="formFuncionario.dataNascimento"
                label="Data de Nascimento"
                name="dataNascimento"
                type="date"
                required
              />
            </Col>
            <Col md={6} className="mb-3">
              <FormSelectField
                controlId="formFuncionario.status"
                label="Status"
                name="status"
                className="mb-3"
                required
              >
                <option value="">Selecione o status do funcionário</option>
                <option value="1">Ativo</option>
                <option value="0">Inativo</option>
              </FormSelectField>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <NewMultiSelect
                controlId="formFuncionario.atribuicoes"
                name="atribuicoes"
                formRef={formik}
                lista={cargos}
                label="Cargos"
                required
              />
            </Col>

            <Col md={6} className="mb-3">
              <FormTextField
                controlId="formFuncionario.endereco"
                label="Endereço"
                name="info_endereco"
                placeholder="Informe o endereço do funcionário"
                required
              />
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <FormTextField
                controlId="formFuncionario.bairro"
                label="Bairro"
                name="info_bairro"
                placeholder="Informe o bairro do funcionário"
                required
              />
            </Col>

            <Col md={6} className="mb-3">
              <FormTextField
                controlId="formFuncionario.cidade"
                label="Cidade"
                name="info_cidade"
                placeholder="Informe o cidade do funcionário"
                required
              />
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <FormSelectField
                controlId="formFuncionario.uf"
                label="UF"
                name="info_uf"
                className="mb-3"
                required
              >
                <option value="">Selecione</option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
                <option value="EX">Estrangeiro</option>
              </FormSelectField>
            </Col>

            <Col md={6} className="mb-3">
              <MaskedFormTextField
                controlId="formFuncionario.cep"
                label="CEP"
                name="info_cep"
                placeholder="Informe a CEP do funcionário"
                format="#####-###"
                mask="_"
                required
              />
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <MaskedFormTextField
                controlId="formFuncionario.info_telefone1"
                label="Telefone 1"
                name="info_telefone1"
                placeholder="Informe o telefone do funcionário"
                format="(##) #####-####"
                mask="_"
                required
              />
            </Col>
            <Col md={6} className="mb-3">
              <MaskedFormTextField
                controlId="formFuncionario.info_telefone2"
                label="Telefone 2"
                name="info_telefone2"
                placeholder="Informe o telefone do funcionário"
                format="(##) #####-####"
                mask="_"
                required
              />
            </Col>
            <Col md={6} className="mb-3">
              <FormTextField
                controlId="formFuncionario.email"
                label="E-mail"
                name="info_email"
                placeholder="Informe o e-mail do funcionário"
                required
              />
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <FormTextField
                controlId="formFuncionario.nomeUsuario"
                label="Usuário"
                name="nomeUsuario"
                placeholder="Informe um nome de usuário ao funcionário"
                required
              />
            </Col>

            <Col md={6} className="mb-3">
              <FormTextField
                controlId="formFuncionario.senhaUsuario"
                label="Senha"
                name="senhaUsuario"
                type="password"
                placeholder="Informe uma senha de usuário ao funcionário"
                required
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col></Col>
          </Row>
          <Row>
            <Col className="d-flex">
              <Button
                size="md"
                type="submit"
                value="Salvar"
                className="me-2"
                onClick={formik.handleSubmit}
              >
                Salvar
              </Button>
              <Button
                variant="outline-secondary"
                size="md"
                type="button"
                value="Voltar"
                onClick={handleBackButton}
              >
                Voltar
              </Button>
            </Col>
          </Row>
        </FormikProvider>
      </Container>
    </div>
  );
}
