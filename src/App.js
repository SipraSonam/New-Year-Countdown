import React, {useState, useEffect} from 'react';
import './index.css';

const currentyear = new Date().getFullYear()
const NEW_YEAR = new Date(currentyear + 1, 0, 1, 0, 0, 0);

const getTimedelta = () => {
    const now = new Date();
    const timedelta = NEW_YEAR.getTime() - now.getTime();

    const days = Math.floor(timedelta / (24 * 60 * 60 * 1000));
    const hours = Math.floor((timedelta % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((timedelta % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((timedelta % (60 * 1000)) / 1000);

    return {
        days,
        hours,
        minutes,
        seconds,
    };
}

function App() {
    const [countdown, setCountdown] = useState();
    const [loading, setLoading] = useState(true);
    const [isNewYear, setIsNewYear] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const timedelta = getTimedelta();

            setCountdown(timedelta);
            setLoading(false);

            if (timedelta.seconds < 0) {
                setIsNewYear(true)
            }

        }, 1000);

        return () => clearInterval(interval);
    });

    if (loading) {
        return <h1 className='min-w-full min-h-screen flex justify-center items-center text-4xl'>Loading...</h1>
    };

    if (isNewYear) {
        return <h1 className='min-w-full min-h-screen flex justify-center items-center text-4xl'>Happy New Year!!!</h1>
    };

    return (
        <div className="min-w-screen min-h-screen m-auto flex flex-row justify-center items-center gap-10 text-black p-10">
            <div className="flex flex-col justify-center items-center">
                <span className="text-4xl">{countdown.days}</span>
                <span className="text-2xl">Days</span>
            </div>       
            <div className="flex flex-col justify-center items-center">
                <span className="text-4xl">{countdown.hours}</span>
                <span className="text-2xl">Hours</span>
            </div>   
            <div className="flex flex-col justify-center items-center">
                <span className="text-4xl">{countdown.minutes}</span>
                <span className="text-2xl">Minutes</span>
            </div>   
            <div className="flex flex-col justify-center items-center">
                <span className="text-4xl">{countdown.seconds}</span>
                <span className="text-2xl">Seconds</span>
            </div>   
        </div>
    );
}

export default App;
