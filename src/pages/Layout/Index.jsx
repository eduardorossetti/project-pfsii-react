import Cargos from "../Cargos/Index";
import Funcionarios from "../Funcionarios/Index";
import Cabecalho1 from "../../components/Cabecalho1";
import Home from "../HomePage/Index";
import Pagina404 from "../404/Index";

// PÁGINAS

function PageCargos(props) {
  return (
    <>
      <Cabecalho1 />
      <Cargos />
    </>
  );
}

function PageFuncionarios(props) {
  return (
    <>
      <Cabecalho1 />
      <Funcionarios />
    </>
  );
}

// TELAS

function HomePage(props) {
  return (
    <>
      <Cabecalho1 />
      <Home />
    </>
  );
}

function Page404(props) {
  return (
    <>
      {/* < Cabecalho1 /> */}
      <Pagina404 />
    </>
  );
}

export {
  PageCargos,
  PageFuncionarios,
  HomePage,
  Page404,
};
