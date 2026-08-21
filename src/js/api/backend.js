/**
 * API Backend - Comunicación con el servidor
 * Actualmente usa localStorage como mock
 */

export class BackendAPI {
    constructor(baseUrl = '') {
        this.baseUrl = baseUrl;
        this.storagePrefix = 'cleanops_';
    }

    // Método genérico para obtener datos
    async get(endpoint) {
        // Mock: intentar obtener de localStorage
        const key = this.storagePrefix + endpoint;
        const data = localStorage.getItem(key);
        
        if (data) {
            return JSON.parse(data);
        }
        
        // Si no existe, retornar array vacío o null
        return [];
    }

    // Método genérico para guardar datos
    async post(endpoint, data) {
        const key = this.storagePrefix + endpoint;
        const existing = await this.get(endpoint);
        
        const newItem = {
            id: Date.now(),
            createdAt: new Date().toISOString(),
            ...data
        };
        
        const updated = Array.isArray(existing) 
            ? [...existing, newItem] 
            : newItem;
        
        localStorage.setItem(key, JSON.stringify(updated));
        return newItem;
    }

    // Método genérico para actualizar
    async put(endpoint, id, data) {
        const key = this.storagePrefix + endpoint;
        const existing = await this.get(endpoint);
        
        if (Array.isArray(existing)) {
            const updated = existing.map(item => 
                item.id === id ? { ...item, ...data, updatedAt: new Date().toISOString() } : item
            );
            localStorage.setItem(key, JSON.stringify(updated));
            return updated.find(item => item.id === id);
        }
        
        return null;
    }

    // Método genérico para eliminar
    async delete(endpoint, id) {
        const key = this.storagePrefix + endpoint;
        const existing = await this.get(endpoint);
        
        if (Array.isArray(existing)) {
            const filtered = existing.filter(item => item.id !== id);
            localStorage.setItem(key, JSON.stringify(filtered));
            return true;
        }
        
        return false;
    }

    // Métodos específicos por entidad
    async getServices() { return this.get('services'); }
    async getClients() { return this.get('clients'); }
    async getEmployees() { return this.get('employees'); }
    async getIncidents() { return this.get('incidents'); }
}