import { Space } from 'antd';
import QueryList from './QueryList';
import QueryForm from './QueryForm';

export default function Query({ queryParams, disabled, onChange, onRemove, onSubmit }) {
    return (
        <Space direction="vertical">
            <QueryList
                queryParams={queryParams}
                disabled={disabled}
                onChange={onChange}
                onRemove={onRemove} />
            <QueryForm disabled={disabled} onSubmit={onSubmit} />
        </Space>
    );
}
