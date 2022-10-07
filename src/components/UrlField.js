import { Input, Row, Col } from 'antd';
import CopyButton from './CopyButton';

export default function UrlField({ name, type = 'text', value, disabled, onChange }) {
    return (
        <Row gutter={5} wrap={false}>
            <Col flex="auto">
                <Input type={type} value={value} onChange={e => onChange(e.target.value)} disabled={disabled} addonBefore={<span id={name}>{name}</span>} aria-labelledby={name} />
            </Col>
            <Col style={{ display: 'flex', alignItems: 'center'}}>
                <CopyButton name={name} value={value} />
            </Col>
        </Row>
    );
}
