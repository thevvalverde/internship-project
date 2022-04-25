
const loadJs = () => {
    const existingScript = document.getElementById('tek-widget-js');

    if(!existingScript) {
        const css = document.createElement('link')
        css.type = 'text/css'
        css.href = 'http://localhost:3030/index.css'
        css.rel = 'stylesheet'
        document.head.appendChild(css)
        const script = document.createElement('script')
        script.src = 'http://localhost:3030/index.js'
        script.id = 'tek-widget-js'
        document.body.appendChild(script)

    }
}

const loadDiv = () => {
    const div = document.createElement('div')
    div.id = "tek-div"
    let uemail = (document.getElementById('tek-script').dataset.useremail);
    let orgref = (document.getElementById('tek-script').dataset.orgref);
    div.dataset.useremail = uemail
    div.dataset.orgref = orgref
    div.classList.add('tekprivacy-widget')
    document.body.appendChild(div)
    div.onload = () => {
    }
}

loadDiv()
loadJs()