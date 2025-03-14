import { FindBladeHandler } from "#core/rent/adapter/express/handler/find-blade";
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


export class FindBladeHandlerProvider implements Provider<FindBladeHandler> {


    async boot(ctx: Context, deps: Deps = defaultDeps()): Promise<void> {
        if (ctx.find(FindBladeHandler)) return;

        await deps.bladeServiceProvider.boot(ctx);

        let bladeService = deps.bladeServiceProvider.load(ctx);

        ctx.insert(FindBladeHandler, new FindBladeHandler(bladeService))
    }


    load(ctx: Context): FindBladeHandler {
        return ctx.findOrThrow(FindBladeHandler);
    }


}