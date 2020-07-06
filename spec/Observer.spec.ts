import 'mocha'
import { expect, use } from 'chai'
import * as Sinon from 'sinon'
import * as SinonChai from 'sinon-chai'
import { ObserverPattern } from '../src/Observer'

use(SinonChai)

describe('Observer', (): void => {
  let observer: ObserverPattern
  let handlerSpy: Sinon.SinonSpy

  beforeEach((): void => {
    observer = new ObserverPattern()
    handlerSpy = Sinon.spy(() => {})
    observer.subscribe('test', handlerSpy)
  })

  afterEach(() => {
    observer.unSubscribe('test', handlerSpy)
  })

  it('should fire callback', () => {
    observer.fire('test')
    expect(handlerSpy).to.have.been.calledOnce

    observer.fire('test')
    expect(handlerSpy).to.have.been.calledTwice

    observer.fire('test')
    expect(handlerSpy).to.have.been.calledThrice
  })

  it('should fire multiple callbacks for one event', () => {
    let handlerSpyTwo: Sinon.SinonSpy = Sinon.spy(() => {})

    observer.subscribe('test', handlerSpyTwo)
    observer.fire('test')
    expect(handlerSpy).to.have.been.calledOnce
    expect(handlerSpyTwo).to.have.been.calledOnce

    observer.unSubscribe('test', handlerSpy)
    observer.fire('test')
    expect(handlerSpy).to.have.been.calledOnce
    expect(handlerSpyTwo).to.have.been.calledTwice

    observer.subscribe('test', handlerSpy)
    observer.fire('test')
    expect(handlerSpy).to.have.been.calledTwice
    expect(handlerSpyTwo).to.have.been.calledThrice
  })

  it('should not fire callback after unsubscribed', () => {
    observer.fire('test')
    expect(handlerSpy).to.have.been.calledOnce
    observer.unSubscribe('test', handlerSpy)
    expect(handlerSpy).to.not.have.been.calledTwice
    expect(handlerSpy).to.have.been.calledOnce
  })

  it('throws error when no event is found when firing', () => {
    try {
      observer.fire('testFake')
    } catch (e) {
      expect(e).to.exist
      expect(handlerSpy).to.not.have.been.called
    }
  })
})
