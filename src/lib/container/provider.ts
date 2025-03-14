import { Context } from "#lib/container/context";


export interface Provider<T> {
    boot(ctx: Context): Promise<void>
    load(ctx: Context): T;
}


export interface Wrapper<T> {
    unwrap(): T;
}


export abstract class BaseWrapper<T> implements Wrapper<T> {
    constructor(private _value: T) { }
    
    unwrap(): T {
        return this._value;
    }
}