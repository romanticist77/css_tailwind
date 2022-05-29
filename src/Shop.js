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
  const handleAddClick = () => {
    if (nameValidation(name) && descValidation(desc)) {
      setItems([...items, { itemKey, name, desc }]);
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
  const handleRemoveClick = (number) => {
    const filtration = items.filter((item, index) => index !== number);
    setItems(filtration);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };
  function nameValidation(name) {
    return /^[а-яА-Яa-zA-Z0-9]+$/.test(name);
  }
  function descValidation(desc) {
    return /^[а-яА-Яa-zA-Z0-9]+$/.test(desc);
  }
  return (
    <>
      <AddItem name={name} setName={setName} desc={desc} setDesc={setDesc} nameValidation={nameValidation(name)} descValidation={descValidation(desc)} onFormSubmit={handleFormSubmit} onAddClick={handleAddClick} />
      <div className="text-center w-[46.25%] ml-6 mr-6 pt-6 pb-6 bg-gray-50">
        {items.length === 0 && (
          <p className="ui-title mt-2 text-sm text-gray-600">Добавьте первый товар</p>
        )}
      </div>
      <ItemsList items={items} itemKey={itemKey} onRemoveClick={handleRemoveClick}  />
    </>
  );
}