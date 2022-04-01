
export default function MyIframe(props) {
    return (
        <div className="iframe-div">
            <iframe
                ref={props.ifref}
                src="http://localhost:3030/"
                title="Child"
            ></iframe>
        </div>
    )
}