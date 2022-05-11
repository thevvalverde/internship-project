let display = 1

const loadDiv = async() => {
    const div = document.createElement('div')
    div.id = "tek-div"
    let uemail = (document.getElementById('tek-script').dataset.useremail);
    let orgref = (document.getElementById('tek-script').dataset.orgref);
    div.dataset.useremail = uemail
    div.dataset.orgref = orgref
    div.style.position = "relative"
    div.style.zIndex = 2000
    console.log('asdgasdgas');
    let response = await fetch(`${process.env.BASE_URL}/api/get-org-display`, {
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
        css.href = `${process.env.BASE_URL}/index${display}.css`
        console.log(`${process.env.BASE_URL}/index${display}.css`);
        css.rel = 'stylesheet'
        document.head.appendChild(css)
        const script = document.createElement('script')
        script.src = `${process.env.BASE_URL}/index.js`
        script.id = 'tek-widget-js'
        document.body.appendChild(script)

    }
}

loadDiv().then(() => loadJs())