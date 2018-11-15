import * as common from './common.test';
import sinon, { SinonStub, SinonSpy } from 'sinon';
import { ensureAuthenticated } from '../src/component-passport';

const should = common.should;

describe('Passport Component', () => {
  describe('Ensure Authenticated handling', () => {
    let reqObject: any;
    let resObject: any;
    let nextSpy: SinonSpy;
    let responseSpy: SinonSpy;

    beforeEach(() => {
      nextSpy = sinon.spy();
    });

    describe('successful authentication', () => {
      before(() => {
        reqObject = { isAuthenticated() { return true; } };
        resObject = {};
      });
      it('successful authentication should call next once', (done) => {
        ensureAuthenticated(reqObject, {}, nextSpy);

        nextSpy.calledOnce.should.equal(true);
        done();
      });
    });

    describe('failed authentication', () => {
      before(() => {
        reqObject = { isAuthenticated() { return false; } };
        resObject = { sendStatus(statusCode: number) { return 'something here!'; } };
        responseSpy = sinon.spy(resObject, 'sendStatus');
      });

      it('failed authentication should return 401 response', (done) => {
        ensureAuthenticated(reqObject, resObject, nextSpy);
        nextSpy.calledOnce.should.equal(false);
        responseSpy.calledWith(401).should.equal(true);
        responseSpy.restore();
        done();
      });
    });
  });
});
