import React from "react";
import Item from "./Item.js";

export default function ItemsList(props) {
    return props.items.map((item, index) => (
      <ul className="ui-list mx-6 text-center bg-gray-50 px-4 py-5 flex justify-center">
        <li key={item.id} className="ui-item-list ">
          <Item info={props.items[index]} />
          <label htmlFor={`item-button-${index}`} />
          <button
            className="item-button group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-56"
            id={`item-button-${index}`}
            onClick={() => props.onRemoveClick(item.id)}
          >
            Удалить
          </button>
        </li>
        </ul>
      ));
}

  