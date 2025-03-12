import { Context } from "#lib/container/context";

export interface Provider<T> {
    boot(ctx: Context): Provider<void>
    load(ctx: Context): T;
}
