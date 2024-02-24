function allowDrop(ev) {
    ev.preventDefault(); // Prevent default behavior (Prevent it from being dropped)
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id); // Set the drag's data to the element's id
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data)); // Append the dragged element to the drop target
}


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var card = document.getElementById(data);
    ev.target.appendChild(card);
}

// Function to add a new card
function addCard(columnId, title, description, dueDate, priority) {
    const column = document.getElementById(columnId);
    
    // Create card element
    const card = document.createElement('div');
    card.className = 'card';
    card.draggable = true;
    card.id = 'card' + new Date().getTime(); // Unique ID for the card
    card.setAttribute('ondragstart', 'drag(event)');
    
    // Card content
    card.innerHTML = `
        <div class="card-content">
            <h3 class="card-title">${title}</h3>
            <p class="card-description">${description}</p>
            <p class="card-due-date">Due: ${dueDate}</p>
            <div class="card-priority">Priority: <span>${priority}</span></div>
            <div class="card-tags">
                <span class="tag">Category 1</span>
                <span class="tag">Category 2</span>
            </div>
        </div>
    `;
    
    // Append the new card to the column
    column.appendChild(card);
}
