import React, { createContext, useReducer, useEffect, useState } from "react";

const Context = createContext();

const endPoint =
  "https://cors-anywhere.herokuapp.com/www.metaweather.com/api/location/2487956/";

function ContextProvider({ children }) {

  const [isOpened, setIsOpened] = useState(false);

  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "SET_DEFAULT_WEATHER": {
          return { ...state, defaultWeather: action.defaultWeather };
          break;
        }
        case "SET_WEATHER": {
          return { ...state, weather: action.citiesWeather };
          break;
        }
        case "SET_LOCATION": {
          return { ...state, location: action.location };
          break;
        }
        case "SET_LOADED": {
          return {...state, isLoaded: false}
          break;
        }
        default:
          return state;
      }
    },
    {
      weather: [],
      location: [],
      defaultWeather: [],
      isLoaded: true,
    }
  );

  
  const getWeather = async () => {
    const response = await fetch(endPoint);
    const getData = await response.json();
    console.log(getData.consolidated_weather[0])
    dispatch({type: "SET_WEATHER", citiesWeather: getData.consolidated_weather});
    dispatch({type: "SET_LOCATION", location: getData});
    dispatch({type: "SET_DEFAULT_WEATHER",  defaultWeather: getData.consolidated_weather[0]})
  };

  // const getLocation = async () => {
  //   const response = await fetch(endPoint);
  //   const data = await response.json();
  // }
  
  function openPopup() {
    setIsOpened(true)
  }

  function closePopup() {
    setIsOpened(false)
  }

  useEffect(() => {
    getWeather();
  }, []);

  useEffect(() => {
    setTimeout(() =>  dispatch({ type: "SET_LOADED"}), 2000) 
  }, [])

  return (
    <Context.Provider value={{ state, dispatch, isOpened, openPopup, closePopup}}>
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
