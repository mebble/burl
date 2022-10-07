import { Input, Button, Row, Col } from 'antd';
import DecodeURISwitch from './DecodeURISwitch';
import CopyButton from './CopyButton';

export default function QueryParam({ name, value, disabled, onValueChange, onRemove }) {
    const ariaId = `query-${name}`;
    const colFlex = { display: 'flex', alignItems: 'center'};
    return (
        <Row gutter={5} style={{ width: '100%' }} wrap={false}>
            <Col flex="auto">
                <Input value={value} onChange={e => onValueChange(e.target.value)} type="text" disabled={disabled} addonBefore={<span id={ariaId}>{name}</span>} aria-labelledby={ariaId} style={{ width: '100%' }}/>
            </Col>
            <Col style={colFlex}>
                <CopyButton name={`query ${name}`} value={value} />
            </Col>
            <Col style={colFlex}>
                <Button htmlType="button" size="small" shape="circle" data-query-key={name} onClick={onRemove}>-</Button>
            </Col>
            <Col style={colFlex}>
                <DecodeURISwitch name={`${ariaId}-decode-url`} value={value} disabled={disabled} onSwitch={onValueChange} />
            </Col>
        </Row>
    );
};
