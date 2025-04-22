export function getOrCreateUUID(): string {
    let uuid = 'uuid-' + Math.random().toString(36).substring(2, 11);
    //let uiid = localStorage.getItem('uiid');
    //if (!uiid) {
    //	uiid = 'uiid-' + Math.random().toString(36).substring(2, 11);
    //	//localStorage.setItem('uiid', uiid);
    //}
    return uuid;
}
