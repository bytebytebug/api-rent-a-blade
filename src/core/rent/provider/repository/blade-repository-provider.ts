import { BladeRepository, BladeRepositoryInMemory } from "#core/rent/application/repository/blade";
import { Context } from "#lib/container/context";
import { BaseWrapper, Provider } from "#lib/container/provider";

class BladeRepositoryWrapper extends BaseWrapper<BladeRepository> { }

export class BladeRepositoryProvider implements Provider<BladeRepositoryWrapper> {
    async boot(ctx: Context): Promise<void> {
        if (ctx.find(BladeRepositoryWrapper)) return;

        let bladeRepository = new BladeRepositoryInMemory()

        ctx.insert(BladeRepositoryWrapper, new BladeRepositoryWrapper(bladeRepository))
    }

    load(ctx: Context): BladeRepositoryWrapper {
        return ctx.findOrThrow(BladeRepositoryWrapper)
    }

}