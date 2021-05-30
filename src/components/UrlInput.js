import { Input, Row, Col } from 'antd';
import styles from '../styles/UrlInput.module.css';

export default function UrlInput({ url, onChange }) {
    const valid = !url.isBad();

    return (
        <Row className={styles.container} justify="center" align="middle" gutter={8}>
            <Col flex={10}>
                <Input aria-label="url" value={url.toString()} type="text" onChange={e => onChange(e.target.value)} />
            </Col>
            <Col>
                <a id="visit-url"
                    href={valid ? url.toString() : '#'}
                    target={valid ? "_blank" : null}
                    rel="noopener noreferrer"
                >Visit</a>
            </Col>
        </Row>
    );
}
