import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import "./searchbar.css";

const SearchBar = ({
  placeholder,
  data,
  keyField,
  searchField,
  select,
  value,
  name,
}) => {
  const searchInput = useRef();
  const [search, setSearch] = useState(value ? value : "");
  const [list, setList] = useState(data);
  const [selectedItem, setSelectedItem] = useState(false);

  const filterResult = () => {
    setList(
      data.filter((item) => {
        return search.length >= 1
          ? item[searchField].toLowerCase().includes(search.toLowerCase())
          : false;
      })
    );
  };

  const handleClick = () => {
    if (search.length === 0) {
      setList(data);
      let result = document.querySelector(".data-result");
      result.style.display = "block";
    }
  };

  const handleListClick = (item) => {
    setSearch(item[searchField]);
    setSelectedItem(true);
    select(item);
  };

  const handleChange = (e) => {
    const element = e.target;
    setSearch(element.value);
    if (!selectedItem) {
      element.setAttribute("aria-invalid", true);
      element.setCustomValidity("error");
    } else {
      element.removeAttribute("aria-invalid");
      element.setCustomValidity("");
    }
  };

  const handleClose = (e) => {
    setSearch("");
    setSelectedItem(false);
    select({});
    searchInput.current.setAttribute("aria-invalid", true);
    searchInput.current.setCustomValidity("error");
    let result = document.querySelector(".data-result");
    result.style.display = "none";
  };

  useEffect(() => {
    filterResult();
    // eslint-disable-next-line
  }, [search]);

  useEffect(() => {
    let result = document.querySelector(".data-result");
    if (list.length > 0 && !selectedItem) {
      result.style.display = "block";
    } else {
      result.style.display = "none";
    }
    // eslint-disable-next-line
  }, [list]);

  // eslint-disable-next-line
  useEffect(() => {
    searchInput.current.setCustomValidity("");
    let result = document.querySelector(".data-result");
    result.style.display = "none";
  }, [selectedItem]);

  return (
    <div className="searchbar">
      <div className="bar">
        <BiSearch className="bar-icon" size={20} />
        <Form.Control
          type="text"
          ref={searchInput}
          placeholder={placeholder}
          value={search}
          name={name}
          onChange={handleChange}
          onClick={handleClick}
          required
        />
        <GrFormClose className="bar-icon" size={25} onClick={handleClose} />
      </div>
      <div className="result">
        <ul className="data-result">
          {list.map((item) => {
            return (
              <li key={item[keyField]} onClick={(e) => handleListClick(item)}>
                {item[keyField] + " - " + item[searchField]}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
