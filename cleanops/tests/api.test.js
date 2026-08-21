/**
 * Tests de la API
 */

import { describe, it, expect } from 'vitest';
import { BackendAPI } from '../src/js/api/backend.js';

describe('BackendAPI', () => {
    let api;

    beforeEach(() => {
        api = new BackendAPI();
        localStorage.clear();
    });

    it('debe crear una instancia correctamente', () => {
        expect(api).toBeDefined();
    });

    it('debe retornar array vacío cuando no hay datos', async () => {
        const result = await api.get('services');
        expect(result).toEqual([]);
    });

    it('debe guardar y recuperar datos', async () => {
        const testData = { name: 'Test Service', price: 100 };
        await api.post('services', testData);
        
        const result = await api.get('services');
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('Test Service');
    });
});