const socket = io()

const nombreTarea = document.getElementById('nombre-tarea')
const descripcionTarea = document.getElementById('descripcion-tarea')
const enviarTarea = document.getElementById('agregar-tarea')

const contenedorTareas = document.getElementById('contenedor-tareas')

enviarTarea.addEventListener('click',()=>{
    // console.log(nombreTarea.value);
    // console.log(descripcionTarea.value);
    if (nombreTarea.value.trim() != '' && descripcionTarea.value.trim() != '') {
        socket.emit('agregar-tarea',{
            nombreTarea:nombreTarea.value,
            descripcionTarea:descripcionTarea.value
        })
    }
    return 
})

socket.on('agregar-tarea',(data)=>{
    // contenedorTareas.innerHTML += `
    // <div class="col-sm-6" id="tarea-agregada-${data.id}" style="margin-top: 5px; margin-bottom: 5px;">
    //     <div class="card">
    //         <div class="card-body">
    //           <h5 class="card-title" id="nombre-tarea-agregada-${data.id}">${data.nombreTarea}</h5>
    //           <p class="card-text" id="descripcion-tarea-agregada-${data.id}">${data.descripcionTarea}</p>
    //           <button class="btn btn-primary" id="modificar-tarea-${data.id}">Modificar</button>
    //           <button class="btn btn-danger" id="eliminar-tarea-${data.id}">Eliminar</button>
    //         </div>
    //     </div>
    // </div>`

    const contenedor1 = document.createElement('div')
    contenedor1.className = 'col-sm-6'
    contenedor1.id = `tarea-agregada-${data.id}`
    contenedor1.style.marginTop = '5px'
    contenedor1.style.marginBottom = '5px'

    const contenedor2 = document.createElement('div')
    contenedor2.className = 'card'

    const contenedor3 = document.createElement('div')
    contenedor3.className = 'card-body'

    const h5 = document.createElement('h5')
    h5.className = 'card-title'
    h5.id = `nombre-tarea-agregada-${data.id}`
    h5.textContent = `${data.nombreTarea}`

    const p = document.createElement('p')
    p.className = 'card-text'
    p.id = `descripcion-tarea-agregada-${data.id}`
    p.textContent = `${data.descripcionTarea}`

    const boton1 = document.createElement('button')
    boton1.className = 'btn btn-success'
    boton1.id = `modificar-tarea-${data.id}`
    boton1.textContent = 'Modificar'
    boton1.style.marginRight = '4px'

    const boton2 = document.createElement('button')
    boton2.className = 'btn btn-danger'
    boton2.id = `eliminar-tarea-${data.id}`
    boton2.textContent = 'Eliminar'

    contenedor3.append(h5,p,boton1,boton2)
    contenedor2.append(contenedor3)
    contenedor1.append(contenedor2)
    contenedorTareas.append(contenedor1)

    boton2.addEventListener('click',()=>{
        socket.emit('eliminar',contenedor1.id)
    })

    boton1.addEventListener('click',()=>{
        let nombreTarea = ''
        let descripcionTarea = ''
        
        do {
            nombreTarea = prompt('Nombre de la tarea')
        } while (nombreTarea.trim() == '');

        do {
            descripcionTarea = prompt('Descripcion')
        } while (descripcionTarea.trim() == '');

        socket.emit('modificar',{
            nombreTareaModificada:nombreTarea,
            descripcionTareaModificada:descripcionTarea,
            nombreTareaId:h5.id,
            descripcionTareaId:p.id
        })
    })
    
})

socket.on('eliminar',(data)=>{
    document.getElementById(`${data}`).remove()
})

socket.on('modificar',(data)=>{
    document.getElementById(`${data.nombreTareaId}`).textContent = data.nombreTareaModificada
    document.getElementById(`${data.descripcionTareaId}`).textContent = data.descripcionTareaModificada
})


