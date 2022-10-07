import { Row, Col  } from 'antd';
import UrlField from './UrlField';
import DecodeURISwitch from './DecodeURISwitch';

export default function FragmentField({ name, value, disabled, onChange }) {
    return (
        <Row gutter={5} wrap={false}>
            <Col flex="auto">
                <UrlField name={name} value={value} onChange={onChange} disabled={disabled} />
            </Col>
            <Col style={{ display: 'flex', alignItems: 'center'}}>
                <DecodeURISwitch name={`${name}-decode-url`} value={value} disabled={disabled} onSwitch={onChange} />
            </Col>
        </Row>
    );
}
