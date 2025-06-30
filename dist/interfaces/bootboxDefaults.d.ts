export default interface BootboxDefaults {
    locale: string;
    backdrop: boolean | 'static';
    animate: boolean;
    className: string | null;
    closeButton: boolean;
    show: boolean;
    container: string;
    value: string;
    inputType: string;
    errorMessage: string | null;
    swapButtonOrder: boolean;
    centerVertical: boolean;
    multiple: boolean;
    scrollable: boolean;
    reusable: boolean;
    relatedTarget: HTMLElement | null;
    size: string | null;
    id: string | null;
}
