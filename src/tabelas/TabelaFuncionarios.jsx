import { Table, Form } from "react-bootstrap";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BotaoNovo } from "../templates/Botoes";
import Cabecalho2 from "../templates/Cabecalho2";
import { Container } from "react-bootstrap";
import { urlBase } from "../utils/definicoes";
import axios from "axios";
import { toast } from "react-toastify";

export default function TabelaCadastroFuncionarios({
  funcionarios,
  setFuncionarios,
  filtro,
  aoMudarFiltro,
  setOnEdit,
  setExibeTabela,
}) {
  const linhas = [];

  const confirmOnDelete = (codigo) => {
    if (window.confirm(`Confirma a exclusão do item ${codigo}?`)) {
      handleDelete(codigo);
    }
  };

  const handleDelete = async (codigo) => {
    await axios
      .delete(`${urlBase}/funcionarios/${codigo}`)
      .then(({ data }) => {
        const newArray = funcionarios.filter(
          (funcionario) => funcionario.codigo !== codigo
        );

        setFuncionarios(newArray);
        toast.info(data.mensagem);
      })
      .catch(({ response }) => toast.error(response.data.mensagem));

    setOnEdit(null);
  };

  const handleEdit = (item) => {
    setOnEdit(item);
    setExibeTabela(false);
  };

  funcionarios.forEach((funcionario, i) => {
    if (funcionario.nome.toLowerCase().indexOf(filtro.toLowerCase()) === -1) {
      return;
    }
    linhas.push(
      <LinhaFuncionario
        funcionario={funcionario}
        key={i}
        handleEdit={handleEdit}
        handleConfirm={confirmOnDelete}
      />
    );
  });

  return (
    <div>
      <Cabecalho2 texto1={"Consulta"} texto2={"Funcionarios"} />
      <Container className="mt-3">
        <div className="d-flex mb-3 justify-content-between">
          <BotaoNovo acaoBtnNovo={() => setExibeTabela(false)} />
          <Form>
            <Form.Control
              type="text"
              value={filtro}
              placeholder="Pesquisar por nome..."
              onChange={(e) => aoMudarFiltro(e.target.value)}
              style={{ width: "300px" }}
            />
          </Form>
        </div>
        <Table hover style={{ fontSize: "14px" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>CPF</th>
              <th>Nome</th>
              <th>Usuário</th>
              <th>Cargo</th>
              <th>Telefone</th>
              <th>Status</th>
              <th>E-mail</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>{linhas}</tbody>
        </Table>
      </Container>
    </div>
  );
}

function LinhaFuncionario({ funcionario, handleEdit, handleConfirm }) {
  return (
    <tr>
      <td>{funcionario.codigo}</td>
      <td>{funcionario.cpf}</td>
      <td>{funcionario.nome}</td>
      <td>{funcionario.nome_usuario}</td>
      <td>{funcionario.cargo_nome}</td>
      <td>{funcionario.telefone}</td>
      <td>{funcionario.status}</td>
      <td>{funcionario.email}</td>
      <td>
        <AiOutlineEdit size={20} onClick={() => handleEdit(funcionario)} />{" "}
        <AiOutlineDelete
          size={20}
          onClick={() => handleConfirm(funcionario.codigo)}
        />
      </td>
    </tr>
  );
}
