//gör sökningen mindre finkänslig med lowercase och utan mellanslag
function getFormattedSearch() {
    let searchTerm = document.querySelector("#searchInput").value;
    searchTerm = searchTerm.toLowerCase();
    searchTerm = searchTerm.trim();
    return searchTerm;
}

//jämför alla objekt i local storage om titeln matchar sökningen
//returnerar endast det första objektet som hittas, annars null
function lookForProgram() {
    const existingData = JSON.parse(localStorage.getItem("savedData"));
    const searchTerm = getFormattedSearch();

    //om existingData inte är tom och falsy
    if (existingData) {
        for (const object of existingData) {
            if (searchTerm == object.title.toLowerCase()) {
                return object;
            }
        }
    }

    return null;
}

//vid lyckad sökningen  öppnas functionen som visar programmets info
//resettar sökrutan
document.querySelector("#searchButton").addEventListener("click", (event) => {
    event.preventDefault(); //hindrar sidan från att laddas om vid submit
    const programSearchObject = lookForProgram();

    if (!programSearchObject) alert("Programmet gick inte att hitta");
    else displayProgramDetails(programSearchObject.title, programSearchObject.ageRestriction, programSearchObject.description);

    document.querySelector("#searchInput").value = "";
});