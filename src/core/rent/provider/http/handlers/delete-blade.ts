
import { DeleteBladeHanlder } from "#core/rent/adapter/express/handler/delete-blade";
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


export class DeleteBladeHandlerProvider implements Provider<DeleteBladeHanlder> {


    async boot(ctx: Context, deps: Deps = defaultDeps()): Promise<void> {
        if (ctx.find(DeleteBladeHanlder)) return;

        await deps.bladeServiceProvider.boot(ctx);

        let bladeService = deps.bladeServiceProvider.load(ctx);

        ctx.insert(DeleteBladeHanlder, new DeleteBladeHanlder(bladeService))
    }


    load(ctx: Context): DeleteBladeHanlder {
        return ctx.findOrThrow(DeleteBladeHanlder);
    }


}