import React, { createContext, useReducer, useEffect, useState } from "react";

const Context = createContext();

const DEFAULT_ENDPOINT =
  "https://cors-anywhere.herokuapp.com/www.metaweather.com/api/location/";

const SEARCH_ENDPOINT =
  "https://cors-anywhere.herokuapp.com/www.metaweather.com/api/location/search/?query=";

function ContextProvider({ children }) {
  const [locations, setLocations] = useState("London");
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");


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
          return { ...state, isLoaded: false };
          break;
        }
        default:
          return state;
      }
    },
    {
      defaultWeather: [],
      weather: [],
      location: [],
      isLoaded: true,
    }
  );

  const getWeather = async () => {
    const res = await fetch(`${SEARCH_ENDPOINT}${locations}`);
    const getlocations = await res.json();
    const woeid = getlocations.map((index) => index.woeid);
    setLocations(woeid)
    const response = await fetch(`${DEFAULT_ENDPOINT}${woeid}`);
    const getData = await response.json();
    console.log(getData);
    dispatch({
      type: "SET_WEATHER",
      citiesWeather: getData.consolidated_weather,
    });
    dispatch({ type: "SET_LOCATION", location: getData });
    dispatch({
      type: "SET_DEFAULT_WEATHER",
      defaultWeather: getData.consolidated_weather[0],
    });
  };

  function openPopup() {
    setIsOpened(true);
  }

  function closePopup() {
    setIsOpened(false);
  }

  useEffect(() => {
    getWeather();
  }, []);

  useEffect(() => {
    setTimeout(() => dispatch({ type: "SET_LOADED" }), 5000);
  }, []);

  return (
    <Context.Provider
      value={{
        state,
        dispatch,
        isOpened,
        openPopup,
        closePopup,
        locations,
        setLocations,
        searchResult,
        setSearchResult,
        setSearchValue,
        searchValue,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
