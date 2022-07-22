class DeclineMemory {
    private static instance: DeclineMemory;
    private history;
    private constructor() {
        this.history = {}
    }

    static getInstance() {
        if (!this.instance)
            this.instance = new DeclineMemory();
        return this.instance
    }

    add(merchantIdentifier: string, declineReason: string): void {
        if (!this.history[merchantIdentifier])
            this.history[merchantIdentifier] = {}
        this.history[merchantIdentifier][declineReason] ? this.history[merchantIdentifier][declineReason]++ : this.history[merchantIdentifier][declineReason] = 1
    }

    get(merchantIdentifier) {
        return this.history[merchantIdentifier] || {};
    }
}

export default DeclineMemory;

