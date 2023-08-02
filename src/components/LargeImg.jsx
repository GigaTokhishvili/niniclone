import React from "react";
import xIcon from '../pics/xIcon.svg';

function LargeImg(props) {
    return (
        <div className="largeImage" onClick={(e) => {e.target !== 'img' && props.closeBtn(false)}}>
            <img src={props.src} alt="The image that was clicked" />
            <svg className="closeBtn" onClick={() => {props.closeBtn(false)}} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path d="m256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm-81-337c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/>
            </svg>           
        </div>
    )
}

export default LargeImg;