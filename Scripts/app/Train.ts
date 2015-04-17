
class Train {
    public id = ko.observable<string>(null).extend({ rateLimit: 500 });
    public operator = ko.observable<string>(null).extend({ rateLimit: 500 });
    public arrival = ko.observable<string>(null).extend({ rateLimit: 500 });
    public from = ko.observable<string>(null).extend({ rateLimit: 500 });
    public to = ko.observable<string>(null).extend({ rateLimit: 500 });
    public departure = ko.observable<string>(null).extend({ rateLimit: 500 });
    public ecs = ko.observable<boolean>(null).extend({ rateLimit: 500 });

    public reset() {
        this.id(null);
        this.operator(null);
        this.arrival(null);
        this.from(null);
        this.to(null);
        this.departure(null);
        this.ecs(null);
    }
} 