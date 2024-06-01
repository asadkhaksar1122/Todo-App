console.log("enter");
let todo = [];
let toggle = document.getElementById("toggle");
let changeable = document.getElementsByClassName("changeable")[0];

toggle.addEventListener("change", function () {
  if (toggle.value === "don't show") {
    changeable.innerHTML = "please select the option above to show you task";
  } else if (toggle.value === "show" && todo.length != 0) {
    changeable.innerHTML = "";
    for (let i = 0; i < todo.length; i++) {
      changeable.innerHTML += `
                <div class="card">
                    <div class="card-body">
                        ${todo[i]}
                    </div>
                </div>
            `;
    }
  } else if (toggle.value === "add" && changeable.innerHTML != "") {
    changeable.innerHTML = `<div class="mb-3">
    <label for="addinput" class="form-label">Enter the task</label>
    <input type="text" class="form-control" id="addinput" placeholder="Enter the task" required>
    <div class="invalid-feedback">
        Please enter the task.
    </div>
</div>
<div class="d-grid gap-2 col-6 mx-auto">
    <button class="btn btn-outline-dark" type="button" id="addbtn" onclick="add()">Add</button>
</div>
        `;
  } else if (toggle.value === "delete") {
    // Clear the changeable element without adding new content
    changeable.innerHTML = "";
    for (let i = 0; i < todo.length; i++) {
      changeable.innerHTML += `
        <div class="card">
          <div class="card-body">
          <strong>  ${i + 1}:</strong>
                ${todo[i]}
          </div>
        </div>

        `;
    }
    changeable.innerHTML += `<div class="mb-3">
  <form class="row g-3 needs-validation" novalidate>
    <strong>
      <label for="deleteinput" class="form-label">Enter the number of task you want to delete</label>
    </strong>
    <input type="number" class="form-control" id="deleteinput" placeholder="Enter the number of task you want to delete" min="1" max="${todo.length}" required>
    <div class="invalid-feedback">
      Please choose a valid number between 1 and ${todo.length}.
    </div>
  </div>

  <div class="d-grid gap-2 col-6 mx-auto">
    <button class="btn btn-primary" type="button" id="deletebtn" onclick="deletetask()">Delete Now</button>
  </div>
</form>`;
  } else if (todo.length == 0) {
    changeable.innerHTML = `
      <div class="card">
  <div class="card-header">
Note This
  </div>
  <div class="card-body">
    <h5 class="card-title">Nothing Here </h5>
    <p class="card-text">There is no task here to show you please enter the to show you</p>
   
  </div>
</div>
      `;
  }
});

function add() {
  // Get elements
  const addBtn = document.getElementById("addbtn");
  const addInput = document.getElementById("addinput");
  const alert = document.getElementById("alert");

  // Get input value and parse it to integer
  let inputValue = addInput.value;

  // Check if input is valid
  if (inputValue.length > 1 && !todo.includes(inputValue)) {
    // Add task to the beginning of the todo array
    todo.unshift(inputValue);
    addInput.value = "";

    // Display success alert
    alert.innerHTML = `
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Task Added!</strong> The task has been added and you can now check it in the list of tasks.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
    setTimeout(() => {
      alert.innerHTML = "";
    }, 2000);
  } else {
    // Display error alert when task already exists
    alert.innerHTML = `
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Task Already Exists!</strong> The task you're trying to add already exists in the list.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
    setTimeout(() => {
      alert.innerHTML = "";
    }, 2000);
  }
}
function deletetask() {

  let deleteinput = document.getElementById("deleteinput").value;
  if (deleteinput <= todo.length) {
    let alert = document.getElementById("alert");
    convertinput = Number.parseInt(deleteinput);
    todo.splice(convertinput - 1, 1);
    toggle.value = "show";
    toggle.dispatchEvent(new Event("change"));
    alert.innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
  <strong>Deleted Now!</strong> The task has been deleted
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
    `;
    setTimeout(function () {
      alert.innerHTML = "";
    }, 3000);
  } if (deleteinput > todo.length) {
    const form = document.querySelector("form.needs-validation");
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
    }
  }

}
// bootstrap javascript
// Example starter JavaScript for disabling form submissions if there are invalid fields
