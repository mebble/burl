import { prompt } from '../constants';

export default function Prompt({ url }) {
    return (
        <p className="prompt">
            {url.toString() === ''
                ? prompt.intro
                : (url.isBad()
                    ? prompt.invalid
                    : prompt.done)}
        </p>
    );
};
