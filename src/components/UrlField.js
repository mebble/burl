export default function Foo({ name, value, disabled }) {
    return (
        <label>
            {name} <input className={name} type="text" disabled={disabled} value={value} />
        </label>
    );
}
