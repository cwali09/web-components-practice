//TODO: Needs further cleanup

export default class BaseShadowElement extends HTMLElement {
    constructor() {
        super();
    }

    OpenRoot()
    {
        return this.attachShadow({mode: 'open'});
    }


    AttachStyleSheet(url) {
        function checkString(param) {
             if (param instanceof String || typeof param === "string") { 
                return true;
             } else {
                  return false;
             }
         };

         if (!checkString(url)) {
             return;
         }

        /* Commenting this out for now as this might not be the correct way to reference an external stylesheet to a web component element */
         const linkElem = document.createElement('link');
         linkElem.setAttribute('rel', 'stylesheet');
         linkElem.setAttribute('href', url);
         this.appendChild(linkElem);

    }
}