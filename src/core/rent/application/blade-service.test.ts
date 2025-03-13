import { BladeService } from "#core/rent/application/blade-service"
import { BladeRepositoryInMemory } from "#core/rent/application/repository/blade"


let bladeService!: BladeService;

beforeEach(() => {
    let repo = new BladeRepositoryInMemory()
    bladeService = new BladeService(repo)
})

test("It should save a new blade and return its ID", async () => {

    let id = await bladeService.createBlade({
        name: "Master Sword",
        description: "A nice sword.",
        price: 1000.0,
    })

    expect(await bladeService.count()).toBe(1);
    expect(await bladeService.find(id)).not.toBeNull();
})

test("It should return the number of saved blades", async () => {

    expect(await bladeService.count()).toBe(0)

    let id1 = await bladeService.createBlade({
        name: "Master Sword",
        description: "A nice sword.",
        price: 1000.0,
    })

    expect(await bladeService.count()).toBe(1)

    let id2 = await bladeService.createBlade({
        name: "Flame Sword",
        description: "A very nice sword.",
        price: 1200.0,
    })

    expect(await bladeService.count()).toBe(2)
})


test("It should return the blade.", async () => {

    let id1 = await bladeService.createBlade({
        name: "Master Sword",
        description: "A nice sword.",
        price: 1000.0,
    })

    let id2 = await bladeService.createBlade({
        name: "Flame Sword",
        description: "A very nice sword.",
        price: 1200.0,
    })

    let finded = await bladeService.find(id2)

    expect(finded?.name).toBe("Flame Sword")
    expect(finded?.description).toBe("A very nice sword.")
    expect(finded?.price).toBe(1200.0)
})