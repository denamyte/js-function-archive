let toPromise = require('./toPromise');

describe('Testing toPromise function', function () {
  it('should return a Promise as a result', function () {
    const initial = par => par;
    let wrapper = toPromise(initial);
    let promise = wrapper('some parameter');
    promise.then(value => {
      expect(value).toEqual('some parameter');
    })
  });
});