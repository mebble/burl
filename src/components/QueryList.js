import { List } from 'antd';
import QueryParam from './QueryParam';

export default function QueryList({ queryParams, disabled, onChange, onRemove }) {
    return (
        <List
            className="query"
            size="small"
            dataSource={Array.from(queryParams)}
            renderItem={([ key, val ]) => (
                <List.Item key={key} style={{ border: 'none', padding: '4px 16px' }}>
                    <QueryParam
                        name={key}
                        value={val}
                        disabled={disabled}
                        onValueChange={value => onChange(key, value)}
                        onRemove={() => onRemove(key)} />
                </List.Item>
            )}
        />
    );
}
