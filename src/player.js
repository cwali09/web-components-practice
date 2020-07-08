
// const template = document.createElement('template');
// template.innerHTML = `<div id="test"><slot name="vm-video"></slot></div>`;
export default class TestPlayer extends HTMLElement
{
    constructor()
    {
        super();
    }

    Build(video)
    {
        this.Root = this.attachShadow({mode: 'open'});
        this.VidWrap = document.createElement("div");
        // this.Video = document.getElementsByTagName('video').item(0);
        this.Video = video;
        this.VidWrap.appendChild(this.Video);
        this.Root.appendChild(this.VidWrap);
        this.Subscribe();
    }

    BuildCSS()
    {
        this.style.display = "block";
        this.style.position = "absolute";
        this.style.height = "400px";
        this.style.width = "400px";
    }

    Subscribe()
    {
        this.addEventListener('click', (event) => {console.log("Player click"); event.stopPropagation()}, true);
        this.Root.addEventListener('click', (event) => console.log("Player Shadow Root click"), true);
        this.VidWrap.addEventListener('click', (event) => console.log("VidWrap click"), true);
        this.Video.addEventListener('click', (event) => console.log("Video click"), true);
    }

    connectedCallback()
    {
        // this.Build();
    }
}