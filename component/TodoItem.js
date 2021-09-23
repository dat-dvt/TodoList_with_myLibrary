import html from '../core.js'

function TodoItem( todo, index, currentTodo ) {
    return html`
        <li class="${todo.completed && 'completed'} ${index === currentTodo && 'editing'}">
            <div class="view">
                <input 
                    class="toggle"
                    type="checkbox"
                    ${todo.completed && 'checked'}
                    onchange="dispatch('toggle', this.checked, ${index})"
                >
                <label ondblclick="dispatch('startEdit', ${index})">${todo.title}</label>
                <button 
                    class="destroy"
                    onclick="dispatch('destroy', ${index})"
                >
                </button>
            </div>
            <input
                id="${index}"
                class="edit"
                value="${todo.title}"
                onkeyup="event.keyCode === 13 && dispatch('endEdit', this.value.trim())"
            >
        </li>
    `;
}

export default TodoItem