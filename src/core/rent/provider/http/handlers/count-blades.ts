import { CountBladesHandler } from "#core/rent/adapter/express/handler/count-blade";
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


export class CountBladesHandlerProvider implements Provider<CountBladesHandler> {


    async boot(ctx: Context, deps: Deps = defaultDeps()): Promise<void> {
        if (ctx.find(CountBladesHandler)) return;

        await deps.bladeServiceProvider.boot(ctx);

        let bladeService = deps.bladeServiceProvider.load(ctx);

        ctx.insert(CountBladesHandler, new CountBladesHandler(bladeService))
    }


    load(ctx: Context): CountBladesHandler {
        return ctx.findOrThrow(CountBladesHandler);
    }


}