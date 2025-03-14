import { CreateBladeHandler } from "#core/rent/adapter/express/handler/create-blade";
import { Parser } from "#core/rent/adapter/parser/parser";
import { CreateBladeInput, IBladeService } from "#core/rent/application/blade-service";
import { Context } from "#lib/container/context";
import { Provider } from "#lib/container/provider";
import { CreateBladeInputParserProvider } from "../../parsers/create-blade-input-parser-provider";
import { BladeServiceProvider } from "../../service/blade-service-provider";


type Deps = {
    bladeServiceProvider: Provider<IBladeService>;
    parserProvider: Provider<Parser<CreateBladeInput>>;
}


function defaultDeps(): Deps {
    return {
        bladeServiceProvider: new BladeServiceProvider(),
        parserProvider: new CreateBladeInputParserProvider(),
    }
}


export class CreateBladeHandlerProvider implements Provider<CreateBladeHandler> {


    async boot(ctx: Context, deps: Deps = defaultDeps()): Promise<void> {

        if (ctx.find(CreateBladeHandler)) return;

        await deps.bladeServiceProvider.boot(ctx);
        await deps.parserProvider.boot(ctx)

        let bladeService = deps.bladeServiceProvider.load(ctx);
        let parser = deps.parserProvider.load(ctx);

        let createBladeHandler = new CreateBladeHandler(bladeService, parser);

        ctx.insert(CreateBladeHandler, createBladeHandler)
    }


    load(ctx: Context): CreateBladeHandler {
        return ctx.findOrThrow(CreateBladeHandler);
    }
}
