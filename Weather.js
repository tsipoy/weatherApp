import React, { useContext, useState } from "react";
import { Context } from "./GlobalContext";
import Styled from "styled-components";

export default function Weather() {
  const { state, isOpened, openPopup, closePopup } = useContext(Context);
  const { weather, location, isLoaded, defaultWeather } = state;

  const DivStyle = Styled.div`

    nav {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 26px;
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

    nav ul img {
      max-width: 56px;
    }
  `;

  const weatherLists = weather.map((weatherList) => {
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
          <span className="degrees">{weatherList.max_temp} ºc</span>
          <span>{weatherList.min_temp} ºc</span>
        </li>
      </ul>
    );
  });

  return (
    <DivStyle>
      <button onClick={openPopup}>Seach for places</button>
      {isLoaded ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <ul className="defaultWeather">
            <li>
              <img
                src={`https://www.metaweather.com//static/img/weather/${defaultWeather.weather_state_abbr}.svg`}
                alt={defaultWeather.weather_state_abbr}
              />
            </li>
            <li>{defaultWeather.the_temp} ºc</li>
            <li>{defaultWeather.weather_state_name}</li>
            <li>{defaultWeather.applicable_date}</li>
            <li>
              <span className="degrees">{defaultWeather.max_temp} ºc</span>
              <span>{defaultWeather.min_temp} ºc</span>
            </li>
            <li>{location.title}</li>
          </ul>
          <nav>{weatherLists}</nav>
        </div>
      )}
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
          <button type="submit">Search</button>
        </form>
      )}
    </DivStyle>
  );
}
