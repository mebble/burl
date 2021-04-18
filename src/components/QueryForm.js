export default function QueryForm() {
    return (
        <form class="query-form">
            <input name="new-query-key" type="text" />
            <input name="new-query-value" type="text" />
            <button type="button">Add</button>
        </form>
    );
}
