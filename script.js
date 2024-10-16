const form = document.querySelector('.form');
const list = document.querySelector('.to-do-list');
const finished = document.querySelector('.finished');
const pookieContainer = document.querySelector('.pookie-container');

let selectedCount = 0;

const isMobile = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
};

const addListItem = (toDoItem) =>{

    const listItem = document.createElement('li');
    listItem.classList = "flex items-center p-4 bg-gray-100 rounded-md shadow-md hover:bg-gray-200 transition-colors";
    
    const checkBox = document.createElement('input');
    checkBox.id = toDoItem;
    checkBox.type = 'checkbox';
    checkBox.name = 'item';
    checkBox.value = toDoItem;
    checkBox.classList = "w-4 h-4 mr-2";

    const label = document.createElement('label');
    label.textContent = toDoItem;
    label.setAttribute('for', checkBox.id)
    label.classList = "ml-2 text-lg font-medium text-gray-700 ";

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
    
    // console.log('deleting pookie...');
    
    while(pookieContainer.hasChildNodes()){
        pookieContainer.removeChild(pookieContainer.firstChild);
    }

    const toDoItem = form.querySelector('input').value.trim();

    if(toDoItem.length>0)
    {   
        if(!localStorage.getItem(toDoItem)){
            form.querySelector('input').value = '';
            event.preventDefault();
            addListItem(toDoItem);
           
            // closes keyboard on phones
            // if(isMobile()){
            //     form.querySelector('input').blur();
            // }
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
    
    const element = event.target.closest('li');

    // between list items
    if(!element) return;
    
    const checkbox = element.querySelector('input');

    if(!checkbox.checked){
        selectedCount++;
        checkbox.checked = true;
        // console.log('element is checked!');
    }
    else if(checkbox.checked){
        if(selectedCount>0)
            selectedCount--;
        checkbox.checked = false;
        // console.log('element got unchecked!');
    }
    
    finished.style.display = selectedCount > 0 ? 'block' : 'none';

    element.classList.toggle('bg-gray-100');
    element.classList.toggle('bg-gray-200');
}

list.addEventListener('click', toggleSelect);
list.addEventListener('touchstart', toggleSelect);

list.addEventListener('touchend', (event) =>{
    const element = event.target.closest('li');

    element.classList.toggle('bg-gray-100');
    element.classList.toggle('bg-gray-200');
})

const addPookie = (pookieContainer) => {
    // console.log('creating pookie...');
    const l1 = document.createElement('div');
    l1.textContent = ' /)_/)';
    const l2 = document.createElement('div');
    l2.textContent = '{   . .}';
    l2.classList.add('text-2xl');
    const l3 = document.createElement('div');
    l3.textContent = "/>💗 4U";
    const l4 = document.createElement('div');
    l4.textContent = "for completing your tasks!";
    l4.classList.add('font-normal')

    const pookie = document.createElement('div');
    pookie.appendChild(l1);
    pookie.appendChild(l2);
    pookie.appendChild(l3);
    pookie.classList = "flex flex-col justify-start text-xl font-bold";
    pookieContainer.appendChild(pookie);
    pookieContainer.appendChild(l4);
}

const clearItems = (event) => {

    event.preventDefault();

    const allitems = list.querySelectorAll('li');

    for(item of Array.from(allitems)){
        if(item.querySelector('input').checked){
            selectedCount--;
            item.remove();
            localStorage.removeItem(item.querySelector('input').value);
            if(localStorage.length === 0){
                addPookie(pookieContainer);
            }
        }
    }
    finished.style.display = selectedCount > 0 ? 'block' : 'none';
}

finished.addEventListener('click', clearItems);
finished.addEventListener('touchstart', clearItems);