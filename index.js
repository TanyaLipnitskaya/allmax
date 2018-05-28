let datePlaceHolder = document.getElementById('js-date');
let getDate = () => datePlaceHolder.innerHTML = Date().toLocaleString()
datePlaceHolder.innerHTML = getDate();
const updateDateInterval = setInterval( getDate, 1000);

let buttonAddTask = document.getElementById('js-addTask');
let modalNewTask = document.getElementsByClassName('NewTask')[0];
let toggleModal = () => {modalNewTask.classList.toggle('active')};
buttonAddTask.onclick = () => toggleModal()


let allTasks = JSON.parse(localStorage.getItem('tasks')) || [];

let Tasks = allTasks;
let list = document.getElementsByClassName('TaskList')[0];
let modalForm = document.getElementById('modal');

let addNewTaskList = (newItem) => {
    console.log(newItem);
    if (newItem){
        newItem.preventDefault ();
        let [taskName, taskDescription, taskPriority, taskPlannedDate] = newItem.target;
        Tasks.push ({
            id: Tasks[Tasks.length -1].id+1, 
            name: taskName.value,
            description: taskDescription.value,
            priority: taskPriority.value,
            plannedData: taskPlannedDate.value,
            actualData: ''

        })
        toggleModal()
        localStorage.setItem('tasks',JSON.stringify(Tasks))
    }
   
    list.innerHTML = '';

    for (let e=0; e<Tasks.length; e++ ){
        let tr = document.createElement ('tr'); 
        let tasksItem = Tasks[e];
        tr.innerHTML = `<td>${tasksItem.id}</td> 
                        <td>${tasksItem.name}</td>
                        <td>${tasksItem.description}</td>
                        <td>${tasksItem.priority}</td>
                        <td>${tasksItem.plannedData}</td>
                        <td>${tasksItem.actualData}</td>`
        list.appendChild (tr)
    }
};
modalForm.onsubmit = addNewTaskList;

addNewTaskList ();


