import { Button } from 'antd';
import IconCopy from './IconCopy';

export default function CopyButton({ name, value }) {
    return (
        <Button aria-label={`Copy ${name}`} htmlType="button" size="small" icon={<IconCopy />} onClick={() => {
            navigator.clipboard.writeText(value)
        }}>
        </Button>
    );
}
