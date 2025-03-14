
import { UpdateBladeHandler } from "#core/rent/adapter/express/handler/update-blade";
import { UpdateBladeInputParserOutput } from "#core/rent/adapter/parser/blade";
import { Parser } from "#core/rent/adapter/parser/parser";
import { IBladeService } from "#core/rent/application/blade-service";
import { Context } from "#lib/container/context";
import { Provider } from "#lib/container/provider";
import { UpdateBladeInputParserProvider } from "../../parsers/update-blade-input-parser-provider";
import { BladeServiceProvider } from "../../service/blade-service-provider";


export type Deps = {
    bladeServiceProvider: Provider<IBladeService>;
    parserProvider: Provider<Parser<UpdateBladeInputParserOutput>>
}


function defaultDeps(): Deps {
    return {
        bladeServiceProvider: new BladeServiceProvider(),
        parserProvider: new UpdateBladeInputParserProvider(),
    }
}


export class UpdateBladeHandlerProvider implements Provider<UpdateBladeHandler> {


    async boot(ctx: Context, deps: Deps = defaultDeps()): Promise<void> {
        if (ctx.find(UpdateBladeHandler)) return;

        await deps.bladeServiceProvider.boot(ctx);
        await deps.parserProvider.boot(ctx);

        let bladeService = deps.bladeServiceProvider.load(ctx);
        let parser = deps.parserProvider.load(ctx);

        ctx.insert(UpdateBladeHandler, new UpdateBladeHandler(bladeService, parser))
    }


    load(ctx: Context): UpdateBladeHandler {
        return ctx.findOrThrow(UpdateBladeHandler);
    }


}
