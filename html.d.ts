/*
MIT License

Copyright (c) Facebook, Inc. and its affiliates.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
// the license above refers to the code in this file that is from the React library
// declarations for JSX taken from React and adapted to better represent standard html and to work with rubedo
// in the future it would be interesting to generate the code in this file from the spec directly, but until then this will do
import type { Derived, State } from "rubedo";
import type * as CSS from "./css";
import type * as RUBEDO from ".";

export namespace JSX {
    /** used by typescript to determine the type of jsx expressions */
    type Element = RUBEDO.Elems;
    /** used by typescript to get the type of children from the props */
    interface ElementChildrenAttribute {
        children: {};
    }

    // other available type restrictions for class components (unused for now)
    //
    // /** the type that must be returned by a constructor in order to be allowed as a class component */
    // interface ElementClass extends React.Component<any> {
    //     render(): React.ReactNode;
    // }
    // /** specify the property name to use when checking the types of props on a class component
    //  *
    //  * do not use this interface at all to get the props from the first constructor argument */
    // interface ElementAttributesProperty {
    //     props: {};
    // }

    /** used by typescript to determine the props of each element */
    interface IntrinsicElements {
        // HTML
        a: HTML.AnchorHTMLAttributes<HTMLAnchorElement>;
        abbr: HTML.HTMLAttributes<HTMLElement>;
        address: HTML.HTMLAttributes<HTMLElement>;
        area: HTML.AreaHTMLAttributes<HTMLAreaElement>;
        article: HTML.HTMLAttributes<HTMLElement>;
        aside: HTML.HTMLAttributes<HTMLElement>;
        audio: HTML.AudioHTMLAttributes<HTMLAudioElement>;
        b: HTML.HTMLAttributes<HTMLElement>;
        base: HTML.BaseHTMLAttributes<HTMLBaseElement>;
        bdi: HTML.HTMLAttributes<HTMLElement>;
        bdo: HTML.HTMLAttributes<HTMLElement>;
        big: HTML.HTMLAttributes<HTMLElement>;
        blockquote: HTML.BlockquoteHTMLAttributes<HTMLQuoteElement>;
        body: HTML.HTMLAttributes<HTMLBodyElement>;
        br: HTML.HTMLAttributes<HTMLBRElement>;
        button: HTML.ButtonHTMLAttributes<HTMLButtonElement>;
        canvas: HTML.CanvasHTMLAttributes<HTMLCanvasElement>;
        caption: HTML.HTMLAttributes<HTMLElement>;
        center: HTML.HTMLAttributes<HTMLElement>;
        cite: HTML.HTMLAttributes<HTMLElement>;
        code: HTML.HTMLAttributes<HTMLElement>;
        col: HTML.ColHTMLAttributes<HTMLTableColElement>;
        colgroup: HTML.ColgroupHTMLAttributes<HTMLTableColElement>;
        data: HTML.DataHTMLAttributes<HTMLDataElement>;
        datalist: HTML.HTMLAttributes<HTMLDataListElement>;
        dd: HTML.HTMLAttributes<HTMLElement>;
        del: HTML.DelHTMLAttributes<HTMLModElement>;
        details: HTML.DetailsHTMLAttributes<HTMLDetailsElement>;
        dfn: HTML.HTMLAttributes<HTMLElement>;
        dialog: HTML.DialogHTMLAttributes<HTMLDialogElement>;
        div: HTML.HTMLAttributes<HTMLDivElement>;
        dl: HTML.HTMLAttributes<HTMLDListElement>;
        dt: HTML.HTMLAttributes<HTMLElement>;
        em: HTML.HTMLAttributes<HTMLElement>;
        embed: HTML.EmbedHTMLAttributes<HTMLEmbedElement>;
        fieldset: HTML.FieldsetHTMLAttributes<HTMLFieldSetElement>;
        figcaption: HTML.HTMLAttributes<HTMLElement>;
        figure: HTML.HTMLAttributes<HTMLElement>;
        footer: HTML.HTMLAttributes<HTMLElement>;
        form: HTML.FormHTMLAttributes<HTMLFormElement>;
        h1: HTML.HTMLAttributes<HTMLHeadingElement>;
        h2: HTML.HTMLAttributes<HTMLHeadingElement>;
        h3: HTML.HTMLAttributes<HTMLHeadingElement>;
        h4: HTML.HTMLAttributes<HTMLHeadingElement>;
        h5: HTML.HTMLAttributes<HTMLHeadingElement>;
        h6: HTML.HTMLAttributes<HTMLHeadingElement>;
        head: HTML.HTMLAttributes<HTMLHeadElement>;
        header: HTML.HTMLAttributes<HTMLElement>;
        hgroup: HTML.HTMLAttributes<HTMLElement>;
        hr: HTML.HTMLAttributes<HTMLHRElement>;
        html: HTML.HtmlHTMLAttributes<HTMLHtmlElement>;
        i: HTML.HTMLAttributes<HTMLElement>;
        iframe: HTML.IframeHTMLAttributes<HTMLIFrameElement>;
        img: HTML.ImgHTMLAttributes<HTMLImageElement>;
        input: HTML.InputHTMLAttributes<HTMLInputElement>;
        ins: HTML.InsHTMLAttributes<HTMLModElement>;
        kbd: HTML.HTMLAttributes<HTMLElement>;
        keygen: HTML.KeygenHTMLAttributes<HTMLElement>;
        label: HTML.LabelHTMLAttributes<HTMLLabelElement>;
        legend: HTML.HTMLAttributes<HTMLLegendElement>;
        li: HTML.LiHTMLAttributes<HTMLLIElement>;
        link: HTML.LinkHTMLAttributes<HTMLLinkElement>;
        main: HTML.HTMLAttributes<HTMLElement>;
        map: HTML.MapHTMLAttributes<HTMLMapElement>;
        mark: HTML.HTMLAttributes<HTMLElement>;
        menu: HTML.MenuHTMLAttributes<HTMLElement>;
        menuitem: HTML.HTMLAttributes<HTMLElement>;
        meta: HTML.MetaHTMLAttributes<HTMLMetaElement>;
        meter: HTML.MeterHTMLAttributes<HTMLMeterElement>;
        nav: HTML.HTMLAttributes<HTMLElement>;
        noindex: HTML.HTMLAttributes<HTMLElement>;
        noscript: HTML.HTMLAttributes<HTMLElement>;
        object: HTML.ObjectHTMLAttributes<HTMLObjectElement>;
        ol: HTML.OlHTMLAttributes<HTMLOListElement>;
        optgroup: HTML.OptgroupHTMLAttributes<HTMLOptGroupElement>;
        option: HTML.OptionHTMLAttributes<HTMLOptionElement>;
        output: HTML.OutputHTMLAttributes<HTMLOutputElement>;
        p: HTML.HTMLAttributes<HTMLParagraphElement>;
        param: HTML.ParamHTMLAttributes<HTMLParamElement>;
        picture: HTML.HTMLAttributes<HTMLElement>;
        pre: HTML.HTMLAttributes<HTMLPreElement>;
        progress: HTML.ProgressHTMLAttributes<HTMLProgressElement>;
        q: HTML.QuoteHTMLAttributes<HTMLQuoteElement>;
        rp: HTML.HTMLAttributes<HTMLElement>;
        rt: HTML.HTMLAttributes<HTMLElement>;
        ruby: HTML.HTMLAttributes<HTMLElement>;
        s: HTML.HTMLAttributes<HTMLElement>;
        samp: HTML.HTMLAttributes<HTMLElement>;
        search: HTML.HTMLAttributes<HTMLElement>;
        slot: HTML.SlotHTMLAttributes<HTMLSlotElement>;
        script: HTML.ScriptHTMLAttributes<HTMLScriptElement>;
        section: HTML.HTMLAttributes<HTMLElement>;
        select: HTML.SelectHTMLAttributes<HTMLSelectElement>;
        small: HTML.HTMLAttributes<HTMLElement>;
        source: HTML.SourceHTMLAttributes<HTMLSourceElement>;
        span: HTML.HTMLAttributes<HTMLSpanElement>;
        strong: HTML.HTMLAttributes<HTMLElement>;
        style: HTML.StyleHTMLAttributes<HTMLStyleElement>;
        sub: HTML.HTMLAttributes<HTMLElement>;
        summary: HTML.HTMLAttributes<HTMLElement>;
        sup: HTML.HTMLAttributes<HTMLElement>;
        table: HTML.TableHTMLAttributes<HTMLTableElement>;
        template: HTML.HTMLAttributes<HTMLTemplateElement>;
        tbody: HTML.HTMLAttributes<HTMLTableSectionElement>;
        td: HTML.TdHTMLAttributes<HTMLTableDataCellElement>;
        textarea: HTML.TextareaHTMLAttributes<HTMLTextAreaElement>;
        tfoot: HTML.HTMLAttributes<HTMLTableSectionElement>;
        th: HTML.ThHTMLAttributes<HTMLTableHeaderCellElement>;
        thead: HTML.HTMLAttributes<HTMLTableSectionElement>;
        time: HTML.TimeHTMLAttributes<HTMLTimeElement>;
        title: HTML.HTMLAttributes<HTMLTitleElement>;
        tr: HTML.HTMLAttributes<HTMLTableRowElement>;
        track: HTML.TrackHTMLAttributes<HTMLTrackElement>;
        u: HTML.HTMLAttributes<HTMLElement>;
        ul: HTML.HTMLAttributes<HTMLUListElement>;
        "var": HTML.HTMLAttributes<HTMLElement>;
        video: HTML.VideoHTMLAttributes<HTMLVideoElement>;
        wbr: HTML.HTMLAttributes<HTMLElement>;

        // SVG
        svg: HTML.SVGProps<SVGSVGElement>;

        animate: HTML.SVGProps<SVGElement>; // TODO: It is SVGAnimateElement but is not in TypeScript's lib.dom.d.ts for now.
        animateMotion: HTML.SVGProps<SVGElement>;
        animateTransform: HTML.SVGProps<SVGElement>; // TODO: It is SVGAnimateTransformElement but is not in TypeScript's lib.dom.d.ts for now.
        circle: HTML.SVGProps<SVGCircleElement>;
        clipPath: HTML.SVGProps<SVGClipPathElement>;
        defs: HTML.SVGProps<SVGDefsElement>;
        desc: HTML.SVGProps<SVGDescElement>;
        ellipse: HTML.SVGProps<SVGEllipseElement>;
        feBlend: HTML.SVGProps<SVGFEBlendElement>;
        feColorMatrix: HTML.SVGProps<SVGFEColorMatrixElement>;
        feComponentTransfer: HTML.SVGProps<SVGFEComponentTransferElement>;
        feComposite: HTML.SVGProps<SVGFECompositeElement>;
        feConvolveMatrix: HTML.SVGProps<SVGFEConvolveMatrixElement>;
        feDiffuseLighting: HTML.SVGProps<SVGFEDiffuseLightingElement>;
        feDisplacementMap: HTML.SVGProps<SVGFEDisplacementMapElement>;
        feDistantLight: HTML.SVGProps<SVGFEDistantLightElement>;
        feDropShadow: HTML.SVGProps<SVGFEDropShadowElement>;
        feFlood: HTML.SVGProps<SVGFEFloodElement>;
        feFuncA: HTML.SVGProps<SVGFEFuncAElement>;
        feFuncB: HTML.SVGProps<SVGFEFuncBElement>;
        feFuncG: HTML.SVGProps<SVGFEFuncGElement>;
        feFuncR: HTML.SVGProps<SVGFEFuncRElement>;
        feGaussianBlur: HTML.SVGProps<SVGFEGaussianBlurElement>;
        feImage: HTML.SVGProps<SVGFEImageElement>;
        feMerge: HTML.SVGProps<SVGFEMergeElement>;
        feMergeNode: HTML.SVGProps<SVGFEMergeNodeElement>;
        feMorphology: HTML.SVGProps<SVGFEMorphologyElement>;
        feOffset: HTML.SVGProps<SVGFEOffsetElement>;
        fePointLight: HTML.SVGProps<SVGFEPointLightElement>;
        feSpecularLighting: HTML.SVGProps<SVGFESpecularLightingElement>;
        feSpotLight: HTML.SVGProps<SVGFESpotLightElement>;
        feTile: HTML.SVGProps<SVGFETileElement>;
        feTurbulence: HTML.SVGProps<SVGFETurbulenceElement>;
        filter: HTML.SVGProps<SVGFilterElement>;
        foreignObject: HTML.SVGProps<SVGForeignObjectElement>;
        g: HTML.SVGProps<SVGGElement>;
        image: HTML.SVGProps<SVGImageElement>;
        line: HTML.SVGLineElementAttributes<SVGLineElement>;
        linearGradient: HTML.SVGProps<SVGLinearGradientElement>;
        marker: HTML.SVGProps<SVGMarkerElement>;
        mask: HTML.SVGProps<SVGMaskElement>;
        metadata: HTML.SVGProps<SVGMetadataElement>;
        mpath: HTML.SVGProps<SVGElement>;
        path: HTML.SVGProps<SVGPathElement>;
        pattern: HTML.SVGProps<SVGPatternElement>;
        polygon: HTML.SVGProps<SVGPolygonElement>;
        polyline: HTML.SVGProps<SVGPolylineElement>;
        radialGradient: HTML.SVGProps<SVGRadialGradientElement>;
        rect: HTML.SVGProps<SVGRectElement>;
        stop: HTML.SVGProps<SVGStopElement>;
        switch: HTML.SVGProps<SVGSwitchElement>;
        symbol: HTML.SVGProps<SVGSymbolElement>;
        text: HTML.SVGTextElementAttributes<SVGTextElement>;
        textPath: HTML.SVGProps<SVGTextPathElement>;
        tspan: HTML.SVGProps<SVGTSpanElement>;
        use: HTML.SVGProps<SVGUseElement>;
        view: HTML.SVGProps<SVGViewElement>;
    }
}

export namespace HTML {
    type Booleanish = boolean | "true" | "false";
    type CrossOrigin = "anonymous" | "use-credentials" | "" | undefined;

    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T>, RefAttributes<T> {
        // Standard HTML Attributes
        accessKey?: Derived.Or<string | undefined>;
        autoFocus?: Derived.Or<boolean | undefined>;
        class?: ClassList | undefined;
        contentEditable?: Derived.Or<Booleanish | "inherit" | "plaintext-only" | undefined>;
        contextMenu?: Derived.Or<string | undefined>;
        dir?: Derived.Or<string | undefined>;
        draggable?: Derived.Or<Booleanish | undefined>;
        hidden?: Derived.Or<boolean | undefined>;
        id?: Derived.Or<string | undefined>;
        lang?: Derived.Or<string | undefined>;
        nonce?: Derived.Or<string | undefined>;
        slot?: Derived.Or<string | undefined>;
        spellCheck?: Derived.Or<Booleanish | undefined>;
        style?: Derived.Or<CSSProperties | undefined>;
        tabIndex?: Derived.Or<number | undefined>;
        title?: Derived.Or<string | undefined>;
        translate?: Derived.Or<"yes" | "no" | undefined>;

        // Unknown
        radioGroup?: Derived.Or<string | undefined>; // <command>, <menuitem>

        // WAI-ARIA
        role?: Derived.Or<AriaRole | undefined>;

        // RDFa Attributes
        about?: Derived.Or<string | undefined>;
        content?: Derived.Or<string | undefined>;
        datatype?: Derived.Or<string | undefined>;
        inlist?: Derived.Or<any>;
        prefix?: Derived.Or<string | undefined>;
        property?: Derived.Or<string | undefined>;
        rel?: Derived.Or<string | undefined>;
        resource?: Derived.Or<string | undefined>;
        rev?: Derived.Or<string | undefined>;
        typeof?: Derived.Or<string | undefined>;
        vocab?: Derived.Or<string | undefined>;

        // Non-standard Attributes
        autoCapitalize?: Derived.Or<string | undefined>;
        autoCorrect?: Derived.Or<string | undefined>;
        autoSave?: Derived.Or<string | undefined>;
        color?: Derived.Or<string | undefined>;
        itemProp?: Derived.Or<string | undefined>;
        itemScope?: Derived.Or<boolean | undefined>;
        itemType?: Derived.Or<string | undefined>;
        itemID?: Derived.Or<string | undefined>;
        itemRef?: Derived.Or<string | undefined>;
        results?: Derived.Or<number | undefined>;
        security?: Derived.Or<string | undefined>;
        unselectable?: Derived.Or<"on" | "off" | undefined>;

        // Living Standard
        /**
         * Hints at the type of data that might be entered by the user while editing the element or its contents
         * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
         */
        inputMode?: Derived.Or<"none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search" | undefined>;
        /**
         * Specify that a standard HTML element should behave like a defined custom built-in element
         * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
         */
        is?: Derived.Or<string | undefined>;
    }

    //
    // Event System
    // ----------------------------------------------------------------------

    type MountEventHandler<T> = { bivariance(this: T): void }["bivariance"];

    type EventHandler<T, E = Event> = { bivariance(this: T, event: E): void }["bivariance"];

    type ClipboardEventHandler<T = Element> = EventHandler<T, globalThis.ClipboardEvent>;
    type CompositionEventHandler<T = Element> = EventHandler<T, globalThis.CompositionEvent>;
    type DragEventHandler<T = Element> = EventHandler<T, globalThis.DragEvent>;
    type FocusEventHandler<T = Element> = EventHandler<T, globalThis.FocusEvent>;
    type InputEventHandler<T = Element> = EventHandler<T, globalThis.InputEvent>;
    type KeyboardEventHandler<T = Element> = EventHandler<T, globalThis.KeyboardEvent>;
    type MouseEventHandler<T = Element> = EventHandler<T, globalThis.MouseEvent>;
    type TouchEventHandler<T = Element> = EventHandler<T, globalThis.TouchEvent>;
    type PointerEventHandler<T = Element> = EventHandler<T, globalThis.PointerEvent>;
    type UIEventHandler<T = Element> = EventHandler<T, globalThis.UIEvent>;
    type WheelEventHandler<T = Element> = EventHandler<T, globalThis.WheelEvent>;
    type AnimationEventHandler<T = Element> = EventHandler<T, globalThis.AnimationEvent>;
    type TransitionEventHandler<T = Element> = EventHandler<T, globalThis.TransitionEvent>;

    interface DOMAttributes<T> {
        children?: RUBEDO.Nodes;

        scope?: ((target: T) => void | (() => void)) | undefined;

        // Mount Events
        onMount?: MountEventHandler<T> | undefined; // TODO! update these types
        onUnmount?: MountEventHandler<T> | undefined;

        // Clipboard Events
        onCopy?: ClipboardEventHandler<T> | undefined;
        onCut?: ClipboardEventHandler<T> | undefined;
        onPaste?: ClipboardEventHandler<T> | undefined;

        // Composition Events
        onCompositionEnd?: CompositionEventHandler<T> | undefined;
        onCompositionStart?: CompositionEventHandler<T> | undefined;
        onCompositionUpdate?: CompositionEventHandler<T> | undefined;

        // Focus Events
        onFocus?: FocusEventHandler<T> | undefined;
        onBlur?: FocusEventHandler<T> | undefined;

        // Form Events
        onChange?: EventHandler<T> | undefined;
        onBeforeInput?: InputEventHandler<T> | undefined;
        onInput?: InputEventHandler<T> | undefined;
        onReset?: EventHandler<T> | undefined;
        onSubmit?: EventHandler<T> | undefined;
        onInvalid?: EventHandler<T> | undefined;

        // Image Events
        onLoad?: EventHandler<T> | undefined;
        onError?: EventHandler<T> | undefined; // also a Media Event

        // Keyboard Events
        onKeyDown?: KeyboardEventHandler<T> | undefined;
        /** @deprecated */
        onKeyPress?: KeyboardEventHandler<T> | undefined;
        /** @deprecated */
        onKeyUp?: KeyboardEventHandler<T> | undefined;

        // Media Events
        onAbort?: EventHandler<T> | undefined;
        onCanPlay?: EventHandler<T> | undefined;
        onCanPlayThrough?: EventHandler<T> | undefined;
        onDurationChange?: EventHandler<T> | undefined;
        onEmptied?: EventHandler<T> | undefined;
        onEncrypted?: EventHandler<T> | undefined;
        onEnded?: EventHandler<T> | undefined;
        onLoadedData?: EventHandler<T> | undefined;
        onLoadedMetadata?: EventHandler<T> | undefined;
        onLoadStart?: EventHandler<T> | undefined;
        onPause?: EventHandler<T> | undefined;
        onPlay?: EventHandler<T> | undefined;
        onPlaying?: EventHandler<T> | undefined;
        onProgress?: EventHandler<T> | undefined;
        onRateChange?: EventHandler<T> | undefined;
        onResize?: EventHandler<T> | undefined;
        onSeeked?: EventHandler<T> | undefined;
        onSeeking?: EventHandler<T> | undefined;
        onStalled?: EventHandler<T> | undefined;
        onSuspend?: EventHandler<T> | undefined;
        onTimeUpdate?: EventHandler<T> | undefined;
        onVolumeChange?: EventHandler<T> | undefined;
        onWaiting?: EventHandler<T> | undefined;

        // MouseEvents
        onAuxClick?: MouseEventHandler<T> | undefined;
        onClick?: MouseEventHandler<T> | undefined;
        onContextMenu?: MouseEventHandler<T> | undefined;
        onDoubleClick?: MouseEventHandler<T> | undefined;
        onDrag?: DragEventHandler<T> | undefined;
        onDragEnd?: DragEventHandler<T> | undefined;
        onDragEnter?: DragEventHandler<T> | undefined;
        onDragExit?: DragEventHandler<T> | undefined;
        onDragLeave?: DragEventHandler<T> | undefined;
        onDragOver?: DragEventHandler<T> | undefined;
        onDragStart?: DragEventHandler<T> | undefined;
        onDrop?: DragEventHandler<T> | undefined;
        onMouseDown?: MouseEventHandler<T> | undefined;
        onMouseEnter?: MouseEventHandler<T> | undefined;
        onMouseLeave?: MouseEventHandler<T> | undefined;
        onMouseMove?: MouseEventHandler<T> | undefined;
        onMouseOut?: MouseEventHandler<T> | undefined;
        onMouseOver?: MouseEventHandler<T> | undefined;
        onMouseUp?: MouseEventHandler<T> | undefined;

        // Selection Events
        onSelect?: EventHandler<T> | undefined;

        // Touch Events
        onTouchCancel?: TouchEventHandler<T> | undefined;
        onTouchEnd?: TouchEventHandler<T> | undefined;
        onTouchMove?: TouchEventHandler<T> | undefined;
        onTouchStart?: TouchEventHandler<T> | undefined;

        // Pointer Events
        onPointerDown?: PointerEventHandler<T> | undefined;
        onPointerMove?: PointerEventHandler<T> | undefined;
        onPointerUp?: PointerEventHandler<T> | undefined;
        onPointerCancel?: PointerEventHandler<T> | undefined;
        onPointerEnter?: PointerEventHandler<T> | undefined;
        onPointerLeave?: PointerEventHandler<T> | undefined;
        onPointerOver?: PointerEventHandler<T> | undefined;
        onPointerOut?: PointerEventHandler<T> | undefined;
        onGotPointerCapture?: PointerEventHandler<T> | undefined;
        onLostPointerCapture?: PointerEventHandler<T> | undefined;

        // UI Events
        onScroll?: UIEventHandler<T> | undefined;

        // Wheel Events
        onWheel?: WheelEventHandler<T> | undefined;

        // Animation Events
        onAnimationStart?: AnimationEventHandler<T> | undefined;
        onAnimationEnd?: AnimationEventHandler<T> | undefined;
        onAnimationIteration?: AnimationEventHandler<T> | undefined;

        // Transition Events
        onTransitionEnd?: TransitionEventHandler<T> | undefined;
    }

    type Ref<T> = { bivariance(this: T, instance: T): void }["bivariance"] | { current: T | null } | null;

    interface RefAttributes<T> {
        /**
         * Allows getting a ref to the component instance.
         */
        ref?: Ref<T> | undefined;
    }

    interface AriaAttributes {
        /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
        "aria-activedescendant"?: Derived.Or<string | undefined>;
        /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
        "aria-atomic"?: Derived.Or<Booleanish | undefined>;
        /**
         * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
         * presented if they are made.
         */
        "aria-autocomplete"?: Derived.Or<"none" | "inline" | "list" | "both" | undefined>;
        /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
        /**
         * Defines a string value that labels the current element, which is intended to be converted into Braille.
         * @see aria-label.
         */
        "aria-braillelabel"?: Derived.Or<string | undefined>;
        /**
         * Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.
         * @see aria-roledescription.
         */
        "aria-brailleroledescription"?: Derived.Or<string | undefined>;
        "aria-busy"?: Derived.Or<Booleanish | undefined>;
        /**
         * Indicates the current "checked" Derived of checkboxes, radio buttons, and other widgets.
         * @see aria-pressed @see aria-selected.
         */
        "aria-checked"?: Derived.Or<boolean | "false" | "mixed" | "true" | undefined>;
        /**
         * Defines the total number of columns in a table, grid, or treegrid.
         * @see aria-colindex.
         */
        "aria-colcount"?: Derived.Or<number | undefined>;
        /**
         * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
         * @see aria-colcount @see aria-colspan.
         */
        "aria-colindex"?: Derived.Or<number | undefined>;
        /**
         * Defines a human readable text alternative of aria-colindex.
         * @see aria-rowindextext.
         */
        "aria-colindextext"?: Derived.Or<string | undefined>;
        /**
         * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
         * @see aria-colindex @see aria-rowspan.
         */
        "aria-colspan"?: Derived.Or<number | undefined>;
        /**
         * Identifies the element (or elements) whose contents or presence are controlled by the current element.
         * @see aria-owns.
         */
        "aria-controls"?: Derived.Or<string | undefined>;
        /** Indicates the element that represents the current item within a container or set of related elements. */
        "aria-current"?: Derived.Or<boolean | "false" | "true" | "page" | "step" | "location" | "date" | "time" | undefined>;
        /**
         * Identifies the element (or elements) that describes the object.
         * @see aria-labelledby
         */
        "aria-describedby"?: Derived.Or<string | undefined>;
        /**
         * Defines a string value that describes or annotates the current element.
         * @see related aria-describedby.
         */
        "aria-description"?: Derived.Or<string | undefined>;
        /**
         * Identifies the element that provides a detailed, extended description for the object.
         * @see aria-describedby.
         */
        "aria-details"?: Derived.Or<string | undefined>;
        /**
         * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
         * @see aria-hidden @see aria-readonly.
         */
        "aria-disabled"?: Derived.Or<Booleanish | undefined>;
        /**
         * Indicates what functions can be performed when a dragged object is released on the drop target.
         * @deprecated in ARIA 1.1
         */
        "aria-dropeffect"?: Derived.Or<"none" | "copy" | "execute" | "link" | "move" | "popup" | undefined>;
        /**
         * Identifies the element that provides an error message for the object.
         * @see aria-invalid @see aria-describedby.
         */
        "aria-errormessage"?: Derived.Or<string | undefined>;
        /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
        "aria-expanded"?: Derived.Or<Booleanish | undefined>;
        /**
         * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
         * allows assistive technology to override the general default of reading in document source order.
         */
        "aria-flowto"?: Derived.Or<string | undefined>;
        /**
         * Indicates an element's "grabbed" Derived in a drag-and-drop operation.
         * @deprecated in ARIA 1.1
         */
        "aria-grabbed"?: Derived.Or<Booleanish | undefined>;
        /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
        "aria-haspopup"?: Derived.Or<boolean | "false" | "true" | "menu" | "listbox" | "tree" | "grid" | "dialog" | undefined>;
        /**
         * Indicates whether the element is exposed to an accessibility API.
         * @see aria-disabled.
         */
        "aria-hidden"?: Derived.Or<Booleanish | undefined>;
        /**
         * Indicates the entered value does not conform to the format expected by the application.
         * @see aria-errormessage.
         */
        "aria-invalid"?: Derived.Or<boolean | "false" | "true" | "grammar" | "spelling" | undefined>;
        /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
        "aria-keyshortcuts"?: Derived.Or<string | undefined>;
        /**
         * Defines a string value that labels the current element.
         * @see aria-labelledby.
         */
        "aria-label"?: Derived.Or<string | undefined>;
        /**
         * Identifies the element (or elements) that labels the current element.
         * @see aria-describedby.
         */
        "aria-labelledby"?: Derived.Or<string | undefined>;
        /** Defines the hierarchical level of an element within a structure. */
        "aria-level"?: Derived.Or<number | undefined>;
        /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
        "aria-live"?: Derived.Or<"off" | "assertive" | "polite" | undefined>;
        /** Indicates whether an element is modal when displayed. */
        "aria-modal"?: Derived.Or<Booleanish | undefined>;
        /** Indicates whether a text box accepts multiple lines of input or only a single line. */
        "aria-multiline"?: Derived.Or<Booleanish | undefined>;
        /** Indicates that the user may select more than one item from the current selectable descendants. */
        "aria-multiselectable"?: Derived.Or<Booleanish | undefined>;
        /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
        "aria-orientation"?: Derived.Or<"horizontal" | "vertical" | undefined>;
        /**
         * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
         * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
         * @see aria-controls.
         */
        "aria-owns"?: Derived.Or<string | undefined>;
        /**
         * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
         * A hint could be a sample value or a brief description of the expected format.
         */
        "aria-placeholder"?: Derived.Or<string | undefined>;
        /**
         * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
         * @see aria-setsize.
         */
        "aria-posinset"?: Derived.Or<number | undefined>;
        /**
         * Indicates the current "pressed" Derived of toggle buttons.
         * @see aria-checked @see aria-selected.
         */
        "aria-pressed"?: Derived.Or<boolean | "false" | "mixed" | "true" | undefined>;
        /**
         * Indicates that the element is not editable, but is otherwise operable.
         * @see aria-disabled.
         */
        "aria-readonly"?: Derived.Or<Booleanish | undefined>;
        /**
         * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
         * @see aria-atomic.
         */
        "aria-relevant"?: Derived.Or<
            | "additions"
            | "additions removals"
            | "additions text"
            | "all"
            | "removals"
            | "removals additions"
            | "removals text"
            | "text"
            | "text additions"
            | "text removals"
            | undefined>;
        /** Indicates that user input is required on the element before a form may be submitted. */
        "aria-required"?: Derived.Or<Booleanish | undefined>;
        /** Defines a human-readable, author-localized description for the role of an element. */
        "aria-roledescription"?: Derived.Or<string | undefined>;
        /**
         * Defines the total number of rows in a table, grid, or treegrid.
         * @see aria-rowindex.
         */
        "aria-rowcount"?: Derived.Or<number | undefined>;
        /**
         * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
         * @see aria-rowcount @see aria-rowspan.
         */
        "aria-rowindex"?: Derived.Or<number | undefined>;
        /**
         * Defines a human readable text alternative of aria-rowindex.
         * @see aria-colindextext.
         */
        "aria-rowindextext"?: Derived.Or<string | undefined>;
        /**
         * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
         * @see aria-rowindex @see aria-colspan.
         */
        "aria-rowspan"?: Derived.Or<number | undefined>;
        /**
         * Indicates the current "selected" Derived of various widgets.
         * @see aria-checked @see aria-pressed.
         */
        "aria-selected"?: Derived.Or<Booleanish | undefined>;
        /**
         * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
         * @see aria-posinset.
         */
        "aria-setsize"?: Derived.Or<number | undefined>;
        /** Indicates if items in a table or grid are sorted in ascending or descending order. */
        "aria-sort"?: Derived.Or<"none" | "ascending" | "descending" | "other" | undefined>;
        /** Defines the maximum allowed value for a range widget. */
        "aria-valuemax"?: Derived.Or<number | undefined>;
        /** Defines the minimum allowed value for a range widget. */
        "aria-valuemin"?: Derived.Or<number | undefined>;
        /**
         * Defines the current value for a range widget.
         * @see aria-valuetext.
         */
        "aria-valuenow"?: Derived.Or<number | undefined>;
        /** Defines the human readable text alternative of aria-valuenow for a range widget. */
        "aria-valuetext"?: Derived.Or<string | undefined>;
    }

    // All the WAI-ARIA 1.1 role attribute values from https://www.w3.org/TR/wai-aria-1.1/#role_definitions
    type AriaRole = "alert" | "alertdialog" | "application" | "article" |
        "banner" | "button" | "cell" | "checkbox" | "columnheader" |
        "combobox" | "complementary" | "contentinfo" | "definition" |
        "dialog" | "directory" | "document" | "feed" | "figure" | "form" |
        "grid" | "gridcell" | "group" | "heading" | "img" | "link" |
        "list" | "listbox" | "listitem" | "log" | "main" | "marquee" |
        "math" | "menu" | "menubar" | "menuitem" | "menuitemcheckbox" |
        "menuitemradio" | "navigation" | "none" | "note" | "option" |
        "presentation" | "progressbar" | "radio" | "radiogroup" | "region" |
        "row" | "rowgroup" | "rowheader" | "scrollbar" | "search" |
        "searchbox" | "separator" | "slider" | "spinbutton" | "status" |
        "switch" | "tab" | "table" | "tablist" | "tabpanel" | "term" |
        "textbox" | "timer" | "toolbar" | "tooltip" | "tree" | "treegrid" |
        "treeitem" | (string & {});

    type ClassList =
        | ClassList[]
        | { [className: string]: Derived.Or<boolean | null | undefined> }
        | StatelessClassList
        | Derived<StatelessClassList | StatelessClassList[]>;
    type StatelessClassList = string | false | null | undefined | { [className: string]: boolean | null | undefined };

    type CSSPropertiesAugmentations = {
        [P in keyof RUBEDO.StyleAugmentations]: Derived.Or<RUBEDO.StyleAugmentations[P]>;
    };

    interface CSSProperties extends CSS.Properties<string | number>, CSSPropertiesAugmentations {}

    type HTMLAttributeReferrerPolicy =
        | ""
        | "no-referrer"
        | "no-referrer-when-downgrade"
        | "origin"
        | "origin-when-cross-origin"
        | "same-origin"
        | "strict-origin"
        | "strict-origin-when-cross-origin"
        | "unsafe-url";

    type HTMLAttributeAnchorTarget =
        | "_self"
        | "_blank"
        | "_parent"
        | "_top"
        | (string & {});

    interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
        download?: Derived.Or<any>;
        href?: Derived.Or<string | undefined>;
        hrefLang?: Derived.Or<string | undefined>;
        media?: Derived.Or<string | undefined>;
        ping?: Derived.Or<string | undefined>;
        target?: Derived.Or<HTMLAttributeAnchorTarget | undefined>;
        type?: Derived.Or<string | undefined>;
        referrerPolicy?: Derived.Or<HTMLAttributeReferrerPolicy | undefined>;
    }

    interface AudioHTMLAttributes<T> extends MediaHTMLAttributes<T> { }

    interface AreaHTMLAttributes<T> extends HTMLAttributes<T> {
        alt?: Derived.Or<string | undefined>;
        coords?: Derived.Or<string | undefined>;
        download?: Derived.Or<any>;
        href?: Derived.Or<string | undefined>;
        hrefLang?: Derived.Or<string | undefined>;
        media?: Derived.Or<string | undefined>;
        referrerPolicy?: Derived.Or<HTMLAttributeReferrerPolicy | undefined>;
        shape?: Derived.Or<string | undefined>;
        target?: Derived.Or<string | undefined>;
    }

    interface BaseHTMLAttributes<T> extends HTMLAttributes<T> {
        href?: Derived.Or<string | undefined>;
        target?: Derived.Or<string | undefined>;
    }

    interface BlockquoteHTMLAttributes<T> extends HTMLAttributes<T> {
        cite?: Derived.Or<string | undefined>;
    }

    interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
        disabled?: Derived.Or<boolean | undefined>;
        form?: Derived.Or<string | undefined>;
        formAction?: Derived.Or<string | undefined>;
        formEncType?: Derived.Or<string | undefined>;
        formMethod?: Derived.Or<string | undefined>;
        formNoValidate?: Derived.Or<boolean | undefined>;
        formTarget?: Derived.Or<string | undefined>;
        name?: Derived.Or<string | undefined>;
        type?: Derived.Or<"submit" | "reset" | "button" | undefined>;
        value?: Derived.Or<string | undefined>;
    }

    interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {
        height?: Derived.Or<number | string | undefined>;
        width?: Derived.Or<number | string | undefined>;
    }

    interface ColHTMLAttributes<T> extends HTMLAttributes<T> {
        span?: Derived.Or<number | undefined>;
        width?: Derived.Or<number | string | undefined>;
    }

    interface ColgroupHTMLAttributes<T> extends HTMLAttributes<T> {
        span?: Derived.Or<number | undefined>;
    }

    interface DataHTMLAttributes<T> extends HTMLAttributes<T> {
        value?: Derived.Or<string | undefined>;
    }

    interface DetailsHTMLAttributes<T> extends HTMLAttributes<T> {
        open?: Derived.Or<boolean | undefined>;
        onToggle?: Derived.Or<EventHandler<T> | undefined>;
        name?: Derived.Or<string | undefined>;
    }

    interface DelHTMLAttributes<T> extends HTMLAttributes<T> {
        cite?: Derived.Or<string | undefined>;
        dateTime?: Derived.Or<string | undefined>;
    }

    interface DialogHTMLAttributes<T> extends HTMLAttributes<T> {
        onCancel?: Derived.Or<EventHandler<T> | undefined>;
        onClose?: Derived.Or<EventHandler<T> | undefined>;
        open?: Derived.Or<boolean | undefined>;
    }

    interface EmbedHTMLAttributes<T> extends HTMLAttributes<T> {
        height?: Derived.Or<number | string | undefined>;
        src?: Derived.Or<string | undefined>;
        type?: Derived.Or<string | undefined>;
        width?: Derived.Or<number | string | undefined>;
    }

    interface FieldsetHTMLAttributes<T> extends HTMLAttributes<T> {
        disabled?: Derived.Or<boolean | undefined>;
        form?: Derived.Or<string | undefined>;
        name?: Derived.Or<string | undefined>;
    }

    interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
        acceptCharset?: Derived.Or<string | undefined>;
        action?: Derived.Or<string | undefined>;
        autoComplete?: Derived.Or<string | undefined>;
        encType?: Derived.Or<string | undefined>;
        method?: Derived.Or<string | undefined>;
        name?: Derived.Or<string | undefined>;
        noValidate?: Derived.Or<boolean | undefined>;
        target?: Derived.Or<string | undefined>;
    }

    interface HtmlHTMLAttributes<T> extends HTMLAttributes<T> {
        manifest?: Derived.Or<string | undefined>;
    }

    interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
        allow?: Derived.Or<string | undefined>;
        allowFullScreen?: Derived.Or<boolean | undefined>;
        allowTransparency?: Derived.Or<boolean | undefined>;
        /** @deprecated */
        frameBorder?: Derived.Or<number | string | undefined>;
        height?: Derived.Or<number | string | undefined>;
        loading?: Derived.Or<"eager" | "lazy" | undefined>;
        /** @deprecated */
        marginHeight?: Derived.Or<number | undefined>;
        /** @deprecated */
        marginWidth?: Derived.Or<number | undefined>;
        name?: Derived.Or<string | undefined>;
        referrerPolicy?: Derived.Or<HTMLAttributeReferrerPolicy | undefined>;
        sandbox?: Derived.Or<string | undefined>;
        /** @deprecated */
        scrolling?: Derived.Or<string | undefined>;
        seamless?: Derived.Or<boolean | undefined>;
        src?: Derived.Or<string | undefined>;
        srcDoc?: Derived.Or<string | undefined>;
        width?: Derived.Or<number | string | undefined>;
    }

    interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
        alt?: Derived.Or<string | undefined>;
        crossOrigin?: Derived.Or<CrossOrigin>;
        decoding?: Derived.Or<"async" | "auto" | "sync" | undefined>;
        height?: Derived.Or<number | string | undefined>;
        loading?: Derived.Or<"eager" | "lazy" | undefined>;
        referrerPolicy?: Derived.Or<HTMLAttributeReferrerPolicy | undefined>;
        sizes?: Derived.Or<string | undefined>;
        src?: Derived.Or<string | undefined>;
        srcSet?: Derived.Or<string | undefined>;
        useMap?: Derived.Or<string | undefined>;
        width?: Derived.Or<number | string | undefined>;
    }

    interface InsHTMLAttributes<T> extends HTMLAttributes<T> {
        cite?: Derived.Or<string | undefined>;
        dateTime?: Derived.Or<string | undefined>;
    }

    type HTMLInputTypeAttribute =
        "button" | "checkbox" | "color" | "date" | "datetime-local" |
        "email" | "file" | "hidden" | "image" | "month" | "number" |
        "password" | "radio" | "range" | "reset" | "search" | "submit" |
        "tel" | "text" | "time" | "url" | "week" | (string & {});

    interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
        accept?: Derived.Or<string | undefined>;
        alt?: Derived.Or<string | undefined>;
        autoComplete?: Derived.Or<string | undefined>;
        capture?: Derived.Or<boolean | "user" | "environment" | undefined>; // https://www.w3.org/TR/html-media-capture/#the-capture-attribute
        checked?: Derived.Or<boolean | undefined> | State<boolean>;
        children?: [],
        disabled?: Derived.Or<boolean | undefined>;
        enterKeyHint?: Derived.Or<"enter" | "done" | "go" | "next" | "previous" | "search" | "send" | undefined>;
        form?: Derived.Or<string | undefined>;
        formAction?: Derived.Or<string | undefined>;
        formEncType?: Derived.Or<string | undefined>;
        formMethod?: Derived.Or<string | undefined>;
        formNoValidate?: Derived.Or<boolean | undefined>;
        formTarget?: Derived.Or<string | undefined>;
        height?: Derived.Or<number | string | undefined>;
        list?: Derived.Or<string | undefined>;
        max?: Derived.Or<number | string | undefined>;
        maxLength?: Derived.Or<number | undefined>;
        min?: Derived.Or<number | string | undefined>;
        minLength?: Derived.Or<number | undefined>;
        multiple?: Derived.Or<boolean | undefined>;
        name?: Derived.Or<string | undefined>;
        pattern?: Derived.Or<string | undefined>;
        placeholder?: Derived.Or<string | undefined>;
        readOnly?: Derived.Or<boolean | undefined>;
        required?: Derived.Or<boolean | undefined>;
        size?: Derived.Or<number | undefined>;
        src?: Derived.Or<string | undefined>;
        step?: Derived.Or<number | string | undefined>;
        type?: Derived.Or<HTMLInputTypeAttribute | undefined>;
        value?: Derived.Or<string | undefined> | State<string>;
        width?: Derived.Or<number | string | undefined>;

        onChange?: EventHandler<T> | undefined;
    }

    interface KeygenHTMLAttributes<T> extends HTMLAttributes<T> {
        challenge?: Derived.Or<string | undefined>;
        disabled?: Derived.Or<boolean | undefined>;
        form?: Derived.Or<string | undefined>;
        keyType?: Derived.Or<string | undefined>;
        keyParams?: Derived.Or<string | undefined>;
        name?: Derived.Or<string | undefined>;
    }

    interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
        form?: Derived.Or<string | undefined>;
        for?: Derived.Or<string | undefined>;
    }

    interface LiHTMLAttributes<T> extends HTMLAttributes<T> {
        value?: Derived.Or<number | undefined>;
    }

    interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
        as?: Derived.Or<string | undefined>;
        crossOrigin?: Derived.Or<CrossOrigin>;
        fetchPriority?: Derived.Or<"high" | "low" | "auto">;
        href?: Derived.Or<string | undefined>;
        hrefLang?: Derived.Or<string | undefined>;
        integrity?: Derived.Or<string | undefined>;
        media?: Derived.Or<string | undefined>;
        imageSrcSet?: Derived.Or<string | undefined>;
        imageSizes?: Derived.Or<string | undefined>;
        referrerPolicy?: Derived.Or<HTMLAttributeReferrerPolicy | undefined>;
        sizes?: Derived.Or<string | undefined>;
        type?: Derived.Or<string | undefined>;
        charSet?: Derived.Or<string | undefined>;
    }

    interface MapHTMLAttributes<T> extends HTMLAttributes<T> {
        name?: Derived.Or<string | undefined>;
    }

    interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {
        type?: Derived.Or<string | undefined>;
    }

    interface MediaHTMLAttributes<T> extends HTMLAttributes<T> {
        autoPlay?: Derived.Or<boolean | undefined>;
        controls?: Derived.Or<boolean | undefined>;
        controlsList?: Derived.Or<string | undefined>;
        crossOrigin?: Derived.Or<CrossOrigin>;
        loop?: Derived.Or<boolean | undefined>;
        mediaGroup?: Derived.Or<string | undefined>;
        muted?: Derived.Or<boolean | undefined>;
        playsInline?: Derived.Or<boolean | undefined>;
        preload?: Derived.Or<string | undefined>;
        src?: Derived.Or<string | undefined>;
    }

    interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
        charSet?: Derived.Or<string | undefined>;
        content?: Derived.Or<string | undefined>;
        httpEquiv?: Derived.Or<string | undefined>;
        media?: Derived.Or<string | undefined>;
        name?: Derived.Or<string | undefined>;
    }

    interface MeterHTMLAttributes<T> extends HTMLAttributes<T> {
        form?: Derived.Or<string | undefined>;
        high?: Derived.Or<number | undefined>;
        low?: Derived.Or<number | undefined>;
        max?: Derived.Or<number | string | undefined>;
        min?: Derived.Or<number | string | undefined>;
        optimum?: Derived.Or<number | undefined>;
        value?: Derived.Or<number | undefined>;
    }

    interface QuoteHTMLAttributes<T> extends HTMLAttributes<T> {
        cite?: Derived.Or<string | undefined>;
    }

    interface ObjectHTMLAttributes<T> extends HTMLAttributes<T> {
        classID?: Derived.Or<string | undefined>;
        data?: Derived.Or<string | undefined>;
        form?: Derived.Or<string | undefined>;
        height?: Derived.Or<number | string | undefined>;
        name?: Derived.Or<string | undefined>;
        type?: Derived.Or<string | undefined>;
        useMap?: Derived.Or<string | undefined>;
        width?: Derived.Or<number | string | undefined>;
        wmode?: Derived.Or<string | undefined>;
    }

    interface OlHTMLAttributes<T> extends HTMLAttributes<T> {
        reversed?: Derived.Or<boolean | undefined>;
        start?: Derived.Or<number | undefined>;
        type?: Derived.Or<"1" | "a" | "A" | "i" | "I" | undefined>;
    }

    interface OptgroupHTMLAttributes<T> extends HTMLAttributes<T> {
        disabled?: Derived.Or<boolean | undefined>;
        label?: Derived.Or<string | undefined>;
    }

    interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
        disabled?: Derived.Or<boolean | undefined>;
        label?: Derived.Or<string | undefined>;
        selected?: Derived.Or<boolean | undefined>;
        value?: Derived.Or<string | undefined>;
    }

    interface OutputHTMLAttributes<T> extends HTMLAttributes<T> {
        form?: Derived.Or<string | undefined>;
        for?: Derived.Or<string | undefined>;
        name?: Derived.Or<string | undefined>;
    }

    interface ParamHTMLAttributes<T> extends HTMLAttributes<T> {
        name?: Derived.Or<string | undefined>;
        value?: Derived.Or<string | undefined>;
    }

    interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {
        max?: Derived.Or<number | string | undefined>;
        value?: Derived.Or<string | undefined>;
    }

    interface SlotHTMLAttributes<T> extends HTMLAttributes<T> {
        name?: Derived.Or<string | undefined>;
    }

    interface ScriptHTMLAttributes<T> extends HTMLAttributes<T> {
        async?: Derived.Or<boolean | undefined>;
        /** @deprecated */
        charSet?: Derived.Or<string | undefined>;
        crossOrigin?: Derived.Or<CrossOrigin>;
        defer?: Derived.Or<boolean | undefined>;
        integrity?: Derived.Or<string | undefined>;
        noModule?: Derived.Or<boolean | undefined>;
        referrerPolicy?: Derived.Or<HTMLAttributeReferrerPolicy | undefined>;
        src?: Derived.Or<string | undefined>;
        type?: Derived.Or<string | undefined>;
    }

    interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
        autoComplete?: Derived.Or<string | undefined>;
        disabled?: Derived.Or<boolean | undefined>;
        form?: Derived.Or<string | undefined>;
        multiple?: Derived.Or<boolean | undefined>;
        name?: Derived.Or<string | undefined>;
        required?: Derived.Or<boolean | undefined>;
        size?: Derived.Or<number | undefined>;
        value?: Derived.Or<string | readonly string[] | undefined> | State<string | readonly string[]>;
        onChange?: EventHandler<T> | undefined;
    }

    interface SourceHTMLAttributes<T> extends HTMLAttributes<T> {
        height?: Derived.Or<number | string | undefined>;
        media?: Derived.Or<string | undefined>;
        sizes?: Derived.Or<string | undefined>;
        src?: Derived.Or<string | undefined>;
        srcSet?: Derived.Or<string | undefined>;
        type?: Derived.Or<string | undefined>;
        width?: Derived.Or<number | string | undefined>;
    }

    interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
        media?: Derived.Or<string | undefined>;
        scoped?: Derived.Or<boolean | undefined>;
        type?: Derived.Or<string | undefined>;
        jsx?: Derived.Or<boolean | undefined>;
    }

    interface TableHTMLAttributes<T> extends HTMLAttributes<T> {
        align?: Derived.Or<"left" | "center" | "right" | undefined>;
        bgcolor?: Derived.Or<string | undefined>;
        border?: Derived.Or<number | undefined>;
        cellPadding?: Derived.Or<number | string | undefined>;
        cellSpacing?: Derived.Or<number | string | undefined>;
        frame?: Derived.Or<boolean | undefined>;
        rules?: Derived.Or<"none" | "groups" | "rows" | "columns" | "all" | undefined>;
        summary?: Derived.Or<string | undefined>;
        width?: Derived.Or<number | string | undefined>;
    }

    interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
        autoComplete?: Derived.Or<string | undefined>;
        cols?: Derived.Or<number | undefined>;
        dirName?: Derived.Or<string | undefined>;
        disabled?: Derived.Or<boolean | undefined>;
        form?: Derived.Or<string | undefined>;
        maxLength?: Derived.Or<number | undefined>;
        minLength?: Derived.Or<number | undefined>;
        name?: Derived.Or<string | undefined>;
        placeholder?: Derived.Or<string | undefined>;
        readOnly?: Derived.Or<boolean | undefined>;
        required?: Derived.Or<boolean | undefined>;
        rows?: Derived.Or<number | undefined>;
        value?: Derived.Or<string | undefined> | State<string>;
        wrap?: Derived.Or<string | undefined>;

        onChange?: EventHandler<T> | undefined;
    }

    interface TdHTMLAttributes<T> extends HTMLAttributes<T> {
        align?: Derived.Or<"left" | "center" | "right" | "justify" | "char" | undefined>;
        colSpan?: Derived.Or<number | undefined>;
        headers?: Derived.Or<string | undefined>;
        rowSpan?: Derived.Or<number | undefined>;
        scope?: Derived.Or<string | undefined>;
        abbr?: Derived.Or<string | undefined>;
        height?: Derived.Or<number | string | undefined>;
        width?: Derived.Or<number | string | undefined>;
        valign?: Derived.Or<"top" | "middle" | "bottom" | "baseline" | undefined>;
    }

    interface ThHTMLAttributes<T> extends HTMLAttributes<T> {
        align?: Derived.Or<"left" | "center" | "right" | "justify" | "char" | undefined>;
        colSpan?: Derived.Or<number | undefined>;
        headers?: Derived.Or<string | undefined>;
        rowSpan?: Derived.Or<number | undefined>;
        scope?: Derived.Or<string | undefined>;
        abbr?: Derived.Or<string | undefined>;
    }

    interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
        dateTime?: Derived.Or<string | undefined>;
    }

    interface TrackHTMLAttributes<T> extends HTMLAttributes<T> {
        default?: Derived.Or<boolean | undefined>;
        kind?: Derived.Or<string | undefined>;
        label?: Derived.Or<string | undefined>;
        src?: Derived.Or<string | undefined>;
        srcLang?: Derived.Or<string | undefined>;
    }

    interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {
        height?: Derived.Or<number | string | undefined>;
        playsInline?: Derived.Or<boolean | undefined>;
        poster?: Derived.Or<string | undefined>;
        width?: Derived.Or<number | string | undefined>;
        disablePictureInPicture?: Derived.Or<boolean | undefined>;
        disableRemotePlayback?: Derived.Or<boolean | undefined>;
    }

    // this list is "complete" in that it contains every SVG attribute
    // that React supports, but the types can be improved.
    // Full list here: https://facebook.github.io/react/docs/dom-elements.html
    //
    // The three broad type categories are (in order of restrictiveness):
    //   - "number | string"
    //   - "string"
    //   - union of string literals
    interface SVGAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        // Attributes which also defined in HTMLAttributes
        // See comment in SVGDOMPropertyConfig.js
        class?: ClassList | undefined;
        color?: Derived.Or<string | undefined>;
        height?: Derived.Or<number | string | undefined>;
        id?: Derived.Or<string | undefined>;
        lang?: Derived.Or<string | undefined>;
        max?: Derived.Or<number | string | undefined>;
        media?: Derived.Or<string | undefined>;
        method?: Derived.Or<string | undefined>;
        min?: Derived.Or<number | string | undefined>;
        name?: Derived.Or<string | undefined>;
        style?: Derived.Or<CSSProperties | undefined>;
        target?: Derived.Or<string | undefined>;
        type?: Derived.Or<string | undefined>;
        width?: Derived.Or<number | string | undefined>;

        // Other HTML properties supported by SVG elements in browsers
        role?: Derived.Or<AriaRole | undefined>;
        tabIndex?: Derived.Or<number | undefined>;
        crossOrigin?: Derived.Or<CrossOrigin>;

        // SVG Specific attributes
        accentHeight?: Derived.Or<number | string | undefined>;
        accumulate?: Derived.Or<"none" | "sum" | undefined>;
        additive?: Derived.Or<"replace" | "sum" | undefined>;
        alignmentBaseline?: Derived.Or<
            | "auto"
            | "baseline"
            | "before-edge"
            | "text-before-edge"
            | "middle"
            | "central"
            | "after-edge"
            | "text-after-edge"
            | "ideographic"
            | "alphabetic"
            | "hanging"
            | "mathematical"
            | "inherit"
            | undefined>;
        allowReorder?: Derived.Or<"no" | "yes" | undefined>;
        alphabetic?: Derived.Or<number | string | undefined>;
        amplitude?: Derived.Or<number | string | undefined>;
        arabicForm?: Derived.Or<"initial" | "medial" | "terminal" | "isolated" | undefined>;
        ascent?: Derived.Or<number | string | undefined>;
        attributeName?: Derived.Or<string | undefined>;
        attributeType?: Derived.Or<string | undefined>;
        autoReverse?: Derived.Or<Booleanish | undefined>;
        azimuth?: Derived.Or<number | string | undefined>;
        baseFrequency?: Derived.Or<number | string | undefined>;
        baselineShift?: Derived.Or<number | string | undefined>;
        baseProfile?: Derived.Or<number | string | undefined>;
        bbox?: Derived.Or<number | string | undefined>;
        begin?: Derived.Or<number | string | undefined>;
        bias?: Derived.Or<number | string | undefined>;
        by?: Derived.Or<number | string | undefined>;
        calcMode?: Derived.Or<number | string | undefined>;
        capHeight?: Derived.Or<number | string | undefined>;
        clip?: Derived.Or<number | string | undefined>;
        clipPath?: Derived.Or<string | undefined>;
        clipPathUnits?: Derived.Or<number | string | undefined>;
        clipRule?: Derived.Or<number | string | undefined>;
        colorInterpolation?: Derived.Or<number | string | undefined>;
        colorInterpolationFilters?: Derived.Or<"auto" | "sRGB" | "linearRGB" | "inherit" | undefined>;
        colorProfile?: Derived.Or<number | string | undefined>;
        colorRendering?: Derived.Or<number | string | undefined>;
        contentScriptType?: Derived.Or<number | string | undefined>;
        contentStyleType?: Derived.Or<number | string | undefined>;
        cursor?: Derived.Or<number | string | undefined>;
        cx?: Derived.Or<number | string | undefined>;
        cy?: Derived.Or<number | string | undefined>;
        d?: Derived.Or<string | undefined>;
        decelerate?: Derived.Or<number | string | undefined>;
        descent?: Derived.Or<number | string | undefined>;
        diffuseConstant?: Derived.Or<number | string | undefined>;
        direction?: Derived.Or<number | string | undefined>;
        display?: Derived.Or<number | string | undefined>;
        divisor?: Derived.Or<number | string | undefined>;
        dominantBaseline?: Derived.Or<number | string | undefined>;
        dur?: Derived.Or<number | string | undefined>;
        dx?: Derived.Or<number | string | undefined>;
        dy?: Derived.Or<number | string | undefined>;
        edgeMode?: Derived.Or<number | string | undefined>;
        elevation?: Derived.Or<number | string | undefined>;
        enableBackground?: Derived.Or<number | string | undefined>;
        end?: Derived.Or<number | string | undefined>;
        exponent?: Derived.Or<number | string | undefined>;
        externalResourcesRequired?: Derived.Or<Booleanish | undefined>;
        fill?: Derived.Or<string | undefined>;
        fillOpacity?: Derived.Or<number | string | undefined>;
        fillRule?: Derived.Or<"nonzero" | "evenodd" | "inherit" | undefined>;
        filter?: Derived.Or<string | undefined>;
        filterRes?: Derived.Or<number | string | undefined>;
        filterUnits?: Derived.Or<number | string | undefined>;
        floodColor?: Derived.Or<number | string | undefined>;
        floodOpacity?: Derived.Or<number | string | undefined>;
        focusable?: Derived.Or<Booleanish | "auto" | undefined>;
        fontFamily?: Derived.Or<string | undefined>;
        fontSize?: Derived.Or<number | string | undefined>;
        fontSizeAdjust?: Derived.Or<number | string | undefined>;
        fontStretch?: Derived.Or<number | string | undefined>;
        fontStyle?: Derived.Or<number | string | undefined>;
        fontVariant?: Derived.Or<number | string | undefined>;
        fontWeight?: Derived.Or<number | string | undefined>;
        format?: Derived.Or<number | string | undefined>;
        fr?: Derived.Or<number | string | undefined>;
        from?: Derived.Or<number | string | undefined>;
        fx?: Derived.Or<number | string | undefined>;
        fy?: Derived.Or<number | string | undefined>;
        g1?: Derived.Or<number | string | undefined>;
        g2?: Derived.Or<number | string | undefined>;
        glyphName?: Derived.Or<number | string | undefined>;
        glyphOrientationHorizontal?: Derived.Or<number | string | undefined>;
        glyphOrientationVertical?: Derived.Or<number | string | undefined>;
        glyphRef?: Derived.Or<number | string | undefined>;
        gradientTransform?: Derived.Or<string | undefined>;
        gradientUnits?: Derived.Or<string | undefined>;
        hanging?: Derived.Or<number | string | undefined>;
        horizAdvX?: Derived.Or<number | string | undefined>;
        horizOriginX?: Derived.Or<number | string | undefined>;
        href?: Derived.Or<string | undefined>;
        ideographic?: Derived.Or<number | string | undefined>;
        imageRendering?: Derived.Or<number | string | undefined>;
        in2?: Derived.Or<number | string | undefined>;
        in?: Derived.Or<string | undefined>;
        intercept?: Derived.Or<number | string | undefined>;
        k1?: Derived.Or<number | string | undefined>;
        k2?: Derived.Or<number | string | undefined>;
        k3?: Derived.Or<number | string | undefined>;
        k4?: Derived.Or<number | string | undefined>;
        k?: Derived.Or<number | string | undefined>;
        kernelMatrix?: Derived.Or<number | string | undefined>;
        kernelUnitLength?: Derived.Or<number | string | undefined>;
        kerning?: Derived.Or<number | string | undefined>;
        keyPoints?: Derived.Or<number | string | undefined>;
        keySplines?: Derived.Or<number | string | undefined>;
        keyTimes?: Derived.Or<number | string | undefined>;
        lengthAdjust?: Derived.Or<number | string | undefined>;
        letterSpacing?: Derived.Or<number | string | undefined>;
        lightingColor?: Derived.Or<number | string | undefined>;
        limitingConeAngle?: Derived.Or<number | string | undefined>;
        local?: Derived.Or<number | string | undefined>;
        markerEnd?: Derived.Or<string | undefined>;
        markerHeight?: Derived.Or<number | string | undefined>;
        markerMid?: Derived.Or<string | undefined>;
        markerStart?: Derived.Or<string | undefined>;
        markerUnits?: Derived.Or<number | string | undefined>;
        markerWidth?: Derived.Or<number | string | undefined>;
        mask?: Derived.Or<string | undefined>;
        maskContentUnits?: Derived.Or<number | string | undefined>;
        maskUnits?: Derived.Or<number | string | undefined>;
        mathematical?: Derived.Or<number | string | undefined>;
        mode?: Derived.Or<number | string | undefined>;
        numOctaves?: Derived.Or<number | string | undefined>;
        offset?: Derived.Or<number | string | undefined>;
        opacity?: Derived.Or<number | string | undefined>;
        operator?: Derived.Or<number | string | undefined>;
        order?: Derived.Or<number | string | undefined>;
        orient?: Derived.Or<number | string | undefined>;
        orientation?: Derived.Or<number | string | undefined>;
        origin?: Derived.Or<number | string | undefined>;
        overflow?: Derived.Or<number | string | undefined>;
        overlinePosition?: Derived.Or<number | string | undefined>;
        overlineThickness?: Derived.Or<number | string | undefined>;
        paintOrder?: Derived.Or<number | string | undefined>;
        panose1?: Derived.Or<number | string | undefined>;
        path?: Derived.Or<string | undefined>;
        pathLength?: Derived.Or<number | string | undefined>;
        patternContentUnits?: Derived.Or<string | undefined>;
        patternTransform?: Derived.Or<number | string | undefined>;
        patternUnits?: Derived.Or<string | undefined>;
        pointerEvents?: Derived.Or<number | string | undefined>;
        points?: Derived.Or<string | undefined>;
        pointsAtX?: Derived.Or<number | string | undefined>;
        pointsAtY?: Derived.Or<number | string | undefined>;
        pointsAtZ?: Derived.Or<number | string | undefined>;
        preserveAlpha?: Derived.Or<Booleanish | undefined>;
        preserveAspectRatio?: Derived.Or<string | undefined>;
        primitiveUnits?: Derived.Or<number | string | undefined>;
        r?: Derived.Or<number | string | undefined>;
        radius?: Derived.Or<number | string | undefined>;
        refX?: Derived.Or<number | string | undefined>;
        refY?: Derived.Or<number | string | undefined>;
        renderingIntent?: Derived.Or<number | string | undefined>;
        repeatCount?: Derived.Or<number | string | undefined>;
        repeatDur?: Derived.Or<number | string | undefined>;
        requiredExtensions?: Derived.Or<number | string | undefined>;
        requiredFeatures?: Derived.Or<number | string | undefined>;
        restart?: Derived.Or<number | string | undefined>;
        result?: Derived.Or<string | undefined>;
        rotate?: Derived.Or<number | string | undefined>;
        rx?: Derived.Or<number | string | undefined>;
        ry?: Derived.Or<number | string | undefined>;
        scale?: Derived.Or<number | string | undefined>;
        seed?: Derived.Or<number | string | undefined>;
        shapeRendering?: Derived.Or<number | string | undefined>;
        slope?: Derived.Or<number | string | undefined>;
        spacing?: Derived.Or<number | string | undefined>;
        specularConstant?: Derived.Or<number | string | undefined>;
        specularExponent?: Derived.Or<number | string | undefined>;
        speed?: Derived.Or<number | string | undefined>;
        spreadMethod?: Derived.Or<string | undefined>;
        startOffset?: Derived.Or<number | string | undefined>;
        stdDeviation?: Derived.Or<number | string | undefined>;
        stemh?: Derived.Or<number | string | undefined>;
        stemv?: Derived.Or<number | string | undefined>;
        stitchTiles?: Derived.Or<number | string | undefined>;
        stopColor?: Derived.Or<string | undefined>;
        stopOpacity?: Derived.Or<number | string | undefined>;
        strikethroughPosition?: Derived.Or<number | string | undefined>;
        strikethroughThickness?: Derived.Or<number | string | undefined>;
        string?: Derived.Or<number | string | undefined>;
        stroke?: Derived.Or<string | undefined>;
        strokeDasharray?: Derived.Or<string | number | undefined>;
        strokeDashoffset?: Derived.Or<string | number | undefined>;
        strokeLinecap?: Derived.Or<"butt" | "round" | "square" | "inherit" | undefined>;
        strokeLinejoin?: Derived.Or<"miter" | "round" | "bevel" | "inherit" | undefined>;
        strokeMiterlimit?: Derived.Or<number | string | undefined>;
        strokeOpacity?: Derived.Or<number | string | undefined>;
        strokeWidth?: Derived.Or<number | string | undefined>;
        surfaceScale?: Derived.Or<number | string | undefined>;
        systemLanguage?: Derived.Or<number | string | undefined>;
        tableValues?: Derived.Or<number | string | undefined>;
        targetX?: Derived.Or<number | string | undefined>;
        targetY?: Derived.Or<number | string | undefined>;
        textAnchor?: Derived.Or<string | undefined>;
        textDecoration?: Derived.Or<number | string | undefined>;
        textLength?: Derived.Or<number | string | undefined>;
        textRendering?: Derived.Or<number | string | undefined>;
        to?: Derived.Or<number | string | undefined>;
        transform?: Derived.Or<string | undefined>;
        u1?: Derived.Or<number | string | undefined>;
        u2?: Derived.Or<number | string | undefined>;
        underlinePosition?: Derived.Or<number | string | undefined>;
        underlineThickness?: Derived.Or<number | string | undefined>;
        unicode?: Derived.Or<number | string | undefined>;
        unicodeBidi?: Derived.Or<number | string | undefined>;
        unicodeRange?: Derived.Or<number | string | undefined>;
        unitsPerEm?: Derived.Or<number | string | undefined>;
        vAlphabetic?: Derived.Or<number | string | undefined>;
        values?: Derived.Or<string | undefined>;
        vectorEffect?: Derived.Or<number | string | undefined>;
        version?: Derived.Or<string | undefined>;
        vertAdvY?: Derived.Or<number | string | undefined>;
        vertOriginX?: Derived.Or<number | string | undefined>;
        vertOriginY?: Derived.Or<number | string | undefined>;
        vHanging?: Derived.Or<number | string | undefined>;
        vIdeographic?: Derived.Or<number | string | undefined>;
        viewBox?: Derived.Or<string | undefined>;
        viewTarget?: Derived.Or<number | string | undefined>;
        visibility?: Derived.Or<number | string | undefined>;
        vMathematical?: Derived.Or<number | string | undefined>;
        widths?: Derived.Or<number | string | undefined>;
        wordSpacing?: Derived.Or<number | string | undefined>;
        writingMode?: Derived.Or<number | string | undefined>;
        x1?: Derived.Or<number | string | undefined>;
        x2?: Derived.Or<number | string | undefined>;
        x?: Derived.Or<number | string | undefined>;
        xChannelSelector?: Derived.Or<string | undefined>;
        xHeight?: Derived.Or<number | string | undefined>;
        xlinkActuate?: Derived.Or<string | undefined>;
        xlinkArcrole?: Derived.Or<string | undefined>;
        xlinkHref?: Derived.Or<string | undefined>;
        xlinkRole?: Derived.Or<string | undefined>;
        xlinkShow?: Derived.Or<string | undefined>;
        xlinkTitle?: Derived.Or<string | undefined>;
        xlinkType?: Derived.Or<string | undefined>;
        xmlBase?: Derived.Or<string | undefined>;
        xmlLang?: Derived.Or<string | undefined>;
        xmlns?: Derived.Or<string | undefined>;
        xmlnsXlink?: Derived.Or<string | undefined>;
        xmlSpace?: Derived.Or<string | undefined>;
        y1?: Derived.Or<number | string | undefined>;
        y2?: Derived.Or<number | string | undefined>;
        y?: Derived.Or<number | string | undefined>;
        yChannelSelector?: Derived.Or<string | undefined>;
        z?: Derived.Or<number | string | undefined>;
        zoomAndPan?: Derived.Or<string | undefined>;
    }

    interface WebViewHTMLAttributes<T> extends HTMLAttributes<T> {
        allowFullScreen?: Derived.Or<boolean | undefined>;
        allowpopups?: Derived.Or<boolean | undefined>;
        autosize?: Derived.Or<boolean | undefined>;
        blinkfeatures?: Derived.Or<string | undefined>;
        disableblinkfeatures?: Derived.Or<string | undefined>;
        disableguestresize?: Derived.Or<boolean | undefined>;
        disablewebsecurity?: Derived.Or<boolean | undefined>;
        guestinstance?: Derived.Or<string | undefined>;
        httpreferrer?: Derived.Or<string | undefined>;
        nodeintegration?: Derived.Or<boolean | undefined>;
        partition?: Derived.Or<string | undefined>;
        plugins?: Derived.Or<boolean | undefined>;
        preload?: Derived.Or<string | undefined>;
        src?: Derived.Or<string | undefined>;
        useragent?: Derived.Or<string | undefined>;
        webpreferences?: Derived.Or<string | undefined>;
    }

    interface SVGProps<T> extends SVGAttributes<T>, RefAttributes<T> { }

    interface SVGLineElementAttributes<T> extends SVGProps<T> { }
    interface SVGTextElementAttributes<T> extends SVGProps<T> { }


}
