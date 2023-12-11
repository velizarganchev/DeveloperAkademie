let notes = [];

function render(page) {

    displayNots(page);
}


function saveNote() {
    let titleInput = document.getElementById('title').value;
    let noteInput = document.getElementById('note').value;

    if (titleInput.length > 0 && noteInput.length > 0) {

        notes.push({ title: titleInput, text: noteInput, delete: 0 })
        clearFields();

        saveInLocalStorage();
        displayNots('index');
    }
}


function clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('note').value = '';
}


function saveInLocalStorage() {

    let notesAsText = JSON.stringify(notes);

    localStorage.setItem('notes', notesAsText);
}


function deleteNote(index) {
    let currNote = notes[index];

    currNote.delete = 1;

    saveInLocalStorage();
    displayNots('index');
}


function deleteNoteForever(index) {

    notes.splice(index, 1);

    saveInLocalStorage();

    displayNots('trash');
}


function undoNote(index) {
    let currNote = notes[index];

    currNote.delete = 0;

    saveInLocalStorage();
    displayNots('trash');
}


function loadNotes() {
    let notesAsText = localStorage.getItem('notes');
    if (notesAsText) {
        notes = JSON.parse(notesAsText);
    }
}


function generateHtml(note, index) {

    let noteElement = document.createElement('div');
    noteElement.classList.add('note');

    let title = note.title.toString();
    let content = note.text.toString();

    noteElement.innerHTML += /*html*/ `<h4>${title}</h4><div class="note-content-container"><div class="note-content">${content}</div></div><div class="button-container"><button class="deleteButton" onclick="${note.delete === 0 ? `deleteNote(${index})` : `deleteNoteForever(${index})`}"><i class="fas fa-minus-circle"></i></button>${note.delete === 1 ? `<button class="undoButton" onclick="undoNote(${index})"><i class="fas fa-undo"></i></button>` : ''}</div>`;

    return noteElement;
}


function displayNots(page) {

    let notesDiv = document.getElementById('notes');
    notesDiv.innerHTML = '';

    loadNotes();

    if (notes.length > 0) {

        for (let i = 0; i < notes.length; i++) {
            let note = notes[i];

            if (page === 'index' && note.delete === 0) {

                notesDiv.appendChild(generateHtml(note, i));
            }
            if (page === 'trash' && note.delete === 1) {

                notesDiv.appendChild(generateHtml(note, i));
            }
        }
    }
}