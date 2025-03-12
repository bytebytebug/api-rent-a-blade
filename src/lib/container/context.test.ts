import { createContext, ValueNotFindError } from "./context"

class User {
    constructor(public name: string) { }
}

class Point {
    constructor(public x: number, public y: number) { }
}

class Circle {
    constructor(public center: Point, public radius: number) { }
}

test("It should find the stored value.", () => {
    let context = createContext();

    context.insert(User, new User("Bon"));
    context.insert(Point, new Point(1, 2));

    expect(context.find(User)).toBeInstanceOf(User);
});

test("It should return null if there is no value corresponding to the type.", () => {
    let context = createContext();

    context.insert(User, new User("Bon"));
    context.insert(Point, new Point(1, 2));

    expect(context.find(Circle)).toBeNull();
});

test("It should throw an error if there is no value corresponding to the type.", () => {
    let context = createContext();

    context.insert(User, new User("Bon"));
    context.insert(Point, new Point(1, 2));

    expect(() => {
        context.findOrThrow(Circle)
    }).toThrow(ValueNotFindError);
});