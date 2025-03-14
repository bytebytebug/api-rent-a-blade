import { ServerProvider } from "#core/rent/provider/server";
import { createContext } from "#lib/container/context";


async function main() {
    let context = createContext();

    let serverProvider = new ServerProvider();
    await serverProvider.boot(context);

    let server = serverProvider.load(context);

    server.start()
}

main();