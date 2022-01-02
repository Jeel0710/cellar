import React from 'react';
import { useHistory } from 'react-router-dom';
import './slider.css';

import front from '../Images/Internship.jpg'

export default function SlideShow() {
    const history = useHistory();
    const OnLoginClick = () => {
        history.push({ pathname: '/LogIn' });
    }
    return (
        <div className="slider-div">
            <img src={front} className="img" style={{ "height": "820px", "width": "100%" }} alt="front" ></img>
            <button onClick={() => OnLoginClick()}>Log In</button>
        </div>
    );
}
