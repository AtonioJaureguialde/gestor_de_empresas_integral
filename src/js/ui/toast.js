/**
 * Sistema de Notificaciones Toast
 */

export class Toast {
    static show(message, type = 'info', duration = 3000) {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <span>${message}</span>
            <button class="toast-close">&times;</button>
        `;

        // Estilos inline para el toast
        toast.style.cssText = `
            background: var(--bg-primary);
            border-left: 4px solid var(--color-${type});
            padding: 1rem;
            margin-bottom: 0.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            animation: slideIn 0.3s ease;
        `;

        container.appendChild(toast);

        // Auto cerrar
        const timeout = setTimeout(() => this.close(toast), duration);

        // Click en cerrar
        toast.querySelector('.toast-close').addEventListener('click', () => {
            clearTimeout(timeout);
            this.close(toast);
        });
    }

    static close(toast) {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }

    static success(message) { this.show(message, 'success'); }
    static error(message) { this.show(message, 'danger'); }
    static warning(message) { this.show(message, 'warning'); }
    static info(message) { this.show(message, 'info'); }
}