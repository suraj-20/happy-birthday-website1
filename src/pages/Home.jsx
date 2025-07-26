import { useNavigate } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import { PiWarningCircle } from 'react-icons/pi';

const Home = () => {
    const navigate = useNavigate();
    const audioRef = useRef(null);
    const [headingText, setHeadingText] = useState("Do you want to play music in the background?");

    useEffect(() => {
        audioRef.current = new Audio('/hbd.mp3');
        audioRef.current.loop = true;
    }, []);

    const handleYes = () => {
        audioRef.current?.play();
        navigate('/HappyBirthday');
    };

    const handleNo = () => {
        setHeadingText("Please play, you will love it :)");
    };

    return (
        <div className='xl:w-2/7 lg:w-2/6 md:w-2/4 flex text-3xl font-bold'>
            <div className='bg-[#fff] w-full flex flex-col px-8 py-6 gap-6 items-center rounded-md shadow-lg'>
                <div className='flex items-center justify-center text-3xl'>
                    <PiWarningCircle className='text-[6rem] text-[#f8bb86]' />
                </div>
                <div className='text-center text-[#737375]'>
                    <h1 className='text-3xl font-semibold'>{headingText}</h1>
                </div>
                <div className='flex items-center gap-2 text-[16px] text-white justify-center'>
                    <button onClick={handleYes} className='bg-[#3085d6] px-6 font-medium rounded-sm'>
                        Yes
                    </button>
                    <button onClick={handleNo} className='bg-[#d33] px-6 font-medium rounded-sm'>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
