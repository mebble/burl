import { Input, Row, Col } from 'antd';
import CopyButton from './CopyButton';
import styles from '../styles/UrlInput.module.css';

export default function UrlInput({ url, onChange }) {
    const valid = !url.isBad();
    const urlValue = url.toString();

    return (
        <Row className={styles.container} justify="center" align="middle" gutter={8}>
            <Col flex={10}>
                <Input aria-label="url" value={urlValue} type="text" onChange={e => onChange(e.target.value)} />
            </Col>
            <Col>
                <CopyButton name="url" value={urlValue} />
            </Col>
            <Col>
                <a id="visit-url"
                    href={valid ? urlValue : '#'}
                    target={valid ? "_blank" : null}
                    rel="noopener noreferrer"
                >Visit</a>
            </Col>
        </Row>
    );
}
