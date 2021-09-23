import html from '../core.js'
import TodoItem from '../component/TodoItem.js'
import { connect } from '../store.js'


function TodoList( props ) {
    return html`
        <section class="main">
            <input id="toggle-all" class="toggle-all" type="checkbox" ${props.todos.every(props.filters.completed) && 'checked'} onchange="console.log(1)">
            <label onclick="dispatch('toggleAll', ${props.todos.every(props.filters.completed).toString()})" for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
                ${props.todos.filter(Object.values(props.filters)[props.currentView]).map((todo, index) => TodoItem(todo, index, props.currentTodo))}
            </ul>
        </section>
    `;
}

export default connect()(TodoList)