import { Provider } from "#lib/container/provider";
import { Server } from "#core/rent/adapter/express/server";
import { Context } from "#lib/container/context";
import { RoutesProvider } from "#core/rent/provider/routes"
import { Routes } from "#core/rent/adapter/express/routes/api";

type Deps = {
    routesProvider: Provider<Routes>
}

function defaultDeps(): Deps {
    return {
        routesProvider: new RoutesProvider()
    }
}

export class ServerProvider implements Provider<Server> {

    async boot(ctx: Context, deps = defaultDeps()): Promise<void> {
        if (ctx.find(Server)) return;

        await deps.routesProvider.boot(ctx)

        let routes = deps.routesProvider.load(ctx);

        ctx.insert(Server, new Server(routes));
    }

    load(ctx: Context): Server {
        return ctx.findOrThrow(Server)
    }
}
