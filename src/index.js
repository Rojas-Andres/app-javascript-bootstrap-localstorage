
//Vamos a inicializar todos en el caso que no hayan elementos entonces crea una lista vacia
const todos = JSON.parse(localStorage.getItem('todos')) || []


const render = () => {
    const todoList = document.getElementById("todo-list")
    const todosTemplate = todos.map( t=> '<li class="list-group-item"> ' + t + '</li>');
        
    //Unimos todos los indices del arreglo y lo separamos "" que en este caso es vacio  
    
    todoList.innerHTML = todosTemplate.join('');
    
    //Obtenemos todos los li de todo list , recordar que los li son los que le enviamos a la lista e imprime alla
    const elementos = document.querySelectorAll('#todo-list li')
    
    //forEach -> siempre recibe una funcion
    elementos.forEach( (elemento,i) => {

        //Cuando se pulse el elemento va a mostrar por consola el elemento y el indice
        elemento.addEventListener('click',() =>{
            //Elimine el ul
            elemento.parentNode.removeChild(elemento);
            //Elimine el indice de la lista
            todos.splice(i,1);
            //Actualizamos todos
            actualizaTodos(todos)    
            //Con este pedazo se actualiza nuevamente los indices , recursividad
            render();
        })
        
    })

}


const actualizaTodos = (todos)=>{

    //Convertimos la lista en un string
    const todoStrings = JSON.stringify(todos);
    //La llave seria todos y el valor es la lista convertida en string
    localStorage.setItem('todos',todoStrings)


}

window.onload=()=>{

    //Llamamos a render para que inicialice 
    render();
    const form=document.getElementById('todo-form');
    //console.log(form);
    form.onsubmit=(e)=>{
        //Esta parte me dice que cuando le presione enviar no refresque la pagina que es el por defecto
        e.preventDefault();
        const todo = document.getElementById('todo');
        
        //Lo que le enviamos a en esa caja de texto lo guardamos 
        
        const todoText = todo.value;
        
        //y la caja de texto se convierte en vacia nuevamente
        
        if (todoText === "" || todoText ===" "){
            alert("No ha digitado nada ")
        }
        else{
            todos.push(todoText);
        }

        todo.value = "";
        
        //Obtenemos la lista que se encuentra actualmente
        
        
        /*
        //1 forma
        //La convertimos vacia , sin esta linea se van a repetir
        todoList.innerHTML=""
        console.log(todoText);
        //todoList.innerHTML
        for(let i =0 ; i<todos.length ; i++){
            todoList.innerHTML += "<li>" +todos[i] +"</li>";
        }
        */
        actualizaTodos(todos)
        render();
        //2 forma
        //Esto es un arreglo con todos los indices que se han digitado
    }
}