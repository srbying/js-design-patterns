import 'mocha'
import { expect, use } from 'chai'
import { ArrayIterator } from '../src/Iterator'

describe('ArrayIterator', (): void => {
  let iterator: ArrayIterator<number>
  let collection: Array<number>

  beforeEach((): void => {
    collection = [1, 2, 3, 4, 5, 6, 7]
    iterator = new ArrayIterator(collection)
  })

  afterEach(() => {
      collection = null
      iterator = null
  })

  it('should check if collection has next item', () => {
    expect(iterator.hasNext()).to.be.true

    iterator.forEachRemaining(item => item)
    expect(iterator.hasNext()).to.be.false
  })

  it('should get next item in array', () => {
    expect(iterator.next()).to.eql(collection[0])
    expect(iterator.next()).to.eql(collection[1])
    expect(iterator.next()).to.eql(collection[2])
    expect(iterator.next()).to.eql(collection[3])
  })

  it('should throw error when no cb provied to forEachRemaining', () => {
    try {
        // @ts-ignore
        iterator.forEachRemaining()
    } catch (e) {
        expect(e).to.exist
        expect(e).to.be.instanceOf(ReferenceError)
    }
  })

  it('should remove item in array', () => {
    let item: number = iterator.next()
    let itemIdx: number = collection.indexOf(item)

    expect(itemIdx).to.eql(0)

    iterator.remove()
    itemIdx = collection.indexOf(item)

    expect(itemIdx).to.eql(-1)
  })

  it('should throw error when removing twice on same next call', () => {
    try {
        iterator.next()
        iterator.remove()
        iterator.remove()
    } catch (e) {
        expect(e).to.exist
        expect(e.message).to.eql('The next method has not yet been called, or the remove method has already been called after the last call to the next method')
    }
  })
})
