const superStorageKey = "key";
let taskArray = [];

const currentDateElement = document.querySelector(".Date");
currentDateElement.innerHTML = new Date().toLocaleDateString();
// первое объявление переменной на редактирование формы
const editWindow = document.querySelector('#formEditing');
// создается обработчик события (processor), дающий возможность обратиться к конкретному элементу формы.
const processor = (event)=>{
    const currentUID=event.target.dataset.uid; 
    editWindow.classList.remove("Modal-disabled"); 
    const currentEditForm = document.querySelector('form[name="editForm"]');
    // работа с html напрямую. 
    const formElement = currentEditForm.elements;
    // создается переменная, которая обращается к выбранному элементу в taskArray 
    const pickedArrayElement = taskArray[currentUID];
    // каждому input назначается хранимое значение в taskArray
    formElement.taskName.value=pickedArrayElement.taskName;
    formElement.taskDescription.value=pickedArrayElement.taskDescription;
    formElement.selectPriority.value=pickedArrayElement.selectPriority;
    formElement.plannedDate.value=pickedArrayElement.plannedDate;
    formElement.actualDate.value=pickedArrayElement.actualDate;
};
const listOfCurrentTasks = document.querySelector(".listOfCurrentTasks");
let index=0;
const createNewTask = (taskItem) => {
    const listItem = document.createElement("li");
    if (taskItem.formIsValid==false){
        listItem.classList.add("elementIsNotValid");
    };
    listItem.innerHTML = taskItem.taskName;
    // присвоение атрибута data-uid для того, чтобы обращаться к элементу списка по номеру.
    listItem.dataset.uid=index; 
    listOfCurrentTasks.appendChild(listItem);
        listItem.addEventListener("click", processor )
    index++;
    taskArray.push(taskItem);
};


const localStorageTaskArray = localStorage.getItem(superStorageKey)
if (localStorageTaskArray) {
    const tempVar = JSON.parse(localStorageTaskArray);
   
    for (let arrayElement of tempVar) {
        createNewTask(arrayElement)
    }

}

const addTask = document.querySelector(".addTask");
const modalWindow = document.querySelector('#formCreation')
const addTaskOnClick = () => {
    modalWindow.classList.toggle("Modal-disabled");
}
addTask.addEventListener("click", addTaskOnClick);

// и тут в игру врывается редактирование форм! Удар! Разработчик рыдает и пропускает переменную! Еще удар! Разработчик забивает на переменные! Зрители в экстазе! 

const currentEditForm = document.querySelector('form[name="editForm"]');
const currentEditFormOnSubmit = (event) => {
    event.preventDefault()
    const formElement = event.target.elements;
    const taskName = formElement.taskName.value;
    const taskDescription = formElement.taskDescription.value;
    const selectPriority = formElement.selectPriority.value;
    const plannedDate = formElement.plannedDate.value;
    const actualDate = formElement.actualDate.value;
};
// Комментирую как хочу. И переменные называю как хочу. Эту вот хотела назвать Симба. Тут вешаается событие на редактирование формы.
currentEditForm.addEventListener("submit", currentEditFormOnSubmit);

const deleteFormOnReset = () => {
   editWindow.classList.add("Modal-disabled");
confirm("Вы действительно хотите удалить задачу?")}
currentEditForm.addEventListener("reset", deleteFormOnReset);



// События на добавление формы (отправить и отменить)
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