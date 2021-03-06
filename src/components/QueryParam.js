import { Input, Button, Row, Col } from 'antd';

export default function QueryParam({ name, value, disabled, onValueChange, onRemove }) {
    const ariaId = `query-${name}`;
    return (
        <Row gutter={4} style={{ width: '100%' }} wrap={false}>
            <Col flex="auto">
                <Input value={value} onChange={e => onValueChange(e.target.value)} type="text" disabled={disabled} addonBefore={<span id={ariaId}>{name}</span>} aria-labelledby={ariaId} style={{ width: '100%' }}/>
            </Col>
            <Col>
                <Button htmlType="button" data-query-key={name} onClick={onRemove}>-</Button>
            </Col>
        </Row>
    );
};
