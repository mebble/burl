import { Input } from 'antd';

export default function UrlField({ name, type = 'text', value, disabled, onChange }) {
    return (
        <Input type={type} value={value} onChange={e => onChange(e.target.value)} disabled={disabled} addonBefore={<span id={name}>{name}</span>} aria-labelledby={name} />
    );
}
