import {
    setToLS,
    getFromLS,
    setToLSasJSON,
    getFromLSasJSON
} from "./util.js"

// загрузка списка при загрузке страницы
const init = () => {

    // Переменные
    const superStorageKey = "key";
    let taskArray = [];
    let index = 0;
    let currentUID = 0;

    // Селекторы
    const currentDateElement = document.querySelector(".Date");
    const editWindow = document.querySelector('#formEditing');
    const listOfCurrentTasks = document.querySelector(".listOfCurrentTasks");
    const addTask = document.querySelector(".addTask");
    const modalWindow = document.querySelector('#formCreation')
    const currentEditForm = document.querySelector('form[name="editForm"]');
    const currentForm = document.querySelector('form[name="Form"]');

    // Логика работы
    // Устанавливаем дату
    currentDateElement.innerHTML = new Date().toLocaleDateString();
    // Создание нового элемента списка задач
    const createNewTask = (taskItem) => {
        const listItem = document.createElement("li");
        if (taskItem.formIsValid == false) {
            listItem.classList.add("elementIsNotValid");
        };
        listItem.innerHTML = taskItem.taskName;
        // присвоение атрибута data-uid для того, чтобы обращаться к элементу списка по номеру.
        listItem.dataset.uid = index;
        listOfCurrentTasks.appendChild(listItem);
        listItem.addEventListener("click", processor)
        index++;
        taskArray.push(taskItem);
    };
    // Работа с LS

    const localStorageTaskArray = getFromLSasJSON(superStorageKey)
    if (localStorageTaskArray && localStorageTaskArray.length) {
        for (let arrayElement of localStorageTaskArray) {
            createNewTask(arrayElement)
        }
    }
    const writeCurrentTaskArraytoLS = () => {
        setToLSasJSON(superStorageKey, taskArray)
    };



    // Обработчики event'ов
    // первое объявление переменной на редактирование формы
    // создается обработчик события (processor), дающий возможность обратиться к конкретному элементу формы. Именованная функция, чтобы решить проблему с разнесением логики
    function processor(event) {
        currentUID = event.target.dataset.uid;
        editWindow.classList.remove("Modal-disabled");
        const currentEditForm = document.querySelector('form[name="editForm"]');
        // работа с html напрямую. 
        const formElement = currentEditForm.elements;
        // создается переменная, которая обращается к выбранному элементу в taskArray 
        const pickedArrayElement = taskArray[currentUID];
        // каждому input назначается хранимое значение в taskArray
        formElement.taskName.value = pickedArrayElement.taskName;
        formElement.taskDescription.value = pickedArrayElement.taskDescription;
        formElement.selectPriority.value = pickedArrayElement.selectPriority;
        formElement.plannedDate.value = pickedArrayElement.plannedDate;
        formElement.actualDate.value = pickedArrayElement.actualDate;
    };

    const addTaskOnClick = () => {
        modalWindow.classList.toggle("Modal-disabled");
    }
    addTask.addEventListener("click", addTaskOnClick);

    // и тут в игру врывается редактирование форм! Удар! Разработчик рыдает и пропускает переменную! Еще удар! Разработчик забивает на переменные! Зрители в экстазе! 

    const currentEditFormOnSubmit = (event) => {
        event.preventDefault()
        const formElement = event.target.elements;
        const taskName = formElement.taskName.value;
        const taskDescription = formElement.taskDescription.value;
        const selectPriority = formElement.selectPriority.value;
        const plannedDate = formElement.plannedDate.value;
        const actualDate = formElement.actualDate.value;

        const formIsValid = taskName && taskDescription && plannedDate;

        const taskItem = {
            taskName,
            taskDescription,
            selectPriority,
            plannedDate,
            actualDate,
            formIsValid
        };

        taskArray.splice(currentUID, 1, taskItem);
        writeCurrentTaskArraytoLS()

        window.location.reload();
    };

    // Комментирую как хочу. И переменные называю как хочу. Эту вот хотела назвать Симба. Тут вешаается событие на редактирование формы.
    currentEditForm.addEventListener("submit", currentEditFormOnSubmit);

    const deleteFormOnReset = (event) => {
        editWindow.classList.add("Modal-disabled");
        const toDelete = confirm("Вы действительно хотите удалить задачу?")
        if (toDelete) {
            listOfCurrentTasks.removeChild(listOfCurrentTasks.children[currentUID])
            taskArray.splice(currentUID, 1)
            writeCurrentTaskArraytoLS()
        }
    };

    currentEditForm.addEventListener("reset", deleteFormOnReset);


    // События на добавление формы (отправить и отменить)
    const currentFormOnSubmit = (event) => {
        event.preventDefault()
        const formElement = event.target.elements;
        const taskName = formElement.taskName.value;
        const taskDescription = formElement.taskDescription.value;
        const selectPriority = formElement.selectPriority.value;
        const plannedDate = formElement.plannedDate.value;
        const actualDate = formElement.actualDate.value;

        const formIsValid = taskName && taskDescription && plannedDate;

        const taskItem = {
            taskName,
            taskDescription,
            selectPriority,
            plannedDate,
            actualDate,
            formIsValid
        };

        createNewTask(taskItem);
        // localStorage.setItem(superStorageKey, JSON.stringify(taskArray)); - старая версия
        // делаем запись в LS с преобразованием JSON в виде строки. Преобразуем taskArray 
        setToLSasJSON(superStorageKey, taskArray)
        // modalWindow.classList.add("Modal-disabled");
        currentForm.reset();
    };

    currentForm.addEventListener("submit", currentFormOnSubmit);

    const currentFormOnReset = () => {
        modalWindow.classList.add("Modal-disabled");
    }
    currentForm.addEventListener("reset", currentFormOnReset);
};
document.addEventListener("DOMContentLoaded", init)