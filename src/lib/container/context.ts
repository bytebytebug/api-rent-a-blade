interface Constructor<T> {
    new(...args: any[]): T;
}

export interface Context {
    insert<T>(classDef: Constructor<T>, value: T): void;
    find<T>(classDef: Constructor<T>): T | null;
    findOrThrow<T>(classDef: Constructor<T>): T;
}

export class ClassDefAndValueMismatchError extends Error { }
export class ValueNotFindError extends Error { }

class ContextImpl implements Context {
    map = new Map<Constructor<any>, any>()

    insert<T>(classDef: Constructor<T>, value: T): void {
        if (!(value instanceof classDef)) throw new ClassDefAndValueMismatchError();

        this.map.set(classDef, value);
    }

    find<T>(classDef: Constructor<T>): T | null {
        let value = this.map.get(classDef);

        if (value == undefined) return null;

        if (value instanceof classDef) {
            return value;
        } else {
            throw new ClassDefAndValueMismatchError()
        }
    }

    findOrThrow<T>(classDef: Constructor<T>): T {
        let value = this.find(classDef);

        if (value == null) throw new ValueNotFindError();

        return value;
    }
}

export function createContext(): Context {
    return new ContextImpl()
}