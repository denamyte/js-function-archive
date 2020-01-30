describe("delay", function() {
    before(function() {
        this.clock = sinon.useFakeTimers();
    });

    after(function() {
        this.clock.restore();
    });

    it("invokes the function after a specified timeout", function() {
        var start = Date.now();

        function f(x) {
            assert.equal(Date.now() - start, 1000);
        }
        f = sinon.spy(f);

        var f1000 = delay(f, 1000);
        f1000("test");
        this.clock.tick(2000);
        assert(f.calledOnce, 'calledOnce check fails');
    });

    it("transmits the arguments and context", function() {
        var start = Date.now();
        var user = {
            sayHi: function(phrase, who) {
                assert.equal(this, user);
                assert.equal(phrase, "Hi");
                assert.equal(who, "Basilio");
                assert.equal(Date.now() - start, 1500);
            }
        };

        user.sayHi = sinon.spy(user.sayHi);

        var spy = user.sayHi;
        user.sayHi = delay(user.sayHi, 1500);

        user.sayHi("Hi", "Basilio");

        this.clock.tick(2000);

        assert(spy.calledOnce, 'calledOnce did not worked');
    });
});


describe("debounce", function() {
    before(function() {
        this.clock = sinon.useFakeTimers();
    });

    after(function() {
        this.clock.restore();
    });

    it("calls the function with no larger frequency than once in ms milliseconds", function() {
        let log = "";

        function f(a) {
            log += a;
        }

        f = debounce(f, 1000);

        f(1); // deferring by 1000
        f(2); // ignoring the previous call and deferring by 1000

        setTimeout(function() {
            f(3)
        }, 1100); // f(2) is already executed, deferring f(3)
        setTimeout(function() {
            f(4)
        }, 1200); // ignoring f(3), deferring f(4)
        setTimeout(function() {
            f(5)
        }, 2500); // deferring f(5)

        this.clock.tick(5000);
        assert.equal(log, "245");
    });

    it("saves the function call context", function() {
        const obj = {
            f: function() {
                assert.equal(this, obj);
            }
        };

        obj.f = debounce(obj.f, 1000);
        obj.f("test");
    });

    it("saves all the arguments", function() {
        function f(...args) {
            assert.deepEqual(args, ["first", "second"]);
        }

        f = debounce(f, 1000);
        f("first", "second");
    });

});


describe("throttle2(f, 1000)", function() {
    var f1000;
    var log = "";

    function f(a) {
        log += a;
    }

    before(function() {
        f1000 = throttle2(f, 1000);
        this.clock = sinon.useFakeTimers();
    });

    it("the first call works immediately", function() {
        f1000(1);
        assert.equal(log, "1");
    });

    it("defers the second call for 1000 ms", function() {
        f1000(2); // (being deferred, 1000ms have not passed)
        f1000(3); // (being deferred, 1000ms have not passed)
        // the last call time is planned in 1000 ms, with last argument

        assert.equal(log, "1"); // only the first call has come out

        this.clock.tick(1000); // 1000ms passed
        assert.equal(log, "13"); // log==13, since f1000(3) has come out
    });

    it("passes by 4th and 5th calls, only invokes 6th call", function() {
        this.clock.tick(100);
        /**/assert.equal(log, "13", "After this.clock.tick(100); [1]");
        f1000(4); // being deferred, only 100ms have passed since the last actuation
        /**/assert.equal(log, "13", "After f1000(4);");
        this.clock.tick(100);
        /**/assert.equal(log, "13", "After this.clock.tick(100); [2]");
        f1000(5); // being deferred, only 200ms have passed since the last actuation
        /**/assert.equal(log, "13", "After f1000(5);");
        this.clock.tick(700);
        /**/assert.equal(log, "13", "After this.clock.tick(700);");
        f1000(6); // being deferred, only 900ms have passed since the last actuation

        this.clock.tick(100); // the call with 6 was invoked

        assert.equal(log, "136");
    });

    after(function() {
        this.clock.restore();
    });

});