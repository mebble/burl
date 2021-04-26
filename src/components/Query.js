import QueryList from './QueryList';
import QueryForm from './QueryForm';

export default function Query({ queryParams, disabled, onChange, onRemove, onSubmit }) {
    return (
        <>
            <QueryList
                queryParams={queryParams}
                disabled={disabled}
                onChange={onChange}
                onRemove={onRemove} />
            <QueryForm disabled={disabled} onSubmit={onSubmit} />
        </>
    );
}
