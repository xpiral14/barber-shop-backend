/* eslint-disable no-undef */
declare module 'jspanel4/es6module/jspanel' {
  type AutocloseObject = {
    /**
     * Integer is interpreted as time in milliseconds until the panel closes.
     *
     * String can be any value that can be assigned to the CSS property animation-duration
     */
    time?: string | number
    background?: string
    /**
     * By default the progressbar is shown. false turns it off
     * If progressbar is set to false any setting of background has no effect
     */
    progressbar?: boolean
    /**
     * Defaults to the primary color of the theme success
     *
     * Allows to set a custom background for the progressbar. Supported values include:
     * - any valid css color value or gradient
     * - any color name (without modifier) that can be applied to option theme
     * - any built-in theme name (without modifier)
     * Any background setting has no effect when progressbar is set to false
     */
    background?: string
  }

  type Size = {
    width: string | number | (() => {})
    height: string | number | (() => {})
  }
  type CreateOptions = {
    position?: string
    contentSize?: string
    contentAjax?: any
    addCloseControl?: number
    animateIn?: string
    animateOut?: string

    /**
     * Object - see description in Object properties
     *
     * Integer - sets a time in milliseconds until panel closes and uses
     * defaults for the other properties as described in Object properties
     *
     * Boolean true - uses the defaults described in Object properties
     */
    autoclose?: number | boolean | AutocloseObject

    /**
     * Applies a CSS border to all for sides of the panel.
     *
     */
    border?: string

    /**
     *
     * Applies a CSS border-radius to all for corners of the panel.
     *
     * >*To add a border radius to an existing panel use the panel method
     *  [setBorderRadius()](https://jspanel.de/#methods/setBorderRadius)*
     *
     */
    borderRadius?: string

    /**
     * Applies a CSS ox-shadow to the panel.
     */
    boxShadow?: number

    /**
     * A callback function to execute after the panel was inserted into the
     * document.
     */
    callback?: () => void

    /**
     * Closes a panel on pressing the `Esc` key. If more than one panel in the
     * document has this option enabled each `Esc` keypress closes the topmost
     * (highest z-index) panel.
     */
    closeOnEscape?: boolean

    /**
     * Option config is a predefined configuration object that will be merged
     * with the standard jsPanel configuration object and might be useful when
     * you have a number of panels sharing the same options.
     */
    config?: CreateOptions

    /**
     * Sets the parent element of the panel.
     *
     * - By default option container is set with the string 'window'. That means
     * the panel is appended to the <body> element and positioned fixed within
     * the browser viewport.
     *
     * - A string other than 'window' is assumed to be a selector string which
     * is passed to document.querySelector(). That means that the first element
     * matching the selector is used as container for the panel. The panel is
     * positioned absolute within the container.
     *
     * - If option container is an Object whose property nodeType reads 1 the
     * panel is appended to this object.
     *
     * - If option container does not return a valid container no panel is
     * created and an error panel is shown.
     *
     * ***Important note***:
     * If you set option container to an element other than <body> the container
     *  must have a CSS position value of either 'relative', 'absolute' or
     * 'fixed' in order to have panel positioning work as intended.
     */
    container?: string | HTMLElement

    content?: string | HTMLElement | (() => void)

    /**
     * Gets a resource via XMLHttpRequest and optionally loads the response text
     * into the content section of the panel.
     *
     * - A String value is assumed to be an URL pointing to a resource returning
     * content that is to be used as content of the panel. After successful
     * completion of the request the value of the responseText property is
     * converted to a DocumentFragment and the current content of the panel is
     * replaced with the DocumentFragment.
     * That also executes code in script tags that might be contained in the
     * responseText.
     *
     * - Using an Object allows to configure a more detailed request. If url is
     * the only parameter of the object the result is the same as using a string.
     */
    contentAjax?: string | object

    /**
     * Gets a resource via the Fetch API and optionally loads the response into
     * the content section of the panel.
     *
     * A String value is assumed to be an URL pointing to a resource returning
     * content that is to be used as content of the panel. After successful
     * completion of the request the value of the response property is
     * converted to a DocumentFragment and the current content of the panel is
     * replaced with the DocumentFragment. That also executes code in script
     * tags that might be contained in the responseText.
     *
     * Using an Object allows to configure a more detailed request.If resource
     * is the only parameter of the object the result is the same as using
     * a string.
     */
    contentFetch?: string | object

    /**
     * Sets CSS overflow properties for the content section.
     */
    contentOverflow?: string

    /**
     * Sets the dimensions of the content section of the panel whereas
     * option.panelSize sets the dimensions of the complete panel.
     *
     * To resize an existing panel use the panel method
     * [`resize()`](https://jspanel.de/#methods/resize)
     */
    contentSize?: string | Size

    /**
     * Stores optional custom data.
     *
     * *This option does not influence the shown panel in any way. It's just a place to store optional data of any kind. However, when using the layout extension, the data passed to option data is stored in localStorage/sessionStorage when calling `jsPanel.layout.save()`*
     */
    data?: any

    /**
     * This option configures the dragit interaction.
     *
     * By default a jsPanel is draggable. Default drag handles are the header
     * logo, the titlebar and the footer toolbar (if used). The content section
     * and the header toolbar are not used as drag handle.
     */
    dragit?: object | false

    /**
     * This option adds a footer toolbar to the panel which by default will also
     * act as drag handle.
     *
     * By default the complete footer toolbar including its contents act as
     * drag handle. If you don't want a specific footer element act as drag
     * handle simply add the class 'jsPanel-ftr-btn' to it.
     *
     * To add a toolbar to an existing panel use the panel method addToolbar().
     * The main toolbar element <div class="jsPanel-ftr"></div> is always
     * present, even when you don't configure a toolbar (in this case it's
     * simply hidden).
     *
     * When a toolbar is configured it automatically gets the additional CSS
     * class 'active' in order to show it.
     *
     * So in order to hide/show a configured/existing toolbar you just need to
     * toggle its 'active' class. For example with the global method
     * `jsPanel.toggleClass(panel.footer, 'active')`; where panel is a
     * reference to the panel and footer references the above mentioned toolbar <div>.
     */
    footerToolbar?:
      | string
      | (string | HTMLElement)[]
      | HTMLElement
      | ((panel: Panel) => void)

    /**
     * This option removes or auto show/hides the complete header section.
     *
     * *Remember that removing the header section also removes all default
     * controls. And unless you configure a footer toolbar there's no drag
     * handle either*.
     *
     * *If you 'auto-show-hide' the header section and want the panel to have a
     * border don't use option border. Apply a border to the content section
     * instead as shown in example 2.*
     */
    header?: boolean | string

    /**
     * With this option you can configure which panel controls are shown, set their size and add additional custom controls.
     *
     * *To alter a control's status of an existing panel use the panel method
     * [`setControlStatus()`](https://jspanel.de/#methods/setControlStatus)*
     *
     * *More details on [`headerControls`](https://jspanel.de/#options/headerControls)*
     *
     */
    headerControls?: string | object

    /**
     * This option adds a logo to the top left corner of the panel (left of the
     * header title).
     *
     * *To set or change the logo of an existing panel use the panel method
     * [`setHeaderLogo()`](https://jspanel.de/#methods/setHeaderLogo)*
     */
    headerLogo?: string

    /**
     * This option sets the header title.
     * *To set or change the title of an existing panel use the panel method
     * [`setHeaderTitle()`](https://jspanel.de/#methods/setHeaderTitle)*
     */
    headerTitle?: string | HTMLElement | ((panel: Panel) => string)

    /**
      * This option adds a header toolbar.
      * 
      * To add a toolbar to an existing panel use the panel method addToolbar().
      * 
      * The main toolbar element <div class="jsPanel-hdr-toolbar"></div> is 
      * always present, even when you don't configure a toolbar (in this case
      * it's simply hidden).
      * 
      * When a toolbar is configured it automatically gets the additional CSS
      * class 'active' in order to show it.
      *
      *So in order to hide/show a configured/existing toolbar you just need to
      toggle its 'active' class. For example with the global method
      jsPanel.toggleClass(panel.headertoolbar, 'active');
      where panel is a reference to the panel and headertoolbar references
      the above mentioned toolbar <div>.
      */
    headerToolbar?:
      | string
      | (string | HTMLElement)[]
      | HTMLElement
      | ((panel: Panel) => void)

    /**
     * By default jsPanel uses a set of built-in SVG icons for the controls.
     * If you prefer to use another set of icons you can configure it with
     * this option.
     *
     * Supported are Font Awesome icons, Material Icons and Glyphicons
     * (Bootstrap 3).
     */
    iconfont?:
      | 'fa'
      | 'fas'
      | 'far'
      | 'fal'
      | 'fad'
      | 'material-icons'
      | 'bootstrap'
      | 'glyphicon'
      | Array

    id?: string | (() => string)

    /**
     * This option limits the width and height of a maximized panel in order
     * to keep a specified distance from the top, right, bottom and left
     * boundaries of either the browser viewport (if option container is set to
     * 'window' which is the default) or the panel's parent element.
     */
    maximizedMargin?: number[] | number

    minimizeTo?: string | boolean

     /**
      * 
      */
    onbeforeclose?: FunctionWithPanelInMethod
  }

  type FunctionWithPanelInMethod = <R = void>
    (panel: Panel) => R
  

  export type Panel = {}

  type JsPanel = {
    modal: any
    create: (option: CreateOptions) => Panel
    autopositionSpacing?: number
    colorFilled?: number
    colorFilledDark?: number
    colorFilledLight?: number
  }
  export const jsPanel: JsPanel
}
