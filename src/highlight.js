// import BaseShadowElement from "./BaseShadowElement";
import styles from "./highlight.style.css";

export default class Highlight extends HTMLElement {

    /* Properties Getters and Setters */
    get timeStamp()
    {
        return this.getAttribute('timestamp');
    }

    set timeStamp(value)
    {
        if (value) {
            this.setAttribute('timestamp', value);
        } else {
            // console.warn("Value could not be set for function " + time.name);
        }
    }

    get videoId()
    {
        return this.getAttribute('videoid');
    }

    set videoId(value)
    {
        if (value) {
            this.setAttribute('videoid', value);
        } else {
            // console.warn("Value could not be set for function " + this.videoid.name);
        }
    }

    get position()
    {
        return this.getAttribute('position');
    }

    set position(value)
    {
        if(value)
        {
            this.setAttribute('position', value);
        }
        else
        {
            console.warn("Failed to update Progress Bar position");
        }
    }

    constructor()
    {
        super();
    }

    Build(position, timeStamp, videoId)
    {
        this.classList.add('vm-highlight');

        this.videoId = videoId;
        this.position = position;
        this.timeStamp = timeStamp;
        this.style.marginLeft = this.position;

        this.BuildCss()
    }

    BuildCss()
    {
        var styleTag = document.createElement('style');
        styleTag.innerHTML = styles.toString(); //Converts CSS object to string to add to HTML
        this.appendChild(styleTag);
    }
}