import { Space, Typography } from 'antd';
import QueryList from './QueryList';
import QueryForm from './QueryForm';

const { Title } = Typography;

export default function Query({ queryParams, disabled, onChange, onRemove, onSubmit }) {
    return (
        <Space direction="vertical" style={{ margin: '1rem 0', width: '100%' }}>
            <Title level={4} style={{ margin: 0 }}>Query</Title>
            <QueryList
                queryParams={queryParams}
                disabled={disabled}
                onChange={onChange}
                onRemove={onRemove} />
            <QueryForm disabled={disabled} onSubmit={onSubmit} />
        </Space>
    );
}
