
console.log("Hello world!");
const myvar = document.currentScript.getAttribute('tokens')
// alert(myvar)


const existingReact = document.getElementById('reactLoader')

if(!existingReact) {
    const script = document.createElement('script')
    script.src = "https://unpkg.com/react@18/umd/react.development.js"
    script.id = 'reactLoader'
    document.body.appendChild(script)

    script.onload = () => {
        alert("I have loaded react")
    }
}
const existingReactDom = document.getElementById('reactDomLoader')

if(!existingReact) {
    const script = document.createElement('script')
    script.src = "https://unpkg.com/react-dom@18/umd/react-dom.development.js"
    script.id = 'reactDomLoader'
    document.body.appendChild(script)

    script.onload = () => {
        alert("I have loaded react dom")

        // ReactDOM.render(<h1>Hi! </h1>, document.getElementById("root"))
    }
}