import { Typography } from 'antd';

const { Title: AntTitle } = Typography;

export default function Title({ children }) {
    return (
        <AntTitle style={{ fontSize: '4rem', marginBottom: '1rem' }}>
            {children}
        </AntTitle>
    );
};
