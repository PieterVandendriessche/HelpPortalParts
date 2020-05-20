import * as React from 'react';
import { ILinkItem } from "../models/ILinkItem";
import { DefaultButton, IContextualMenuProps, IContextualMenuItem, IIconProps, Icon } from 'office-ui-fabric-react';
import styles from "../webparts/helpPortalPagePicker/components/HelpPortalPagePicker.module.scss";

export interface ButtonPickerProps {
    linkItems: ILinkItem[];
    showCustomTitle: boolean;
    customTitle: string;
    iconName: string;
    showCustomIcon: boolean;
    floatDropdownRight: boolean;
}

function _convertItemsToContextualMenuItems(items: ILinkItem[]): IContextualMenuItem[] {
    return items.map((item: ILinkItem) => ({
        key: item.uniqueId,
        text: item.displayTitle,
        onClick: () => _openpage(item)
    } as IContextualMenuItem));
}
function _openpage(item: ILinkItem): void {
    const target: string = item.openInTab ? "_blank" : "_self";
    window.open(item.url, target);
}


function _createMenuProps(items: ILinkItem[]): IContextualMenuProps {

    return {
        items: _convertItemsToContextualMenuItems(items)
    };
}

export const DropDownPicker: React.StatelessComponent<ButtonPickerProps> = (props: ButtonPickerProps) => {

    const title: string = props.showCustomTitle ? props.customTitle : props.linkItems[0].displayTitle;
    const icon: IIconProps = (props.showCustomIcon) ? { iconName: props.iconName, } : null;
    var buttonStyle = document.body.style;
    if (props.floatDropdownRight) {
        buttonStyle.setProperty("--floatDirection", "right");
    }
    else {
        buttonStyle.setProperty("--floatDirection", "none");
    }

    return (
        <div className={styles.dropdownButton}>
            <DefaultButton
                text={title}
                menuProps={_createMenuProps(props.linkItems)}
                iconProps={icon}
                allowDisabledFocus
                disabled={false}
            />
        </div>);
};