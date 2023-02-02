const addNoteForm = document.getElementById("addNoteForm");
const notesTable = document.getElementById("notesTable");
const notesTableBody = document.getElementById("notesTableBody");

let notes = [];

// Load notes from local storage
const loadNotes = () => {
  const storedNotes = localStorage.getItem("notes");
  if (storedNotes) {
    notes = JSON.parse(storedNotes);
  }
};

// Save notes to local storage
const saveNotes = () => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

// Render notes in the table
const renderNotes = () => {
  notesTableBody.innerHTML = "";

  notes.forEach(note => {
    const tr = document.createElement("tr");
    tr.style.backgroundColor = note.color;

    tr.innerHTML = `
      <td>${note.title}</td>
      <td>${note.description}</td>
      <td>${note.color}</td>
      <td>${note.date}</td>
      <td>
        <button class="editBtn" data-index="${note.index}">Edit</button>
        <button class="deleteBtn" data-index="${note.index}">Delete</button>
      </td>
    `;

    notesTableBody.appendChild(tr);
  });
};

loadNotes();
renderNotes();

// Add a note
addNoteForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const title = addNoteForm.title.value;
  const description = addNoteForm.description.value;
  const color = addNoteForm.color.value;
  const date = new Date().toLocaleString();

  notes.push({
    title,
    description,
    color,
    date,
    index: notes.length
  });

  saveNotes();
  renderNotes();
  // Reset the form
  addNoteForm.title.value = "";
  addNoteForm.description.value = "";
  addNoteForm.color.value = "#ffffff";
});

// Edit a note
notesTableBody.addEventListener("click", function(event) {
  if (!event.target.classList.contains("editBtn")) return;

  const index = parseInt(event.target.dataset.index);
  const note = notes[index];

  if (!note) {
    console.error("Note not found.");
    return;
  }

  addNoteForm.title.value = note.title;
  addNoteForm.description.value = note.description || "";
  addNoteForm.color.value = note.color;
  
  addNoteForm.addEventListener("submit", function(event) {
    event.preventDefault();

    notes[index] = {
      title: addNoteForm.title.value,
      description: addNoteForm.description.value,
      color: addNoteForm.color.value,
      index: note.index,
      createdAt: note.createdAt
    };

    saveNotes();
    renderNotes();

    addNoteForm.removeEventListener("submit", this);
  });
});

// Delete a note
notesTableBody.addEventListener("click", function(event) {
  if (!event.target.classList.contains("deleteBtn")) return;

  const index = parseInt(event.target.dataset.index);
  notes = notes.filter(note => note.index !== index);

  saveNotes();
  renderNotes();
});