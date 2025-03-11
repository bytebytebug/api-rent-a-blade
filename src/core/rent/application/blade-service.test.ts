import { Blade } from "#core/rent/domain/model/blade"
import { BladeService } from "#core/rent/application/blade-service"
import { BladeRepositoryFake } from "#core/rent/application/repository/blade"


function createSpyRepository() {
    return new class extends BladeRepositoryFake {
        blades: Blade[] = []

        async create(blade: Blade): Promise<void> {
            this.blades.push(blade)
        }
    }
}


test("It should save a new blade and return its ID", async () => {

    let repo = createSpyRepository()

    let bladeService = new BladeService(repo)

    let id = await bladeService.createBlade({
        name: "Master Sword",
        description: "A nice sword.",
        price: 1000.0,
    })

    expect(repo.blades.length).toBe(1);
    expect(repo.blades[0].id.uuid).toBe(id);
})