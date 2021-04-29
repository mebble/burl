import { Input } from 'antd';

export default function UrlField({ name, type = 'text', value, disabled, onChange }) {
    const handleOnChange = e => {
        const value = e.target.value;
        if (type === 'number') {
            const numValue = parseInt(value, 10);
            if (!isNaN(numValue)) {
                onChange(numValue);
            }
        } else {
            onChange(value);
        }
    };

    return (
        <Input name={name} type={type} value={value} onChange={handleOnChange} disabled={disabled} addonBefore={name} />
    );
}
