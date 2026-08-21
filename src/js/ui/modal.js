/**
 * Vista de Modal
 */

export class Modal {
    constructor(options = {}) {
        this.title = options.title || '';
        this.content = options.content || '';
        this.onClose = options.onClose || null;
    }

    show() {
        const container = document.getElementById('modalContainer');
        if (!container) return;

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content card">
                <div class="card-header">
                    <h3 class="card-title">${this.title}</h3>
                    <button class="btn-close">&times;</button>
                </div>
                <div class="modal-body">${this.content}</div>
            </div>
        `;

        // Estilos
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: var(--z-modal);
        `;

        container.appendChild(modal);

        // Cerrar
        modal.querySelector('.btn-close').addEventListener('click', () => this.close());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.close();
        });
    }

    close() {
        const overlay = document.querySelector('.modal-overlay');
        if (overlay) {
            overlay.remove();
            this.onClose?.();
        }
    }
}