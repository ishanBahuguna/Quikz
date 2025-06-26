import {useState} from 'react';

const CountDown = () => {
    const [timeLeft , setTimeLeft] = useState(15);
    return (
        <div>
            <h1>{timeLeft}</h1>
        </div>
    )
}

export default CountDown;