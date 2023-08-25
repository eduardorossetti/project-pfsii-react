import Pagina from "../templates/Pagina";
import error from "./img/erro404.jpg";
import TelaCadastroCargos from "./TelaCargos";
import TelaCadastroFuncionarios from "./TelaFuncionarios";
import "./styles/Tela404.css";

// PÁGINAS

function PaginaCadastroCargo(props) {
  const obj = { texto1: "Cadastro", texto2: "Cargo" };

  return (
    <Pagina obj={obj}>
      <TelaCadastroCargos />
    </Pagina>
  );
}

function PaginaCadastroFuncionario(props) {
  const obj = { texto1: "Cadastro", texto2: "Funcionario" };
  return (
    <Pagina obj={obj}>
      <TelaCadastroFuncionarios />
    </Pagina>
  );
}

function Pagina404(props) {
  return (
    <Pagina>
      <div className="tela-erro">
        <img src={error} alt="Erro 404" />
        <h1>Página Não Encontrada</h1>
        <h2>A página que você está procurando não pôde ser encontrada</h2>
      </div>
    </Pagina>
  );
}

// TELAS

function PaginaInicial(props) {
  return (
    <Pagina>
      {
        // Exibe apenas o menu
      }
    </Pagina>
  );
}

export {
  Pagina404,
  PaginaInicial,
  PaginaCadastroFuncionario,
  PaginaCadastroCargo,
};
