import * as React from 'react';
import styles from './HelpPortalPagePicker.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import * as strings from "HelpPortalPagePickerWebPartStrings";
import { ILinkItem } from '../../../models/ILinkItem';
import { DropDownPicker } from "../../../components/DropdownPicker";
import { LinkItem } from "../../../components/LinkItem";
import { css } from 'office-ui-fabric-react';

export interface IHelpPortalPagePickerProps {
  description: string;
  displayInDropdown: boolean;
  linkItems: ILinkItem[];
  showCustomTitle: boolean;
  showCustomIcon: boolean;
  customTitle: string;
  iconName: string;
  floatDropdownRight: boolean;
  customTitleRow: string;
  showCustomTitleRow: boolean;
}

export default class HelpPortalPagePicker extends React.Component<IHelpPortalPagePickerProps, {}> {

  private _renderNoItems = (): JSX.Element => {
    return (<MessageBar messageBarType={MessageBarType.warning}>
      {strings.NoItemsConfigured}
    </MessageBar>);
  }

  private _renderItemsInRows = (): JSX.Element => {
    var elementsSorted = this.props.linkItems.sort((a, b) => a.sortIdx - b.sortIdx);

    return (
      <div>
        <div className={"ms-Grid"} dir="ltr">
          {this.props.showCustomTitleRow && (
            <b>{this.props.customTitleRow}</b>
          )}
          <div className={css("ms-Grid-Row", styles.resultRow)}>
            {elementsSorted.map(item => {
              return (
                <div className={"ms-Grid-col ms-lg3"}>
                  <LinkItem linkItem={item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>);
  }

  private _renderItemsAsDropdown = (): JSX.Element => {
    return (<div className={styles.helpPortalPagePicker}>
      <DropDownPicker
        linkItems={this.props.linkItems}
        showCustomTitle={this.props.showCustomTitle}
        customTitle={this.props.customTitle}
        iconName={this.props.iconName}
        showCustomIcon={this.props.showCustomIcon}
        floatDropdownRight={this.props.floatDropdownRight}
      >

      </DropDownPicker>
    </div>);
  }

  public render(): React.ReactElement<IHelpPortalPagePickerProps> {
    const { linkItems } = this.props;
    if (null === linkItems || linkItems === undefined || linkItems.length === 0) {
      return this._renderNoItems();
    }
    else {
      if (this.props.displayInDropdown) {
        return this._renderItemsAsDropdown();
      }
      else return this._renderItemsInRows();
    }
  }
}
