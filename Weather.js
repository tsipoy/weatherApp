import React, { useContext, useState } from "react";
import { Context } from "./GlobalContext";

export default function Weather() {
  const { state } = useContext(Context);
  const { weather, isOpened, openPopup, closePopup } = state;


  return (
    <div>
      <button onClick={openPopup}>Seach for places</button>
      {isOpened && (
        <form>
          <button type="button" onClick={closePopup}>
            X
          </button>
          <input
            type="text"
            name="city"
            placeholder="London"
            // value={inputValue}
            // onChange={(e) => setInputValue(e.target.value)}
          />
          <button>Search</button>
        </form>
      )}
    </div>
  );
}
