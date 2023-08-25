import { Container, Col, Form, Row } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import MenuFormulario from "../../components/MenuFormulario";
import Cabecalho2 from "../../components/Cabecalho2";
import { urlBase } from "../../utils/definicoes";
import axios from "axios";
import { toast } from "react-toastify";
import { cep, cpf, telefone } from "../../utils/masks";

export default function FormFuncionario({
  cargos,
  onEdit,
  setExibeTabela,
  setOnEdit,
  getFuncionarios,
}) {
  const [validated, setValidated] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const funcionario = ref.current;
      funcionario.codigo.value = onEdit.codigo;
      funcionario.cpf.value = onEdit.cpf;
      funcionario.dt_nasc.value = onEdit.dt_nasc;
      funcionario.dt_admissao.value = onEdit.dt_admissao;
      funcionario.dt_demissao.value = onEdit.dt_demissao;
      funcionario.status.value = onEdit.status;
      funcionario.nome_usuario.value = onEdit.nome_usuario;
      funcionario.senha_usuario.value = onEdit.senha_usuario;
      funcionario.cargo.value = onEdit.Cargo_codigo;
      funcionario.nome.value = onEdit.nome;
      funcionario.telefone.value = onEdit.telefone;
      funcionario.email.value = onEdit.email;
      funcionario.endereco.value = onEdit.endereco;
      funcionario.bairro.value = onEdit.bairro;
      funcionario.cidade.value = onEdit.cidade;
      funcionario.cep.value = onEdit.cep;
      funcionario.uf.value = onEdit.uf;
    }
  }, [onEdit]);

  const handleCpfMask = (e) => {
    cpf(e);
  };

  const handleCepMask = (e) => {
    cep(e);
  };

  const handleTelMask = (e) => {
    telefone(e);
  };

  const clearForm = (funcionario) => {
    funcionario.codigo.value = "";
    funcionario.cpf.value = "";
    funcionario.dt_nasc.value = "";
    funcionario.dt_admissao.value = "";
    funcionario.dt_demissao.value = "";
    funcionario.status.value = "";
    funcionario.nome_usuario.value = "";
    funcionario.senha_usuario.value = "";
    funcionario.cargo.value = "";
    funcionario.nome.value = "";
    funcionario.telefone.value = "";
    funcionario.email.value = "";
    funcionario.endereco.value = "";
    funcionario.bairro.value = "";
    funcionario.cidade.value = "";
    funcionario.cep.value = "";
    funcionario.uf.value = "";
  };

  const handleBackButton = () => {
    if (onEdit) setOnEdit(null);
    setExibeTabela(true);
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    const funcionario = ref.current;

    if (form.checkValidity()) {
      if (onEdit) {
        await axios
          .put(`${urlBase}/funcionarios`, {
            codigo: funcionario.codigo.value,
            cpf: funcionario.cpf.value,
            dt_nasc: funcionario.dt_nasc.value,
            dt_admissao: funcionario.dt_admissao.value,
            dt_demissao: funcionario.dt_demissao.value,
            status: funcionario.status.value,
            nome_usuario: funcionario.nome_usuario.value,
            senha_usuario: funcionario.senha_usuario.value,
            cargo: funcionario.cargo.value,
            nome: funcionario.nome.value,
            telefone: funcionario.telefone.value,
            email: funcionario.email.value,
            endereco: funcionario.endereco.value,
            bairro: funcionario.bairro.value,
            cidade: funcionario.cidade.value,
            cep: funcionario.cep.value,
            uf: funcionario.uf.value,
          })
          .then(({ data }) => {
            toast.info(data.mensagem);
            clearForm(funcionario);
          })
          .catch(({ response }) => toast.error(response.data.mensagem));
      } else {
        await axios
          .post(`${urlBase}/funcionarios`, {
            cpf: funcionario.cpf.value,
            dt_nasc: funcionario.dt_nasc.value,
            dt_admissao: funcionario.dt_admissao.value,
            dt_demissao: funcionario.dt_demissao.value,
            status: funcionario.status.value,
            nome_usuario: funcionario.nome_usuario.value,
            senha_usuario: funcionario.senha_usuario.value,
            cargo: funcionario.cargo.value,
            nome: funcionario.nome.value,
            telefone: funcionario.telefone.value,
            email: funcionario.email.value,
            endereco: funcionario.endereco.value,
            bairro: funcionario.bairro.value,
            cidade: funcionario.cidade.value,
            cep: funcionario.cep.value,
            uf: funcionario.uf.value,
          })
          .then(({ data }) => {
            toast.info(data.mensagem);
            clearForm(funcionario);
          })
          .catch(({ response }) => toast.error(response.data.mensagem));
      }

      getFuncionarios();

      if (validated) {
        setValidated(false);
      }
    } else {
      setValidated(true);
    }
  };

  return (
    <div>
      <Cabecalho2 texto1={"Cadastro"} texto2={"Funcionario"} />
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
            <Col xs={6} sm={6} md={6} lg={6}>
              <Form.Group>
                <Form.Label>Código</Form.Label>
                <Form.Control type="text" name="codigo" disabled />
              </Form.Group>
            </Col>
            <Col></Col>
          </Row>
          <Row className="my-3">
            <Col>
              <Form.Group>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  placeholder="Digite o nome do funcionário"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Nome do funcionário é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>CPF</Form.Label>
                <Form.Control
                  onKeyUp={handleCpfMask}
                  type="text"
                  name="cpf"
                  placeholder="Digite o CPF do funcionário"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  CPF do funcionário é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>Data de Nascimento</Form.Label>
                <Form.Control type="date" name="dt_nasc" required />
                <Form.Control.Feedback type="invalid">
                  Data de nascimento do funcionário é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Data de Admissão</Form.Label>
                <Form.Control type="date" name="dt_admissao" required />
                <Form.Control.Feedback type="invalid">
                  Data de admissão do funcionário é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>Data de Demissão</Form.Label>
                <Form.Control type="date" name="dt_demissao" />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" required>
                  <option value="">Selecione</option>
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Status atual é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>Cargo</Form.Label>
                <Form.Select name="cargo" required>
                  <option value="">Selecione</option>
                  {cargos.map((cargo, i) => {
                    return (
                      <option value={cargo.codigo} key={i}>
                        {cargo.nome}
                      </option>
                    );
                  })}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Cargo do funcionário é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Endereço</Form.Label>
                <Form.Control
                  type="text"
                  name="endereco"
                  placeholder="Digite o endereço do funcionário"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Endereco do funcionário é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Bairro</Form.Label>
                <Form.Control
                  type="text"
                  name="bairro"
                  placeholder="Digite o bairro do funcionário"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Bairro do funcionário é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>Cidade</Form.Label>
                <Form.Control
                  type="text"
                  name="cidade"
                  placeholder="Digite a cidade do funcionário"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Cidade do funcionário é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>UF</Form.Label>
                <Form.Select name="uf" required>
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
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  UF é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>CEP</Form.Label>
                <Form.Control
                  onKeyUp={handleCepMask}
                  type="text"
                  name="cep"
                  placeholder="Digite o CEP do funcionário"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  CEP do funcionário é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Telefone/Celular</Form.Label>
                <Form.Control
                  onKeyUp={handleTelMask}
                  type="text"
                  name="telefone"
                  placeholder="Digite o telefone/celular do funcionário"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Telefone/celular do funcionário é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Digite o email do funcionário"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  E-mail do funcionário é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="text"
                  name="nome_usuario"
                  placeholder="Digite um usuário para o funcionário"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Usuário do funcionário é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  name="senha_usuario"
                  placeholder="Digite uma senha para o funcionário"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Senha do funcionário é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
