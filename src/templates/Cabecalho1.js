import { CgProfile } from "react-icons/cg";
import { RiShutDownLine } from "react-icons/ri";
import Menu from "./Menu";

export default function Cabecalho1(props) {
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
        <div className="d-flex">
          <div className="d-flex mx-3">
            <CgProfile size={30} className="me-2" />
            <span style={{ fontSize: "18px" }}>Apachesys</span>
          </div>
          <div>
            <RiShutDownLine size={30} />
          </div>
        </div>
      </nav>
    </>
  );
}
