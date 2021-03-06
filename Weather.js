import React, { useContext, useState } from "react";
import { Context } from "./GlobalContext";
import Styled from "styled-components";

export default function Weather() {
  const DivStyle = Styled.div`
    position: relative;

    form {
      display: flex;
      flex-direction: column;
      position: absolute;
      background-color: #1E213A;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding-inline-start: 16px;
    }

    label input {
      background-color: #1E213A;
      font-size: 16px;
      line-height: 19px;
      color: #616475;
      border: 1px solid #E7E7EB;
      box-sizing: border-box;
      padding-block-start: 14px;
      padding-block-end: 15px;
    }

    label button {
      font-size: 16px;
      line-height: 19px;
      padding-block-start: 15px;
      padding-block-end: 16px;
      padding-inline-start: 19px;
      padding-inline-end: 14px;
      margin-inline-start: 12px;
      background-color: #3C47E9;
      border: #3C47E9;
      color: #E7E7EB;
    }

    .search-btn {
      background: #6E707A;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      color: #E7E7EB;
      padding-block-start: 11px;
      padding-block-end: 10px;
      padding-inline-end: 18px;
      padding-inline-start: 18px;
      font-size: 16px;
      line-height: 19px;
    }

    .close-btn {
      font-size: larger;
      max-width: max-content;
      color: #E7E7EB;
      background-color: transparent;
      border: none;
      padding-block-start: 17px;
      padding-block-end: 30px;
    }
    .general-weather {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      padding-inline-start: 32px;
      padding-inline-end: 6px;
    }
    
    ul {
      background-color: #1E213A;
      padding-block-end: 18px;
      padding-block-start: 18px;
      padding-inline-end: 22px;
      padding-inline-start: 22px;
      max-width: max-content;
    }

    .defaultWeather {
      padding-block-end: 0;
      padding-block-start: 0;
      padding-inline-end: 0;
      padding-inline-start: 0;
      max-width: -webkit-fill-available;
    }

    li {
      padding-block-end: 32px;
    }

    .degrees {
      padding-inline-end: 16px;
    }

    .location {
      font-weight: 600;
      font-size: 18px;
      line-height: 21px;

    }

    div ul img {
      max-width: 150px;
    }

    .general-weather ul img {
      max-width: 56px;
    }

    .hightlights {
      background-color: #1E213A;
      text-align: center;
      margin-inline-end: 24px;
      margin-inline-start: 23px;
      margin-block-end: 32px;
      padding-block-start: 22px;
      padding-block-end: 41px;  
    }

    h2 {
      margin-inline-start: 19px;
    }

    @media(min-width: 800px) {

      .form {
        max-width: 32%;
      }
      .weatherLists {
        display: grid;
        grid-template-columns: 33% 67%;
      }

      .defaultWeather li {
        padding-block-end: 81px;
      }

      .highlights-wrapper {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }

      .general-weather {
        display: flex;
        flex-direction: rows;
      }

      .general-weather ul{
        margin-inline-end: 42px;
      }

    }
  `;
  
  const {
    state,
    isOpened,
    openPopup,
    closePopup,
    locations,
    setLocations,
    searchResult, 
    setSearchResult,
    searchValue, 
    setSearchValue
  } = useContext(Context);
  const { weather, location, isLoaded, defaultWeather } = state;

  const applicableDate = new Date(defaultWeather.applicable_date);
  const month = applicableDate.toLocaleString("default", { month: "short" });
  const date = applicableDate.getDate();

  const weatherLists = weather.slice(1).map((weatherList) => {
    return (
      <ul key={weatherList.id}>
        <li>{weatherList.applicable_date}</li>
        <li>
          <img
            src={`https://www.metaweather.com//static/img/weather/${weatherList.weather_state_abbr}.svg`}
            alt={weatherList.weather_state_abbr}
          />
        </li>
        <li>
          <span className="degrees">{Math.floor(weatherList.max_temp)} ºc</span>
          <span>{Math.floor(weatherList.min_temp)} ºc</span>
        </li>
      </ul>
    );
  });

  const results = weather.map((weatherResult) => {
    return (
      <button key={weatherResult.id}>{weatherResult.title}</button>
    )
  })

  // console.log(results)

  const submitSearch = (e) => {
    e.preventDefault();
    if(e.target.location.value !== "") {
      setSearchValue(e.target.location.value);
      setLocations(e.target.location.value)
    } else {
      return null
    } 
  };
console.log(searchValue)

  return (
    <DivStyle>
      <button onClick={openPopup} className="search-btn">
        Seach for places
      </button>
      {isOpened && (
        <>
          <form onSubmit={submitSearch}>
            <button type="button" onClick={closePopup} className="close-btn">
              X
            </button>
            <label> 
              <input
                type="text"
                name="location"
                placeholder="Search location"
              />
              <button>Search</button>
            </label>
            <div>
              {searchValue}
            </div>
          </form>
        </>
      )}
      {isLoaded ? (
        <h2>Loading...</h2>
      ) : (
        <div className="weatherLists">
          <ul className="defaultWeather">
            <li>
              <img
                src={`https://www.metaweather.com//static/img/weather/${defaultWeather.weather_state_abbr}.svg`}
                alt={defaultWeather.weather_state_abbr}
              />
            </li>
            <li>{Math.floor(defaultWeather.the_temp)} ºc</li>
            <li>{defaultWeather.weather_state_name}</li>
            <li>
              {date} {month}
            </li>
            <li>{location.title}</li>
          </ul>
          <div>
            <nav className="general-weather">{weatherLists}</nav>
            <div>
              <h2>Today’s Hightlights</h2>
              <div className="highlights-wrapper">
                <div className="hightlights">
                  <h3>Wind status</h3>
                  <p>
                    <b>{Math.floor(defaultWeather.wind_speed)}</b> mph
                  </p>
                  <p>{defaultWeather.wind_direction_compass}</p>
                </div>
                <div className="hightlights">
                  <h3>Humidity</h3>
                  <p>
                    <b>{defaultWeather.humidity}</b> %
                  </p>
                  <progress max="100" value={defaultWeather.humidity}>
                    {/* {defaultWeather.humidity} % */}
                  </progress>
                  <span>%</span>
                </div>
                <div className="hightlights">
                  <h3>Visibility</h3>
                  <p>
                    <b>{Math.floor(defaultWeather.visibility)}</b> miles
                  </p>
                </div>
                <div className="hightlights">
                  <h3>Air Pressure</h3>
                  <p>
                    <b>{Math.floor(defaultWeather.air_pressure)}</b> mb
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DivStyle>
  );
}
