let form = document.querySelector('.form');
let list = document.querySelector('.to-do-list');
let finished = document.querySelector('.finished');

let selectedCount = 0;

const addListItem = (toDoItem) =>{
    const listItem = document.createElement('li');
    listItem.classList = "p-4 bg-gray-100 rounded-md shadow-md hover:bg-gray-200 transition-colors";
    
    const checkBox = document.createElement('input');
    checkBox.id = toDoItem;
    checkBox.type = 'checkbox';
    checkBox.name = 'item';
    checkBox.value = toDoItem;
    checkBox.classList = "mr-2";

    const label = document.createElement('label');
    label.textContent = toDoItem;
    label.setAttribute('for', checkBox.id)
    label.classList.add('ml-6');
    label.classList = "text-lg font-medium text-gray-700";

    listItem.appendChild(checkBox);
    listItem.appendChild(label);

    list.appendChild(listItem);

    localStorage.setItem(toDoItem, `id${localStorage.length+1}`);
}

(()=>{
    for(let i = 0; i<localStorage.length; i++){
        let item = localStorage.key(i);
        addListItem(item);
    }
})();


form.querySelector('button').addEventListener('click', (event)=>{
    let toDoItem = form.querySelector('input').value
    form.querySelector('input').value = '';
    event.preventDefault();
    addListItem(toDoItem);
})

form.querySelector('input').addEventListener('keydown', (event)=>{
    let toDoItem = form.querySelector('input').value
    
    if (event.key == 'Enter'){
        form.querySelector('input').value = '';
        addListItem(toDoItem);
    }
})


list.addEventListener('click', (event)=>{
    console.log("event target :", event.target);
    let element = event.target.closest('li');
    // event.stopImmediatePropagation
    // console.dir(element)
    const currCheckBox = element.querySelector('input');

    if(!currCheckBox.checked){
        selectedCount++;
        currCheckBox.checked = true;
    }
    else{
        selectedCount--;
        currCheckBox.checked = false;
    }
    
    finished.style.display = selectedCount > 0 ? 'block' : 'none';

    element.classList.toggle('bg-gray-100');
    element.classList.toggle('bg-gray-200');
})

finished.addEventListener('click', ()=>{
    let allitems = list.querySelectorAll('li');

    for(item of Array.from(allitems)){
        if(item.querySelector('input').checked){
            selectedCount--;
            item.remove();
            localStorage.removeItem(item.querySelector('input').value);
        }
    }
    finished.style.display = selectedCount > 0 ? 'block' : 'none';
})