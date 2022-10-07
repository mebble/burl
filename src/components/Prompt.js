import { prompt } from '../constants';
import { Alert as AntdAlert } from 'antd';

const Alert = ({ message, type }) => {
    return (
        <AntdAlert message={message} type={type} style={{ padding: '0.25rem 1rem', borderRadius: '0.3rem' }} />
    );
};

export default function Prompt({ url }) {
    return (
        <div className="prompt" style={{ marginBottom: '1rem' }}>
            {url.toString() === ''
                ? <Alert message={prompt.intro} type="info" />
                : (url.isBad()
                    ? <Alert message={prompt.invalid} type="error" />
                    : <Alert message={prompt.done} type="success" />)}
        </div>
    );
};
