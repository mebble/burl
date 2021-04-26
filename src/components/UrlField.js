import { Input } from 'antd';

export default function UrlField({ name, value, disabled, onChange }) {
    return (
        <Input name={name} value={value} onChange={onChange} type="text" disabled={disabled} addonBefore={name} />
    );
}
