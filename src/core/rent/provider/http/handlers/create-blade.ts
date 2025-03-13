import { CreateBladeHandler } from "#core/rent/adapter/express/handler/create-blade";
import { BladeService } from "#core/rent/application/blade-service";
import { Context } from "#lib/container/context";
import { Provider } from "#lib/container/provider";

type Deps = {
    bladeServiceProvider: Provider<BladeService>
}

function defaultDeps(): Deps {
    throw new Error("Select default deps")
}

export class CreateBladeHandlerProvider implements Provider<CreateBladeHandler> {


    async boot(ctx: Context, deps: Deps = defaultDeps()): Promise<void> {

        if (ctx.find(CreateBladeHandler)) return;

        await deps.bladeServiceProvider.boot(ctx);

        let bladeService = deps.bladeServiceProvider.load(ctx);

        let createBladeHandler = new CreateBladeHandler(bladeService);

        ctx.insert(CreateBladeHandler, createBladeHandler)
    }


    load(ctx: Context): CreateBladeHandler {
        return ctx.findOrThrow(CreateBladeHandler);
    }
}
