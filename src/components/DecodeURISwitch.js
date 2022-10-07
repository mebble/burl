import { Switch } from 'antd';

export default function DecodeURISwitch({ name, value, disabled, onSwitch }) {
    return (
        <Switch size="small" aria-label={name} disabled={disabled} onClick={(checked, e) => {
            if (checked) {
                onSwitch(decodeURIComponent(value))
            } else {
                onSwitch(encodeURIComponent(value))
            }
        }} />
    );
};
