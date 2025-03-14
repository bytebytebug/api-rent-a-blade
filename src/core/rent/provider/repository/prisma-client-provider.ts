import { Context } from "#lib/container/context";
import { BaseWrapper, Provider, Wrapper } from "#lib/container/provider";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";


export class PrismaClientWrapper extends BaseWrapper<PrismaClient> { }


export class PrismaClientProvider implements Provider<Wrapper<PrismaClient>> {


    async boot(ctx: Context): Promise<void> {
        if (ctx.find(PrismaClientWrapper)) return;

        ctx.insert(PrismaClientWrapper, new PrismaClientWrapper(new PrismaClient()))
    }


    load(ctx: Context): PrismaClientWrapper {
        return ctx.findOrThrow(PrismaClientWrapper)
    }


}