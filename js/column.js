const Column = {
    columnIdCounter: 3,
    draggedColumn: null,

    Process(columnElement) {
        const addNoteAction = columnElement.querySelector(
            "[data-action-addNote]"
        );

        addNoteAction.addEventListener("click", function(event) {
            const noteElement = Note.Create();

            columnElement.querySelector("[data-notes]").append(noteElement);

            noteElement.setAttribute("contenteditable", true);
            noteElement.focus();
        });

        const headerElement = columnElement.querySelector(".column-header");

        headerElement.addEventListener("dblclick", function(event) {
            headerElement.setAttribute("contenteditable", true);
            headerElement.focus();
        });

        headerElement.addEventListener("blur", function(event) {
            headerElement.removeAttribute("contenteditable", true);
        });

        columnElement.addEventListener("dragover", Column.Dragover);

        columnElement.addEventListener("drop", Column.Drop);
    },

    Create() {
        const columnElement = document.createElement("div");

        columnElement.classList.add("column");
        columnElement.setAttribute("data-column-id", Column.columnIdCounter++);

        columnElement.innerHTML = `<p class="column-header">New column</p>
            <div data-notes></div>
                <p class="column-footer">
                <span data-action-addNote class="action">+ Add another card</span>
            </p>`;
        Column.Process(columnElement);
        return columnElement;
    },

    Dragover(event) {
        event.preventDefault();
    },

    Drop() {
        if (Note.draggedNote) {
            return columnElement
                .querySelector("[data-notes]")
                .append(Note.draggedNote);
        }
    }
};
