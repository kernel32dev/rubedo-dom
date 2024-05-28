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
// declarations for JSX taken from React and adaptated to better represent standard html and to work with levi
// in the future it would be interesting to generate the code in this file from the spec directly, but until then this will do
import type { OrDerived, OrState, Derived } from "levi-state";
import type * as CSS from "./css";
import type * as LEVI from ".";

export namespace JSX {
    /** used by typescript to determine the type of jsx expressions */
    type Element = LEVI.Elems;
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
        accessKey?: OrDerived<string | undefined>;
        autoFocus?: OrDerived<boolean | undefined>;
        class?: ClassList | undefined;
        contentEditable?: OrDerived<Booleanish | "inherit" | "plaintext-only" | undefined>;
        contextMenu?: OrDerived<string | undefined>;
        dir?: OrDerived<string | undefined>;
        draggable?: OrDerived<Booleanish | undefined>;
        hidden?: OrDerived<boolean | undefined>;
        id?: OrDerived<string | undefined>;
        lang?: OrDerived<string | undefined>;
        nonce?: OrDerived<string | undefined>;
        slot?: OrDerived<string | undefined>;
        spellCheck?: OrDerived<Booleanish | undefined>;
        style?: OrDerived<CSSProperties | undefined>;
        tabIndex?: OrDerived<number | undefined>;
        title?: OrDerived<string | undefined>;
        translate?: OrDerived<"yes" | "no" | undefined>;

        // Unknown
        radioGroup?: OrDerived<string | undefined>; // <command>, <menuitem>

        // WAI-ARIA
        role?: OrDerived<AriaRole | undefined>;

        // RDFa Attributes
        about?: OrDerived<string | undefined>;
        content?: OrDerived<string | undefined>;
        datatype?: OrDerived<string | undefined>;
        inlist?: OrDerived<any>;
        prefix?: OrDerived<string | undefined>;
        property?: OrDerived<string | undefined>;
        rel?: OrDerived<string | undefined>;
        resource?: OrDerived<string | undefined>;
        rev?: OrDerived<string | undefined>;
        typeof?: OrDerived<string | undefined>;
        vocab?: OrDerived<string | undefined>;

        // Non-standard Attributes
        autoCapitalize?: OrDerived<string | undefined>;
        autoCorrect?: OrDerived<string | undefined>;
        autoSave?: OrDerived<string | undefined>;
        color?: OrDerived<string | undefined>;
        itemProp?: OrDerived<string | undefined>;
        itemScope?: OrDerived<boolean | undefined>;
        itemType?: OrDerived<string | undefined>;
        itemID?: OrDerived<string | undefined>;
        itemRef?: OrDerived<string | undefined>;
        results?: OrDerived<number | undefined>;
        security?: OrDerived<string | undefined>;
        unselectable?: OrDerived<"on" | "off" | undefined>;

        // Living Standard
        /**
         * Hints at the type of data that might be entered by the user while editing the element or its contents
         * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
         */
        inputMode?: OrDerived<"none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search" | undefined>;
        /**
         * Specify that a standard HTML element should behave like a defined custom built-in element
         * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
         */
        is?: OrDerived<string | undefined>;
    }

    //
    // Event System
    // ----------------------------------------------------------------------

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
        children?: LEVI.Nodes;

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
        "aria-activedescendant"?: OrDerived<string | undefined>;
        /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
        "aria-atomic"?: OrDerived<Booleanish | undefined>;
        /**
         * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
         * presented if they are made.
         */
        "aria-autocomplete"?: OrDerived<"none" | "inline" | "list" | "both" | undefined>;
        /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
        /**
         * Defines a string value that labels the current element, which is intended to be converted into Braille.
         * @see aria-label.
         */
        "aria-braillelabel"?: OrDerived<string | undefined>;
        /**
         * Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.
         * @see aria-roledescription.
         */
        "aria-brailleroledescription"?: OrDerived<string | undefined>;
        "aria-busy"?: OrDerived<Booleanish | undefined>;
        /**
         * Indicates the current "checked" Derived of checkboxes, radio buttons, and other widgets.
         * @see aria-pressed @see aria-selected.
         */
        "aria-checked"?: OrDerived<boolean | "false" | "mixed" | "true" | undefined>;
        /**
         * Defines the total number of columns in a table, grid, or treegrid.
         * @see aria-colindex.
         */
        "aria-colcount"?: OrDerived<number | undefined>;
        /**
         * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
         * @see aria-colcount @see aria-colspan.
         */
        "aria-colindex"?: OrDerived<number | undefined>;
        /**
         * Defines a human readable text alternative of aria-colindex.
         * @see aria-rowindextext.
         */
        "aria-colindextext"?: OrDerived<string | undefined>;
        /**
         * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
         * @see aria-colindex @see aria-rowspan.
         */
        "aria-colspan"?: OrDerived<number | undefined>;
        /**
         * Identifies the element (or elements) whose contents or presence are controlled by the current element.
         * @see aria-owns.
         */
        "aria-controls"?: OrDerived<string | undefined>;
        /** Indicates the element that represents the current item within a container or set of related elements. */
        "aria-current"?: OrDerived<boolean | "false" | "true" | "page" | "step" | "location" | "date" | "time" | undefined>;
        /**
         * Identifies the element (or elements) that describes the object.
         * @see aria-labelledby
         */
        "aria-describedby"?: OrDerived<string | undefined>;
        /**
         * Defines a string value that describes or annotates the current element.
         * @see related aria-describedby.
         */
        "aria-description"?: OrDerived<string | undefined>;
        /**
         * Identifies the element that provides a detailed, extended description for the object.
         * @see aria-describedby.
         */
        "aria-details"?: OrDerived<string | undefined>;
        /**
         * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
         * @see aria-hidden @see aria-readonly.
         */
        "aria-disabled"?: OrDerived<Booleanish | undefined>;
        /**
         * Indicates what functions can be performed when a dragged object is released on the drop target.
         * @deprecated in ARIA 1.1
         */
        "aria-dropeffect"?: OrDerived<"none" | "copy" | "execute" | "link" | "move" | "popup" | undefined>;
        /**
         * Identifies the element that provides an error message for the object.
         * @see aria-invalid @see aria-describedby.
         */
        "aria-errormessage"?: OrDerived<string | undefined>;
        /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
        "aria-expanded"?: OrDerived<Booleanish | undefined>;
        /**
         * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
         * allows assistive technology to override the general default of reading in document source order.
         */
        "aria-flowto"?: OrDerived<string | undefined>;
        /**
         * Indicates an element's "grabbed" Derived in a drag-and-drop operation.
         * @deprecated in ARIA 1.1
         */
        "aria-grabbed"?: OrDerived<Booleanish | undefined>;
        /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
        "aria-haspopup"?: OrDerived<boolean | "false" | "true" | "menu" | "listbox" | "tree" | "grid" | "dialog" | undefined>;
        /**
         * Indicates whether the element is exposed to an accessibility API.
         * @see aria-disabled.
         */
        "aria-hidden"?: OrDerived<Booleanish | undefined>;
        /**
         * Indicates the entered value does not conform to the format expected by the application.
         * @see aria-errormessage.
         */
        "aria-invalid"?: OrDerived<boolean | "false" | "true" | "grammar" | "spelling" | undefined>;
        /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
        "aria-keyshortcuts"?: OrDerived<string | undefined>;
        /**
         * Defines a string value that labels the current element.
         * @see aria-labelledby.
         */
        "aria-label"?: OrDerived<string | undefined>;
        /**
         * Identifies the element (or elements) that labels the current element.
         * @see aria-describedby.
         */
        "aria-labelledby"?: OrDerived<string | undefined>;
        /** Defines the hierarchical level of an element within a structure. */
        "aria-level"?: OrDerived<number | undefined>;
        /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
        "aria-live"?: OrDerived<"off" | "assertive" | "polite" | undefined>;
        /** Indicates whether an element is modal when displayed. */
        "aria-modal"?: OrDerived<Booleanish | undefined>;
        /** Indicates whether a text box accepts multiple lines of input or only a single line. */
        "aria-multiline"?: OrDerived<Booleanish | undefined>;
        /** Indicates that the user may select more than one item from the current selectable descendants. */
        "aria-multiselectable"?: OrDerived<Booleanish | undefined>;
        /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
        "aria-orientation"?: OrDerived<"horizontal" | "vertical" | undefined>;
        /**
         * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
         * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
         * @see aria-controls.
         */
        "aria-owns"?: OrDerived<string | undefined>;
        /**
         * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
         * A hint could be a sample value or a brief description of the expected format.
         */
        "aria-placeholder"?: OrDerived<string | undefined>;
        /**
         * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
         * @see aria-setsize.
         */
        "aria-posinset"?: OrDerived<number | undefined>;
        /**
         * Indicates the current "pressed" Derived of toggle buttons.
         * @see aria-checked @see aria-selected.
         */
        "aria-pressed"?: OrDerived<boolean | "false" | "mixed" | "true" | undefined>;
        /**
         * Indicates that the element is not editable, but is otherwise operable.
         * @see aria-disabled.
         */
        "aria-readonly"?: OrDerived<Booleanish | undefined>;
        /**
         * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
         * @see aria-atomic.
         */
        "aria-relevant"?: OrDerived<
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
        "aria-required"?: OrDerived<Booleanish | undefined>;
        /** Defines a human-readable, author-localized description for the role of an element. */
        "aria-roledescription"?: OrDerived<string | undefined>;
        /**
         * Defines the total number of rows in a table, grid, or treegrid.
         * @see aria-rowindex.
         */
        "aria-rowcount"?: OrDerived<number | undefined>;
        /**
         * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
         * @see aria-rowcount @see aria-rowspan.
         */
        "aria-rowindex"?: OrDerived<number | undefined>;
        /**
         * Defines a human readable text alternative of aria-rowindex.
         * @see aria-colindextext.
         */
        "aria-rowindextext"?: OrDerived<string | undefined>;
        /**
         * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
         * @see aria-rowindex @see aria-colspan.
         */
        "aria-rowspan"?: OrDerived<number | undefined>;
        /**
         * Indicates the current "selected" Derived of various widgets.
         * @see aria-checked @see aria-pressed.
         */
        "aria-selected"?: OrDerived<Booleanish | undefined>;
        /**
         * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
         * @see aria-posinset.
         */
        "aria-setsize"?: OrDerived<number | undefined>;
        /** Indicates if items in a table or grid are sorted in ascending or descending order. */
        "aria-sort"?: OrDerived<"none" | "ascending" | "descending" | "other" | undefined>;
        /** Defines the maximum allowed value for a range widget. */
        "aria-valuemax"?: OrDerived<number | undefined>;
        /** Defines the minimum allowed value for a range widget. */
        "aria-valuemin"?: OrDerived<number | undefined>;
        /**
         * Defines the current value for a range widget.
         * @see aria-valuetext.
         */
        "aria-valuenow"?: OrDerived<number | undefined>;
        /** Defines the human readable text alternative of aria-valuenow for a range widget. */
        "aria-valuetext"?: OrDerived<string | undefined>;
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
        | { [className: string]: OrDerived<boolean | null | undefined> }
        | StatelessClassList
        | Derived<StatelessClassList | StatelessClassList[]>;
    type StatelessClassList = string | false | null | undefined | { [className: string]: boolean | null | undefined };

    interface CSSProperties extends CSS.Properties<string | number> {
        /**
         * The index signature was removed to enable closed typing for style
         * using CSSType. You're able to use type assertion or module augmentation
         * to add properties or an index signature of your own.
         *
         * For examples and more information, visit:
         * https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
         */
    }

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
        download?: OrDerived<any>;
        href?: OrDerived<string | undefined>;
        hrefLang?: OrDerived<string | undefined>;
        media?: OrDerived<string | undefined>;
        ping?: OrDerived<string | undefined>;
        target?: OrDerived<HTMLAttributeAnchorTarget | undefined>;
        type?: OrDerived<string | undefined>;
        referrerPolicy?: OrDerived<HTMLAttributeReferrerPolicy | undefined>;
    }

    interface AudioHTMLAttributes<T> extends MediaHTMLAttributes<T> { }

    interface AreaHTMLAttributes<T> extends HTMLAttributes<T> {
        alt?: OrDerived<string | undefined>;
        coords?: OrDerived<string | undefined>;
        download?: OrDerived<any>;
        href?: OrDerived<string | undefined>;
        hrefLang?: OrDerived<string | undefined>;
        media?: OrDerived<string | undefined>;
        referrerPolicy?: OrDerived<HTMLAttributeReferrerPolicy | undefined>;
        shape?: OrDerived<string | undefined>;
        target?: OrDerived<string | undefined>;
    }

    interface BaseHTMLAttributes<T> extends HTMLAttributes<T> {
        href?: OrDerived<string | undefined>;
        target?: OrDerived<string | undefined>;
    }

    interface BlockquoteHTMLAttributes<T> extends HTMLAttributes<T> {
        cite?: OrDerived<string | undefined>;
    }

    interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
        disabled?: OrDerived<boolean | undefined>;
        form?: OrDerived<string | undefined>;
        formAction?: OrDerived<string | undefined>;
        formEncType?: OrDerived<string | undefined>;
        formMethod?: OrDerived<string | undefined>;
        formNoValidate?: OrDerived<boolean | undefined>;
        formTarget?: OrDerived<string | undefined>;
        name?: OrDerived<string | undefined>;
        type?: OrDerived<"submit" | "reset" | "button" | undefined>;
        value?: OrDerived<string | undefined>;
    }

    interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {
        height?: OrDerived<number | string | undefined>;
        width?: OrDerived<number | string | undefined>;
    }

    interface ColHTMLAttributes<T> extends HTMLAttributes<T> {
        span?: OrDerived<number | undefined>;
        width?: OrDerived<number | string | undefined>;
    }

    interface ColgroupHTMLAttributes<T> extends HTMLAttributes<T> {
        span?: OrDerived<number | undefined>;
    }

    interface DataHTMLAttributes<T> extends HTMLAttributes<T> {
        value?: OrDerived<string | undefined>;
    }

    interface DetailsHTMLAttributes<T> extends HTMLAttributes<T> {
        open?: OrDerived<boolean | undefined>;
        onToggle?: OrDerived<EventHandler<T> | undefined>;
        name?: OrDerived<string | undefined>;
    }

    interface DelHTMLAttributes<T> extends HTMLAttributes<T> {
        cite?: OrDerived<string | undefined>;
        dateTime?: OrDerived<string | undefined>;
    }

    interface DialogHTMLAttributes<T> extends HTMLAttributes<T> {
        onCancel?: OrDerived<EventHandler<T> | undefined>;
        onClose?: OrDerived<EventHandler<T> | undefined>;
        open?: OrDerived<boolean | undefined>;
    }

    interface EmbedHTMLAttributes<T> extends HTMLAttributes<T> {
        height?: OrDerived<number | string | undefined>;
        src?: OrDerived<string | undefined>;
        type?: OrDerived<string | undefined>;
        width?: OrDerived<number | string | undefined>;
    }

    interface FieldsetHTMLAttributes<T> extends HTMLAttributes<T> {
        disabled?: OrDerived<boolean | undefined>;
        form?: OrDerived<string | undefined>;
        name?: OrDerived<string | undefined>;
    }

    interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
        acceptCharset?: OrDerived<string | undefined>;
        action?: OrDerived<string | undefined>;
        autoComplete?: OrDerived<string | undefined>;
        encType?: OrDerived<string | undefined>;
        method?: OrDerived<string | undefined>;
        name?: OrDerived<string | undefined>;
        noValidate?: OrDerived<boolean | undefined>;
        target?: OrDerived<string | undefined>;
    }

    interface HtmlHTMLAttributes<T> extends HTMLAttributes<T> {
        manifest?: OrDerived<string | undefined>;
    }

    interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
        allow?: OrDerived<string | undefined>;
        allowFullScreen?: OrDerived<boolean | undefined>;
        allowTransparency?: OrDerived<boolean | undefined>;
        /** @deprecated */
        frameBorder?: OrDerived<number | string | undefined>;
        height?: OrDerived<number | string | undefined>;
        loading?: OrDerived<"eager" | "lazy" | undefined>;
        /** @deprecated */
        marginHeight?: OrDerived<number | undefined>;
        /** @deprecated */
        marginWidth?: OrDerived<number | undefined>;
        name?: OrDerived<string | undefined>;
        referrerPolicy?: OrDerived<HTMLAttributeReferrerPolicy | undefined>;
        sandbox?: OrDerived<string | undefined>;
        /** @deprecated */
        scrolling?: OrDerived<string | undefined>;
        seamless?: OrDerived<boolean | undefined>;
        src?: OrDerived<string | undefined>;
        srcDoc?: OrDerived<string | undefined>;
        width?: OrDerived<number | string | undefined>;
    }

    interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
        alt?: OrDerived<string | undefined>;
        crossOrigin?: OrDerived<CrossOrigin>;
        decoding?: OrDerived<"async" | "auto" | "sync" | undefined>;
        height?: OrDerived<number | string | undefined>;
        loading?: OrDerived<"eager" | "lazy" | undefined>;
        referrerPolicy?: OrDerived<HTMLAttributeReferrerPolicy | undefined>;
        sizes?: OrDerived<string | undefined>;
        src?: OrDerived<string | undefined>;
        srcSet?: OrDerived<string | undefined>;
        useMap?: OrDerived<string | undefined>;
        width?: OrDerived<number | string | undefined>;
    }

    interface InsHTMLAttributes<T> extends HTMLAttributes<T> {
        cite?: OrDerived<string | undefined>;
        dateTime?: OrDerived<string | undefined>;
    }

    type HTMLInputTypeAttribute =
        "button" | "checkbox" | "color" | "date" | "datetime-local" |
        "email" | "file" | "hidden" | "image" | "month" | "number" |
        "password" | "radio" | "range" | "reset" | "search" | "submit" |
        "tel" | "text" | "time" | "url" | "week" | (string & {});

    interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
        accept?: OrDerived<string | undefined>;
        alt?: OrDerived<string | undefined>;
        autoComplete?: OrDerived<string | undefined>;
        capture?: OrDerived<boolean | "user" | "environment" | undefined>; // https://www.w3.org/TR/html-media-capture/#the-capture-attribute
        checked?: OrState<boolean | undefined>;
        disabled?: OrDerived<boolean | undefined>;
        enterKeyHint?: OrDerived<"enter" | "done" | "go" | "next" | "previous" | "search" | "send" | undefined>;
        form?: OrDerived<string | undefined>;
        formAction?: OrDerived<string | undefined>;
        formEncType?: OrDerived<string | undefined>;
        formMethod?: OrDerived<string | undefined>;
        formNoValidate?: OrDerived<boolean | undefined>;
        formTarget?: OrDerived<string | undefined>;
        height?: OrDerived<number | string | undefined>;
        list?: OrDerived<string | undefined>;
        max?: OrDerived<number | string | undefined>;
        maxLength?: OrDerived<number | undefined>;
        min?: OrDerived<number | string | undefined>;
        minLength?: OrDerived<number | undefined>;
        multiple?: OrDerived<boolean | undefined>;
        name?: OrDerived<string | undefined>;
        pattern?: OrDerived<string | undefined>;
        placeholder?: OrDerived<string | undefined>;
        readOnly?: OrDerived<boolean | undefined>;
        required?: OrDerived<boolean | undefined>;
        size?: OrDerived<number | undefined>;
        src?: OrDerived<string | undefined>;
        step?: OrDerived<number | string | undefined>;
        type?: OrDerived<HTMLInputTypeAttribute | undefined>;
        value?: OrState<string | undefined>;
        width?: OrDerived<number | string | undefined>;

        onChange?: EventHandler<T> | undefined;
    }

    interface KeygenHTMLAttributes<T> extends HTMLAttributes<T> {
        challenge?: OrDerived<string | undefined>;
        disabled?: OrDerived<boolean | undefined>;
        form?: OrDerived<string | undefined>;
        keyType?: OrDerived<string | undefined>;
        keyParams?: OrDerived<string | undefined>;
        name?: OrDerived<string | undefined>;
    }

    interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
        form?: OrDerived<string | undefined>;
        for?: OrDerived<string | undefined>;
    }

    interface LiHTMLAttributes<T> extends HTMLAttributes<T> {
        value?: OrDerived<number | undefined>;
    }

    interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
        as?: OrDerived<string | undefined>;
        crossOrigin?: OrDerived<CrossOrigin>;
        fetchPriority?: OrDerived<"high" | "low" | "auto">;
        href?: OrDerived<string | undefined>;
        hrefLang?: OrDerived<string | undefined>;
        integrity?: OrDerived<string | undefined>;
        media?: OrDerived<string | undefined>;
        imageSrcSet?: OrDerived<string | undefined>;
        imageSizes?: OrDerived<string | undefined>;
        referrerPolicy?: OrDerived<HTMLAttributeReferrerPolicy | undefined>;
        sizes?: OrDerived<string | undefined>;
        type?: OrDerived<string | undefined>;
        charSet?: OrDerived<string | undefined>;
    }

    interface MapHTMLAttributes<T> extends HTMLAttributes<T> {
        name?: OrDerived<string | undefined>;
    }

    interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {
        type?: OrDerived<string | undefined>;
    }

    interface MediaHTMLAttributes<T> extends HTMLAttributes<T> {
        autoPlay?: OrDerived<boolean | undefined>;
        controls?: OrDerived<boolean | undefined>;
        controlsList?: OrDerived<string | undefined>;
        crossOrigin?: OrDerived<CrossOrigin>;
        loop?: OrDerived<boolean | undefined>;
        mediaGroup?: OrDerived<string | undefined>;
        muted?: OrDerived<boolean | undefined>;
        playsInline?: OrDerived<boolean | undefined>;
        preload?: OrDerived<string | undefined>;
        src?: OrDerived<string | undefined>;
    }

    interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
        charSet?: OrDerived<string | undefined>;
        content?: OrDerived<string | undefined>;
        httpEquiv?: OrDerived<string | undefined>;
        media?: OrDerived<string | undefined>;
        name?: OrDerived<string | undefined>;
    }

    interface MeterHTMLAttributes<T> extends HTMLAttributes<T> {
        form?: OrDerived<string | undefined>;
        high?: OrDerived<number | undefined>;
        low?: OrDerived<number | undefined>;
        max?: OrDerived<number | string | undefined>;
        min?: OrDerived<number | string | undefined>;
        optimum?: OrDerived<number | undefined>;
        value?: OrDerived<number | undefined>;
    }

    interface QuoteHTMLAttributes<T> extends HTMLAttributes<T> {
        cite?: OrDerived<string | undefined>;
    }

    interface ObjectHTMLAttributes<T> extends HTMLAttributes<T> {
        classID?: OrDerived<string | undefined>;
        data?: OrDerived<string | undefined>;
        form?: OrDerived<string | undefined>;
        height?: OrDerived<number | string | undefined>;
        name?: OrDerived<string | undefined>;
        type?: OrDerived<string | undefined>;
        useMap?: OrDerived<string | undefined>;
        width?: OrDerived<number | string | undefined>;
        wmode?: OrDerived<string | undefined>;
    }

    interface OlHTMLAttributes<T> extends HTMLAttributes<T> {
        reversed?: OrDerived<boolean | undefined>;
        start?: OrDerived<number | undefined>;
        type?: OrDerived<"1" | "a" | "A" | "i" | "I" | undefined>;
    }

    interface OptgroupHTMLAttributes<T> extends HTMLAttributes<T> {
        disabled?: OrDerived<boolean | undefined>;
        label?: OrDerived<string | undefined>;
    }

    interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
        disabled?: OrDerived<boolean | undefined>;
        label?: OrDerived<string | undefined>;
        selected?: OrDerived<boolean | undefined>;
        value?: OrDerived<string | undefined>;
    }

    interface OutputHTMLAttributes<T> extends HTMLAttributes<T> {
        form?: OrDerived<string | undefined>;
        for?: OrDerived<string | undefined>;
        name?: OrDerived<string | undefined>;
    }

    interface ParamHTMLAttributes<T> extends HTMLAttributes<T> {
        name?: OrDerived<string | undefined>;
        value?: OrDerived<string | undefined>;
    }

    interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {
        max?: OrDerived<number | string | undefined>;
        value?: OrDerived<string | undefined>;
    }

    interface SlotHTMLAttributes<T> extends HTMLAttributes<T> {
        name?: OrDerived<string | undefined>;
    }

    interface ScriptHTMLAttributes<T> extends HTMLAttributes<T> {
        async?: OrDerived<boolean | undefined>;
        /** @deprecated */
        charSet?: OrDerived<string | undefined>;
        crossOrigin?: OrDerived<CrossOrigin>;
        defer?: OrDerived<boolean | undefined>;
        integrity?: OrDerived<string | undefined>;
        noModule?: OrDerived<boolean | undefined>;
        referrerPolicy?: OrDerived<HTMLAttributeReferrerPolicy | undefined>;
        src?: OrDerived<string | undefined>;
        type?: OrDerived<string | undefined>;
    }

    interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
        autoComplete?: OrDerived<string | undefined>;
        disabled?: OrDerived<boolean | undefined>;
        form?: OrDerived<string | undefined>;
        multiple?: OrDerived<boolean | undefined>;
        name?: OrDerived<string | undefined>;
        required?: OrDerived<boolean | undefined>;
        size?: OrDerived<number | undefined>;
        value?: OrState<string | readonly string[] | undefined>;
        onChange?: EventHandler<T> | undefined;
    }

    interface SourceHTMLAttributes<T> extends HTMLAttributes<T> {
        height?: OrDerived<number | string | undefined>;
        media?: OrDerived<string | undefined>;
        sizes?: OrDerived<string | undefined>;
        src?: OrDerived<string | undefined>;
        srcSet?: OrDerived<string | undefined>;
        type?: OrDerived<string | undefined>;
        width?: OrDerived<number | string | undefined>;
    }

    interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
        media?: OrDerived<string | undefined>;
        scoped?: OrDerived<boolean | undefined>;
        type?: OrDerived<string | undefined>;
        jsx?: OrDerived<boolean | undefined>;
    }

    interface TableHTMLAttributes<T> extends HTMLAttributes<T> {
        align?: OrDerived<"left" | "center" | "right" | undefined>;
        bgcolor?: OrDerived<string | undefined>;
        border?: OrDerived<number | undefined>;
        cellPadding?: OrDerived<number | string | undefined>;
        cellSpacing?: OrDerived<number | string | undefined>;
        frame?: OrDerived<boolean | undefined>;
        rules?: OrDerived<"none" | "groups" | "rows" | "columns" | "all" | undefined>;
        summary?: OrDerived<string | undefined>;
        width?: OrDerived<number | string | undefined>;
    }

    interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
        autoComplete?: OrDerived<string | undefined>;
        cols?: OrDerived<number | undefined>;
        dirName?: OrDerived<string | undefined>;
        disabled?: OrDerived<boolean | undefined>;
        form?: OrDerived<string | undefined>;
        maxLength?: OrDerived<number | undefined>;
        minLength?: OrDerived<number | undefined>;
        name?: OrDerived<string | undefined>;
        placeholder?: OrDerived<string | undefined>;
        readOnly?: OrDerived<boolean | undefined>;
        required?: OrDerived<boolean | undefined>;
        rows?: OrDerived<number | undefined>;
        value?: OrState<string | undefined>;
        wrap?: OrDerived<string | undefined>;

        onChange?: EventHandler<T> | undefined;
    }

    interface TdHTMLAttributes<T> extends HTMLAttributes<T> {
        align?: OrDerived<"left" | "center" | "right" | "justify" | "char" | undefined>;
        colSpan?: OrDerived<number | undefined>;
        headers?: OrDerived<string | undefined>;
        rowSpan?: OrDerived<number | undefined>;
        scope?: OrDerived<string | undefined>;
        abbr?: OrDerived<string | undefined>;
        height?: OrDerived<number | string | undefined>;
        width?: OrDerived<number | string | undefined>;
        valign?: OrDerived<"top" | "middle" | "bottom" | "baseline" | undefined>;
    }

    interface ThHTMLAttributes<T> extends HTMLAttributes<T> {
        align?: OrDerived<"left" | "center" | "right" | "justify" | "char" | undefined>;
        colSpan?: OrDerived<number | undefined>;
        headers?: OrDerived<string | undefined>;
        rowSpan?: OrDerived<number | undefined>;
        scope?: OrDerived<string | undefined>;
        abbr?: OrDerived<string | undefined>;
    }

    interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
        dateTime?: OrDerived<string | undefined>;
    }

    interface TrackHTMLAttributes<T> extends HTMLAttributes<T> {
        default?: OrDerived<boolean | undefined>;
        kind?: OrDerived<string | undefined>;
        label?: OrDerived<string | undefined>;
        src?: OrDerived<string | undefined>;
        srcLang?: OrDerived<string | undefined>;
    }

    interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {
        height?: OrDerived<number | string | undefined>;
        playsInline?: OrDerived<boolean | undefined>;
        poster?: OrDerived<string | undefined>;
        width?: OrDerived<number | string | undefined>;
        disablePictureInPicture?: OrDerived<boolean | undefined>;
        disableRemotePlayback?: OrDerived<boolean | undefined>;
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
        color?: OrDerived<string | undefined>;
        height?: OrDerived<number | string | undefined>;
        id?: OrDerived<string | undefined>;
        lang?: OrDerived<string | undefined>;
        max?: OrDerived<number | string | undefined>;
        media?: OrDerived<string | undefined>;
        method?: OrDerived<string | undefined>;
        min?: OrDerived<number | string | undefined>;
        name?: OrDerived<string | undefined>;
        style?: OrDerived<CSSProperties | undefined>;
        target?: OrDerived<string | undefined>;
        type?: OrDerived<string | undefined>;
        width?: OrDerived<number | string | undefined>;

        // Other HTML properties supported by SVG elements in browsers
        role?: OrDerived<AriaRole | undefined>;
        tabIndex?: OrDerived<number | undefined>;
        crossOrigin?: OrDerived<CrossOrigin>;

        // SVG Specific attributes
        accentHeight?: OrDerived<number | string | undefined>;
        accumulate?: OrDerived<"none" | "sum" | undefined>;
        additive?: OrDerived<"replace" | "sum" | undefined>;
        alignmentBaseline?: OrDerived<
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
        allowReorder?: OrDerived<"no" | "yes" | undefined>;
        alphabetic?: OrDerived<number | string | undefined>;
        amplitude?: OrDerived<number | string | undefined>;
        arabicForm?: OrDerived<"initial" | "medial" | "terminal" | "isolated" | undefined>;
        ascent?: OrDerived<number | string | undefined>;
        attributeName?: OrDerived<string | undefined>;
        attributeType?: OrDerived<string | undefined>;
        autoReverse?: OrDerived<Booleanish | undefined>;
        azimuth?: OrDerived<number | string | undefined>;
        baseFrequency?: OrDerived<number | string | undefined>;
        baselineShift?: OrDerived<number | string | undefined>;
        baseProfile?: OrDerived<number | string | undefined>;
        bbox?: OrDerived<number | string | undefined>;
        begin?: OrDerived<number | string | undefined>;
        bias?: OrDerived<number | string | undefined>;
        by?: OrDerived<number | string | undefined>;
        calcMode?: OrDerived<number | string | undefined>;
        capHeight?: OrDerived<number | string | undefined>;
        clip?: OrDerived<number | string | undefined>;
        clipPath?: OrDerived<string | undefined>;
        clipPathUnits?: OrDerived<number | string | undefined>;
        clipRule?: OrDerived<number | string | undefined>;
        colorInterpolation?: OrDerived<number | string | undefined>;
        colorInterpolationFilters?: OrDerived<"auto" | "sRGB" | "linearRGB" | "inherit" | undefined>;
        colorProfile?: OrDerived<number | string | undefined>;
        colorRendering?: OrDerived<number | string | undefined>;
        contentScriptType?: OrDerived<number | string | undefined>;
        contentStyleType?: OrDerived<number | string | undefined>;
        cursor?: OrDerived<number | string | undefined>;
        cx?: OrDerived<number | string | undefined>;
        cy?: OrDerived<number | string | undefined>;
        d?: OrDerived<string | undefined>;
        decelerate?: OrDerived<number | string | undefined>;
        descent?: OrDerived<number | string | undefined>;
        diffuseConstant?: OrDerived<number | string | undefined>;
        direction?: OrDerived<number | string | undefined>;
        display?: OrDerived<number | string | undefined>;
        divisor?: OrDerived<number | string | undefined>;
        dominantBaseline?: OrDerived<number | string | undefined>;
        dur?: OrDerived<number | string | undefined>;
        dx?: OrDerived<number | string | undefined>;
        dy?: OrDerived<number | string | undefined>;
        edgeMode?: OrDerived<number | string | undefined>;
        elevation?: OrDerived<number | string | undefined>;
        enableBackground?: OrDerived<number | string | undefined>;
        end?: OrDerived<number | string | undefined>;
        exponent?: OrDerived<number | string | undefined>;
        externalResourcesRequired?: OrDerived<Booleanish | undefined>;
        fill?: OrDerived<string | undefined>;
        fillOpacity?: OrDerived<number | string | undefined>;
        fillRule?: OrDerived<"nonzero" | "evenodd" | "inherit" | undefined>;
        filter?: OrDerived<string | undefined>;
        filterRes?: OrDerived<number | string | undefined>;
        filterUnits?: OrDerived<number | string | undefined>;
        floodColor?: OrDerived<number | string | undefined>;
        floodOpacity?: OrDerived<number | string | undefined>;
        focusable?: OrDerived<Booleanish | "auto" | undefined>;
        fontFamily?: OrDerived<string | undefined>;
        fontSize?: OrDerived<number | string | undefined>;
        fontSizeAdjust?: OrDerived<number | string | undefined>;
        fontStretch?: OrDerived<number | string | undefined>;
        fontStyle?: OrDerived<number | string | undefined>;
        fontVariant?: OrDerived<number | string | undefined>;
        fontWeight?: OrDerived<number | string | undefined>;
        format?: OrDerived<number | string | undefined>;
        fr?: OrDerived<number | string | undefined>;
        from?: OrDerived<number | string | undefined>;
        fx?: OrDerived<number | string | undefined>;
        fy?: OrDerived<number | string | undefined>;
        g1?: OrDerived<number | string | undefined>;
        g2?: OrDerived<number | string | undefined>;
        glyphName?: OrDerived<number | string | undefined>;
        glyphOrientationHorizontal?: OrDerived<number | string | undefined>;
        glyphOrientationVertical?: OrDerived<number | string | undefined>;
        glyphRef?: OrDerived<number | string | undefined>;
        gradientTransform?: OrDerived<string | undefined>;
        gradientUnits?: OrDerived<string | undefined>;
        hanging?: OrDerived<number | string | undefined>;
        horizAdvX?: OrDerived<number | string | undefined>;
        horizOriginX?: OrDerived<number | string | undefined>;
        href?: OrDerived<string | undefined>;
        ideographic?: OrDerived<number | string | undefined>;
        imageRendering?: OrDerived<number | string | undefined>;
        in2?: OrDerived<number | string | undefined>;
        in?: OrDerived<string | undefined>;
        intercept?: OrDerived<number | string | undefined>;
        k1?: OrDerived<number | string | undefined>;
        k2?: OrDerived<number | string | undefined>;
        k3?: OrDerived<number | string | undefined>;
        k4?: OrDerived<number | string | undefined>;
        k?: OrDerived<number | string | undefined>;
        kernelMatrix?: OrDerived<number | string | undefined>;
        kernelUnitLength?: OrDerived<number | string | undefined>;
        kerning?: OrDerived<number | string | undefined>;
        keyPoints?: OrDerived<number | string | undefined>;
        keySplines?: OrDerived<number | string | undefined>;
        keyTimes?: OrDerived<number | string | undefined>;
        lengthAdjust?: OrDerived<number | string | undefined>;
        letterSpacing?: OrDerived<number | string | undefined>;
        lightingColor?: OrDerived<number | string | undefined>;
        limitingConeAngle?: OrDerived<number | string | undefined>;
        local?: OrDerived<number | string | undefined>;
        markerEnd?: OrDerived<string | undefined>;
        markerHeight?: OrDerived<number | string | undefined>;
        markerMid?: OrDerived<string | undefined>;
        markerStart?: OrDerived<string | undefined>;
        markerUnits?: OrDerived<number | string | undefined>;
        markerWidth?: OrDerived<number | string | undefined>;
        mask?: OrDerived<string | undefined>;
        maskContentUnits?: OrDerived<number | string | undefined>;
        maskUnits?: OrDerived<number | string | undefined>;
        mathematical?: OrDerived<number | string | undefined>;
        mode?: OrDerived<number | string | undefined>;
        numOctaves?: OrDerived<number | string | undefined>;
        offset?: OrDerived<number | string | undefined>;
        opacity?: OrDerived<number | string | undefined>;
        operator?: OrDerived<number | string | undefined>;
        order?: OrDerived<number | string | undefined>;
        orient?: OrDerived<number | string | undefined>;
        orientation?: OrDerived<number | string | undefined>;
        origin?: OrDerived<number | string | undefined>;
        overflow?: OrDerived<number | string | undefined>;
        overlinePosition?: OrDerived<number | string | undefined>;
        overlineThickness?: OrDerived<number | string | undefined>;
        paintOrder?: OrDerived<number | string | undefined>;
        panose1?: OrDerived<number | string | undefined>;
        path?: OrDerived<string | undefined>;
        pathLength?: OrDerived<number | string | undefined>;
        patternContentUnits?: OrDerived<string | undefined>;
        patternTransform?: OrDerived<number | string | undefined>;
        patternUnits?: OrDerived<string | undefined>;
        pointerEvents?: OrDerived<number | string | undefined>;
        points?: OrDerived<string | undefined>;
        pointsAtX?: OrDerived<number | string | undefined>;
        pointsAtY?: OrDerived<number | string | undefined>;
        pointsAtZ?: OrDerived<number | string | undefined>;
        preserveAlpha?: OrDerived<Booleanish | undefined>;
        preserveAspectRatio?: OrDerived<string | undefined>;
        primitiveUnits?: OrDerived<number | string | undefined>;
        r?: OrDerived<number | string | undefined>;
        radius?: OrDerived<number | string | undefined>;
        refX?: OrDerived<number | string | undefined>;
        refY?: OrDerived<number | string | undefined>;
        renderingIntent?: OrDerived<number | string | undefined>;
        repeatCount?: OrDerived<number | string | undefined>;
        repeatDur?: OrDerived<number | string | undefined>;
        requiredExtensions?: OrDerived<number | string | undefined>;
        requiredFeatures?: OrDerived<number | string | undefined>;
        restart?: OrDerived<number | string | undefined>;
        result?: OrDerived<string | undefined>;
        rotate?: OrDerived<number | string | undefined>;
        rx?: OrDerived<number | string | undefined>;
        ry?: OrDerived<number | string | undefined>;
        scale?: OrDerived<number | string | undefined>;
        seed?: OrDerived<number | string | undefined>;
        shapeRendering?: OrDerived<number | string | undefined>;
        slope?: OrDerived<number | string | undefined>;
        spacing?: OrDerived<number | string | undefined>;
        specularConstant?: OrDerived<number | string | undefined>;
        specularExponent?: OrDerived<number | string | undefined>;
        speed?: OrDerived<number | string | undefined>;
        spreadMethod?: OrDerived<string | undefined>;
        startOffset?: OrDerived<number | string | undefined>;
        stdDeviation?: OrDerived<number | string | undefined>;
        stemh?: OrDerived<number | string | undefined>;
        stemv?: OrDerived<number | string | undefined>;
        stitchTiles?: OrDerived<number | string | undefined>;
        stopColor?: OrDerived<string | undefined>;
        stopOpacity?: OrDerived<number | string | undefined>;
        strikethroughPosition?: OrDerived<number | string | undefined>;
        strikethroughThickness?: OrDerived<number | string | undefined>;
        string?: OrDerived<number | string | undefined>;
        stroke?: OrDerived<string | undefined>;
        strokeDasharray?: OrDerived<string | number | undefined>;
        strokeDashoffset?: OrDerived<string | number | undefined>;
        strokeLinecap?: OrDerived<"butt" | "round" | "square" | "inherit" | undefined>;
        strokeLinejoin?: OrDerived<"miter" | "round" | "bevel" | "inherit" | undefined>;
        strokeMiterlimit?: OrDerived<number | string | undefined>;
        strokeOpacity?: OrDerived<number | string | undefined>;
        strokeWidth?: OrDerived<number | string | undefined>;
        surfaceScale?: OrDerived<number | string | undefined>;
        systemLanguage?: OrDerived<number | string | undefined>;
        tableValues?: OrDerived<number | string | undefined>;
        targetX?: OrDerived<number | string | undefined>;
        targetY?: OrDerived<number | string | undefined>;
        textAnchor?: OrDerived<string | undefined>;
        textDecoration?: OrDerived<number | string | undefined>;
        textLength?: OrDerived<number | string | undefined>;
        textRendering?: OrDerived<number | string | undefined>;
        to?: OrDerived<number | string | undefined>;
        transform?: OrDerived<string | undefined>;
        u1?: OrDerived<number | string | undefined>;
        u2?: OrDerived<number | string | undefined>;
        underlinePosition?: OrDerived<number | string | undefined>;
        underlineThickness?: OrDerived<number | string | undefined>;
        unicode?: OrDerived<number | string | undefined>;
        unicodeBidi?: OrDerived<number | string | undefined>;
        unicodeRange?: OrDerived<number | string | undefined>;
        unitsPerEm?: OrDerived<number | string | undefined>;
        vAlphabetic?: OrDerived<number | string | undefined>;
        values?: OrDerived<string | undefined>;
        vectorEffect?: OrDerived<number | string | undefined>;
        version?: OrDerived<string | undefined>;
        vertAdvY?: OrDerived<number | string | undefined>;
        vertOriginX?: OrDerived<number | string | undefined>;
        vertOriginY?: OrDerived<number | string | undefined>;
        vHanging?: OrDerived<number | string | undefined>;
        vIdeographic?: OrDerived<number | string | undefined>;
        viewBox?: OrDerived<string | undefined>;
        viewTarget?: OrDerived<number | string | undefined>;
        visibility?: OrDerived<number | string | undefined>;
        vMathematical?: OrDerived<number | string | undefined>;
        widths?: OrDerived<number | string | undefined>;
        wordSpacing?: OrDerived<number | string | undefined>;
        writingMode?: OrDerived<number | string | undefined>;
        x1?: OrDerived<number | string | undefined>;
        x2?: OrDerived<number | string | undefined>;
        x?: OrDerived<number | string | undefined>;
        xChannelSelector?: OrDerived<string | undefined>;
        xHeight?: OrDerived<number | string | undefined>;
        xlinkActuate?: OrDerived<string | undefined>;
        xlinkArcrole?: OrDerived<string | undefined>;
        xlinkHref?: OrDerived<string | undefined>;
        xlinkRole?: OrDerived<string | undefined>;
        xlinkShow?: OrDerived<string | undefined>;
        xlinkTitle?: OrDerived<string | undefined>;
        xlinkType?: OrDerived<string | undefined>;
        xmlBase?: OrDerived<string | undefined>;
        xmlLang?: OrDerived<string | undefined>;
        xmlns?: OrDerived<string | undefined>;
        xmlnsXlink?: OrDerived<string | undefined>;
        xmlSpace?: OrDerived<string | undefined>;
        y1?: OrDerived<number | string | undefined>;
        y2?: OrDerived<number | string | undefined>;
        y?: OrDerived<number | string | undefined>;
        yChannelSelector?: OrDerived<string | undefined>;
        z?: OrDerived<number | string | undefined>;
        zoomAndPan?: OrDerived<string | undefined>;
    }

    interface WebViewHTMLAttributes<T> extends HTMLAttributes<T> {
        allowFullScreen?: OrDerived<boolean | undefined>;
        allowpopups?: OrDerived<boolean | undefined>;
        autosize?: OrDerived<boolean | undefined>;
        blinkfeatures?: OrDerived<string | undefined>;
        disableblinkfeatures?: OrDerived<string | undefined>;
        disableguestresize?: OrDerived<boolean | undefined>;
        disablewebsecurity?: OrDerived<boolean | undefined>;
        guestinstance?: OrDerived<string | undefined>;
        httpreferrer?: OrDerived<string | undefined>;
        nodeintegration?: OrDerived<boolean | undefined>;
        partition?: OrDerived<string | undefined>;
        plugins?: OrDerived<boolean | undefined>;
        preload?: OrDerived<string | undefined>;
        src?: OrDerived<string | undefined>;
        useragent?: OrDerived<string | undefined>;
        webpreferences?: OrDerived<string | undefined>;
    }

    interface SVGProps<T> extends SVGAttributes<T>, RefAttributes<T> { }

    interface SVGLineElementAttributes<T> extends SVGProps<T> { }
    interface SVGTextElementAttributes<T> extends SVGProps<T> { }


}
