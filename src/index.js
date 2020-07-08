import _ from 'lodash';

import Icon from './icon.png' // You can do this because webpack changes the image to a final url string
import Bar from './bar.js'
import Highlight from './highlight.js'
import InnerBar from './innerBar.js'
import OuterBar from './outerBar.js'
import TestPlayer from './player.js';

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

    if (!window.customElements.get('vm-test-player'))
    window.customElements.define('vm-test-player', TestPlayer);
}

function OnKeyDownHandler(eventArgs) {
    if (eventArgs.keyCode == '72')
    {
        bar.AddHighlight();
    }
}

function OnLoadHandler(eventArgs)
{
    RegisterCustomComponents();

    var form = document.createElement("form");
    var input = document.createElement("input");
    form.appendChild(input);
    document.body.appendChild(form);
    
    var shadowVid = document.getElementById("shadow-video");
    var player = new TestPlayer();
    player.Build(shadowVid);
    document.body.appendChild(player);
}



// RegisterCustomComponents();
// document.body.appendChild(component());
// var player = new Player();
// document.body.appendChild(player);

window.onload = OnLoadHandler;
// window.addEventListener("keydown", OnKeyDownHandler);

// document.body.appendChild(highlight);



/*
Transclusion - when an element includes other elements as children
Uses templates

00:54 -- unnamed slot w/ text content

For slots to work, you STILL HAVE TO APPEND THE ELEMENT TO THE CUSTOM ELEMENT
AS A CHILD NODE. Otherwise it wont work.

This is because Slots are just used to "swap out" information, but while still
maintaining the structure defined within the template.

You must manually add the video element (elements to be slotted) first.
Then the browser looks at the associated template and composes the element
by combining the internal elements you added manually to be slotted, and the template.
This is why if you have multiple slotted elements, youd want to name them.

So for example:

<template>

<template>

<player>
    <h2>My content</h2>
</player>

*/