const notesContainer = document.querySelector('.notes-container');
const createBtn = document.querySelector('.btn');
function showNotes() {
    notesContainer.innerHTML = localStorage.getItem('notes') || "";

    // Add delete icon to each note if missing
    let notes = document.querySelectorAll('.input-box');
    notes.forEach(note => {
        if (!note.querySelector('img')) {
            let img = document.createElement('img');
            img.src = 'images/delete.png';
            note.appendChild(img);
        }
    });
}

function updateStorage() {
    localStorage.setItem('notes', notesContainer.innerHTML);
}

createBtn.addEventListener('click', () => {
    let inputBox = document.createElement('p');
    let img = document.createElement('img');
    inputBox.className = 'input-box';
    inputBox.setAttribute('contenteditable', 'true');
    img.src = 'images/delete.png';
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);
    updateStorage();
});

notesContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.parentElement.remove();
        updateStorage();
    }
});

notesContainer.addEventListener('input', () => {
    updateStorage();
});

// Allow Enter key to insert line break instead of ending edit
document.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        document.execCommand('insertLineBreak');
        event.preventDefault();
    }
});

showNotes();
