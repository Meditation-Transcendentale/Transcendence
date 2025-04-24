import { ABlock } from "../../ABlock";
import { SimpleForm } from "../../customElements/SimpleForm";
import { CustomEvents } from "../../CustomEvents";
import { friendlistRequest } from "../../requests";
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
        const response = friendlistRequest(sessionStorage.getItem("username"))
            .then((resp) => {
                if (resp.ok) {
                    console.log(resp.json.friendlist);
                    // this.parseFriendlistJson(resp.json.friendlist);
                    resp.json.friendlist.forEach(object => {
                        const tr = document.createElement("tr")
                        const td = document.createElement("td");
                        td.innerHTML = object.friend_username;
                        tr.appendChild(td);
                        this.friendList.appendChild(tr);
                    });
                    return;
                }
                throw resp;
            }).catch((err) => console.log(err));     
    }
}

