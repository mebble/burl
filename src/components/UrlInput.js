export default function UrlInput({ url, onChange }) {
    const valid = !url.isBad();

    return (
        <>
            <input name="url" value={url.toString()} type="text" onChange={e => onChange(e.target.value)} />
            <a className="url"
                href={valid ? url.toString() : '#'}
                target={valid ? "_blank" : null}
                rel="noopener noreferrer"
            >Visit</a>
        </>
    );
}
