export interface Templates {
    dialog: string;
    header: string;
    footer: string;
    closeButton: string;
    form: string;
    button: string;
    option: string;
    promptMessage: string;
    inputs: Inputs;
}
interface Inputs {
    text: string;
    textarea: string;
    email: string;
    select: string;
    checkbox: string;
    radio: string;
    date: string;
    time: string;
    number: string;
    password: string;
    range: string;
}
export {};
