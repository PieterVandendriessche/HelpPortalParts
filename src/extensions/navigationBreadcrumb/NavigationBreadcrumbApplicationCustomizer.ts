import { override } from '@microsoft/decorators';
import {
  BaseApplicationCustomizer, PlaceholderName, PlaceholderContent
} from '@microsoft/sp-application-base';

import * as React from "react";
import * as ReactDom from 'react-dom';
import { SiteBreadcrumb } from "../navigationBreadcrumb/components/SiteBreadcrumb";

const LOG_SOURCE: string = 'NavigationBreadcrumbApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface INavigationBreadcrumbApplicationCustomizerProperties {
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class NavigationBreadcrumbApplicationCustomizer
  extends BaseApplicationCustomizer<INavigationBreadcrumbApplicationCustomizerProperties> {

  private _headerPlaceholder: PlaceholderContent;
  @override
  public onInit(): Promise<void> {

    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);
    this.context.application.navigatedEvent.add(this, () => {
      this.startReactRender();
    });

    return Promise.resolve();
  }

  private _renderPlaceHolders(): void {
    // Check if the header placeholder is already set and if the header placeholder is available
    if (!this._headerPlaceholder && this.context.placeholderProvider.placeholderNames.indexOf(PlaceholderName.Top) !== -1) {
      this._headerPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top, {
        onDispose: this._onDispose
      });

      // The extension should not assume that the expected placeholder is available.
      if (!this._headerPlaceholder) {
        console.error('The expected placeholder (PageHeader) was not found.');
        return;
      }

      if (this._headerPlaceholder.domElement) {
        const element: React.ReactElement = React.createElement(
          SiteBreadcrumb,
          {
            context: this.context
          }
        );
        ReactDom.render(element, this._headerPlaceholder.domElement);
      }
    }
  }

  private startReactRender() {
    if (this._headerPlaceholder && this._headerPlaceholder.domElement) {
      const element: React.ReactElement = React.createElement(SiteBreadcrumb, {
        context: this.context
      });
      ReactDom.render(element, this._headerPlaceholder.domElement);
    } else {
      console.log('DOM element of the header is undefined. Start to re-render.');
      this._renderPlaceHolders();
    }
  }

  private _onDispose(): void {
    console.log('[Breadcrumb._onDispose] Disposed breadcrumb.');
  }
}
