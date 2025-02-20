// Opretter et array med opgaver
const toDoArray = [];

// Finder HTML-elementerne til at vise opgavelister
const toDoListQsl = document.querySelector("#taskList");
const doneListQsl = document.querySelector("#doneList");

// Funktion til at filtrere og sortere opgaverne
function filterAndSort() {
  let listToShow = toDoArray; // Brug toDoArray som standard
  showToDo(listToShow); // Vis opgaverne
}

// Funktion til at vise opgaverne i HTML
function showToDo(listToShow) {
  toDoListQsl.innerHTML = ""; // Tøm ul-elementet for at kunne tilføje nye elementer
  doneListQsl.innerHTML = ""; // Tøm ul-elementet for færdige opgaver

  listToShow.forEach((task) => {
    const li = document.createElement("li"); // Opretter et li-element for hver opgave
    li.innerHTML = `<h2>${task.text}</h2>
<h3>Antal: ${task.quantity}</h3>
<input type="checkbox" class="toggle_done" ${task.done ? "checked" : ""}> Done
<input type="button" class="delete_item"> Delete`;

    // Tilføjer en CSS-klasse afhængig af om opgaven er færdig eller ej
    li.classList.add(task.done ? "colorDone" : "colorToDo");

    // Tilføjer en klik-hændelse for at ændre opgavens status
    li.addEventListener("click", (evt) => {
      const target = evt.target;

      // Hvis der klikkes på "toggle_done"-elementet, ændres opgavens status
      if (target.classList.contains("toggle_done")) {
        task.done = !task.done;
        console.log("toDoArray", toDoArray);
        filterAndSort(); // Opdaterer visningen
      }

      if (evt.target.classList.contains("delete_item")) {
        const indexOfToDelete = toDoArray.findIndex((elm) => elm.id === task.id);
        const liToRemove = evt.target.closest("li");

        liToRemove.classList.add("fade-out");

        setTimeout(() => {
          toDoArray.splice(indexOfToDelete, 1);
          filterAndSort();
        }, 500);
      }
    });

    // Tilføjer opgaven til den rigtige liste afhængig af om den er færdig eller ej
    if (task.done) {
      doneListQsl.appendChild(li);
    } else {
      toDoListQsl.appendChild(li);
    }
  });
}

// Tilføjer en "hændelse", når der klikkes på "add-task"-knappen
document.querySelector("#add-task").addEventListener("click", () => {
  console.log("Antal", document.querySelector("#quantity").value);
  const taskText = document.querySelector("#new-task").value; // Henter den nye opgave-tekst
  const newTask = {
    id: self.crypto.randomUUID(), // Genererer et unikt ID til den nye opgave
    text: taskText, // Sætter den nye opgave-tekst
    quantity: document.querySelector("#quantity").value, // Sætter opgave nummeret
    done: false, // Den nye opgave er ikke færdig
    active: true, // Den nye opgave er aktiv
  };
  toDoArray.push(newTask); // Tilføjer den nye opgave til arrayet
  console.log(toDoArray);
  filterAndSort(); // Opdaterer visningen
});

// Filtrer og sorter opgaverne ved initial indlæsning
filterAndSort();
