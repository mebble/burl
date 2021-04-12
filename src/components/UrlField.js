export default function UrlField({ name, value, disabled, onChange }) {
    return (
        <label>
            {name} <input name={name} value={value} onChange={onChange} type="text" disabled={disabled} />
        </label>
    );
}
