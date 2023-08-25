import { useState, useEffect } from "react";
import Form from "./Form";
import List from "./List";
import { urlBase } from "../../utils/definicoes";
import axios from "axios";
import { toast } from "react-toastify";

export default function TelaCadastroCargos(props) {
  const [exibeTabela, setExibeTabela] = useState(true);
  const [onEdit, setOnEdit] = useState(null);
  const [cargos, setCargos] = useState([]);
  const [filtro, setFiltro] = useState("");

  const getCargos = async () => {
    try {
      const res = await axios.get(urlBase + "/cargos");
      setCargos(res.data);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getCargos();
  }, [setCargos]);

  return exibeTabela ? (
    <List
      cargos={cargos}
      setCargos={setCargos}
      setOnEdit={setOnEdit}
      filtro={filtro}
      aoMudarFiltro={setFiltro}
      setExibeTabela={setExibeTabela}
    />
  ) : (
    <Form
      onEdit={onEdit}
      setOnEdit={setOnEdit}
      getCargos={getCargos}
      setExibeTabela={setExibeTabela}
    />
  );
}
