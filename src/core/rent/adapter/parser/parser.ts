export type Parser<T> = {
    parse(value: any): T;
}

export class ParsingError extends Error { }