var Train = (function () {
    function Train() {
        this.id = ko.observable(null).extend({ rateLimit: 500 });
        this.operator = ko.observable(null).extend({ rateLimit: 500 });
        this.arrival = ko.observable(null).extend({ rateLimit: 500 });
        this.from = ko.observable(null).extend({ rateLimit: 500 });
        this.to = ko.observable(null).extend({ rateLimit: 500 });
        this.departure = ko.observable(null).extend({ rateLimit: 500 });
        this.ecs = ko.observable(null).extend({ rateLimit: 500 });
    }
    Train.prototype.reset = function () {
        this.id(null);
        this.operator(null);
        this.arrival(null);
        this.from(null);
        this.to(null);
        this.departure(null);
        this.ecs(null);
    };
    return Train;
})();
