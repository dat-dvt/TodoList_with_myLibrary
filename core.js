export default function html([first, ...string], ...values) {
    return values.reduce(
        (acc, cur) => acc.concat(cur, string.shift()),
        [first]
    )
    .filter(x => x && x !== true || x === 0)
    .join('')
}


export function createStore (reducer) {
    // State chính là dữ liệu của store được return từ reducer
    let state = reducer();
    const roots = new Map();

    function render() {
        for (const [root, component] of roots) {
            const output = component();
            root.innerHTML = output;
        }
    }



    return {
        //Nhận view và đẩy qua root element
        attach(component, root) {
            roots.set(root, component);
            render();
        },

        // có nhiều view và dùng hàm selector để có thể chọn dữ liệu cụ thể trong store tương ứng với view đó,
        // trong hàm này nhận đối số là state(được trả về từ reducer) và trả về data mà ta muốn. 
        // Mặc định thì ta return toàn bộ data trong state
        connect (selector = state => state) {
            //props là những công cụ, dữ liệu ta muốn truyền vào sau này
            return component => (props, ...args) => 
            component(Object.assign({}, props, selector(state), ...args))
        },

        dispatch (action, ...args) {
            state = reducer(state, action, args)
            render();
        }
    }

}