let game = {
    rows: 0,
    cols: 0,
    title: "",
    topics: [],
    questions: []
};

const titleInput = document.getElementById("titleInput");
const btnBoard = document.getElementById("boardGenerator");
const mainTable = document.querySelector("table");
const btnSave = document.getElementById("btnSave");
const btnJson = document.getElementById("jsonGenerator");

titleInput.addEventListener("keyup", toggleGenerateButton);
btnBoard.addEventListener("click", generateGameBoard);
mainTable.addEventListener("click", requestData);
btnSave.addEventListener("click", saveData);
btnJson.addEventListener("click", generateJson);

function toggleGenerateButton() {
    if (titleInput.value.trim() !== "") {
        btnBoard.classList.remove("disabled");
    } else {
        btnBoard.classList.add("disabled");
    }
}

function resetGame() {
    game = {
        rows: 0,
        cols: 0,
        title: "",
        topics: [],
        questions: []
    };
}

function generateGameBoard(event) {
    event.preventDefault();
    resetGame();

    // Guardar valores de título, filas y columnas
    game.title = titleInput.value.trim();
    game.rows = parseInt(document.getElementById("rowsInput").value);
    game.cols = parseInt(document.getElementById("colsInput").value);

    // Mostrar la tabla y ocultar filas y columnas no necesarias
    mainTable.removeAttribute("hidden");
    hideExtraRowsAndColumns();

    // Activar botón de generar JSON
    btnJson.classList.remove("disabled");

    return false;
}

// Función para ocultar filas y columnas no necesarias en la tabla
function hideExtraRowsAndColumns() {
    const rowsToShow = Math.min(game.rows, 4);
    const colsToShow = Math.min(game.cols, 4);

    // Mostrar todas las filas y columnas
    mainTable.querySelectorAll("tr, th, td").forEach(element => {
        element.style.display = "";
    });

    // Ocultar filas adicionales
    mainTable.querySelectorAll(`tr:nth-child(n+${rowsToShow + 1})`).forEach(row => {
        row.style.display = "none";
    });

    // Ocultar columnas adicionales
    mainTable.querySelectorAll(`th:nth-child(n+${colsToShow + 2}), td:nth-child(n+${colsToShow + 2})`).forEach(cell => {
        cell.style.display = "none";
    });
}

function requestData(event) {
    if (event.target.tagName === "A") {
        const cellElement = event.target.parentElement;
        const rowIndex = cellElement.parentElement.rowIndex;
        const colIndex = cellElement.cellIndex;

        // Actualizar celda actual
        cell = mainTable.rows[rowIndex].cells[colIndex];

        // Mostrar modal según el tipo de celda (tema o pregunta)
        if (cell.tagName === "TH") {
            // Mostrar modal solo con la parte de registro de tema
            document.querySelector(".question").style.display = "none";
            document.querySelector(".json").style.display = "none";
            document.querySelector(".theme").style.display = "block";

            // Obtener y mostrar el texto del tema en el modal
            const topicText = cell.textContent;
            document.querySelector(".theme input").value = topicText;
        } else if (cell.tagName === "TD") {
            // Mostrar modal con la parte de pregunta y completar la información de tema y valor
            document.querySelector(".question").style.display = "block";
            document.querySelector(".json").style.display = "none";
            document.querySelector(".theme").style.display = "none";
            const modalTopicElement = document.getElementById("modalTopic");
            if (modalTopicElement) {
                const thElement = cellElement.parentElement.querySelector("th");
                if (thElement) {
                    modalTopicElement.textContent = thElement.textContent;
                }
            }
            document.getElementById("modalTopic").textContent = mainTable.rows[0].cells[colIndex].textContent;
            document.getElementById("modalScore").textContent = mainTable.rows[rowIndex].cells[0].textContent;

            // Obtener texto de la pregunta
            const questionText = cell.querySelector("a").textContent;

            // Mostrar solo la pregunta correspondiente en el modal
            document.querySelector(".question textarea").value = questionText;
        }
    }
}

// Función para guardar los datos ingresados en el modal
function saveData() {
    // Obtener el tema del modal
    const modalTopicElement = document.getElementById("modalTopic");
    const topic = modalTopicElement ? modalTopicElement.textContent.trim() : "";

    if (cell.tagName === "TH") {
        const newTopic = document.querySelector(".theme input").value.trim();
        if (newTopic !== "") {
            const rowIndex = cell.parentElement.rowIndex;
            const colIndex = cell.cellIndex;
            const columnHeaderCell = mainTable.rows[0].cells[colIndex];

            cell.textContent = newTopic;
            columnHeaderCell.textContent = newTopic;

            const oldTopic = columnHeaderCell.textContent;
            const topicIndex = game.topics.indexOf(oldTopic);
            if (topicIndex !== -1) {
                game.topics[topicIndex] = newTopic;
            } else {
                game.topics.push(newTopic);
            }

            document.querySelector(".theme input").value = "";
            $('#modalBoard').modal('hide');
        }
    } else if (cell.tagName === "TD") {
        const inputValue = document.querySelector(".question textarea").value.trim();
        const rowIndex = cell.parentElement.rowIndex - 1; // Restamos 1 para ajustar el índice de la fila
        const colIndex = cell.cellIndex - 1; // Restamos 1 para ajustar el índice de la columna

        if (inputValue !== "") {
            const question = { text: inputValue };
            while (game.questions.length <= rowIndex) {
                game.questions.push([]);
            }
            if (!game.questions[rowIndex]) {
                game.questions[rowIndex] = [];
            }
            game.questions[rowIndex][colIndex] = inputValue;

            // Verificar si el tema ya está presente en el arreglo topics
            if (!game.topics.includes(topic)) {
                game.topics.push(topic);
            }

            cell.style.backgroundColor = "#333";

            document.querySelector(".question textarea").value = "";
            $('#modalBoard').modal('hide');
        }
    }
}

function generateJson() {
    document.querySelector(".json").style.display = "block";

    const gameCopy = {
        rows: game.rows,
        cols: game.cols,
        title: game.title,
        topics: game.topics,
        questions: []
    };

    for (let i = 0; i < game.rows; i++) {
        const row = [];
        for (let j = 0; j < game.cols; j++) {
            if (game.questions[i] && game.questions[i][j]) {
                row.push(game.questions[i][j]);
            } else {
                row.push("");
            }
        }
        gameCopy.questions.push(row);
    }

    document.getElementById("textJson").value = JSON.stringify(gameCopy);
    // document.getElementById("textJson").value = JSON.stringify(gameCopy, null, 2);

    return false;
}