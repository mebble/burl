export default function QueryAdd() {
    return (
        <form class="query-add">
            <input name="new-query-key" type="text" />
            <input name="new-query-value" type="text" />
            <button type="button">Add</button>
        </form>
    );
}
