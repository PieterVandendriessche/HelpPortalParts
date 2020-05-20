
import ApplicationCustomizerContext from "@microsoft/sp-application-base/lib/extensibility/ApplicationCustomizerContext";
import * as React from "react";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/content-types";
import { IContentType } from "@pnp/sp/content-types";
import { sp, ContentTypes, IContentTypes } from "@pnp/sp/presets/all";
import styles from "./SiteBreadcrumb.module.scss";
import { ClientType, getClientType } from "./ClientType";



export interface ISiteBreadcrumbState {
    isHome: boolean;
    loaded: boolean;
}


export class SiteBreadcrumb extends React.Component<{}, ISiteBreadcrumbState> {
    constructor(props) {
        super(props);



    }

    public canNavigateBack = (): boolean => {
        const clientType: ClientType = getClientType();
        if (clientType === ClientType.SharePointMobileApp) return false;
        var locationString: string = window.location.href;

        if (locationString.match(new RegExp(".*\/Home[_]*[a-zA-Z]*.aspx$", "i"))) return false;
        if (locationString.match(new RegExp(".*sites\/.*\/$", "i"))) return false;
        if (locationString.match(new RegExp(".*sites\/[^/]*$", "i"))) return false;
        if (locationString.match(".*sites\/[^/]*$")) return false;
        if (window.history.length > 2) return true;
        return false;
    }


    public render() {
        return (
            (this.canNavigateBack() ? (
                <div className={styles.breadcrumb}><a onClick={() => window.history.back()}>{" < Back"}</a></div>
            ) : (
                    <div className={styles.empty}></div>
                ))
        );

    }
}