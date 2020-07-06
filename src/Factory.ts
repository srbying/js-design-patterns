export enum FactoryType {
    Auto = 'Auto',
    Paint = 'Paint',
    Cookie = 'Cookie'
}

interface FactoryProp {
    action (): string
}

class Auto implements FactoryProp {
    public action () {
        return `vroom vroom`
    }
}

class Paint implements FactoryProp {
    public action () {
        return `brush brush`
    }
}

class Cookie implements FactoryProp {
    public action () {
        return `crumble crumble`
    }
}

/**
 * A creational pattern that uses factory methods to deal with the problem of creating objects without having to specify the
 * exact class of the object that will be created.
 */
export class Factory {
    public static create (type: FactoryType) {
        switch(type) {
            case FactoryType.Auto:
                return new Auto()
            case FactoryType.Paint:
                return new Paint()
            case FactoryType.Cookie:
                return new Cookie()
        }
    }
}