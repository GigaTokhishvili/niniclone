import React from "react";

function GalleryImage(props) {
    return(
        <div className="galleryImage">
            <img src={props.url} alt="ფოტოები სამაგალითოდ" loading='lazy'/>
        </div>
    )
}

export default GalleryImage;