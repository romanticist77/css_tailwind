import React from "react";

export default function AddItem(props) {
const form = <form onSubmit={props.onFormSubmit} className="w-1/2 p-6 pb-0">
        <h2 className="text-center p-2 text-3xl font-extrabold text-gray-900">Список товаров:</h2>
        <div className="text-center  bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
          <label htmlFor="ui-textfield-name" className="p-2 text-sm font-medium text-gray-500">Название:</label>
          <input
            type="text"
            placeholder="Название товара"
            className="ui-textfield focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
            id="ui-textfield-name"
            value={props.name}
            onChange={(e) => props.setName(e.target.value)}
            required
          />
        </div>
        <div className="text-center bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
          <label htmlFor="ui-textfield-desc" className="p-2 text-sm font-medium text-gray-500">Описание:</label>
          <input
            type="text"
            placeholder="Описание товара"
            className="ui-textfield focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
            id="ui-textfield-desc"
            value={props.desc}
            onChange={(e) => props.setDesc(e.target.value)}
            required
          />
        </div>
        <div className="form-footer text-center bg-gray-50 px-4 py-5 sm:grid grid justify-items-center sm:grid-cols-1 sm:gap-4 sm:px-6">
          <div className="validation mt-2 text-sm text-gray-600">
            {props.nameValidation && props.descValidation
              ? ""
              : "Не все поля заполнены"}
          </div>
          <label htmlFor="ui-button" />
          <input
            type="submit"
            className="ui-button group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-56"
            id="ui-button"
            value="Добавить"
            onClick={props.onAddClick}
          />
        </div>
      </form>
return form
            }