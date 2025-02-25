function loadNotepad() {
    // Display current date
    const dateElement = document.getElementById("date");
    const today = new Date();
    dateElement.innerText = today.toDateString();

    // Load saved note
    const savedNote = localStorage.getItem("userNote");
    if (savedNote) {
        document.getElementById("note").value = savedNote;
    }

    // Check dark mode setting
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }
}

function saveNote() {
    const noteContent = document.getElementById("note").value;
    localStorage.setItem("userNote", noteContent);
    alert("Note saved!");
}

function clearNote() {
    document.getElementById("note").value = "";
    localStorage.removeItem("userNote");
    alert("Note cleared!");
}

function exportNote() {
    const noteContent = document.getElementById("note").value;
    const blob = new Blob([noteContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "MyNote.txt";
    link.click();
}

function exportPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const noteContent = document.getElementById("note").value;

    doc.text(noteContent, 10, 10);
    doc.save("MyNote.pdf");
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    // Save user preference
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
}
