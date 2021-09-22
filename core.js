//Tạo template engine để viết phần view
export default function html([first, ...strings], ...values) {
    return values.reduce(
        (acc, cur) => acc.concat(cur, strings.shift())
        , [first]
    )
    .filter(x => x && x !== true || x === 0)
    .join('')
}


export function  createStore (reducer) {
    let state = reducer()
    const roots = new Map()
    
    function render() {
        // roots sẽ có dạng của Map(): { [key, value] }
        for(const [root, component] of roots) {
            //component là function sẽ return ra chuỗi HTML
            const output = component()
            root.innerHTML = output
        }
    }

    return {
        //nhận view ban đầu và đẩy qua element id #root
        attach(component, root) {
            //Set value cho roots, root là key, component là value 
            roots.set(root, component)
            render()
        },

        //Phương thức để đẩy dữ liệu từ store vào view
        //selector là hàm sẽ return về những data trong store mà ta muốn chọn, mặc định ở đây là lấy toàn bộ data ban đầu là state
        connect(selector = state => state) {
            //Props là những công cụ, dữ liệu ta muốn truyền vào sau này
            return component => (props, ...args) => 
            //Cả 3 thằng state, props, args đều là object nên có thể sử dụng assign
            component(Object.assign({}, props, selector(state), args))
        },

        //Dispatch actions
        dispatch(action, ...args) {
            state = reducer(state, action, args)
            render()
        }
    }

}