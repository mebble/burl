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
                        onValueChange={value => onChange(key, value)}
                        onRemove={() => onRemove(key)} />
                </li>
            ))
        }</ul>
    );
}
