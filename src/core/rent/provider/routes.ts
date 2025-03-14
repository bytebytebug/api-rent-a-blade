import { Context } from "#lib/container/context";
import { Provider } from "#lib/container/provider";
import { Routes } from "#core/rent/adapter/express/routes/api";
import { Handler } from "#core/rent/adapter/express/handler/handler";
import { CountBladesHandlerProvider } from "./http/handlers/count-blades";
import { CreateBladeHandlerProvider } from "./http/handlers/create-blade";
import { DeleteBladeHandlerProvider } from "./http/handlers/delete-blade";
import { FindBladeHandlerProvider } from "./http/handlers/find-blade";
import { ListBladesHandlerProvider } from "./http/handlers/list-blades";
import { UpdateBladeHandlerProvider } from "./http/handlers/update-blade";


export type Deps = {
    findBladeHandlerProvider: Provider<Handler>;
    listBladesHandlerProvider: Provider<Handler>;
    countBladesHandlerProvider: Provider<Handler>;
    createBladesHandlerProvider: Provider<Handler>;
    updateBladesHandlerProvider: Provider<Handler>;
    deleteBladesHandlerProvider: Provider<Handler>;
};


function defaultDeps(): Deps {
    return {
        countBladesHandlerProvider: new CountBladesHandlerProvider(),
        createBladesHandlerProvider: new CreateBladeHandlerProvider(),
        deleteBladesHandlerProvider: new DeleteBladeHandlerProvider(),
        findBladeHandlerProvider: new FindBladeHandlerProvider(),
        listBladesHandlerProvider: new ListBladesHandlerProvider(),
        updateBladesHandlerProvider: new UpdateBladeHandlerProvider(),
    }
}


export class RoutesProvider implements Provider<Routes> {

    
    async boot(ctx: Context, deps: Deps = defaultDeps()): Promise<void> {
        if (ctx.find(Routes)) return;

        await deps.findBladeHandlerProvider.boot(ctx);
        await deps.listBladesHandlerProvider.boot(ctx);
        await deps.countBladesHandlerProvider.boot(ctx);
        await deps.createBladesHandlerProvider.boot(ctx);
        await deps.updateBladesHandlerProvider.boot(ctx);
        await deps.deleteBladesHandlerProvider.boot(ctx);

        let findBladeHandler = deps.findBladeHandlerProvider.load(ctx);
        let listBladesHandler = deps.listBladesHandlerProvider.load(ctx);
        let countBladesHandler = deps.countBladesHandlerProvider.load(ctx);
        let createBladeHandler = deps.createBladesHandlerProvider.load(ctx);
        let updateBladeHandler = deps.updateBladesHandlerProvider.load(ctx);
        let deleteBladeHandler = deps.deleteBladesHandlerProvider.load(ctx);

        ctx.insert(Routes, new Routes({
            findBladeHandler,
            countBladesHandler,
            createBladeHandler,
            deleteBladeHandler,
            listBladesHandler,
            updateBladeHandler,
        }))
    }


    load(ctx: Context): Routes {
        return ctx.findOrThrow(Routes)
    }


}
