// Initial state
let state = {
    cards: [{
        id: 'cardInitial',
        columnId: 'todoColumn',
        title: 'Initial Task',
        description: 'This is an initial task.',
        dueDate: '2024-01-20',
        priority: 'High'
    }]
};



function renderBoard() {
    const board = document.getElementById('board');
    board.innerHTML = ''; // Clear the board before re-rendering

    // Assuming you have three columns: To Do, In Progress, Done
    const columns = ['todoColumn', 'inProgressColumn', 'doneColumn'];

    columns.forEach(columnId => {
        const columnEl = document.createElement('div');
        columnEl.id = columnId;
        columnEl.className = 'column';
        columnEl.setAttribute('ondrop', 'drop(event)');
        columnEl.setAttribute('ondragover', 'allowDrop(event)');

        const columnHeader = document.createElement('div');
        columnHeader.className = 'column-header';
        columnHeader.textContent = columnId.replace('Column', ''); // Simple text based on ID
        columnEl.appendChild(columnHeader);

        // Filter cards for this column and append them
        const columnCards = state.cards.filter(card => card.columnId === columnId);
        columnCards.forEach(card => {
            const cardEl = document.createElement('div');
            cardEl.className = 'card';
            cardEl.draggable = true;
            cardEl.id = card.id;
            cardEl.setAttribute('ondragstart', 'drag(event)');
            cardEl.innerHTML = `
                <div class="card-content">
                    <h3 class="card-title" contenteditable="true">${card.title}</h3>
                    <p class="card-description" contenteditable="true">${card.description}</p>
                    <p class="card-due-date">Due: ${card.dueDate}</p>
                    <div class="card-priority">Priority: <span>${card.priority}</span></div>
                    <!-- Add tags and other card details here -->
                </div>
            `;
            columnEl.appendChild(cardEl);
        });

        board.appendChild(columnEl);
    });
}

function updateCardColumn(cardId, columnId) {
    const cardIndex = state.cards.findIndex(card => card.id === cardId);
    if (cardIndex !== -1) {
        state.cards[cardIndex].columnId = columnId;
        renderBoard(); // Re-render the board to reflect the new state
    }
}


function addCardToState(columnId, title, description, dueDate, priority) {
    const newCard = {
        id: `card${new Date().getTime()}`, // Unique ID for the card
        columnId,
        title,
        description,
        dueDate,
        priority
    };
    state.cards.push(newCard);
    renderBoard();
}


export { renderBoard, addCardToState, updateCardColumn };