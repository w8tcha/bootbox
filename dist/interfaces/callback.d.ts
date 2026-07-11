import { CallbackFunction } from '../types/callbackFunction';
export default interface Callback {
    [name: string]: CallbackFunction;
}
