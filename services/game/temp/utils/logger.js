export function info(message) {
    console.log(`[INFO] ${new Date().toLocaleTimeString()} - ${message}`);
}

export function error(message) {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
}
