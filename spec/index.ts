import 'mocha'
import * as Chai from 'chai'
import * as Sinon from 'sinon'
import * as SinonChai from 'sinon-chai'

Chai.use(SinonChai)

declare global {
    namespace NodeJS  {
        interface Global {
            chai: Chai.ChaiStatic
            expect: Chai.ExpectStatic
            spy: Sinon.SinonSpy
        }
    }
}
