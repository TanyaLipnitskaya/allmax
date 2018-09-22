const superStorageKey = "key";
let taskArray = [];

const currentDateElement = document.querySelector(".Date");
currentDateElement.innerHTML = new Date().toLocaleDateString();

const listOfCurrentTasks = document.querySelector(".listOfCurrentTasks");
const createNewTask = (taskItem) => {
    taskArray.push(taskItem);
    const listItem = document.createElement("li");
    if (taskItem.formIsValid==false){
        listItem.classList.add("elementIsNotValid");
    };
        listItem.innerHTML = taskItem.taskName;
    listOfCurrentTasks.appendChild(listItem);
}

const localStorageTaskArray = localStorage.getItem(superStorageKey)
if (localStorageTaskArray) {
    const tempVar = JSON.parse(localStorageTaskArray);
   
    for (let arrayElement of tempVar) {
        createNewTask(arrayElement)
    }

}

const addTask = document.querySelector(".addTask");
const modalWindow = document.querySelector('.Modal')
const addTaskOnClick = () => {
    modalWindow.classList.toggle("Modal-disabled");
}
addTask.addEventListener("click", addTaskOnClick);

const currentForm = document.querySelector('form[name="Form"]');
const currentFormOnSubmit = (event) => {
    event.preventDefault()
    const formElement = event.target.elements;
    const taskName = formElement.taskName.value;
    const taskDescription = formElement.taskDescription.value;
    const selectPriority = formElement.selectPriority.value;
    const plannedDate = formElement.plannedDate.value;
    const actualDate = formElement.actualDate.value;

    const formIsValid = taskName&&taskDescription&&plannedDate;

   

    const taskItem = {
        taskName,
        taskDescription,
        selectPriority,
        plannedDate,
        actualDate,
        formIsValid
    };
    
    createNewTask(taskItem);
    localStorage.setItem(superStorageKey, JSON.stringify(taskArray));

    // modalWindow.classList.add("Modal-disabled");
    currentForm.reset();
};

currentForm.addEventListener("submit", currentFormOnSubmit);

const currentFormOnReset = () => {
    modalWindow.classList.add("Modal-disabled");
}
currentForm.addEventListener("reset", currentFormOnReset);