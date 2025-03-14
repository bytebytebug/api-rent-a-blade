import { BladeRepositoryPrisma } from "#core/rent/adapter/prisma/blade-repository";
import { BladeService } from "#core/rent/application/blade-service";
import { Context } from "#lib/container/context";
import { Provider } from "#lib/container/provider";
import { BladeRepositoryPrismaProvider } from "../repository/blade-repository-prisma-provider";


type Deps = {
    bladeRepositoryProvider: Provider<BladeRepositoryPrisma>;
}


function defaultDeps(): Deps {
    return {
        bladeRepositoryProvider: new BladeRepositoryPrismaProvider()
    }
}


export class BladeServiceProvider implements Provider<BladeService> {

    async boot(ctx: Context, deps: Deps = defaultDeps()): Promise<void> {
        if (ctx.find(BladeService)) return;

        await deps.bladeRepositoryProvider.boot(ctx)

        let bladeRepository = deps.bladeRepositoryProvider.load(ctx)

        ctx.insert(BladeService, new BladeService(bladeRepository))
    }


    load(ctx: Context): BladeService {
        return ctx.findOrThrow(BladeService)
    }
}