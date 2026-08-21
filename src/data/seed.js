/**
 * Datos Seed / Demo
 * Para inicializar la aplicación con datos de prueba
 */

export const seedData = {
    clients: [
        { id: 1, name: 'Empresa ABC', email: 'contacto@abc.com', phone: '600123456', address: 'Calle Mayor 1, Madrid' },
        { id: 2, name: 'Oficinas XYZ', email: 'info@xyz.com', phone: '600654321', address: 'Av. Diagonal 100, Barcelona' }
    ],
    
    employees: [
        { id: 1, name: 'Juan García', email: 'juan@cleanops.com', role: 'supervisor', phone: '600111222' },
        { id: 2, name: 'María López', email: 'maria@cleanops.com', role: 'limpiador', phone: '600333444' }
    ],
    
    services: [
        { id: 1, name: 'Limpieza de oficinas', price: 150, duration: 120, description: 'Limpieza completa de espacios de oficina' },
        { id: 2, name: 'Limpieza de cristales', price: 80, duration: 60, description: 'Limpieza profesional de ventanas' }
    ],
    
    incidents: [
        { id: 1, title: 'Fuga de agua', description: 'Se detectó una fuga en el baño principal', status: 'pending', createdAt: new Date().toISOString() }
    ]
};

// Inicializar datos en localStorage si no existen
export function initSeedData() {
    Object.entries(seedData).forEach(([key, data]) => {
        const existing = localStorage.getItem(`cleanops_${key}`);
        if (!existing) {
            localStorage.setItem(`cleanops_${key}`, JSON.stringify(data));
        }
    });
}