import path2 from "path";

/**
 * This is a comment
 * Very big, two-lines comment, yep
 * Is it easy to write such a comment?
 */
interface IInterface {}
export class MyClass implements IInterface {
  private name: string = "Default Name";
  public age: number = 10;

  public test() {
    // so, to implement it I need
    this.name.length * 10;

    // const myNumber = Math.random();
    const a = Intl.NumberFormat();
  }

  public anotherTest() {
    const result = this.test();
  }
}












































import path from "path";

let a = 10;
export const logger = {
  info(...args: any[]) {
    console.log(`[INFO]`, ...args);
    const a = new Image();
    const b = "This is a string" + 10;
    const c = `This is a string too`;
  },

  warn(...args: any[], img: HTMLImageElement) {
    console.log(`[WARN]`, ...args);
    const b = new HTMLIFrameElement();
  },

  error(...args: any[]) {
    console.log(`[ERROR]`, ...args);
  }
}

logger.info("test");

declare var HTMLAnchorElement: {
  prototype: HTMLAnchorElement;
  new(): HTMLAnchorElement;
};

interface HTMLAppletElement extends HTMLElement {
  /** @deprecated */
  align: string;
  /**
   * Sets or retrieves a text alternative to the graphic.
   */
  /** @deprecated */
  alt: string;
  /**
   * Sets or retrieves a character string that can be used to implement your own archive functionality for the object.
   */
  /** @deprecated */
  archive: string;
  /** @deprecated */
  code: string;
  /**
   * Sets or retrieves the URL of the component.
   */
  /** @deprecated */
  codeBase: string;
  readonly form: HTMLFormElement | null;
  /**
   * Sets or retrieves the height of the object.
   */
  /** @deprecated */
  height: string;
  /** @deprecated */
  hspace: number;
  /**
   * Sets or retrieves the shape of the object.
   */
  /** @deprecated */
  name: string;
  /** @deprecated */
  object: string;
  /** @deprecated */
  vspace: number;
  /** @deprecated */
  width: string;
  addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLAppletElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
  removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLAppletElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

declare var HTMLAppletElement: {
  prototype: HTMLAppletElement;
  new(): HTMLAppletElement;
};

/** Provides special properties and methods (beyond those of the regular object HTMLElement interface it also has available to it by inheritance) for manipulating the layout and presentation of <area> elements. */
interface HTMLAreaElement extends HTMLElement, HTMLHyperlinkElementUtils {
  /**
   * Sets or retrieves a text alternative to the graphic.
   */
  alt: string;
  /**
   * Sets or retrieves the coordinates of the object.
   */
  coords: string;
  download: string;
  /**
   * Sets or gets whether clicks in this region cause action.
   */
  /** @deprecated */
  noHref: boolean;
  ping: string;
  referrerPolicy: string;
  rel: string;
  readonly relList: DOMTokenList;
  /**
   * Sets or retrieves the shape of the object.
   */
  shape: string;
  /**
   * Sets or retrieves the window or frame at which to target content.
   */
  target: string;
  addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLAreaElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
  removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLAreaElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

declare var HTMLAreaElement: {
  prototype: HTMLAreaElement;
  new(): HTMLAreaElement;
};

/** Provides access to the properties of <audio> elements, as well as methods to manipulate them. It derives from the HTMLMediaElement interface. */
interface HTMLAudioElement extends HTMLMediaElement {
  addEventListener<K extends keyof HTMLMediaElementEventMap>(type: K, listener: (this: HTMLAudioElement, ev: HTMLMediaElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
  removeEventListener<K extends keyof HTMLMediaElementEventMap>(type: K, listener: (this: HTMLAudioElement, ev: HTMLMediaElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

declare var HTMLAudioElement: {
  prototype: HTMLAudioElement;
  new(): HTMLAudioElement;
};