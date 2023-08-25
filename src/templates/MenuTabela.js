import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import "./styles/MenuTabela.css";

export default function MenuTabela(props) {
  return (
    <div className="d-flex justify-content-between">
      {/* <AiOutlineFileText size={20} title="Detalhes" className="icon-btn"/> */}
      <AiOutlineEdit size={20} title="Editar" className="icon-btn" onClick={props.aoEditar} />
      <AiOutlineDelete
        size={20}
        title="Excluir"
        className="icon-btn"
        onClick={props.aoExcluir}
      />
    </div>
  );
}
