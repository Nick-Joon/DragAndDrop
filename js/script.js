document.querySelectorAll(".column").forEach(Column.Process);

document
    .querySelector("[data-action-addColumn]")
    .addEventListener("click", function(event) {
        const columnElement = Column.Create();

        document.querySelector(".columns").append(columnElement);
    });

document.querySelectorAll(".note").forEach(Note.Process);
