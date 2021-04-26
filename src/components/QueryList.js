import QueryParam from './QueryParam';

export default function QueryList({ queryParams, disabled, onChange, onRemove }) {
    return (
        <ul className="query">{
            Array.from(queryParams).map(([ key, val ]) => (
                <li key={key}>
                    <QueryParam
                        name={key}
                        value={val}
                        disabled={disabled}
                        onChange={e => onChange(key, e.target.value)}
                        onRemove={() => onRemove(key)} />
                </li>
            ))
        }</ul>
    );
}
