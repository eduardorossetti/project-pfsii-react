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
} from "../pages/Layout/Index";

import LoginPage from "../pages/LoginPage/Index";
// import HomePage from "../pages/HomePage/Index";

const AppRoutes = () => {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <div className="loading">Carregando...</div>;
    }

    if (!authenticated) return <Navigate to="/login" />;

    return children;
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/project-pfsii-react" element={<LoginPage />} />
          <Route
            exact
            path="/"
            element={
              <Private>
                <HomePage />
              </Private>
            }
          />
          <Route path="/cadastro">
            <Route
              path="cargos"
              element={
                <Private>
                  <PageCargos />
                </Private>
              }
            />
            <Route
              path="funcionarios"
              element={
                <Private>
                  <PageFuncionarios />
                </Private>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
