import { useContext } from "react";
import { AuthProvider, AuthContext } from "../contexts/auth";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import {
  PageCargos,
  PageFuncionarios,
  HomePage,
  Page404
} from "../pages/Layout/Index";

import LoginPage from "../pages/LoginPage/Index";
// import HomePage from "../pages/HomePage/Index";

const AppRoutes = () => {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <div className="loading">Carregando...</div>;
    }

    if (!authenticated) return <Navigate to="/project-pfsii-react/login" />;

    return children;
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/project-pfsii-react">
            <Route exact path="/project-pfsii-react/login" element={<LoginPage />} />
            <Route
              exact
              path="/project-pfsii-react"
              element={
                <Private>
                  <HomePage />
                </Private>
              }
            />
            <Route path="/project-pfsii-react/cadastro">
              <Route
                path="/project-pfsii-react/cadastro/cargos"
                element={
                  <Private>
                    <PageCargos />
                  </Private>
                }
              />
              <Route
                path="/project-pfsii-react/cadastro/funcionarios"
                element={
                  <Private>
                    <PageFuncionarios />
                  </Private>
                }
              />
              <Route path="*" element={<Page404 />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
