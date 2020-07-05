import 'mocha'
import { expect, use } from 'chai'
import * as Sinon from 'sinon'
import * as SinonChai from 'sinon-chai'
import { ArrayIterator } from '../src/Iterator'

use(SinonChai)

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
})
