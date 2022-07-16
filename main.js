let savedCategory = [];
let links = []; 
let categories;
let urlEntries;
let category;

if($('body').data('title') === 'Save Category') { //run for index.html
    
    categories = document.getElementById('category-section');
    const myCategories = JSON.parse(localStorage.getItem('myCategories'));
    
    if(myCategories) {
        savedCategory = myCategories;
        savedCategory.forEach(element => {
            insertCategoryElement(element);
        });
    }
}
else {  //run for entry.html
    category = localStorage.getItem('currentCategory');
    urlEntries = document.getElementById('url-entries');
    if(category) {
        const obj = JSON.parse(localStorage.getItem(category));
        if(obj){
            links = obj; 
            links.forEach(element => {
                insertURL(element);
            });
        }
    }
}

function save(key, arr) { //save array in localStorage
    localStorage.setItem(key, JSON.stringify(arr));
}

function filterArray(arr, item) { //filter elements out of array
    return arr.filter(element => {
        if(element === item)
            return false;
        else
            return true;
    });
}

function setCurrentCategory(event) { //set category for entry.html to retrieve
    localStorage.setItem('currentCategory', event.target.parentNode.id);
}

function extractTextboxValue(textboxID) { //get text input value
    const textbox = document.getElementById(textboxID);
    const text = textbox.value;
    textbox.value = "";
    return text;
}

function insertCategoryElement(cat) { //insert categories into index.html
    categories.innerHTML += 
    `
    <div class='category' id=${cat}>
        <a id='category-element' href='entry.html' onclick='setCurrentCategory(event)'>${cat}</a>
        <img id='delete-btn' src='icons/delete.png' alt='Delete' onclick='removeCategory(event)'>
    </div>
    `;
}

function insertURL(url) { //insert URL into entry.html
    urlEntries.innerHTML += `
    <div class='url-entry' id=${url}>
        <a id='url' href='${url}'>${url}</a>
        <img id='delete-btn' src='icons/delete.png' alt='Delete' onclick='removeURL(event)'>
    </div>
    `;
}

function addCategory() { //event executed when pressing add category
    const cat = extractTextboxValue('category-textbox');
    insertCategoryElement(cat);
    savedCategory.push(cat);
    save('myCategories', savedCategory);
}

function removeCategory(event) { //event to remove category
    const cat = event.target.parentNode.id;
    savedCategory = filterArray(savedCategory, cat);
    if(savedCategory.length < 1) //clear localStorage if no categories
        localStorage.clear();
    else{
        save('myCategories', savedCategory);
        localStorage.removeItem(cat);
    }
    categories.removeChild(event.target.parentNode);
}


function addURL() { //event executed when pressing add url
    const url = extractTextboxValue('url-textbox');
    insertURL(url);
    links.push(url);
    save(category, links);
}

function removeURL(event) { //event to remove URL from entry.html
    links = filterArray(links, event.target.parentNode.id);
    urlEntries.removeChild(event.target.parentNode);
    save(category, links);
}

function deleteAll() { //delete all url entries, event when delete all is clicked
    urlEntries.innerHTML='';
    localStorage.removeItem(category);
}