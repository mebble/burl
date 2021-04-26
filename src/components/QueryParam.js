import { Input, Button, Space } from 'antd';

export default function QueryParam({ name, value, disabled, onValueChange, onRemove }) {
    return (
        <Space>
            <Input name={name} value={value} onChange={e => onValueChange(e.target.value)} type="text" disabled={disabled} addonBefore={name} />
            <Button type="button" data-query-key={name} onClick={onRemove}>-</Button>
        </Space>
    );
};
