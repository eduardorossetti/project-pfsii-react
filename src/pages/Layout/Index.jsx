import Cargos from "../Cargos/Index";
import Funcionarios from "../Funcionarios/Index";
import Header from "../../components/Header";
import Home from "../HomePage/Index";
import Pagina404 from "../404/Index";
import Departamentos from "../Departamentos/Index";
import Footer from "../../components/Footer";

const alturaRodape = 85;

// PÁGINAS

function PageCargos(props) {
  return (
    <>
      <Header />
      <div style={{ marginBottom: `${alturaRodape}px` }}>
        <Cargos />
      </div>
      <Footer />
    </>
  );
}

function PageFuncionarios(props) {
  return (
    <>
      <Header />
      <div style={{ marginBottom: `${alturaRodape}px` }}>
        <Funcionarios />
      </div>
      <Footer />
    </>
  );
}

function PageDepartamentos(props) {
  return (
    <>
      <Header />
      <div style={{ marginBottom: `${alturaRodape}px` }}>
        <Departamentos />
      </div>
      <Footer />
    </>
  );
}

// TELAS

function HomePage(props) {
  return (
    <>
      <Header />
      <div style={{ marginBottom: `${alturaRodape}px` }}>
        <Home />
      </div>
      <Footer />
    </>
  );
}

function Page404(props) {
  return (
    <>
      <Header />
      <Pagina404 />
      <Footer />
    </>
  );
}

export { PageCargos, PageFuncionarios, HomePage, Page404, PageDepartamentos };
