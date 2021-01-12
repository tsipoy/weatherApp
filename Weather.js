import React, {useContext} from 'react'
import  {Context}  from './GlobalContext'

export default function Weather() {
    const { weather, isOpened, openPopup, closePopup } = useContext(Context);

    // const weatherLists = weather.map((weatherList) => {
    //     <div key={weatherList.woeid}>
    //         {weatherList.woeid}
    //     </div>
    // })
    // console.log(weatherLists);

    return (
        <div>
            <button onClick={openPopup}>Seach for places</button>
            {isOpened && 
                <form>
                    <button onClick={closePopup}>X</button>
                    <input placeholder="London" />
                    <button>Search</button>
                </form>
            }
        </div>
    )
}
