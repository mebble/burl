import { useState } from 'react';

export default function QueryForm({ disabled, onSubmit }) {
    const [ key, setKey ] = useState('');
    const [ value, setValue ] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit({ newKey: key, newValue: value });
        setKey('');
        setValue('');
    };

    return (
        <form className="query-form" onSubmit={handleSubmit}>
            <input name="new-query-key" value={key} type="text" onChange={e => setKey(e.target.value)} disabled={disabled} />
            <input name="new-query-value" value={value} type="text" onChange={e => setValue(e.target.value)} disabled={disabled} />
            <button type="submit" disabled={disabled}>Add</button>
        </form>
    );
}
