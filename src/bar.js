import styles from './bar.style.css';
import BaseShadowElement from './BaseShadowElement';

export default class Bar extends BaseShadowElement
{

    static get observedAttributes() {
        return ['position'];
    }
    
    /// Position is the length (%) of the innerbar, when it changes it'll call attributeChangedCallback
    /// then set the corresponding CSS property to update the inner bar
    ///
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

    get videoId()
    {
        return this.getAttribute('videoId');
    }

    set videoId(value)
    {
        if(value)
        {
            this.setAttribute('videoId', value);
        }
        else
        {
            console.warn("Failed to update Progress Bar videoId");
        }
    }

    constructor()
    {
        super();
    }

    Build(targetVideo)
    {
        this.root = this.OpenRoot();
        this.targetVideo = targetVideo;
        this.videoId = this.targetVideo.src;
        console.log(targetVideo)

        this.BuildHtml();
        this.BuildCss();
        this.Subscribe();
    }

    BuildHtml()
    {
        this.classList.add('vm-bar-container');

        // For some reason dynamically creating elements with JS and then appending them to the shadow root doesn't work, but making them in the 
        // root.innerHTML does? -- Find out why
        this.outerBar = document.createElement('outer-bar');
        this.innerBar = document.createElement('inner-bar');

        this.outerBar.classList.add('out-bar');
        this.innerBar.classList.add('in-bar');
        this.outerBar.id = 'outerBar';
        this.innerBar.id = 'innerBar';

        this.outerBar.appendChild(this.innerBar);
        this.root.appendChild(this.outerBar);
    }

    BuildCss() 
    {
        var styleTag = document.createElement('style');
        styleTag.innerHTML = styles.toString(); //Converts CSS object to string to add to HTML
        console.log(this.root);
        this.root.appendChild(styleTag);
    }

    AddHighlight()
    {
        function CreateHighlight(position, timeStamp, videoId) {
            var highlight = document.createElement('vm-highlight');
            highlight.Build(position, timeStamp, videoId);
            return highlight;
        };

        var highlight = CreateHighlight(this.position, this.targetVideo.currentTime, this.videoId);
        //TODO: Add time recording functionality and add to bar width position according to time
        this.outerBar.appendChild(highlight);
        console.log(this.outerBar);
    }

    CalculatePosition()
    {
        function FloatToStringPercent(float)
        {
            return ((float * 100.00).toString() + "%");
        }

        return FloatToStringPercent(this.targetVideo.currentTime / this.targetVideo.duration);
    }

    OnTimeUpdate(eventArgs)
    {
        // this.position = this.targetVideo.currentTime * 100 / this.targetVideo.duration;
        this.position = this.CalculatePosition();
        this.innerBar.style.width = this.position;

        // Could just call UpdateInnerBarSize() here?
    }

    OnSeekingUpdate(eventArgs)
    {
        this.position = this.CalculatePosition();
        this.innerBar.style.width = this.position;
    }

    Subscribe()
    {
        // Using bind to change the 'this' context of the event handler to the current this content (vm-bar-container),
        // this is bc the 'this' context is changed to the element that called the event handler, so without bind() it would
        // be the video element

        this.targetVideo.addEventListener('timeupdate', this.OnTimeUpdate.bind(this));
        this.targetVideo.addEventListener('seeking', this.OnSeekingUpdate.bind(this));
        this.targetVideo.addEventListener('seeked', this.OnSeekingUpdate.bind(this));
    }

    Unsubscribe()
    {

    }

    /* Life Cycle Hooks */

    attributeChangedCallback(name, oldValue, newValue)
    { };

    connectedCallback() 
    { };
}