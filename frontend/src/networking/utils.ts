import { htmlManager } from "../html/HtmlManager";
import { NotificationType } from "../html/NotificationHtml";
import { routeManager } from "../route/RouteManager";
import { stateManager } from "../state/StateManager";
import { postRequest } from "./request";

export async function fetchHTML(path: string): Promise<HTMLDivElement> {
    const url = `https://${window.location.hostname}:7000/html/` + path + ".html";
    const response = await fetch(url, { redirect: "error" })

    if (!response.ok) {
        Promise.reject(response)
    };

    const text = await response.text();
    const div = document.createElement("div");
    div.innerHTML = text;
    return div.firstChild as HTMLDivElement;
}

export async function createGame() {
    postRequest("lobby/create", {
        mode: stateManager.gameMode,
        map: stateManager.gameMap
    })
        .then((json: any) => {
            stateManager.lobbyId = json.lobbyId;
            routeManager.nav("/lobby", false, false);
        })
        .catch((err) => {
            htmlManager.notification.add({ type: NotificationType.error, text: err });
            routeManager.nav("/play", false, false);
        })
}
