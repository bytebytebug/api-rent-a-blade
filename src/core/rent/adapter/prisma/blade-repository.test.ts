import { Prisma, PrismaClient } from "@prisma/client";
import { BladeRepositoryPrisma } from "./blade-repository";
import { Blade } from "#core/rent/domain/model/blade";
import { Id } from "#core/rent/domain/model/id";
import { Name } from "#core/rent/domain/model/name";
import { Description } from "#core/rent/domain/model/description";
import { Price } from "#core/rent/domain/model/price";


let bladeRepository: BladeRepositoryPrisma;


beforeEach(async () => {
    let client = new PrismaClient()
    await client.blade.deleteMany()
    bladeRepository = new BladeRepositoryPrisma(client)
})


test("It should store and count blades.", async () => {
    expect(await bladeRepository.count()).toBe(0);

    await bladeRepository.create(
        new Blade(
            Id.random(),
            new Name("Master Swordp"),
            new Description(""),
            new Price(2000)
        )
    )

    expect(await bladeRepository.count()).toBe(1);
})


test("It should return the blades.", async () => {

    await bladeRepository.create(
        new Blade(
            Id.random(),
            new Name("Master Sword"),
            new Description(""),
            new Price(2000)
        )
    )
    await bladeRepository.create(
        new Blade(
            Id.random(),
            new Name("Flame Axe"),
            new Description(""),
            new Price(1500)
        )
    )
    await bladeRepository.create(
        new Blade(
            Id.random(),
            new Name("Dark Katana"),
            new Description(""),
            new Price(3000)
        )
    )

    let list = await bladeRepository.list(10, 0);

    expect(list.length).toBe(3)
})

test("It should find a blade.", async () => {

    let uuid = "532a955a-dede-42df-9b8f-c36d7d16e11b";

    await bladeRepository.create(
        new Blade(
            Id.random(),
            new Name("Master Sword"),
            new Description(""),
            new Price(2000)
        )
    )
    await bladeRepository.create(
        new Blade(
            new Id(uuid),
            new Name("Flame Axe"),
            new Description(""),
            new Price(1500)
        )
    )
    await bladeRepository.create(
        new Blade(
            Id.random(),
            new Name("Dark Katana"),
            new Description(""),
            new Price(3000)
        )
    )

    let blade = await bladeRepository.find(new Id(uuid));

    expect(blade?.name.name).toBe("Flame Axe")

})


test("It should update a blade.", async () => {
    let uuid = "532a955a-dede-42df-9b8f-c36d7d16e11b";

    await bladeRepository.create(
        new Blade(
            new Id(uuid),
            new Name("Flame Axe"),
            new Description(""),
            new Price(1500)
        )
    )

    let blade = await bladeRepository.find(new Id(uuid))
    if (blade == null) throw new Error();
    expect(blade?.name.name).toBe("Flame Axe")

    //update
    blade.rename(new Name("Dark Axe"))
    await bladeRepository.update(blade)

    //updated
    blade = await bladeRepository.find(new Id(uuid))
    expect(blade?.name.name).toBe("Dark Axe")

})


test("It should delete a blade.", async () => {
    let uuid = "532a955a-dede-42df-9b8f-c36d7d16e11b";

    await bladeRepository.create(
        new Blade(
            Id.random(),
            new Name("Master Sword"),
            new Description(""),
            new Price(2000)
        )
    )
    await bladeRepository.create(
        new Blade(
            new Id(uuid),
            new Name("Flame Axe"),
            new Description(""),
            new Price(1500)
        )
    )
    await bladeRepository.create(
        new Blade(
            Id.random(),
            new Name("Dark Katana"),
            new Description(""),
            new Price(3000)
        )
    )

    expect(await bladeRepository.count()).toBe(3)

    let blade = await bladeRepository.find(new Id(uuid))
    if (!blade) throw new Error()
    await bladeRepository.delete(blade);
})