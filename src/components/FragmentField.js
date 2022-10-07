import { Switch, Row, Col  } from 'antd';
import UrlField from './UrlField';

export default function FragmentField({ name, value, disabled, onChange }) {
    return (
        <Row gutter={5} wrap={false}>
            <Col flex="auto">
                <UrlField name={name} value={value} onChange={onChange} disabled={disabled} />
            </Col>
            <Col style={{ display: 'flex', alignItems: 'center'}}>
                <Switch size="small" aria-label={`${name}-decode-url`} disabled={disabled} onClick={(checked, e) => {
                    if (checked) {
                        onChange(decodeURIComponent(value))
                    } else {
                        onChange(encodeURIComponent(value))
                    }
                }} />
            </Col>
        </Row>
    );
}
