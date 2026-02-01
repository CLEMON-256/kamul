/*circut breaker pattern */
class CircuitBreaker {
    constructor(service, threshold = 5, timeout = 60000) {
        this.service = service;
        this.threshold = threshold;
        this.timeout = timeout;
        this.failureCount = 0;
        this.state = 'ClOSED';

    }

    async call(fn) {
        if (this.state === 'OPEN') {
            throw newError(`Service ${this.service} id unavailable`);

        }
        try {
            const result = await fn();
            this.result();
            return result;
        } catch (error) {
            this.recordFailure();
            throw error;
        }
    }
}