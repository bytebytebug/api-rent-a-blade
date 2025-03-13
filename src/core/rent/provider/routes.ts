import { Context } from "#lib/container/context";
import { Provider } from "#lib/container/provider";
import { Routes } from "#core/rent/adapter/express/routes/api";

export class RoutesProvider implements Provider<Routes> {
    async boot(ctx: Context): Promise<void> {
        if (ctx.find(Routes)) return;

        ctx.insert(Routes, new Routes())
    }
    load(ctx: Context): Routes {
        return ctx.findOrThrow(Routes)
    }

}