import React from "react";


function Image(props) {
  return (
    <li className="imageDiv">
      <img src={props.url} alt="image" className="displayImage" onClick={() => props.largeImageUrl(props.url)}/>
    </li>
  )
}

export default Image;