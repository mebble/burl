import { Input } from 'antd';

export default function UrlField({ name, type = 'text', value, disabled, onChange }) {
    return (
        <Input name={name} type={type} value={value} onChange={e => onChange(e.target.value)} disabled={disabled} addonBefore={name} />
    );
}
