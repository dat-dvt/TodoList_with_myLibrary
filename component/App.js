import html from '../core.js'
import { connect } from '../store.js'

const connector = connect();
// Nghĩa là
// connector = function(component) {
//     function(props, ...args) {
//         component(Object.assign({}, props, selector(state), args))
//     }  
// }


//App() chính là component()
function App( {cars} ) {
    return html `
        <ul>
            ${cars.map(car => `<li>${car}</li>`)}
        </ul>

        <button onclick="dispatch('ADD', 'Ferrari')">Add car</button>
    `
}


// Hàm App return ra html để render ra view
// Nhưng ta chạy thông qua connector(App) thì không chỉ return ra html từ App()
// mà còn giúp đẩy state từ store vào component
export default connector(App)