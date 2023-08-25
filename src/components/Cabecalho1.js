import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { CgProfile } from "react-icons/cg";
import { RiShutDownLine } from "react-icons/ri";
import Menu from "./Menu";
import { Button } from "react-bootstrap";

export default function Cabecalho1(props) {
  const { logout, user } = useContext(AuthContext);
  console.log(user);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <nav
        className="d-flex text-white p-2 justify-content-between
        align-items-center"
        style={{ backgroundColor: "#00adee", height: "60px" }}
      >
        <Menu />
        <div
          className="p-0 m-0"
          style={{ fontWeight: "bold", fontSize: "20px" }}
        >
          SGi | GERENCIAMENTO DE SERVIÇOS
        </div>
        <div className="d-flex align-items-center">
          <div className="d-flex mx-3">
            <CgProfile size={30} className="me-2" />
            <span style={{ fontSize: "18px" }}>{user.email}</span>
          </div>
          <div>
            <Button
              size="sm"
              variant="danger"
              onClick={handleLogout}
              className="pe-3"
            >
              <RiShutDownLine size={20} className="mx-1" />
              Logout
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
}
