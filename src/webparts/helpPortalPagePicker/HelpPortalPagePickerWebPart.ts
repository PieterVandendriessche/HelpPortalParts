import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  IPropertyPaneGroup,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption,
} from '@microsoft/sp-webpart-base';
import { PropertyFieldCollectionData, CustomCollectionFieldType } from "@pnp/spfx-property-controls/lib/PropertyFieldCollectionData";


import * as strings from 'HelpPortalPagePickerWebPartStrings';
import HelpPortalPagePicker from './components/HelpPortalPagePicker';
import { IHelpPortalPagePickerProps } from './components/HelpPortalPagePicker';
import { ILinkItem } from '../../models/ILinkItem';
import { availableIcons } from "../../icons";

export interface IHelpPortalPagePickerWebPartProps {
  description: string;
  displayDropdown: boolean;
  linkItems: ILinkItem[];
  showCustomTitle: boolean;
  showCustomTitleRow: boolean;
  showIcon: boolean;
  customTitle: string;
  customTitleRow: string;
  iconName: string;
  dropdownFloatRight: boolean;
}
export default class HelpPortalPagePickerWebPart extends BaseClientSideWebPart<IHelpPortalPagePickerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IHelpPortalPagePickerProps> = React.createElement(
      HelpPortalPagePicker,
      {
        description: this.properties.description,
        displayInDropdown: this.properties.displayDropdown,
        linkItems: this.properties.linkItems,
        showCustomTitle: this.properties.showCustomTitle,
        customTitle: this.properties.customTitle,
        iconName: this.properties.iconName,
        showCustomIcon: this.properties.showIcon,
        floatDropdownRight: this.properties.dropdownFloatRight,
        showCustomTitleRow: this.properties.showCustomTitleRow,
        customTitleRow: this.properties.customTitleRow
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private _convertIconsToChoiceGroup(): IPropertyPaneDropdownOption[] {
    return availableIcons.sort().map((item => ({
      key: item, text: item
    }) as IPropertyPaneDropdownOption));
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    let templateProperty: IPropertyPaneGroup;
    if (this.properties.displayDropdown) {
      templateProperty = {
        groupName: "Dropdown settings",
        isCollapsed: false,
        groupFields: [
          PropertyPaneToggle('showCustomTitle', {
            label: strings.Links_DropDown_ShowTitle,
          }),
          PropertyPaneTextField('customTitle', {
            label: strings.Links_DropDown_CustomTitle,
            maxLength: 30,
            disabled: !this.properties.showCustomTitle
          }),
          PropertyPaneToggle('showIcon', {
            label: strings.Links_DropDown_ShowIcon,
          }),
          PropertyPaneDropdown('iconName', {
            label: strings.Links_DropDown_IconName,
            options: this._convertIconsToChoiceGroup(),
            selectedKey: availableIcons[0],
            disabled: !this.properties.showIcon
          }),
          PropertyPaneToggle('dropdownFloatRight', {
            label: strings.Links_DropDown_FloatRight,
            checked: false
          }),
        ]
      };
    }
    else {
      templateProperty = {
        groupName: "Row settings",
        groupFields: [
          PropertyPaneToggle('showCustomTitleRow', {
            label: strings.Links_Row_ShowTitle,
          }),
          PropertyPaneTextField('customTitleRow', {
            label: strings.Links_Row_CustomTitle,
            maxLength: 30,
            disabled: !this.properties.showCustomTitleRow
          }),
        ]
      };
    }

    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.StylingGroup,
              groupFields: [
                PropertyPaneToggle('displayDropdown', {
                  label: strings.Links_DropdownMenu,
                  checked: true
                }),
                PropertyFieldCollectionData("linkItems", {
                  key: "linkItems",
                  label: strings.Links_ManageLinks,
                  panelHeader: strings.Links_ManageLinks,
                  manageBtnLabel: strings.Links_ManageLinksBtn,
                  value: this.properties.linkItems,
                  enableSorting: true,
                  fields: [
                    {
                      id: "displayTitle",
                      title: strings.Links_ManageLinks_displayName,
                      type: CustomCollectionFieldType.string,
                      required: true,
                      onGetErrorMessage: ((value: string) => {
                        return value.length > 30 ? "Max amount of characters is 30." : "";
                      })
                    },
                    {
                      id: "url",
                      title: strings.Links_ManageLinks_url,
                      type: CustomCollectionFieldType.url,
                      required: true
                    },
                    {
                      id: "openInTab",
                      title: strings.Links_ManageLinks_tab,
                      type: CustomCollectionFieldType.boolean,
                      defaultValue: true
                    }
                  ]
                })
              ]
            },
            templateProperty
          ]
        }
      ]
    };
  }
}
