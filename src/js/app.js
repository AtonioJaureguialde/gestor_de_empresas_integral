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
        this.router = null;
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
                this.router = new Router(this.auth);
                this.router.init();
            }

            // Event listeners globales
            this.setupGlobalListeners();
        });
    }

    showLogin() {
        const app = document.getElementById('app');
        const header = document.querySelector('.main-header');
        const mainContent = document.getElementById('mainContent');
        
        // Ocultar header en login
        if (header) header.classList.add('hidden');
        
        // Mostrar formulario de login
        mainContent.innerHTML = this.auth.getLoginForm();
        
        // Configurar evento del formulario
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                
                const result = this.auth.login(email, password);
                
                if (result.success) {
                    if (header) header.classList.remove('hidden');
                    this.loadUser();
                    this.router = new Router(this.auth);
                    this.router.init();
                    Toast.show(`¡Bienvenido ${result.user.name}!`, 'success');
                } else {
                    Toast.show(result.error, 'danger');
                }
            });
        }
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