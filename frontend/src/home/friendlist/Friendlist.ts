import { ABlock } from "../../ABlock";
import { SimpleForm } from "../../customElements/SimpleForm";
import { CustomEvents } from "../../CustomEvents";
import { deleteFriend_Request, friendlist_Request, addFriend_Request, Friend} from "../../requests";
import { createContainer } from "../../utils";



export class Friendlist extends ABlock {

    private friendList: HTMLTableElement | null = null;


	constructor(parent: HTMLElement) {
		super(parent);

		this.init();
	}

    private init(){
        this.container = createContainer("friendlist-container", "friendlist");
        this.container.addEventListener("enable", () => this.enable());
        this.container.addEventListener("disable", () => this.disable());
    }

    private async enable() {
        this.container.innerHTML = '';
        this.friendList = document.createElement("table");
        try {
            console.log("error?");
            const resp = await friendlist_Request();
            console.log(resp);
            if (resp.status === 404) {
                console.log("error?");
                const noFriendMessage = document.createElement("p");
                noFriendMessage.innerText = "You have no friends 😢";
                this.container.appendChild(noFriendMessage);
                return;
            }
            if (resp.ok) {
                const data = resp.json;
                (data.friendlist as Friend[]).forEach((friend) => {
                    const tr = document.createElement("tr");
                    const td = document.createElement("td");
                    td.innerText = friend.friend_username;
                    tr.appendChild(td);

                    tr.appendChild(this.createButton("Remove", async () => {
                        await deleteFriend_Request(friend.friend_username);
                    }));
                    tr.appendChild(this.createButton("Block", async () => {
                        //
                    }));
                    tr.appendChild(this.createButton("Stats", async () => {
                        // await deleteFriend_Request(friend.friend_username);
                    }));
                    this.friendList!.appendChild(tr);
                });
                if (this.friendList){
                    this.container.appendChild(this.friendList);
                }
            } else {
                throw new Error("Failed to fetch friendlist");
            }
        } catch (err) {
            console.log(err);
        }
        super.enable();
    }

    private createButton(label: string, onClick: () => void): HTMLInputElement {
        const btn = document.createElement("input");
        btn.type = "button";
        btn.value = label;
        btn.addEventListener("click", onClick);
        return btn;
    }
}

