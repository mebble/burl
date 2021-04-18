export default function QueryForm({ disabled }) {
    return (
        <form class="query-form">
            <input name="new-query-key" type="text" disabled={disabled} />
            <input name="new-query-value" type="text" disabled={disabled} />
            <button type="button" disabled>Add</button>
        </form>
    );
}
