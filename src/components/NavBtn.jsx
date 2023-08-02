import React from 'react';


function NavBtn(props) {

    return (
        <li 
            className={props.className}
            id={props.id}
            onClick={() => props.changeCurrentId(props.id)}
        >
            {props.liName}
        </li>
    )
}

export default NavBtn;