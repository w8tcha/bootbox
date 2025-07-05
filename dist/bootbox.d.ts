import { Locale } from './interfaces/locale.ts';
import { default as Options } from './interfaces/Options.ts';
declare const VERSION = "6.0.5";
/**
 * Return specific locale
 * @param {string} [languageCode]
 * @returns {(Locale)} a single locale object.
 */
declare function getLocale(languageCode: string): Locale;
/**
         * Register localized strings for the OK, CONFIRM, and CANCEL buttons
         * @param {string} name - The key used to identify the new locale in the locales array
         * @param {Object} values - An object containing the localized string for each of the OK, CANCEL, and CONFIRM properties of a locale
         * @returns The updated bootbox object
         */
declare function addLocale(name: string, values: any): void;
/**
        * Remove a previously-registered locale
        * @param {string} name - The key identifying the locale to remove
        * @returns The updated bootbox object
        */
declare function removeLocale(name: string): void;
/**
         * Set the default locale
         * @param {string} name - The key identifying the locale to set as the default locale for all future bootbox calls
         * @returns The updated bootbox object
         */
declare function setLocale(name: string): void;
/**
 * Override default value(s) of Bootbox.
 * @returns The updated bootbox object
 */
declare function setDefaults(...args: any[]): void;
/**
 * Hides all currently active Bootbox modals
 * @returns The current bootbox object
 */
declare function hideAll(): void;
/**
 * Allows the base init() function to be overridden
 * @param {function} _$ - A function to be called when the bootbox instance is created
 * @returns The current bootbox object
 */
declare function initFn(_$: any): any;
/**
 * The core dialog helper function, which can be used to create any custom Bootstrap modal.
 * @param {Object} options - An object used to configure the various properties which define a Bootbox dialog
 * @returns an object upon which Bootstrap's modal function has been called
 */
declare function dialog(options: Options): HTMLElement;
/**
        * Helper function to simulate the native alert() behavior. **NOTE**: This is non-blocking, so any code that must happen after the alert is dismissed should be placed within the callback function for this alert.
        * @returns  An object upon which Bootstrap's modal function has been called
        */
declare function alert(...args: any[]): HTMLElement;
/**
 * Helper function to simulate the native confirm() behavior. **NOTE**: This is non-blocking, so any code that must happen after the confirm is dismissed should be placed within the callback function for this confirm.
* @returns an object upon which Bootstrap's modal function has been called
*/
declare function confirm(...args: any[]): HTMLElement;
/**
 * Helper function to simulate the native prompt() behavior. **NOTE**: This is non-blocking, so any code that must happen after the prompt is dismissed should be placed within the callback function for this prompt.
 * @returns an object upon which Bootstrap's modal function has been called
 */
declare function prompt(...args: any[]): HTMLElement;
export { VERSION, getLocale, addLocale, removeLocale, setLocale, setDefaults, hideAll, dialog, alert, confirm, prompt, initFn as init };
