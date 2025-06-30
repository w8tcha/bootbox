export default interface BootboxDefaults {
	// Default language used when generating buttons for alert, confirm, and prompt dialogs
	locale: string;
	// Show backdrop or not. Default to static so user has to interact with dialog
	backdrop: boolean | 'static';
	// Animate the modal in/out
	animate: boolean;
	// Additional class string applied to the top level dialog
	className: string | null;
	// Whether or not to include a close button
	closeButton: boolean;
	// Show the dialog immediately by default
	show: boolean;
	// Dialog container
	container: string;
	// Default value (used by the prompt helper)
	value: string;
	// Default input type (used by the prompt helper)
	inputType: string;
	// Custom error message to report if prompt fails validation
	errorMessage: string | null;
	// Switch button order from cancel/confirm (default) to confirm/cancel
	swapButtonOrder: boolean;
	// Center modal vertically in page
	centerVertical: boolean;
	// Append "multiple" property to the select when using the "prompt" helper
	multiple: boolean;
	// Automatically scroll modal content when height exceeds viewport height
	scrollable: boolean;
	// Whether or not to destroy the modal on hide
	reusable: boolean;
	// The element which triggered the dialog
	relatedTarget: HTMLElement | null;
	// The size of the modal to generate
	size: string | null;
	// A unique identifier for this modal
	id: string | null;
}
