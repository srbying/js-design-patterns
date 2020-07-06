import 'mocha'
import { expect, use } from 'chai'
import * as Sinon from 'sinon'
import * as SinonChai from 'sinon-chai'
import { PubSub } from '../src/PubSub'

use(SinonChai)

describe('PubSub', (): void => {
  let pubSub: PubSub
  let handlerSpy: Sinon.SinonSpy

  beforeEach((): void => {
    pubSub = new PubSub()
    handlerSpy = Sinon.spy(() => {})
    pubSub.subscribe('test', handlerSpy)
  })

  afterEach(() => {
    pubSub.unSubscribe('test', handlerSpy)
  })

  it('should fire callback', () => {
    pubSub.fire('test')
    expect(handlerSpy).to.have.been.calledOnce

    pubSub.fire('test')
    expect(handlerSpy).to.have.been.calledTwice

    pubSub.fire('test')
    expect(handlerSpy).to.have.been.calledThrice
  })

  it('should fire multiple callbacks for one event', () => {
    let handlerSpyTwo: Sinon.SinonSpy = Sinon.spy(() => {})

    pubSub.subscribe('test', handlerSpyTwo)
    pubSub.fire('test')
    expect(handlerSpy).to.have.been.calledOnce
    expect(handlerSpyTwo).to.have.been.calledOnce

    pubSub.unSubscribe('test', handlerSpy)
    pubSub.fire('test')
    expect(handlerSpy).to.have.been.calledOnce
    expect(handlerSpyTwo).to.have.been.calledTwice

    pubSub.subscribe('test', handlerSpy)
    pubSub.fire('test')
    expect(handlerSpy).to.have.been.calledTwice
    expect(handlerSpyTwo).to.have.been.calledThrice
  })

  it('should not fire callback after unsubscribed', () => {
    pubSub.fire('test')
    expect(handlerSpy).to.have.been.calledOnce
    pubSub.unSubscribe('test', handlerSpy)
    expect(handlerSpy).to.not.have.been.calledTwice
    expect(handlerSpy).to.have.been.calledOnce
  })

  it('throws error when no event is found when firing', () => {
    try {
      pubSub.fire('testFake')
    } catch (e) {
      expect(e).to.exist
      expect(handlerSpy).to.not.have.been.called
    }
  })
})
