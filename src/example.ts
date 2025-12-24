/**
 * This tiny script just helps us demonstrate
 * what the various example callbacks are doing
 */
interface ExampleOptions {
    selector: string;
}

export class Example {
    private elem: HTMLElement;
    private hideHandler?: number;

    constructor(options: ExampleOptions) {
        const element = document.querySelector<HTMLElement>(options.selector);

        if (!element) {
            throw new Error(`Element not found for selector: ${options.selector}`);
        }

        this.elem = element;
        this.prepareElement();
    }

    private prepareElement(): void {
        this.elem.style.display = "none";
        this.elem.style.opacity = "0";
        this.elem.style.transition = "opacity 300ms ease";
    }

    public show(text: string): void {
        if (this.hideHandler) {
            clearTimeout(this.hideHandler);
        }

        const span = this.elem.querySelector<HTMLSpanElement>("span");
        if (span) {
            span.innerHTML = text;
        }

        // Show element immediately but invisible
        this.elem.style.display = "block";
        this.elem.style.opacity = "0";

        // Delay 200ms → fade in
        setTimeout(() => {
            this.elem.style.opacity = "1";
        }, 200);

        // Wait 4000ms → fade out
        this.hideHandler = window.setTimeout(() => {
            this.elem.style.opacity = "0";

            // Hide after fade completes
            setTimeout(() => {
                this.elem.style.display = "none";
            }, 300);
        }, 200 + 4000);
    }
}