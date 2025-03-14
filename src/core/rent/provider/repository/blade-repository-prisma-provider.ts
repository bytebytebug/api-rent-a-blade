import { BladeRepositoryPrisma } from "#core/rent/adapter/prisma/blade-repository";
import { Context } from "#lib/container/context";
import { Provider, Wrapper } from "#lib/container/provider";
import { PrismaClient } from "@prisma/client";
import { PrismaClientProvider } from "./prisma-client-provider";

export type Deps = {
    clientProvider: Provider<Wrapper<PrismaClient>>;
}

function defaultDeps(): Deps {
    return {
        clientProvider: new PrismaClientProvider(),
    }
}

export class BladeRepositoryPrismaProvider implements Provider<BladeRepositoryPrisma> {


    async boot(ctx: Context, deps: Deps = defaultDeps()): Promise<void> {
        if (ctx.find(BladeRepositoryPrisma)) return;

        await deps.clientProvider.boot(ctx);

        let client = deps.clientProvider.load(ctx).unwrap();

        ctx.insert(BladeRepositoryPrisma, new BladeRepositoryPrisma(client))
    }


    load(ctx: Context): BladeRepositoryPrisma {
        return ctx.findOrThrow(BladeRepositoryPrisma)
    }


}