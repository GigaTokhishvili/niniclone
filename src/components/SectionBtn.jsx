import React from 'react';

function SectionBtn(props) {
    return (
        <div>
            <li className={props.className} onClick={() => props.changeSectionId(props.id)}>{props.sectionName}</li>
        </div>
    )
}

export default SectionBtn;