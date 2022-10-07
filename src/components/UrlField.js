import { Input, Button, Row, Col } from 'antd';
import IconCopy from './IconCopy';

export default function UrlField({ name, type = 'text', value, disabled, onChange }) {
    return (
        <Row gutter={5} wrap={false}>
            <Col flex="auto">
                <Input type={type} value={value} onChange={e => onChange(e.target.value)} disabled={disabled} addonBefore={<span id={name}>{name}</span>} aria-labelledby={name} />
            </Col>
            <Col style={{ display: 'flex', alignItems: 'center'}}>
                <Button aria-label={`Copy ${name}`} htmlType="button" size="small" icon={<IconCopy />} onClick={() => {
                    navigator.clipboard.writeText(value)
                }}>
                </Button>
            </Col>
        </Row>
    );
}
