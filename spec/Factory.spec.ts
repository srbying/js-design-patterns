import 'mocha'
import { expect } from 'chai'
import { Factory, FactoryType } from '../src/Factory'

describe('Factory', (): void => {
  it('Create the correct object based on FactoryType', () => {
    const [autoMessage, paintMessage, cookieMessage] = Object.values(FactoryType).map(type => Factory.create(type).action())

    expect(autoMessage).to.eql('vroom vroom')
    expect(paintMessage).to.eql('brush brush')
    expect(cookieMessage).to.eql('crumble crumble')
  })
})
