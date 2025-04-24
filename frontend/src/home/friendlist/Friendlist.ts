import { ABlock } from "../../ABlock";
import { SimpleForm } from "../../customElements/SimpleForm";
import { CustomEvents } from "../../CustomEvents";
import { createContainer } from "../../utils";

export class Friendlist extends ABlock {
    private friendList!: HTMLElement;


	constructor(parent: HTMLElement) {
		super(parent);

		this.init();
	}

    private init(){
        this.container = createContainer("friendlist-container", "friendlist")
        this.container.addEventListener("enable", () => {
            this.enable();
        })
        this.container.addEventListener("disable", () => {
            this.disable();
        })

        this.initFriendList();
        this.container.appendChild(this.friendList)
    }

    private initFriendList(){
        this.friendList = document.createElement("table")
        // this.updateFriendList = document.createElement("input");
        // this.updateFriendList.setAttribute("type", "text");       
    }
}