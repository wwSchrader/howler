import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';
import user from '../src/models/user';

chai.use(chaiHttp);

const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

export {
  server,
  chai,
  assert,
  expect,
  should,
  user,
};
