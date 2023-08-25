import { useEffect, useState } from "react";
import Form from "./Form";
import List from "./List";
import { urlBase } from "../../utils/definicoes.js";
import axios from "axios";
import { toast } from "react-toastify";

export default function TelaCadastroFuncionarios(props) {
  const [exibeTabela, setExibeTabela] = useState(true);
  const [onEdit, setOnEdit] = useState(null);
  const [funcionarios, setFuncionarios] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [filtro, setFiltro] = useState("");

  const getFuncionarios = async () => {
    try {
      const res = await axios.get(urlBase + "/funcionarios");
      setFuncionarios(res.data);
    } catch (error) {
      toast.error(error);
    }
  };

  const getCargos = async () => {
    try {
      const res = await axios.get(urlBase + "/cargos");
      setCargos(res.data);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getFuncionarios();
    getCargos();
  }, [setFuncionarios]);

  return exibeTabela ? (
    <List
      funcionarios={funcionarios}
      setFuncionarios={setFuncionarios}
      setOnEdit={setOnEdit}
      filtro={filtro}
      aoMudarFiltro={setFiltro}
      setExibeTabela={setExibeTabela}
    />
  ) : (
    <Form
      cargos={cargos}
      onEdit={onEdit}
      setOnEdit={setOnEdit}
      getFuncionarios={getFuncionarios}
      setExibeTabela={setExibeTabela}
    />
  );
}
