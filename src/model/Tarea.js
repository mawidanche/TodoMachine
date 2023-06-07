class Tarea {
    constructor(titulo, descripcion, prioridad) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.completada = false;
        this.prioridad = prioridad;
        this.id = undefined;
    }
    setId(id){
        this.id = id;
    }
}

export default Tarea;