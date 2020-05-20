import * as React from 'react';
import { ILinkItem } from "../models/ILinkItem";
import styles from "../webparts/helpPortalPagePicker/components/HelpPortalPagePicker.module.scss";
import { Link } from 'office-ui-fabric-react';

export interface ILinkItemProps {
    linkItem: ILinkItem;
}



export const LinkItem: React.StatelessComponent<ILinkItemProps> = (props: ILinkItemProps) => {
    return (
        <div className={styles.dropdownButton}>
            <Link href={props.linkItem.url} target={props.linkItem.openInTab ? "_blank" : "_self"}> {props.linkItem.displayTitle}</Link>
        </div>);
};