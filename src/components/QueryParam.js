import { Input, Button, Space, Row, Col } from 'antd';

export default function QueryParam({ name, value, disabled, onValueChange, onRemove }) {
    return (
        <Row gutter={4} style={{ width: '100%' }}>
            <Col flex="auto">
                <Input name={name} value={value} onChange={e => onValueChange(e.target.value)} type="text" disabled={disabled} addonBefore={name} style={{ width: '100%' }}/>
            </Col>
            <Col>
                <Button htmlType="button" data-query-key={name} onClick={onRemove}>-</Button>
            </Col>
        </Row>
    );
};
