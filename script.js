import { attach } from './store.js'
import App from './component/App.js'
// App ở đây chính là connector(App) trong App.js
attach(App, document.getElementById('root'))

