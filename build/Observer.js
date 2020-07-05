var ObserverPattern = (function () {
    function ObserverPattern() {
        this.events = new Map();
    }
    ObserverPattern.prototype.subscribe = function (name, fn) {
        if (this.events.has(name)) {
            this.events.get(name).add(fn);
        }
        else {
            this.events.set(name, new Set([fn]));
        }
    };
    ObserverPattern.prototype.unSubscribe = function (name, fn) {
        if (this.events.has(name)) {
            this.events.get(name).delete(fn);
        }
    };
    ObserverPattern.prototype.fire = function (name) {
        var eventName = this.events.get(name);
        if (!eventName) {
            throw Error(name + " does not exist");
        }
        eventName.forEach(function (event) { return event(); });
    };
    return ObserverPattern;
}());
//# sourceMappingURL=Observer.js.map