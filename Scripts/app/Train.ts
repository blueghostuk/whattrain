
class Train {
    public id = ko.observable<string>(null);
    public operator = ko.observable<string>(null);
    public arrival = ko.observable<string>(null);
    public from = ko.observable<string>(null);
    public to = ko.observable<string>(null);
    public departure = ko.observable<string>(null);

    public reset(id: string = null) {
        this.id(id);
        this.operator(null);
        this.arrival(null);
        this.from(null);
        this.to(null);
        this.departure(null);
    }
} 