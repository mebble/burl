import { Flex } from 'rebass';
import { Label, Input } from '@rebass/forms';

export default function UrlField({ name, value, disabled, onChange }) {
    return (
        <Flex>
            <Label
                htmlFor={name}
                sx={{
                    color: disabled ? '#bbb' : 'initial'
                }}>
                    {name}
            </Label>
            <Input
                id={name}
                name={name}
                value={value}
                type="text"
                onChange={onChange}
                disabled={disabled}
                sx={{
                    ':disabled': {
                        borderColor: '#bbb',
                        backgroundColor: '#eee'
                    }
                }} />
        </Flex>
    );
}
