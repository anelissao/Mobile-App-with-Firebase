import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://movie-list-e27d5-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const moviesListInDB = ref(database, "movieslist")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const moviesListEl = document.getElementById("movies-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(moviesListInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(moviesListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearmoviesListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemTomoviesListEl(currentItem)
        }    
    } else {
        moviesListEl.innerHTML = "No items here... yet"
    }
})

function clearmoviesListEl() {
    moviesListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemTomoviesListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `movieslist/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    moviesListEl.append(newEl)
}