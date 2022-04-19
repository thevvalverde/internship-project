
const loadJs = () => {
    const existingScript = document.getElementById('tek-widget-js');

    if(!existingScript) {
        const script = document.createElement('script')
        script.src = 'http://localhost:3030/index.js'
        script.id = 'tek-widget-js'
        document.body.appendChild(script)
        const css = document.createElement('link')
        css.href = 'http://localhost:3030/index.css'
        css.rel = 'stylesheet'
        document.body.appendChild(css)

    }
}

const loadDiv = () => {
    const div = document.createElement('div')
    div.id = "tek-div"
    let token = (document.getElementById('tek-script').dataset.userid);
    div.dataset.userid = token
    div.classList.add('tekprivacy-widget')
    document.body.appendChild(div)
    div.onload = () => {
    }
}

loadDiv()
loadJs()