
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const authAPI = {
    login: (username, password) => axiosInstance.post('/token/', { username, password }),
    refreshToken: (refresh) => axiosInstance.post('/token/refresh/', { refresh }),
    register: (userData) => axiosInstance.post('/register/', userData),
    logout: () => {
        // remove token fro local storage
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('user')
    },
    // Add other auth related calls like password , reset
}

export const menuAPI = {
    getMenuItems: () => axiosInstance.get('/menu-items/'),
    getCategories: () => axiosInstance.get('/categories/'),
    getMenuItemById: (id) => axiosInstance.get(`/menu-items/${id}/`),
}

export const siteAPI = {
    getSettings: () => axiosInstance.get('/settings/'),
    getHeroSlides: () => axiosInstance.get('/hero-slides/'),
    getGallery: (section) => axiosInstance.get(`/gallery/${section ? `?section=${section}` : ''}`),
}

export const reservationAPI = {
    createReservation: async (reservation) => {
        // Prefer backend if available, but fall back to local storage for a smooth dev experience.
        try {
            return await axiosInstance.post('/reservations/', reservation);
        } catch (err) {
            const key = 'reservations';
            const existing = JSON.parse(localStorage.getItem(key) || '[]');
            const record = {
                id: crypto?.randomUUID?.() || String(Date.now()),
                createdAt: new Date().toISOString(),
                ...reservation
            };
            localStorage.setItem(key, JSON.stringify([record, ...existing]));
            return { data: record };
        }
    }
};

export const contactAPI = {
    submitContact: async (contactData) => {
        // Try to submit to backend API if endpoint exists, otherwise fall back to localStorage
        try {
            // Uncomment when backend endpoint is ready:
            // return await axiosInstance.post('/contact/', contactData);

            // Fallback to localStorage for now
            const key = 'contact_submissions';
            const existing = JSON.parse(localStorage.getItem(key) || '[]');
            const record = {
                id: crypto?.randomUUID?.() || String(Date.now()),
                createdAt: new Date().toISOString(),
                ...contactData
            };
            localStorage.setItem(key, JSON.stringify([record, ...existing]));
            return { data: record };
        } catch (err) {
            // If API call fails, still save to localStorage
            const key = 'contact_submissions';
            const existing = JSON.parse(localStorage.getItem(key) || '[]');
            const record = {
                id: crypto?.randomUUID?.() || String(Date.now()),
                createdAt: new Date().toISOString(),
                ...contactData
            };
            localStorage.setItem(key, JSON.stringify([record, ...existing]));
            return { data: record };
        }
    }
};

export const orderAPI = {
    createOrder: (orderData) => axiosInstance.post('/orders/', orderData),
};