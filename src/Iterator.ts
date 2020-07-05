type ArrayIteratorCallbackFn = (item: any) => void

export class ArrayIterator<T> {
    private readonly collection: Array<T>
    private currentIdx: number

    constructor (collection: Array<T>, start: number = 0) {
        this.collection = collection
        this.currentIdx = start
    }

    public hasNext (): boolean {
        return this.currentIdx < this.collection.length
    }

    public next (): T {
        return this.collection[this.currentIdx++]
    }

    public forEachRemaining (action: ArrayIteratorCallbackFn): void {
        if (!action) {
            throw new ReferenceError('action is not defined')
        }

        while(this.hasNext()) {
            action(this.collection[this.currentIdx++])
        }
    }
}
