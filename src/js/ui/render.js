/**
 * Sistema de Enrutamiento y Renderizado
 * Maneja la navegación entre vistas
 */

import { CalendarView } from '../views/calendar.js';
import { ServicesView } from '../views/services.js';
import { IncidentsView } from '../views/incidents.js';
import { ChatView } from '../views/chat.js';
import { BillingView } from '../views/billing.js';
import { ReportsView } from '../views/reports.js';
import { RoutesView } from '../views/routes.js';
import { PortalView } from '../views/portal.js';
import { ClientsView } from '../views/clients.js';
import { EmployeesView } from '../views/employees.js';

export class Router {
    constructor(auth) {
        this.auth = auth;
        this.currentView = null;
        this.mainContent = document.getElementById('mainContent');
        this.navLinks = document.querySelectorAll('.nav-menu a');
        this.navMenu = document.getElementById('navMenu');
        this.menuToggle = document.getElementById('menuToggle');
        
        this.views = {
            calendar: new CalendarView(),
            services: new ServicesView(),
            incidents: new IncidentsView(),
            chat: new ChatView(),
            billing: new BillingView(),
            reports: new ReportsView(),
            routes: new RoutesView(),
            portal: new PortalView(),
            clients: new ClientsView(),
            employees: new EmployeesView()
        };
    }

    init() {
        // Configurar listeners de navegación
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const viewName = link.dataset.view;
                this.navigate(viewName);
                
                // Cerrar menú móvil al seleccionar
                if (this.menuToggle) {
                    this.navMenu.classList.remove('active');
                }
            });
        });

        // Toggle menú móvil
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => {
                this.navMenu.classList.toggle('active');
            });
        }

        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (e) => {
            if (this.navMenu && !this.navMenu.contains(e.target) && !this.menuToggle.contains(e.target)) {
                this.navMenu.classList.remove('active');
            }
        });

        // Cargar vista por defecto
        const hash = window.location.hash.slice(1) || 'calendar';
        this.navigate(hash);

        // Escuchar cambios de hash
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            if (hash && this.views[hash]) {
                this.navigate(hash);
            }
        });
    }

    navigate(viewName) {
        if (!this.views[viewName]) {
            console.warn(`Vista "${viewName}" no encontrada`);
            return;
        }

        // Actualizar clase activa en menú
        this.navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.view === viewName);
        });

        // Renderizar nueva vista
        this.mainContent.innerHTML = this.views[viewName].render();
        this.views[viewName].afterRender?.();
        
        this.currentView = viewName;
    }
}