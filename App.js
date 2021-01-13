import React from 'react';
import Weather from "./Weather";
import Styled from "styled-components"

export default function App() {

    const MainContent = Styled.div `
        background-color: #100E1D;
        color: #E7E7EB;
    `;
    
    return (
        <div>
            <h1>Onja Weather App</h1>
            <MainContent>
                <Weather />
            </MainContent>
        </div>
    )
}
