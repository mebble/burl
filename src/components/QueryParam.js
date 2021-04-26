import UrlField from './UrlField';

export default function QueryParam({ name, value, disabled, onChange, onRemove }) {
    return (
        <>
            <UrlField name={name} value={value} onChange={onChange} disabled={disabled} />
            <button type="button" data-query-key={name} onClick={onRemove}>-</button>
        </>
    );
};
