import AplicacionTodoMachine from "./AplicacionTodoMachine.js";
import Tarea from "./model/Tarea.js";
const app = new AplicacionTodoMachine();
let tareasFiltradas = [];

app.agregarTarea('titulo de la tarea', 'descripcion de la tarea', 5);
app.agregarTarea('titulo de la tarea 2', 'descripcion de la tarea 2', 3);
let taskSelected;
const container = document.getElementById('containerTask');

const buscarTarea = () => {
    const tituloFind = document.getElementById('tituloFind');
    container.innerHTML = "";
    app.mostrarTareas(tituloFind.value).forEach((tarea, indice) => {
        container.appendChild(createTaskHtml(tarea.titulo,tarea.descripcion,tarea.prioridad,indice,tarea.completada));
    });
}
const createTaskHtml = (titulo, descripcion, prioridad, id, completada)=> {
    const task = document.createElement('a');
    task.setAttribute('href', '#');
    task.setAttribute('class', 'list-group-item list-group-item-action task-element');
    task.setAttribute('data-id',id);
    task.setAttribute('aria-current', 'true');
    const divTask = document.createElement('div');
    if(completada=== true){
        const iconCompleted = document.createElement('i');
        iconCompleted.className = 'far fa-check-circle text-success float-end fa-lg pt-2';
        divTask.appendChild(iconCompleted);
    }

    const headingTask = document.createElement('h5');
    headingTask.setAttribute('class', 'mb-1');
    headingTask.textContent = titulo;
    divTask.appendChild(headingTask);


    const paragraph = document.createElement('p');
    paragraph.setAttribute('class', 'mb-1');
    paragraph.textContent = descripcion;

    task.appendChild(divTask);
    task.appendChild(paragraph);
    for (let i = 0; i < prioridad; i++) {
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-star text-warning float-end';
        divTask.appendChild(icon);
    }
    task.addEventListener('click', () => {
        taskSelected = id;
        // Selecciona todos los elementos que contengan la clase "task-element"
        const taskElement = document.querySelectorAll('.task-element');
        taskElement.forEach((t) => {
            t.classList.remove('active');
        });
        task.classList.add('active');
    });
    return task;
}

document.getElementById('btnGuardarTarea').addEventListener('click', ()=>{
    app.agregarTarea(document.getElementById('titulo').value,
                        document.getElementById('descripcion').value,
                            document.getElementById('prioridad').value );
    buscarTarea();
});
document.getElementById('btnGuardarTareaEdit').addEventListener('click', ()=>{
    app.updateTareaById(taskSelected,
        document.getElementById('editTitulo').value,
        document.getElementById('editDescripcion').value,
        document.getElementById('editPrioridad').value);
    container.innerHTML = "";
    buscarTarea();
});
document.getElementById('btnEliminar').addEventListener('click', ()=>{
    app.eliminarTareaById(taskSelected);
    buscarTarea();
});
document.getElementById('btnFind').addEventListener('click', ()=>{
    buscarTarea();
});
document.getElementById('btnCompletarTarea').addEventListener('click', ()=>{
    app.completarTarea(taskSelected);
    buscarTarea();
});
document.getElementById('btnAbrirAgregarTarea').addEventListener('click', ()=>{
    document.getElementById('prioridad').value = '';
    document.getElementById('titulo').value = '';
    document.getElementById('descripcion').value = '';
});
document.getElementById('btnEditar').addEventListener('click', ()=>{
    const tarea = app.obtenerTareaById(taskSelected);
    document.getElementById('editPrioridad').value = tarea.prioridad;
    document.getElementById('editTitulo').value = tarea.titulo;
    document.getElementById('editDescripcion').value = tarea.descripcion;
});
document.addEventListener("DOMContentLoaded", function(event) {
    buscarTarea();
});

