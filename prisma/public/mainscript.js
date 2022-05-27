let baseurl = 'https://tp-back-office.herokuapp.com'
let display = 1

const loadDiv = async() => {
    console.log(document.cookie);
    const div = document.createElement('div')
    div.id = "tek-div"
    let uemail = (document.getElementById('tek-script').dataset.useremail);
    let orgref = (document.getElementById('tek-script').dataset.orgref);
    div.dataset.useremail = uemail
    div.dataset.orgref = orgref
    div.style.position = "relative"
    div.style.zIndex = 2000
    let response = await fetch(`${baseurl}/api/get-org-display`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({orgRef: orgref})
    })
    display = (await(response.json())).display
    div.classList.add('tekprivacy-widget')
    document.body.appendChild(div)
}

const loadJs = () => {
    const existingScript = document.getElementById('tek-widget-js');

    if(!existingScript) {
        const css = document.createElement('link')
        css.type = 'text/css'
        css.href = `${baseurl}/index${display}.css`
        console.log(`${baseurl}/index${display}.css`);
        css.rel = 'stylesheet'
        document.head.appendChild(css)
        const script = document.createElement('script')
        script.src = `${baseurl}/index.js`
        script.id = 'tek-widget-js'
        document.body.appendChild(script)

    }
}

loadDiv().then(() => loadJs())