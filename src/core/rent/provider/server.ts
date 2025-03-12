import { Provider } from "#lib/container/provider";
import { Server } from "#core/rent/adapter/express/server";
import { Context } from "#lib/container/context";

export class ServerProvider implements Provider<Server> {
    
    async boot(ctx: Context): Promise<void> {
        if (ctx.find(Server)) return;

        let server = new Server();

        ctx.insert(Server, server);
    }

    load(ctx: Context): Server {
        return ctx.findOrThrow(Server)
    }
}
