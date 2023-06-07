import Tarea from "./model/Tarea.js";

class AplicacionTodoMachine {
    constructor() {
        this.tareas = [];
        this.tareasFiltradas  = [];
    }
    agregarTarea(titulo, descripcion, prioridad) {
        const nuevaTarea = new Tarea(titulo, descripcion, prioridad);
        this.tareas.push(nuevaTarea);
    }
    completarTarea(index) {
        if (index >= 0 && index < this.tareasFiltradas.length) {
            let id = this.tareasFiltradas[index].id;
            if (id >= 0 && id < this.tareas.length) {
                this.tareas[id].completada = true;
            }
        }
    }
    compararTareas(tareaA, tareaB) {
        if (tareaA.prioridad !== tareaB.prioridad) {
            return tareaB.prioridad - tareaA.prioridad;
        }
        return tareaA.titulo.localeCompare(tareaB.titulo);
    }
    mostrarTareas(filtroTitulo) {
        for (let i = 0; i < this.tareas.length; i++) {
            this.tareas[i].setId(i);
        }
        this.tareasFiltradas = this.tareas.slice();
        if(filtroTitulo){
            this.tareasFiltradas = this.tareasFiltradas.filter(tarea => tarea.titulo.toLowerCase().includes(filtroTitulo.toLowerCase()));
        }
        return this.tareasFiltradas.sort(this.compararTareas);
    }
    obtenerTareaById(index){
        if (index >= 0 && index < this.tareasFiltradas.length) {
            let id = this.tareasFiltradas[index].id;
            if (id >= 0 && id < this.tareas.length) {
                return this.tareas[id];
            }
        }
    }
    updateTareaById(index, titulo, descripcion, prioridad){
        if (index >= 0 && index < this.tareasFiltradas.length) {
            let id = this.tareasFiltradas[index].id;
            if (id >= 0 && id < this.tareas.length) {
                this.tareas[id].titulo = titulo;
                this.tareas[id].descripcion = descripcion;
                this.tareas[id].prioridad = prioridad;
            }
        }
    }
    eliminarTareaById(index){
        if (index >= 0 && index < this.tareasFiltradas.length) {
            let id = this.tareasFiltradas[index].id;
            if (id >= 0 && id < this.tareas.length) {
                this.tareas.splice(id, 1);
            }
        }
    }
}
export default AplicacionTodoMachine;