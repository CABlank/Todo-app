import { addCardToState, renderBoard } from './cardManagement.js';
import { allowDrop, drag, drop } from './dragDrop.js';

// Attach functions to window for global access
window.allowDrop = allowDrop;
window.drag = drag;
window.drop = drop;
window.addCardToState = addCardToState;

// Handle the custom 'cardDropped' event
document.addEventListener('cardDropped', function(e) {
    const { cardId, columnId } = e.detail;
    // Assuming you have a function to update the card's column in cardManagement.js
    updateCardColumn(cardId, columnId);
});

// Initial rendering of the board
document.addEventListener('DOMContentLoaded', () => {
    renderBoard();
});


window.addNewCard = function() {
    const columnId = document.getElementById('columnSelector').value;
    addCardToState(columnId, 'New Task', 'This is a new dynamically added task.', '2024-01-20', 'High');
};
