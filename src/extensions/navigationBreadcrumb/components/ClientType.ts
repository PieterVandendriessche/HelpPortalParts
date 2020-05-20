export enum ClientType {
    Browser,
    TeamsApp,
    SharePointMobileApp
}

export const getClientType = (): ClientType => {

    const userAgent: string = window.navigator.userAgent.toLocaleLowerCase();

    if (userAgent.indexOf("sharepoint for") > -1) {
        return ClientType.SharePointMobileApp;
    } else if (userAgent.indexOf("teams") > -1 && userAgent.indexOf("electron") > -1) {
        return ClientType.TeamsApp;
    } else {
        return ClientType.Browser;
    }
};