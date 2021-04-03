export default function Foo({ name, value, disabled }) {
    return (
        <label>
            {name} <input name={name} value={value} type="text" disabled={disabled} />
        </label>
    );
}
