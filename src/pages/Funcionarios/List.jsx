import { Table, Form } from "react-bootstrap";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BotaoNovo } from "../../components/Bottons";
import HeaderBelow from "../../components/HeaderBelow";
import { Container } from "react-bootstrap";
import { urlBase } from "../../utils/definitions";
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
      .then((response) => {
        const newArray = funcionarios.filter(
          (funcionario) => funcionario.info.codigo !== codigo
        );

        setFuncionarios(newArray);
        toast.success(response.data.message);
      })
      .catch(({ response }) => toast.error(response.data.message));

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
      <HeaderBelow texto1={"Consulta"} texto2={"Funcionários"} />
      <Container className="mt-3 overflow-auto">
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
              <th>Nome</th>
              <th>CPF</th>
              <th>Cargos</th>
              <th>Status</th>
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
  const atribuicoes = funcionario.atribuicoes
    .map((atribuicao) => atribuicao.nome)
    .join(' / ')
    
  return (
    <tr>
      <td>{funcionario.codigo}</td>
      <td>{funcionario.nome}</td>
      <td>{funcionario.cpf}</td>
      <td>{atribuicoes}</td>
      <td>{funcionario.status ? "Ativo" : "Inativo"}</td>
      <td>
        <AiOutlineEdit
          size={20}
          onClick={() => handleEdit(funcionario)}
          style={{ cursor: "pointer" }}
          title="Editar"
        />{" "}
        <AiOutlineDelete
          size={20}
          onClick={() => handleConfirm(funcionario.info.codigo)}
          style={{ cursor: "pointer", color: "red" }}
          title="Excluir"
        />
      </td>
    </tr>
  );
}
