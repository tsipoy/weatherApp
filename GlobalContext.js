import React, { createContext, useReducer, useEffect, useState } from "react";

const Context = createContext();

const DEFAULT_ENDPOINT =
  "https://cors-anywhere.herokuapp.com/www.metaweather.com/api/location/";

const SEARCH_ENDPOINT =
  "https://cors-anywhere.herokuapp.com/www.metaweather.com/api/location/search/?query=";

function ContextProvider({ children }) {
  const [ locations, setLocations ] = useState("San Francisco")

  const [isOpened, setIsOpened] = useState(false);
  const [ searchAllLocations, setSearchAllLocations ] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [locationSearched, setLocationSearched] = useState([]);

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
    const woeid = getlocations.map(index => index.woeid)
    console.log(woeid)

    const response = await fetch(`${DEFAULT_ENDPOINT}${woeid}`);
    const getData = await response.json();
    console.log(getData.consolidated_weather[0]);
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

  // const getSearchLocation = async () => {
  //   const response = await fetch(SEARCH_ENDPOINT);
  //   const data = await response.json();
  //   console.log(data);
  //   setSearchAllLocations(data)
  //   // dispatch({type: "SET_ALL_LOCATIONS", allLocations: data})
  // }



  function openPopup() {
    setIsOpened(true);
  }

  function closePopup() {
    setIsOpened(false);
  }

  useEffect(() => {
    getWeather();
    // getSearchLocation();
  }, []);

  useEffect(() => {
    setTimeout(() => dispatch({ type: "SET_LOADED" }), 5000);
  }, []);

  return (
    <Context.Provider
      value={{ state, dispatch, isOpened, openPopup, closePopup, setInputValue, inputValue, locations, setLocations }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
