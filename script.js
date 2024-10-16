let form = document.querySelector('.form');
let list = document.querySelector('.to-do-list');
let finished = document.querySelector('.finished');

let selectedCount = 0;

const isMobile = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
};

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

const handleItemEnter = (event) => {
    event.preventDefault();
    let toDoItem = form.querySelector('input').value.trim();

    if(toDoItem.length>0)
    {   
        if(!localStorage.getItem(toDoItem)){
            form.querySelector('input').value = '';
            event.preventDefault();
            addListItem(toDoItem);
           
            if(isMobile()){
                form.querySelector('input').blur();
            }
        }
        else{
            alert("item already exists");
        }
    }
}

form.querySelector('.add').addEventListener('click', handleItemEnter)

form.querySelector('input').addEventListener('keydown', (event)=>{
    if (event.key == 'Enter'){
        handleItemEnter(event);
    }
})

const toggleSelect = (event) => {
    event.preventDefault();
    
    let element = event.target.closest('li');
    console.dir(element.children[0]);

    const checkbox = element.children[0];

    if(!checkbox.checked){
        selectedCount++;
        checkbox.checked = true;
        console.log('element is checked!');
    }
    else{
        selectedCount--;
        checkbox.checked = false;
        console.log('element got unchecked!');
    }
    
    finished.style.display = selectedCount > 0 ? 'block' : 'none';

    element.classList.toggle('bg-gray-100');
    element.classList.toggle('bg-gray-200');
}

list.addEventListener('click', toggleSelect);
list.addEventListener('touchstart', (event)=>{
    event.preventDefault();
    toggleSelect(event);
})
list.addEventListener('touchend', (event) =>{
    let element = event.target.closest('li');
    console.dir(element.children[0]);

    element.classList.toggle('bg-gray-100');
    element.classList.toggle('bg-gray-200');
})

const clearItems = () => {

    let allitems = list.querySelectorAll('li');

    for(item of Array.from(allitems)){
        if(item.querySelector('input').checked){
            selectedCount--;
            item.remove();
            localStorage.removeItem(item.querySelector('input').value);
        }
    }
    finished.style.display = selectedCount > 0 ? 'block' : 'none';
}

finished.addEventListener('click', clearItems);
finished.addEventListener('touchstart', clearItems);