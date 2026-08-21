/**
 * Utilidades y Helpers
 */

export const helpers = {
    // Formatear fecha
    formatDate(date, format = 'short') {
        const d = new Date(date);
        if (format === 'short') return d.toLocaleDateString('es-ES');
        if (format === 'long') return d.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        if (format === 'time') return d.toLocaleTimeString('es-ES');
        return d.toISOString();
    },

    // Formatear moneda
    formatCurrency(amount, currency = 'EUR') {
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency }).format(amount);
    },

    // Generar ID único
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    // Debounce
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Validar email
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
};