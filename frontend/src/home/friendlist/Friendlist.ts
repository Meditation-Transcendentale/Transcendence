import { ABlock } from "../../ABlock";
import { SimpleForm } from "../../customElements/SimpleForm";
import { CustomEvents } from "../../CustomEvents";
import { deleteFriendRequest, friendlistRequest } from "../../requests";
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
    }
    

    private enable() {
        this.friendList = document.createElement("table")
        const response = friendlistRequest(sessionStorage.getItem("username"))
        .then((resp) => {
            if (resp.ok) {
                console.log(resp.json.friendlist);  
                resp.json.friendlist.forEach(object => {
                    const tr = document.createElement("tr")
                    const td = document.createElement("td");
                    let removeBtn = document.createElement("input");
                    let blockBtn = document.createElement("input");
                    let statBtn = document.createElement("input");
                    removeBtn.setAttribute("type", "button");
                    removeBtn.setAttribute("value", "Remove");
                    removeBtn.addEventListener("click", () => {
                        const responseDelete = 
                    })
                    blockBtn.setAttribute("type", "button");
                    blockBtn.setAttribute("value", "Block");
                    blockBtn.addEventListener("click", () => {
                    
                    })
                    statBtn.setAttribute("type", "button");
                    statBtn.setAttribute("value", "Stats");
                    statBtn.addEventListener("click", () => {
                    
                    })
                    td.innerHTML = object.friend_username;
                    tr.appendChild(td);
                    tr.appendChild(removeBtn);
                    tr.appendChild(blockBtn);
                    tr.appendChild(statBtn);
                    this.friendList.appendChild(tr);
                });
                this.container.appendChild(this.friendList)     
                return;
            }
            throw resp;
        }).catch((err) => console.log(err));     
        super.enable();
    }
}

