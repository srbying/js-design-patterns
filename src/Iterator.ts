type ArrayIteratorCallbackFn = (item: any) => void

export class ArrayIterator<T> {
    private readonly collection: Array<T>
    private currentIdx: number
    private isDupNextCall: boolean

    constructor (collection: Array<T>, start: number = 0) {
        this.collection = collection
        this.currentIdx = start
        this.isDupNextCall = true
    }

    /**
     * Returns true if the iteration has more elements.
     */
    public hasNext (): boolean {
        return this.currentIdx < this.collection.length
    }

    /**
     * Returns the next element in the iteration.
     */
    public next (): T {
        this.toggleDupNextCall()

        return this.collection[this.currentIdx++]
    }

    /**
     * Performs the given action for each remaining element until all elements have been processed.
     * @param action Callback that takes the array item as an argument.
     */
    public forEachRemaining (action: ArrayIteratorCallbackFn): void {
        if (!action) {
            throw new ReferenceError('action is not defined')
        }

        while (this.hasNext()) {
            action(this.collection[this.currentIdx++])
        }
    }

    /**
     * Removes the last element returned by this iterator from the collection.
     * This method can be called only once per call to next().
     */
    public remove (): void {
        if (this.isDupNextCall) {
            throw new Error('The next method has not yet been called, or the remove method has already been called after the last call to the next method')
        }

        this.collection.splice(this.currentIdx - 1, 1)
        this.toggleDupNextCall()
    }

    private toggleDupNextCall (): void {
        this.isDupNextCall = !this.isDupNextCall
    }
}
