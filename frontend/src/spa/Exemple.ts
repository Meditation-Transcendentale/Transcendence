//faut utiliser "../babyImport.ts" plutot que  "@babylonImport" parce que nikBabylon  et nikEsbuild
import { Matrix } from "../babyImport";
import { App3D } from "../3d/App";
import { NotificationManager } from "./NotificationManager";
import { Popup } from "./Popup";

interface exempleHtmlReference {
	exempleDiv: { html: HTMLDivElement, id: number };
	popupDiv: HTMLDivElement;
	notifDiv: HTMLDivElement;
	exemple: HTMLInputElement,
	popup: HTMLInputElement,
	notif: HTMLInputElement
}

export default class Exemple {
	//comme d'hab mais limite inutile vue comment et gerer l'ajout du html
	private div: HTMLDivElement;
	//comme d'hab
	private ref: exempleHtmlReference;

	//comme on append plus la div en entier, on doit recupere le lien css
	private css: HTMLLinkElement;

	private state: boolean;

	constructor(div: HTMLDivElement) {
		this.div = div;
		//en vrai le plus simple c'est de le recup en utilisant le selector lien vue qu'en general c'est le seul lien qu'on peu avoir
		//meme si en vrai bizarre parce que t'as vue en vrai ya peut etre moyen de faire de l'injection de scripts bizarre mais nik
		this.css = div.querySelector("link") as HTMLLinkElement;

		this.state = true;

		//comme d'hab, bon un peut different maintenant pour le html 3d on besoin du donné en plus, 
		//l'id, qu'on recupere en l'ajoutant au CSSRenderer, voir plus bas
		this.ref = {
			exempleDiv: { html: div.querySelector("#exemple-exemple") as HTMLDivElement, id: -1 },
			popupDiv: div.querySelector("#exemple-popup") as HTMLDivElement,
			notifDiv: div.querySelector("#exemple-notif") as HTMLDivElement,
			exemple: div.querySelector("#exemple-exemple-input") as HTMLInputElement,
			popup: div.querySelector("#exemple-popup-input") as HTMLInputElement,
			notif: div.querySelector("#exemple-notif-input") as HTMLInputElement,
		}

		//ok truc nouveau pour rajouter un element dans le css 3D on passe par App3D
		//et on recupre sont id pour pouvoir l'enable / disable tranquil
		this.ref.exempleDiv.id = App3D.addCSS3dObject({
			html: this.ref.exempleDiv.html, //le html qui seras utiliser
			width: 1, //le scaling de la largeur sauf que /!\ enfait c'est inversé < 1 s'a agrandi | > 1 sa reduit
			height: 1, //le meme principe que pour la largeur
			world: Matrix.RotationY(Math.PI).multiply(Matrix.Translation(0, 6, 30)),
			enable: false //disable par defaut mais faut quand meme le préciser t'as vus
		})

		//ex de comment rajouter une notif qui est une div et pas juste du text
		this.ref.exemple.addEventListener("click", () => {
			const n = this.ref.notifDiv.cloneNode(true) as HTMLDivElement; //ici on clone la div pour pouvoir avoir plusieur itération de la notif
			n.addEventListener("click", () => { //ducoup on gere ces eventListener
				Popup.addPopup(this.ref.popupDiv); //ici la div permet de rajouter un popup en faisant appel l'objet accessible partout Popup, il suffit de call Popup.addPopup avec le html qu'on veut utliser comme popup
			})
			NotificationManager.addDiv(n); //Pour rajouter un notif on fait appel a l'object accessible partout NotificationManager on utilisant la methode addDiv vue qu'on veut rajouter une div t'as capté
		})

		//this.ref.notif.addEventListener("click", () => {
		//	Popup.addPopup(this.ref.popupDiv);
		//})

		this.ref.popup.addEventListener("click", () => {
			NotificationManager.addText("ouai, ca va?"); //la version des notif qui sont juste du text, voila plutot explicite
			this.state = !this.state;
			//Popup.removePopup(); //Si jamais on veut supprimer le popup sans passer par la methode par defaut qui est de juste cliquer sur le blur, on peut call removePopup
			App3D.setVue((this.state ? "exemple1" : "exemple2")); //expliquer dans load
		})

		//Aussi pour les popups on peut call plusieur fois de suite Popup.addPopup()
		//pour le moment plusieur popups sont accessible en meme temps dans la meme instance de popup
		//(tant que Popup.removePopup()) n'as pas été call
		//Et si jamais, on peut aussit juste .remove() la div passé dans Popup.addPopup()

		//Pour les notif leur durée de base et de 5s ca peut se change dans le fichier src/spa/NotificationManager.ts,
		//la propriété defaultDuration
	}

	public load(param: URLSearchParams) {
		//ducoup comme dit plus haut on append le css utiliser pour l'html courant a document.head
		document.head.appendChild(this.css);
		//Ok App3D.setVue() a vite fait changer de fonction
		//maintenant c'est utliser pour:
		//	-choisir la camera utliser:
		//		-fieldCamera pour tout ce qui est menuing / ui t'as capté
		//		-les camera correspondant pour les jeux (br, pong, brick)
		//	-la position de la camera
		//	-la target de la camera, sauf que nikBabylon ca peut tout niker cf click sur <<EXEMPLE>> dans /home
		//Et tout ca se fait dans src/3d/Field.ts dans setVue()
		App3D.setVue((this.state ? "exemple1" : "exemple2"));
		//pour afficher les elements 3d on call ce qui a en dessous avec true
		App3D.setCSS3dObjectEnable(this.ref.exempleDiv.id, true);
	}

	public unload() {
		//pour retirer les elements 3d on call ce qui a en dessous avec false
		App3D.setCSS3dObjectEnable(this.ref.exempleDiv.id, false);
		//et on elenve le css comme ca pas de risque de conflit avec les autres fichiers enfin en theorie
		this.css.remove();
	}
}
