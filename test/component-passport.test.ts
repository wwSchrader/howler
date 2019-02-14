import { ensureAuthenticated } from '../src/component-passport';

describe('Passport Component', () => {
  describe('Ensure Authenticated handling', () => {
    let nextSpy: jest.Mock;
    let responseSpy: jest.SpyInstance;
    let reqObject: any;
    let resObject: any;
    beforeEach(() => {
      nextSpy = jest.fn();
    });

    afterEach(() => {
      nextSpy.mockRestore();
    });

    describe('successful authentication', () => {
      beforeAll(() => {
        reqObject = { isAuthenticated() { return true; } };
        resObject = {};
      });
      it('successful authentication should call next once', (done) => {
        ensureAuthenticated(reqObject, resObject, nextSpy);

        expect(nextSpy.mock.calls.length).toBe(1);
        done();
      });
    });

    describe('failed authentication', () => {
      beforeAll(() => {
        reqObject = { isAuthenticated() { return false; } };
        resObject = { sendStatus(statusCode: number) { return 'something here!'; } };
        responseSpy = jest.spyOn(resObject, 'sendStatus');
      });

      it('failed authentication should return 401 response', (done) => {
        ensureAuthenticated(reqObject, resObject, nextSpy);
        expect(nextSpy).not.toHaveBeenCalled();
        expect(responseSpy).toHaveBeenCalled();
        expect(responseSpy).toHaveBeenCalledWith(401);
        responseSpy.mockRestore();
        done();
      });
    });
  });
});
