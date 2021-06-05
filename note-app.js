"use strict";

const modal = document.querySelector(".modal");
const noteForm = document.querySelector(".note-form");
const noteTable = document.querySelector(".note-table");
const cancel = document.querySelector(".cancel-btn");

let noteDeleteButtons;
let noteList = JSON.parse(localStorage.getItem("notes")) || [];

noteForm.addEventListener("submit", (e) => {
  addNote(e);
});

function addNote(e) {
  e.preventDefault();

  let newNote = {};

  let title = document.querySelector(".title");
  let note = document.querySelector(".note");

  if (title.value == "" || note.value == "") {
    return alert("Enter the fields");
  } else {
    newNote.title = title.value;
    newNote.note = note.value;
  }
  title.value = "";
  note.value = "";

  noteList.push(newNote);
  appendNotes();
  cancel.click();
}

//create table

function appendNotes() {
  noteTable.innerHTML = ` <table class="note-table">
  <tr>
    <td class="header header-title">Title</td>
    <td class="header header-note">Note</td>
  </tr>`;

  noteList.map((note) => {
    let tr = document.createElement("tr");
    tr.classList = "noteItem";
    let tdTitle = document.createElement("td");
    tdTitle.innerText = note.title;
    tdTitle.classList.add("header-title");
    let tdNote = document.createElement("td");
    tdNote.innerText = note.note;
    tdNote.classList.add("header-note");
    let tdDelete = document.createElement("td");
    tdDelete.innerHTML = "&times";
    tdDelete.classList.add("delete-item");

    //Add to table
    tr.appendChild(tdTitle);
    tr.appendChild(tdNote);
    tr.appendChild(tdDelete);

    noteTable.appendChild(tr);
    getDeleteButtons();
    localStorage.setItem("notes", JSON.stringify(noteList));
  });
}
function getDeleteButtons() {
  noteDeleteButtons = Array.from(document.querySelectorAll(".delete-item"));

  noteDeleteButtons.forEach((button) => {
    const noteTitle = button.previousSibling.previousSibling.innerText;
    button.addEventListener("click", () => {
      deleteNote(noteTitle);
    });
  });
}
function deleteNote(noteTitle) {
  for (let i = 0; i < noteList.length; i++) {
    if (noteList[i].title == noteTitle) {
      noteList.splice(i, 1);
    }
  }
  localStorage.setItem("notes", JSON.stringify(noteList));
  appendNotes();
}

appendNotes();
