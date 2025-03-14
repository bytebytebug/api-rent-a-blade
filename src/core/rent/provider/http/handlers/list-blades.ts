import { ListBladesHandler } from "#core/rent/adapter/express/handler/list-blade";
import { IBladeService } from "#core/rent/application/blade-service";
import { Context } from "#lib/container/context";
import { Provider } from "#lib/container/provider";
import { BladeServiceProvider } from "../../service/blade-service-provider";


export type Deps = {
    bladeServiceProvider: Provider<IBladeService>;
}


function defaultDeps(): Deps {
    return {
        bladeServiceProvider: new BladeServiceProvider()
    }
}


export class ListBladesHandlerProvider implements Provider<ListBladesHandler> {


    async boot(ctx: Context, deps: Deps = defaultDeps()): Promise<void> {
        if (ctx.find(ListBladesHandler)) return;

        await deps.bladeServiceProvider.boot(ctx);

        let bladeService = deps.bladeServiceProvider.load(ctx);

        ctx.insert(ListBladesHandler, new ListBladesHandler(bladeService))
    }


    load(ctx: Context): ListBladesHandler {
        return ctx.findOrThrow(ListBladesHandler)
    }


}