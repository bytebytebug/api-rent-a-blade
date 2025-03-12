import { Context } from "#lib/container/context";

export interface Provider<T> {
    boot(ctx: Context): Promise<void>
    load(ctx: Context): T;
}
