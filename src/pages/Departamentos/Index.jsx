import { useState, useEffect } from "react";
import Form from "./Form";
import List from "./List";
import { urlBase } from "../../utils/definitions";
import axios from "axios";
import { toast } from "react-toastify";

export default function TelaCadastroCargos(props) {
  const [exibeTabela, setExibeTabela] = useState(true);
  const [onEdit, setOnEdit] = useState(null);
  const [departamentos, setDepartamentos] = useState([]);
  const [filtro, setFiltro] = useState("");

  const getDepartamentos = async () => {
    try {
      const res = await axios.get(urlBase + "/departamentos");
      if (Array.isArray(res.data)) {
        setDepartamentos(res.data);
      }
    } catch ({ response }) {
      toast.error(`Não foi possível obter departamentos: ${response.data.message}`);
    }
  };

  useEffect(() => {
    getDepartamentos();
  }, [setDepartamentos]);

  return exibeTabela ? (
    <List
      departamentos={departamentos}
      setDepartamentos={setDepartamentos}
      setOnEdit={setOnEdit}
      filtro={filtro}
      aoMudarFiltro={setFiltro}
      setExibeTabela={setExibeTabela}
    />
  ) : (
    <Form
      onEdit={onEdit}
      setOnEdit={setOnEdit}
      departamentos={departamentos}
      setDepartamentos={setDepartamentos}
      setExibeTabela={setExibeTabela}
    />
  );
}
