import { Input, Row, Col } from 'antd';

export default function UrlInput({ url, onChange }) {
    const valid = !url.isBad();

    return (
        <Row style={{ width: '100%', marginBottom: '.75rem' }} justify="center" align="middle" gutter={8}>
            <Col flex={10}>
                <Input aria-label="url" value={url.toString()} type="text" onChange={e => onChange(e.target.value)} />
            </Col>
            <Col flex={2}>
                <a className="url"
                    href={valid ? url.toString() : '#'}
                    target={valid ? "_blank" : null}
                    rel="noopener noreferrer"
                >Visit</a>
            </Col>
        </Row>
    );
}
