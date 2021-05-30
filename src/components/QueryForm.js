import { useState } from 'react';
import { Input, Button, Row, Col } from 'antd';

export default function QueryForm({ disabled, onSubmit }) {
    const [ key, setKey ] = useState('');
    const [ value, setValue ] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(key, value);
        setKey('');
        setValue('');
    };

    return (
        <form className="query-form" onSubmit={handleSubmit}>
            <Input.Group>
                <Row gutter={4} justify="space-between" wrap={false}>
                    <Col style={{ maxWidth: '100px' }}>
                        <Input aria-label="New query key" value={key} type="text" onChange={e => setKey(e.target.value)} disabled={disabled} />
                    </Col>
                    <Col flex="auto">
                        <Input aria-label="New query value" value={value} type="text" onChange={e => setValue(e.target.value)} disabled={disabled} />
                    </Col>
                    <Col>
                        <Button htmlType="submit" disabled={disabled}>Add</Button>
                    </Col>
                </Row>
            </Input.Group>
        </form>
    );
}
