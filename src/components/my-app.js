import { LitElement, html, css } from 'lit';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

// These are the elements needed by this element.
import '@material/mwc-drawer';
import '@material/mwc-top-app-bar';
import { menuIcon } from './my-icons.js';
import './snack-bar.js';

class MyApp extends LitElement {
  static get properties() {
    return {
      appTitle: { type: String },
      _page: { type: String },
      _drawerOpened: { type: Boolean },
      _snackbarOpened: { type: Boolean },
      _offline: { type: Boolean }
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;

          --app-drawer-width: 256px;

          --app-primary-color: #E91E63;
          --app-secondary-color: #293237;
          --app-dark-text-color: var(--app-secondary-color);
          --app-light-text-color: white;
          --app-section-even-color: #f7f7f7;
          --app-section-odd-color: white;

          --app-header-background-color: white;
          --app-header-text-color: var(--app-dark-text-color);
          --app-header-selected-color: var(--app-primary-color);
          --mdc-theme-primary: var(--app-header-background-color);
          --mdc-theme-on-primary: var(--app-header-text-color);

          --app-drawer-background-color: var(--app-secondary-color);
          --app-drawer-text-color: var(--app-light-text-color);
          --app-drawer-selected-color: #78909C;
          --mdc-theme-surface: var(--app-drawer-background-color);
        }

        app-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          text-align: center;
          background-color: var(--app-header-background-color);
          color: var(--app-header-text-color);
          border-bottom: 1px solid #eee;
        }

        .toolbar-top {
          background-color: var(--app-header-background-color);
          text-align: center;
        }

        [main-title] {
          font-size: 30px;
        }

        .toolbar-list {
          display: none;
        }

        .toolbar-list > a {
          display: inline-block;
          color: var(--app-header-text-color);
          text-decoration: none;
          line-height: 30px;
          padding: 4px 24px;
        }

        .toolbar-list > a[selected] {
          color: var(--app-header-selected-color);
          border-bottom: 4px solid var(--app-header-selected-color);
        }

        .menu-btn {
          background: none;
          border: none;
          fill: var(--app-header-text-color);
          cursor: pointer;
          height: 44px;
          width: 44px;
        }

        .drawer-list {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          padding: 24px;
          background: var(--app-drawer-background-color);
          position: relative;
        }

        .drawer-list > a {
          display: block;
          text-decoration: none;
          color: var(--app-drawer-text-color);
          line-height: 40px;
          padding: 0 24px;
        }

        .drawer-list > a[selected] {
          color: var(--app-drawer-selected-color);
        }

        /* Workaround for IE11 displaying <main> as inline */
        main {
          display: block;
        }

        .main-content {
          min-height: 100vh;
        }

        .page {
          display: none;
        }

        .page[active] {
          display: block;
        }

        footer {
          padding: 24px;
          background: var(--app-drawer-background-color);
          color: var(--app-drawer-text-color);
          text-align: center;
        }

        /* Wide layout: when the viewport width is bigger than 460px, layout
        changes to a wide layout */
        @media (min-width: 460px) {
          .toolbar-list {
            display: block;
          }

          .menu-btn {
            display: none;
          }

          /* The drawer button isn't shown in the wide layout, so we don't
          need to offset the title */
          [main-title] {
            padding-right: 0px;
          }
        }
      `
    ];
  }

  render() {
    // Anything that's related to rendering should be done in here.
    return html`
      <mwc-drawer type="modal"
        .open="${this._drawerOpened}"
        @MDCDrawer:closed="${ this._drawerOpenedChanged }">
        <!-- Drawer content -->
        <nav class="drawer-list">
          <a ?selected="${this._page === 'view1'}" href="/view1">View One</a>
          <a ?selected="${this._page === 'view2'}" href="/view2">View Two</a>
          <a ?selected="${this._page === 'view3'}" href="/view3">View Three</a>
        </nav>

        <div slot="appContent">
          <!-- Header -->
          <mwc-top-app-bar class="toolbar-top" centerTitle>
            <button class="menu-btn" title="Menu" @click="${this._menuButtonClicked}" slot="navigationIcon">${menuIcon}</button>
            <div main-title slot="title">${this.appTitle}</div>

            <!-- This gets hidden on a small screen-->
            <nav class="toolbar-list">
              <a ?selected="${this._page === 'view1'}" href="/view1">View One</a>
              <a ?selected="${this._page === 'view2'}" href="/view2">View Two</a>
              <a ?selected="${this._page === 'view3'}" href="/view3">View Three</a>
            </nav>
          </mwc-top-app-bar>

          <!-- Main content -->
          <main role="main" class="main-content">
            <my-view1 class="page" ?active="${this._page === 'view1'}"></my-view1>
            <my-view2 class="page" ?active="${this._page === 'view2'}"></my-view2>
            <my-view3 class="page" ?active="${this._page === 'view3'}"></my-view3>
            <my-view404 class="page" ?active="${this._page === 'view404'}"></my-view404>
          </main>

          <footer>
            <p>Made with &hearts;.</p>
          </footer>

          <snack-bar ?active="${this._snackbarOpened}">
            You are now ${this._offline ? 'offline' : 'online'}.
          </snack-bar>
        </div>
      </mwc-drawer>
    `;
  }

  constructor() {
    super();
    this._drawerOpened = false;
  }

  firstUpdated() {
    installRouter((location) => this._locationChanged(location));
    installOfflineWatcher((offline) => this._offlineChanged(offline));
    installMediaQueryWatcher(`(min-width: 460px)`,
        (matches) => this._layoutChanged(matches));
  }

  updated(changedProps) {
    if (changedProps.has('_page')) {
      const pageTitle = this.appTitle + ' - ' + this._page;
      updateMetadata({
        title: pageTitle,
        description: pageTitle
        // This object also takes an image property, that points to an img src.
      });
    }
  }

  _layoutChanged(isWideLayout) {
    // The drawer doesn't make sense in a wide layout, so if it's opened, close it.
    this._updateDrawerState(false);
  }

  _offlineChanged(offline) {
    const previousOffline = this._offline;
    this._offline = offline;

    // Don't show the snackbar on the first load of the page.
    if (previousOffline === undefined) {
      return;
    }

    clearTimeout(this.__snackbarTimer);
    this._snackbarOpened = true;
    this.__snackbarTimer = setTimeout(() => { this._snackbarOpened = false }, 3000);
  }

  _locationChanged(location) {
    const path = window.decodeURIComponent(location.pathname);
    const page = path === '/' ? 'view1' : path.slice(1);
    this._loadPage(page);
    // Any other info you might want to extract from the path (like page type),
    // you can do here.

    // Close the drawer - in case the *path* change came from a link in the drawer.
    this._updateDrawerState(false);
  }

  _updateDrawerState(opened) {
    if (opened !== this._drawerOpened) {
      this._drawerOpened = opened;
    }
  }

  _loadPage(page) {
    switch(page) {
      case 'view1':
        import('../components/my-view1.js').then((module) => {
          // Put code in here that you want to run every time when
          // navigating to view1 after my-view1.js is loaded.
        });
        break;
      case 'view2':
        import('../components/my-view2.js');
        break;
      case 'view3':
        import('../components/my-view3.js');
        break;
      default:
        page = 'view404';
        import('../components/my-view404.js');
    }

    this._page = page;
  }

  _menuButtonClicked() {
    this._updateDrawerState(true);
  }

  _drawerOpenedChanged(e) {
    this._updateDrawerState(e.target.opened);
  }
}

window.customElements.define('my-app', MyApp);
