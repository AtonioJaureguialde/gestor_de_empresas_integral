/**
 * Vista de Calendario - Mobile First
 */
import { BackendAPI } from '../api/backend.js';

export class CalendarView {
  constructor() {
    this.api = new BackendAPI();
    this.currentDate = new Date();
    this.events = [];
  }

  render() {
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const currentMonth = monthNames[this.currentDate.getMonth()];
    const currentYear = this.currentDate.getFullYear();

    return `
      <div class="calendar-container">
        <div class="card calendar-card">
          <div class="calendar-header">
            <button id="prevMonth" class="btn btn-secondary btn-icon">←</button>
            <h2 class="calendar-title">${currentMonth} ${currentYear}</h2>
            <button id="nextMonth" class="btn btn-secondary btn-icon">→</button>
          </div>
          
          <div class="calendar-grid">
            <div class="calendar-weekdays">
              <div>Lun</div>
              <div>Mar</div>
              <div>Mié</div>
              <div>Jue</div>
              <div>Vie</div>
              <div>Sáb</div>
              <div>Dom</div>
            </div>
            <div id="calendarDays" class="calendar-days"></div>
          </div>
        </div>
        
        <div class="calendar-events card">
          <div class="card-header">
            <h3 class="card-title">Servicios Programados</h3>
            <button id="newServiceBtn" class="btn btn-primary btn-sm">+ Nuevo</button>
          </div>
          <div id="eventsList" class="events-list"></div>
        </div>
      </div>
    `;
  }

  afterRender() {
    this.loadEvents();
    this.setupListeners();
    this.renderCalendar();
  }

  setupListeners() {
    document.getElementById('prevMonth')?.addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.renderCalendar();
    });

    document.getElementById('nextMonth')?.addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.renderCalendar();
    });

    document.getElementById('newServiceBtn')?.addEventListener('click', () => {
      alert('Funcionalidad de nuevo servicio - Próximamente');
    });
  }

  loadEvents() {
    // Cargar eventos demo
    this.events = [
      { id: 1, title: 'Limpieza Oficina Centro', date: new Date().toISOString().split('T')[0], client: 'Empresa SL', time: '08:00' },
      { id: 2, title: 'Mantenimiento General', date: new Date().toISOString().split('T')[0], client: 'Comunidad XYZ', time: '10:00' },
      { id: 3, title: 'Limpieza Cristales', date: new Date(Date.now() + 86400000).toISOString().split('T')[0], client: 'Tienda ABC', time: '09:00' }
    ];
    this.renderEvents();
  }

  renderEvents() {
    const eventsList = document.getElementById('eventsList');
    if (!eventsList) return;

    const today = new Date().toISOString().split('T')[0];
    const todayEvents = this.events.filter(e => e.date === today);

    if (todayEvents.length === 0) {
      eventsList.innerHTML = '<p class="text-muted text-center py-2">No hay servicios para hoy</p>';
      return;
    }

    eventsList.innerHTML = todayEvents.map(event => `
      <div class="event-item card mb-1">
        <div class="event-time">${event.time}</div>
        <div class="event-info">
          <h4 class="event-title">${event.title}</h4>
          <p class="event-client text-sm text-muted">${event.client}</p>
        </div>
        <button class="btn btn-secondary btn-sm">Ver</button>
      </div>
    `).join('');
  }

  renderCalendar() {
    const calendarDays = document.getElementById('calendarDays');
    const calendarTitle = document.querySelector('.calendar-title');
    
    if (!calendarDays || !calendarTitle) return;

    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    calendarTitle.textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDay = firstDay.getDay() || 7; // Convertir domingo (0) a 7
    const totalDays = lastDay.getDate();

    let daysHTML = '';
    
    // Días vacíos antes del primer día del mes
    for (let i = 1; i < startingDay; i++) {
      daysHTML += '<div class="calendar-day empty"></div>';
    }

    // Días del mes
    const today = new Date().toISOString().split('T')[0];
    
    for (let day = 1; day <= totalDays; day++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasEvents = this.events.some(e => e.date === dateString);
      const isToday = dateString === today;
      
      daysHTML += `
        <div class="calendar-day ${isToday ? 'today' : ''} ${hasEvents ? 'has-events' : ''}" data-date="${dateString}">
          <span class="day-number">${day}</span>
          ${hasEvents ? '<span class="event-dot"></span>' : ''}
        </div>
      `;
    }

    calendarDays.innerHTML = daysHTML;

    // Añadir listeners a los días
    document.querySelectorAll('.calendar-day:not(.empty)').forEach(dayEl => {
      dayEl.addEventListener('click', () => {
        const date = dayEl.dataset.date;
        this.showDayEvents(date);
      });
    });
  }

  showDayEvents(date) {
    const dayEvents = this.events.filter(e => e.date === date);
    const dateObj = new Date(date);
    const dateStr = dateObj.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    
    if (dayEvents.length > 0) {
      const eventList = dayEvents.map(e => `• ${e.time} - ${e.title}`).join('<br>');
      alert(`${dateStr}:\n\n${eventList}`);
    } else {
      alert(`${dateStr}:\n\nNo hay servicios programados`);
    }
  }
}