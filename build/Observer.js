"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObserverPattern = void 0;
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
        var events = this.events.get(name);
        if (!events) {
            throw Error(name + " does not exist");
        }
        events.forEach(function (event) { return event(); });
    };
    return ObserverPattern;
}());
exports.ObserverPattern = ObserverPattern;
//# sourceMappingURL=Observer.js.map