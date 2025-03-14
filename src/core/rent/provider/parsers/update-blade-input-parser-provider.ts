import { UpdateBladeInputParser } from "#core/rent/adapter/parser/blade";
import { Context } from "#lib/container/context";
import { Provider } from "#lib/container/provider";


export class UpdateBladeInputParserProvider implements Provider<UpdateBladeInputParser> {
    
    async boot(ctx: Context): Promise<void> {
        if (ctx.find(UpdateBladeInputParser)) return;

        ctx.insert(UpdateBladeInputParser, new UpdateBladeInputParser())
    }

    load(ctx: Context): UpdateBladeInputParser {
        return ctx.findOrThrow(UpdateBladeInputParser)
    }

}