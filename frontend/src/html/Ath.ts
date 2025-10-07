export class Ath {

    // div!: HTMLDivElement;
    span!: HTMLSpanElement;

    constructor() {

        this.span = document.createElement("span");
        this.span.id = "ath-span";
        this.span.innerText = "ATH";
        
        this.span.style.position = "fixed";
        this.span.style.top = "10px";
        this.span.style.right = "10px";
        this.span.style.fontSize = "12px";
        this.span.style.color = "white";
        this.span.style.backgroundColor = "pink";
        this.span.style.padding = "5px";
        this.span.style.borderRadius = "5px";
        this.span.style.zIndex = "1000";
        this.span.style.opacity = "0.5";
        this.span.style.userSelect = "none";
        this.span.style.cursor = "default";
        
        
        
    }
    
    public load() {
        document.body.appendChild(this.span);
    }

    public unload() {
        this.span.remove();
    }

}