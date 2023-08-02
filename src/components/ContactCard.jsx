import React, { useState } from "react";

function ContactCard(props) {

    return(
        <div className="contactDiv">
            <h1 className="contactText">{props.contactText}</h1>

            <h2 className="numb" onClick={() => {navigator.clipboard.writeText('598148303')}}>
                {props.iPhone == true && <svg xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 384 512">
                    <path d="M16 64C16 28.7 44.7 0 80 0H304c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H80c-35.3 0-64-28.7-64-64V64zM224 448a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM304 64H80V384H304V64z"/>
                </svg>}
                {props.numb}
            </h2>

            <a href={props.href} target='_blank' className="contactCard" id={props.id}>
                <img src={props.src} alt="Error displaying image" />
            </a>
            
            <a href={props.href} target='_blank'>
                <h2 className='socialMedia'>{props.name}</h2>
            </a>
        </div>
    )
}

export default ContactCard;