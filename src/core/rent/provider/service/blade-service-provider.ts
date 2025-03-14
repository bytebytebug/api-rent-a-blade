import { BladeService } from "#core/rent/application/blade-service";
import { BladeRepository } from "#core/rent/application/repository/blade";
import { Context } from "#lib/container/context";
import { Provider, Wrapper } from "#lib/container/provider";
import { BladeRepositoryProvider } from "../repository/blade-repository-provider";


type Deps = {
    bladeRepositoryProvider: Provider<Wrapper<BladeRepository>>;
}


function defaultDeps(): Deps {
    return {
        bladeRepositoryProvider: new BladeRepositoryProvider()
    }
}


export class BladeServiceProvider implements Provider<BladeService> {

    async boot(ctx: Context, deps: Deps = defaultDeps()): Promise<void> {
        if (ctx.find(BladeService)) return;

        await deps.bladeRepositoryProvider.boot(ctx)

        let bladeRepository = deps.bladeRepositoryProvider.load(ctx).unwrap()

        ctx.insert(BladeService, new BladeService(bladeRepository))
    }


    load(ctx: Context): BladeService {
        return ctx.findOrThrow(BladeService)
    }
}