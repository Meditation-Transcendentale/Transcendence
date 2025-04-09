export function getOrCreateUIID(): string {
    let uiid = 'uiid-' + Math.random().toString(36).substring(2, 11);
    //let uiid = localStorage.getItem('uiid');
    //if (!uiid) {
    //	uiid = 'uiid-' + Math.random().toString(36).substring(2, 11);
    //	//localStorage.setItem('uiid', uiid);
    //}
    return uiid;
}
