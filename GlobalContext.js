import React, { createContext, useState, useEffect } from "react";

const Context = createContext();

const endPoint =
  "https://cors-anywhere.herokuapp.com/www.metaweather.com/api/location/search/?query=san";

function ContextProvider({ children }) {

  const [weather, setWeather] = useState([]);
  const [isOpened, setIsOpened] = useState(false);


  const getWeather = async () => {
    const response = await fetch(endPoint);
    const getData = await response.json();
    console.log(getData);
    setWeather(getData);
  };

  function openPopup() {
    setIsOpened(true)
  }

  function closePopup() {
    setIsOpened(false)
  }

  useEffect(() => {
    getWeather();
  }, []);

  return <Context.Provider value={{ weather, isOpened, openPopup, closePopup }}>
    {children}
  </Context.Provider>;
}

export { ContextProvider, Context };
