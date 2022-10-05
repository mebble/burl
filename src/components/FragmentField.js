import { Switch } from 'antd';
import UrlField from './UrlField';

export default function FragmentField({ name, value, disabled, onChange }) {
    return (
        <>
            <UrlField name={name} value={value} onChange={onChange} disabled={disabled} />
            <Switch size="small" aria-label={`${name}-decode-url`} onClick={(checked, e) => {
                if (checked) {
                    onChange(decodeURIComponent(value))
                } else {
                    onChange(encodeURIComponent(value))
                }
            }} />
        </>
    );
}
