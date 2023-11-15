const programsContainer = document.querySelector("section");

//visar programemn när sidan laddas om eller öppnas
updateProgramList();

//programmen är objekt innhållande all information som sen lagras
function createProgramObject() {
    const title = document.querySelector("#title").value;
    const ageRestriction = document.querySelector("#ageRestriction").value;
    const description = document.querySelector("#description").value;
    
    const tvProgramObject = {
        title: title,
        ageRestriction: ageRestriction,
        description: description
    }
    
    return tvProgramObject;
}

//ersätter tidigare programlistan med nya listan i local storage
function updateProgramList() {
    //rensar tidigare childNodes sålänge det finns en childNode kvar
    while (programsContainer.firstChild) {
        programsContainer.removeChild(programsContainer.lastChild);
    }

    const savedData = getLocalStorage();

    //om det finns data i local storage så lägg till en section för varje object i listan
    if (savedData) {
        if (savedData.length > 0) {
            savedData.forEach(object => {
                appendProgramBox(object);
            });
        }
        else {
            appendProgramBox();
        }
    }
    else {
        appendProgramBox();
    }
}

//Skapar en "låda" som representerar programmet, som skapas i html dokumentet
//klickar man på lådan skapas en modal med programmets information
function appendProgramBox(object = {title: "Inga Program..."}) {
    const button = document.createElement("button");

    const title = object.title;
    const ageRestriction = object.ageRestriction;
    const description = object.description;

    const h2 = document.createElement("h2");
    const node = document.createTextNode(title);

    h2.appendChild(node);
    button.appendChild(h2);
    programsContainer.appendChild(button);

    button.addEventListener("click", () => {
        displayProgramDetails(title, ageRestriction, description);
    });
}

//skapar en modal med alla html element för att visa informationen
function displayProgramDetails(title, ageRestriction, description) {
    const modalBackground = document.createElement("div");
    const modal = document.createElement("div");
    modalBackground.className = "modalBackground";
    modal.className = "modal";

    const closeButtonElement = document.createElement("span");
    const titleElement = document.createElement("h1");
    const ageRestrictionElement = document.createElement("p");
    const descriptionElement = document.createElement("p");

    const titleNode = document.createTextNode(title);
    const ageRestrictionNode = document.createTextNode("Åldersgräns: " + ageRestriction);
    const descriptionNode= document.createTextNode("Beskrivning: " + description);

    closeButtonElement.innerHTML = "&times";
    modal.appendChild(closeButtonElement);
    titleElement.appendChild(titleNode);
    modal.appendChild(titleElement);
    ageRestrictionElement.appendChild(ageRestrictionNode);
    modal.appendChild(ageRestrictionElement);
    descriptionElement.appendChild(descriptionNode);
    modal.appendChild(descriptionElement);

    document.querySelector("body").appendChild(modalBackground);
    document.querySelector("body").appendChild(modal);

    //raderar modal om man klickar på bakomliggande modal som täcker hela fönstret
    window.onclick = (event) => {
        if (event.target == modalBackground || event.target == closeButtonElement) {
            document.querySelector("body").removeChild(modal);
            document.querySelector("body").removeChild(modalBackground);
        }
    }
}

//säkertställer att javascript inte tar datan från form innan allt är ifyllt
function isCorrectForm() {
    const title = document.querySelector("#title").value;
    const ageRestriction = document.querySelector("#ageRestriction").value;
    const description = document.querySelector("#description").value;

    if (title == "" || ageRestriction == "" || description == "") {
        return false;
    }

    return true;
}

//lägger till programmet till redan existerande data i local storage
//observera att all data ligger som JSON objekt i en nyckel "savedData"
function setLocalStorage(tvProgramObject) {
    const existingData = getLocalStorage();

    existingData.push(tvProgramObject);

    localStorage.setItem("savedData", JSON.stringify(existingData));
}

function getLocalStorage() {
    return JSON.parse(localStorage.getItem("savedData")) || [];
}

function clearLocalStorage() {
    localStorage.removeItem("savedData");
}

document.querySelector("#formSubmit").addEventListener("click", () => {
    if (isCorrectForm()) {
        const tvProgramObject = createProgramObject();
        setLocalStorage(tvProgramObject);
        updateProgramList();
    }
});

document.querySelector("#clearPrograms").addEventListener("click", () => {
    if (window.confirm("Vill du radera alla program?")) {
        clearLocalStorage();
        updateProgramList();
    }   
});