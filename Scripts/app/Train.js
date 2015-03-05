var Train = (function () {
    function Train() {
        this.id = ko.observable(null);
        this.operator = ko.observable(null);
        this.arrival = ko.observable(null);
        this.from = ko.observable(null);
        this.to = ko.observable(null);
        this.departure = ko.observable(null);
    }
    Train.prototype.reset = function (id) {
        if (id === void 0) { id = null; }
        this.id(id);
        this.operator(null);
        this.arrival(null);
        this.from(null);
        this.to(null);
        this.departure(null);
    };
    return Train;
})();
