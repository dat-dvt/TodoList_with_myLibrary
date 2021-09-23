import html from '../core.js'
import { connect } from '../store.js'


function Footer( props ) {
    return html`
        <footer class="footer">
            <span class="todo-count"><strong></strong> ${props.todos.filter(props.filters.active).length} item left</span>
            <ul class="filters">
                ${Object.keys(props.filters).map((selector, index) => `
                    <li>
                        <a 
                            class="${index === props.currentView && 'selected'}"
                            onclick="dispatch('selectorView', ${index})"
                        >
                            ${selector[0].toUpperCase() + selector.slice(1)}
                        </a>
                    <li>
                `)}
            </ul>
            <button onclick="dispatch('clearCompleted')" class="clear-completed">${props.todos.length > 0 && 'Clear completed'}</button>
            </footer>
            `;
}

export default connect()(Footer)