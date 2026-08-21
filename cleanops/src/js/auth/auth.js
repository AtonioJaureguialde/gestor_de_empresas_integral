/**
 * Sistema de Autenticación
 * Maneja login, logout y estado del usuario
 */

export class Auth {
    constructor() {
        this.storageKey = 'cleanops_user';
        this.user = this.getUser();
    }

    isAuthenticated() {
        return !!this.user;
    }

    getUser() {
        const userData = localStorage.getItem(this.storageKey);
        return userData ? JSON.parse(userData) : null;
    }

    login(userData = {}) {
        const defaultUser = {
            id: 1,
            name: 'Administrador',
            email: 'admin@cleanops.com',
            role: 'admin'
        };
        
        const user = { ...defaultUser, ...userData };
        localStorage.setItem(this.storageKey, JSON.stringify(user));
        this.user = user;
        return user;
    }

    logout() {
        localStorage.removeItem(this.storageKey);
        this.user = null;
    }

    getToken() {
        return localStorage.getItem('cleanops_token');
    }

    setToken(token) {
        localStorage.setItem('cleanops_token', token);
    }

    hasRole(role) {
        return this.user && this.user.role === role;
    }
}