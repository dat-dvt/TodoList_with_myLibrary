const TODOS_STORAGE_KEY = 'TODOS'

const init = {
    todos: JSON.parse(localStorage.getItem(TODOS_STORAGE_KEY)) || [],
    currentView: 0,
    currentTodo: null,
    filter: 'all',
    filters: {
        all(todo) {
            return todo
        },
        active(todo) {
            return !todo.completed
        },
        completed(todo) {
            return todo.completed
        }
    }, 
}

const actions = {
    add( { todos }, title ) {
        todos.push(
            {
                title,
                completed: false
            }
        )
        console.log(todos)
        this.set(todos)
    },

    toggle( {todos}, status, index ) {
        todos[index].completed = status
        this.set(todos)
    },

    toggleAll( {todos}, status ) {
        console.log(status)
        for(const todo of todos) {
            todo.completed = !status
        }
        this.set(todos)
    },

    selectorView( {todos}, index ) {
        init.currentView = index
    },

    destroy( {todos}, index ){
        todos.splice(index,1)
        this.set(todos)
    },

    startEdit( {todos}, index ) {
        init.currentTodo = index
    },

    endEdit( {todos}, value ) {
        todos[init.currentTodo].title = value
        init.currentTodo = null
        this.set(todos)
    },

    clearCompleted( {todos}) {
        init.todos = todos.filter(init.filters.active)
    },

    set(info) {
        localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(info))
    },
}


export default function reducer (state = init, action, args) {
    if(action) {
        actions[action](state, ...args)
    }
    return state
}