import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Pagina404,
  PaginaInicial,
  PaginaCadastroFuncionario,
  PaginaCadastroCargo,
} from "./telas/Paginas";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<PaginaInicial />} />
          <Route
            exact
            path="cadastro-funcionario"
            element={<PaginaCadastroFuncionario />}
          />
          <Route
            exact
            path="cadastro-cargo"
            element={<PaginaCadastroCargo />}
          />
          <Route path="*" element={<Pagina404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
