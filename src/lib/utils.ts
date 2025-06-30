export function timeIsValid(value: string): boolean {
    return /([01][0-9]|2[0-3]):[0-5][0-9]?:[0-5][0-9]/.test(value);
}

export function dateIsValid(value: string): boolean {
    return /(\d{4})-(\d{2})-(\d{2})/.test(value);
}
export function trigger(el: HTMLElement, eventType: string | Event): void {
	if (typeof eventType === 'string' && typeof (el as any)[eventType] === 'function') {
		(el as any)[eventType]();
	} else {
		const event =
			typeof eventType === 'string' ? new Event(eventType, { bubbles: true }) : eventType;
		el.dispatchEvent(event);
	}
}