import mongoose from 'mongoose';

const importTest: (name: string, path: string) => void = (name: string, path: string) => {
  describe(name, () => {
    require(path);
  });
};

describe('index', () => {
  importTest('User Route', './routes/users.test');
});
