/**
 * CleanOps - Aplicación Principal
 * Entry point de la aplicación
 */

import { Router } from './ui/render.js';
import { Auth } from './auth/auth.js';
import { Toast } from './ui/toast.js';

// Inicializar aplicación
class App {
    constructor() {
        this.auth = new Auth();
        this.router = new Router(this.auth);
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('CleanOps initialized');
            
            // Verificar autenticación
            if (!this.auth.isAuthenticated()) {
                this.showLogin();
            } else {
                this.loadUser();
                this.router.init();
            }

            // Event listeners globales
            this.setupGlobalListeners();
        });
    }

    showLogin() {
        const mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = `
            <div class="phase1-welcome">
                <h1>Bienvenido a CleanOps</h1>
                <p>Sistema de Gestión de Limpieza Profesional</p>
                <button id="loginBtn" class="btn btn-primary mt-2">Iniciar Sesión</button>
            </div>
        `;

        document.getElementById('loginBtn').addEventListener('click', () => {
            this.auth.login();
            this.loadUser();
            this.router.init();
            Toast.show('¡Bienvenido!', 'success');
        });
    }

    loadUser() {
        const user = this.auth.getUser();
        const userName = document.getElementById('userName');
        if (userName && user) {
            userName.textContent = user.name || 'Usuario';
        }

        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.auth.logout();
                window.location.reload();
            });
        }
    }

    setupGlobalListeners() {
        // Manejar errores globales
        window.addEventListener('error', (e) => {
            console.error('Error global:', e.error);
            Toast.show('Ha ocurrido un error', 'danger');
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Promise rechazada:', e.reason);
            Toast.show('Error de conexión', 'danger');
        });
    }
}

// Iniciar aplicación
const app = new App();

export default app;