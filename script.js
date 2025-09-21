// Select elements
const form = document.getElementById("frm");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const cityInput = document.getElementById("city");
const tableBody = document.getElementById("tbl-id");

let editIndex = null; // To track editing row

// Handle form submit
form.addEventListener("submit", function (e) {
e.preventDefault(); //web pages normally try to submit and reload;we stop that so we stay on the page.

  const name = nameInput.value.trim();
  const age = ageInput.value.trim();
  const city = cityInput.value.trim();


  // step1     If we are adding a new entry, Save will create a new row.
  //           if we editing an entry  Save will update the existing row with the new values

  if (name === "" || age === "" || city === "") {
    alert("Please fill all fields");
    return;
  }

  if (editIndex === null) {
    // Add new row
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
      <td></td>
      <td>${name}</td>
      <td>${age}</td>
      <td>${city}</td>
      <td><button class="btn-edit">E</button></td>
      <td><button class="btn-dlt">D</button></td>
    `;

    tableBody.appendChild(newRow);
  } else {
    // Update existing row
    const row = tableBody.rows[editIndex];
    row.cells[1].textContent = name;
    row.cells[2].textContent = age;
    row.cells[3].textContent = city;
    editIndex = null;
  }

  updateSerialNumbers();
  form.reset();
});




// Delegate Delete & Edit button events
//“When you press Delete, 
// it finds that row and throws it away, 
// then fixes the numbering.”

tableBody.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-dlt")) {
    e.target.closest("tr").remove();
    updateSerialNumbers();
  }

  //When you press Edit, it remembers 
  //which row you clicked and copies that row’s 
  //Name, Age, and City into the form boxes,
  //so you can change them and save


  if (e.target.classList.contains("btn-edit")) {
    const row = e.target.closest("tr");
    editIndex = row.rowIndex - 1; // adjust for tbody index
    nameInput.value = row.cells[1].textContent;
    ageInput.value = row.cells[2].textContent;
    cityInput.value = row.cells[3].textContent;
  }
});


// Update serial numbers
function updateSerialNumbers() {
  [...tableBody.rows].forEach((row, index) => {
    row.cells[0].textContent = index + 1;
  });
}








