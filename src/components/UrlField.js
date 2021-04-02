export default function Foo({ name, disabled }) {
    return (
        <label>
            {name} <input className={name} type="text" disabled={disabled} />
        </label>
    );
}
