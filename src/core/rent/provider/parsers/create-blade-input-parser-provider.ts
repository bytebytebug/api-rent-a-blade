import { CreateBladeInputParser } from "#core/rent/adapter/parser/blade";
import { Context } from "#lib/container/context";
import { Provider } from "#lib/container/provider";

export class CreateBladeInputParserProvider implements Provider<CreateBladeInputParser> {
    async boot(ctx: Context): Promise<void> {
        if (ctx.find(CreateBladeInputParser)) return;

        ctx.insert(CreateBladeInputParser, new CreateBladeInputParser())
    }
    load(ctx: Context): CreateBladeInputParser {
        return ctx.findOrThrow(CreateBladeInputParser)
    }
}