export function allowDrop(ev) {
    ev.preventDefault();
}

export function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

export function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const droppedOn = ev.target.closest('.column'); // Get the column element it was dropped on
    
    // Emit a custom event with details about the drop
    const dropEvent = new CustomEvent('cardDropped', {
        detail: {
            cardId: data,
            columnId: droppedOn.id
        }
    });
    document.dispatchEvent(dropEvent); // Dispatch it on the document
}
