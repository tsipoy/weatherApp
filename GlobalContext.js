import React, { createContext, useReducer, useEffect } from "react";

const Context = createContext();

const endPoint =
  "https://cors-anywhere.herokuapp.com/www.metaweather.com/api/location/2487956/";

function ContextProvider({ children }) {

  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "SET_WEATHER": {
          return { ...state, weather: action.citiesWeather };
          break;
        }
        case "SET_ISOPENED": {
          return {...state, isOpened: false };
          break;
        }
        case "SET_OPENPOUP": {
          return {...state, openPopup: true };
          break;
        }
        case "SET_CLOSEPOPUP": {
          return {...state, closePopup: false };
          break;
        }
        default:
          return state;
      }
    },
    {
      weather: [],
      isOpened: false,
      openPopup: true,
      closePopup: false,
    }
  );

  const getWeather = async () => {
    const response = await fetch(endPoint);
    const getData = await response.json();
    console.log(getData);
    dispatch({type: "SET_WEATHER", citiesWeather: getData});
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <Context.Provider value={{ state, dispatch}}>
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
