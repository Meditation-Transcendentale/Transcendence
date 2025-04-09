export class WebSocketManager {
    public socket: WebSocket;
    private messageQueue: any[] = [];

    constructor(url: string) {
        this.socket = new WebSocket(url);
        this.socket.onopen = () => console.log("Connected to server");
        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.handleMessage(data);
        };
        this.socket.onerror = (error) => console.error("WebSocket error", error);
    }

    private handleMessage(data: any): void {
        this.messageQueue.push(data);
    }

    getMessages(): any[] {
        const messages = [...this.messageQueue];
        this.messageQueue = [];
        return messages;
    }

    send(data: any): void {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(data));
        }
    }
}
