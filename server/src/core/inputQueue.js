const inputQueue = new Map();

export function enqueueInput(clientId, input) {
    if (!inputQueue.has(clientId)) {
        inputQueue.set(clientId, []);
    }
    inputQueue.get(clientId).push(input);
}

export function dequeueInputs() {
    const queued = new Map(inputQueue);
    inputQueue.clear();
    return queued;
}

export { inputQueue };
