const Note = {
    noteIdCounter: 3,
    draggedNote: null,

    Process(noteElement) {
        noteElement.addEventListener("dblclick", function(event) {
            noteElement.setAttribute("contenteditable", true);
            noteElement.removeAttribute("draggable");
            noteElement.closest(".column").removeAttribute("draggable");
            noteElement.focus();
        });

        noteElement.addEventListener("blur", function(event) {
            noteElement.removeAttribute("contenteditable", true);
            noteElement.setAttribute("draggable", true);
            noteElement.closest(".column").setAttribute("draggable", true);

            if (!noteElement.textContent.trim().length) {
                noteElement.remove();
            }
        });

        noteElement.addEventListener("dragstart", Note.Dragstart);
        noteElement.addEventListener("dragend", Note.Dragend);
        noteElement.addEventListener("dragenter", Note.Dragenter);
        noteElement.addEventListener("dragover", Note.Dragover);
        noteElement.addEventListener("dragleave", Note.Dragleave);
        noteElement.addEventListener("drop", Note.Drop);
    },

    Create() {
        const noteElement = document.createElement("div");

        noteElement.classList.add("note");
        noteElement.setAttribute("data-note-id", Note.noteIdCounter++);

        Note.Process(noteElement);
        return noteElement;
    },

    Dragstart(event) {
        Note.draggedNote = this;
        this.classList.add("dragged");

        event.stopPropagation();
    },

    Dragend(event) {
        Note.draggedNote = null;
        this.classList.remove("dragged");

        document
            .querySelectorAll(".note")
            .forEach(note => note.classList.remove("under"));
    },

    Dragenter(event) {
        if (this === Note.draggedNote) {
            return;
        }
        this.classList.add("under");
    },

    Dragover(event) {
        event.preventDefault();

        if (this.parentElement === Note.draggedNote.parentElement) {
            const note = Array.from(
                this.parentElement.querySelectorAll(".note")
            );
            const index1 = note.indexOf(this);
            const index2 = note.indexOf(Note.draggedNote);

            if (index1 < index2) {
                this.parentElement.insertBefore(Note.draggedNote, this);
            } else {
                this.parentElement.insertBefore(this, Note.draggedNote);
            }
        } else {
            this.parentElement.insertBefore(Note.draggedNote, this);
        }
    },

    Dragleave(event) {
        if (this === Note.draggedNote) {
            return;
        }
        this.classList.remove("under");
    },

    Drop(event) {
        event.stopPropagation();
        if (this === Note.draggedNote) {
            return;
        }
    }
};
