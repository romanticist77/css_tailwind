import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import ItemsList from "./ItemsList.js"
import AddItem from "./AddItem.js"

export default function Shop() {
  const [items, setItems] = useState(() => {
    const value = JSON.parse(localStorage.getItem("items"));
    if (!value) {
      return [];
    } else {
      return value;
    }
  });
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
    document.title = items.length > 0 ? `Кол-во товаров: ${items.length}` : "Товары отсутствуют"
  }, [items]);

  const itemKey = uuidv4();
  
  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({name: name, desc: desc})
  };

   const handleAddClick = () => {
    if (nameValidation(name) && descValidation(desc)) {
      setItems([...items, { id: items.length + 1, name, desc }]);
      (async () => {
        try {
          const response = await fetch("https://covid-shop-mcs.herokuapp.com", requestOptions)
          const json = response.json()
          console.log(json)
        } catch (error) {
          console.error(error)
        }
      })();
      setName("");
      setDesc("");
    }
    if (!nameValidation(name)) {
      setName("");
    }
    if (!descValidation(desc)) {
      setDesc("");
    }
  };
  const handleRemoveClick = (key) => {
    const filtration = items.filter(({ id, name, desc }) => id !== key);
    setItems(filtration);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };
  function nameValidation(name) {
    return /^[а-яА-Яa-zA-Z0-9 ]+$/.test(name);
  }
  function descValidation(desc) {
    return /^[а-яА-Яa-zA-Z0-9 ]+$/.test(desc);
  }
  return (
    <div className="sm:w-1/2 grid bg-gray-50 grid-cols-1 gap-4 px-6">
      <AddItem name={name} setName={setName} desc={desc} setDesc={setDesc} nameValidation={nameValidation(name)} descValidation={descValidation(desc)} onFormSubmit={handleFormSubmit} onAddClick={handleAddClick} />
      <div className="text-center ml-6 mr-6 pt-6 pb-6 bg-gray-50">
        {items.length === 0 && (
          <p className="ui-title mt-2 text-sm text-gray-600">Добавьте первый товар</p>
        )}
      </div>
      <ItemsList items={items} onRemoveClick={handleRemoveClick}  />
    </div>
  );
}




// fetch("https://covid-shop-mcs.herokuapp.com", {
//           method: "POST",
//           headers: {"Content-Type": "application/json"},
//           body: JSON.stringify({name: name, desc: desc})
//         })
//         .then(response => response.json())
//         .then(data => console.log(data));