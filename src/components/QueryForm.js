export default function QueryForm() {
    return (
        <form class="query-form">
            <input name="new-query-key" type="text" disabled />
            <input name="new-query-value" type="text" disabled />
            <button type="button" disabled>Add</button>
        </form>
    );
}
