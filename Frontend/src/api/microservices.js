/* frontend communication  frontend service client*/
class MicroserviceClient {
    constructor() {
        this.gateway = import.meta.env.VITE_API_GATEWAY || 'http://127.0.0.1:8000/api';
    }

    async request(service, endpoint, options = {}) {
        const url = `${this.gateway}/${service}${endpoint}`;
        return fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getToken()}`,
                ...options.headers
            }
        });
    }
}