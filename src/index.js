import _ from 'lodash';

import Icon from './icon.png' // You can do this because webpack changes the image to a final url string
import Bar from './bar.js'
import Highlight from './highlight.js'
import InnerBar from './innerBar.js'
import OuterBar from './outerBar.js'

import './final.mp4';



function component() {
    const element = document.createElement('div');
  
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello'); // This is the class from the CSS file

    // Add the image to our existing div
    const myIcon = new Image(); // This is the same as creating a image html element
    myIcon.src = Icon;

    element.appendChild(myIcon);

    return element;
}

function BarWebComponent() {
    var bar = document.createElement('vm-bar-container');
    var videoElement = GetVideo();
    bar.Build(videoElement);
    return bar;  
}

function GetVideo() {

    return document.getElementsByTagName('video').item(0);
}


function RegisterCustomComponents()
{
    if (!window.customElements.get('vm-bar-container')) {
        window.customElements.define('vm-bar-container', Bar);
    }

    if (!window.customElements.get('vm-highlight')) {
        window.customElements.define('vm-highlight', Highlight);
    }

    if (!window.customElements.get('outer-bar')) {
        window.customElements.define('outer-bar', OuterBar);
    }

    if (!window.customElements.get('inner-bar')) {
        window.customElements.define('inner-bar', InnerBar);
    }
}


document.body.appendChild(component());
var bar = "";

window.onload = OnLoadHandler;
window.addEventListener("keydown", OnKeyDownHandler);

function OnKeyDownHandler(eventArgs) {
    if (eventArgs.keyCode == '72')
    {
        bar.AddHighlight();
    }
}

function OnLoadHandler(eventArgs)
{
    RegisterCustomComponents(); // <-- Add this method to a utility class

    bar = BarWebComponent();
    document.body.insertBefore(bar, document.body.firstChild);
    // bar.AddHighlight();
}

// document.body.appendChild(highlight);
