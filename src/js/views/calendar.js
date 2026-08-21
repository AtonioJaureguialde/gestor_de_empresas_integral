/**
 * Vista de Calendario
 */
export class CalendarView {
    render() {
        return `
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Calendario de Servicios</h2>
                    <button class="btn btn-primary">+ Nuevo Servicio</button>
                </div>
                <div class="phase1-container">
                    <p>Vista de calendario - Próximamente</p>
                </div>
            </div>
        `;
    }
}