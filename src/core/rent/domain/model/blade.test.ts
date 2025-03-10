import { Blade } from "./blade";
import { Description } from "./description";
import { Id } from "./id";
import { Name } from "./name";
import { Price } from "./price";

let genId = () => new Id("d0eaf3d7-ba62-484c-bcd4-e657d862f7d8");
let genName = () => new Name("Master Sword");
let genDescription = () => new Description("A legendary sword.");
let genPrice = () => new Price(1000000);



test("It should create a valid blade", () => {

    let id = genId();
    let name = genName();
    let description = genDescription();
    let price = genPrice();

    let blade = new Blade(id, name, description, price);

    id = genId();
    name = genName();
    description = genDescription();
    price = genPrice();

    expect(blade.id.equal(id)).toBeTruthy();
    expect(blade.name.equal(name)).toBeTruthy();
    expect(blade.description.equal(description)).toBeTruthy();
    expect(blade.price.equal(price)).toBeTruthy();
});


test("It should change the name correctly.", () => {
    let id = genId();
    let name = genName();
    let description = genDescription();
    let price = genPrice();

    let blade = new Blade(id, name, description, price);

    blade.rename(new Name("Legendary Blade"));

    expect(blade.name.equal(new Name("Legendary Blade"))).toBeTruthy();
});


test("It should change the price correctly.", () => {
    let id = genId();
    let name = genName();
    let description = genDescription();
    let price = genPrice();

    let blade = new Blade(id, name, description, price);

    blade.chagePrice(new Price(123));

    expect(blade.price.equal(new Price(123))).toBeTruthy();
});

test("It should change the description correctly.", ()=> {
    let id = genId();
    let name = genName();
    let description = genDescription();
    let price = genPrice();

    let blade = new Blade(id, name, description, price);

    blade.changeDescription(new Description("..."));

    expect(blade.description.equal(new Description("..."))).toBeTruthy();
})