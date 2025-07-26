import { useEffect, useState } from 'react'
// import hat from '../images/hat.png'
import profile from '../images/irene.jpg'
import balloon1 from '../images/ballon1.png';
import balloon2 from '../images/ballon2.png';
import balloon3 from '../images/ballon3.png';
import '../styles/animations.css';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ideaTextTrans = {
    initial: {
        opacity: 0,
        y: -20,
        rotateX: 5,
        skewX: "15deg"
    },
    animate: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        skewX: "0deg",
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        y: 20,
        rotateY: 5,
        skewX: "-15deg",
        transition: {
            duration: 0.4,
            ease: "easeIn"
        }
    }
};

const rotateEmoji = {
    initial: { rotate: 0 },
    animate: {
        rotate: 90,
        transition: { duration: 0.5, ease: "easeInOut" }
    },
    exit: {
        rotate: 0,
        transition: { duration: 0.3, ease: "easeInOut" }
    }
};


// const eightVariant = {
//     initial: { opacity: 0, scale: 1 },
//     animate: {
//         opacity: [0, 1, 0],
//         scale: [1, 80, 1],
//         transition: {
//             repeat: 3,
//             repeatDelay: 1.4,
//             duration: 1.5,
//             ease: "easeInOut",
//             staggerChildren: 0.3,
//         },
//     },
// };

const fadeScaleVariant = {
    initial: {
        opacity: 0,
        scale: 6, // ~30rem assuming original is 5rem
        y: 60,
    },
    animate: (i) => ({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            delay: i * 0.3,
            duration: 0.8,
            ease: "easeOut",
        },
    }),
    exit: {
        opacity: 0,
        scale: 6,
        y: -60,
        transition: {
            duration: 0.6,
            ease: "easeIn",
        },
    },
};



const HappyBirthday = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(4);
    const [insideStep, setInsideStep] = useState(1);
    const [visibleSteps, setVisibleSteps] = useState([]);
    const [showSend, setShowSend] = useState(false);
    const [typedText, setTypedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const fullText = " Happy birthday to youu!! Lorem ipsum dolor sit amet consectetur adipisicing elit."


    useEffect(() => {
        const timers = [];

        if (currentStep === 1) {
            setVisibleSteps([1]);
            timers.push(setTimeout(() => setVisibleSteps(prev => [...prev, 2]), 2000));
            timers.push(setTimeout(() => {
                setVisibleSteps(prev => [...prev, 3]);
                setCurrentStep(2);
            }, 4000));
        }

        if (currentStep === 2) {
            timers.push(setTimeout(() => setCurrentStep(3), 4000));
        }

        if (currentStep === 3) {
            if (showSend) {
                timers.push(setTimeout(() => setCurrentStep(4), 0));
            }

            setTypedText('');
            setIsTyping(true);
            let index = 0;

            const typingInterval = setInterval(() => {
                if (index < fullText.length) {
                    setTypedText((prev) => prev + fullText[index]);
                    index++;
                } else {
                    clearInterval(typingInterval);
                    setIsTyping(false);
                }
            }, 100);

            return () => clearInterval(typingInterval);
        }

        if (currentStep === 4) {
            if (insideStep < 6) {
                timers.push(setTimeout(() => setInsideStep(prev => prev + 1), 3000));
            } else {
                timers.push(setTimeout(() => {
                    setCurrentStep(5);
                    setInsideStep(1);
                }, 4000));
            }
        }

        if (currentStep === 5) {
            timers.push(setTimeout(() => setCurrentStep(6), 2000));
        } else if (currentStep === 6) {
            const timer = setTimeout(() => {
                setCurrentStep(7);
            }, 6000);

            return () => clearTimeout(timer);
        } else if (currentStep === 7) {
            timers.push(setTimeout(() => setCurrentStep(7), 4000));
        }

        return () => timers.forEach(clearTimeout);
    }, [currentStep, insideStep, showSend]);

    const handleSend = () => {
        setShowSend(true);
    };

    return (
        <div className='w-full h-full m-auto overflow-hidden relative text-center bg-[#fff]'>
            <div className='absolute left-0 right-0 top-[20vh]'>

                {visibleSteps.includes(1) && currentStep === 1 && (
                    <h1 className='text-[4.5rem] leading-none font-medium text-[#3085d6] transition-opacity duration-500'>Hi <span>Jessi.</span></h1>
                )}

                {visibleSteps.includes(2) && currentStep === 1 && (
                    <motion.p
                        className='text-[3rem] mt-4 leading-none font-medium'
                        variants={ideaTextTrans}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        I really like your smile btw!
                    </motion.p>
                )}

                {currentStep === 2 && (
                    <motion.p
                        className='text-[3rem] font-medium fade-in'
                        variants={ideaTextTrans}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        It's your birthday!! :J
                    </motion.p>
                )}

                {currentStep === 3 && (
                    <div className="border w-2/4 h-[100px] p-3 m-auto rounded-sm relative fade-in">
                        <p className="text-sm font-medium text-left">
                            {typedText}
                            <span className="blinking-cursor">|</span>
                        </p>

                        {!showSend && (
                            <button
                                onClick={handleSend}
                                disabled={isTyping}
                                className={`absolute -bottom-12 right-0 px-6 text-[14px] rounded-sm font-medium text-white 
                                ${isTyping ? 'bg-[#15a1ed8c] cursor-not-allowed' : 'bg-[#15a1ed] cursor-pointer'} fade-in`}
                            >
                                Send
                            </button>
                        )}
                    </div>
                )}

                {currentStep === 4 && (
                    <div className="flex flex-col items-center">
                        {insideStep === 1 && <motion.p variants={ideaTextTrans} initial="initial" animate="animate" exit="exit" className="text-[2rem] font-medium">That's what I was going to do.</motion.p>}
                        {insideStep === 2 && <motion.p variants={ideaTextTrans} initial="initial" animate="animate" exit="exit" className="text-[2rem] font-medium">But then I stopped.</motion.p>}
                        {insideStep === 3 && <motion.p variants={ideaTextTrans} initial="initial" animate="animate" exit="exit" className="text-[2rem] font-medium text-center  leading-relaxed">I realised, I wanted to do something <br /> <strong className="inline-block bg-[#15a1ed] rounded-sm text-[#fff] px-[10px] py-[2px]">special</strong>.</motion.p>}
                        {insideStep === 4 && <motion.p variants={ideaTextTrans} initial="initial" animate="animate" exit="exit" className="text-[2rem] font-medium">Because,</motion.p>}
                        {insideStep === 5 && <motion.p variants={ideaTextTrans} initial="initial" animate="animate" exit="exit" className="text-[4rem] font-medium">You are Special <motion.span
                            variants={rotateEmoji}
                            initial="initial"
                            animate="animate"
                            className="inline-block origin-bottom"
                        >
                            :)
                        </motion.span></motion.p>}
                        <AnimatePresence mode="wait">
                            {insideStep === 6 && (
                                <motion.p
                                    key="step-6"
                                    className="text-[15rem] leading-normal font-medium top-20 fade-in flex gap-6"
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                >
                                    <motion.span
                                        variants={fadeScaleVariant}
                                        custom={0}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                    >
                                        S
                                    </motion.span>
                                    <motion.span
                                        variants={fadeScaleVariant}
                                        custom={1}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                    >
                                        O
                                    </motion.span>
                                </motion.p>
                            )}
                        </AnimatePresence>

                    </div>
                )}

                {(currentStep === 5 || currentStep === 6) && (
                    <>
                        <div className="z-0 relative flex flex-col m-auto items-center justify-center fade-in">
                            <motion.img
                                src={profile}
                                alt="profile"
                                className="lg:w-[350px] h-[350px] profile-picture"
                                initial={{ scale: 3.5, opacity: 0, x: 25, y: -25, rotateZ: -45 }}
                                animate={{ scale: 1, opacity: 1, x: 0, y: 0, rotateZ: 0 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />

                            {/* <motion.img
                                src={hat}
                                alt="hat"
                                className="absolute left-0 -top-24 w-[80px]"
                                initial={{ x: -100, y: 350, rotate: -180, opacity: 0 }}
                                animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                                transition={{ duration: 1, ease: "easeOut", delay: 1.3 }}
                            /> */}

                            <div className="wish-hbd flex justify-center gap-1 text-[2rem] font-bold text-pink-500 mt-6">
                                {"Happy Birthday!".split("").map((char, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, y: -50, rotate: 150, skewX: 30 }}
                                        animate={{ opacity: 1, y: 0, rotate: 0, skewX: 0 }}
                                        transition={{
                                            duration: 0.7,
                                            ease: [0.68, -0.55, 0.27, 1.55], // Elastic-ish
                                            delay: i * 0.1,
                                        }}
                                        className='animate-bounce'
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </div>


                        </div>
                        {currentStep === 6 && (
                            <div className="absolute h-screen -top-40 inset-0 overflow-hidden z-10">
                                {[...Array(32)].map((_, i) => (
                                    <motion.img
                                        key={i}
                                        src={[balloon1, balloon2, balloon3][i % 3]}
                                        alt="balloon"
                                        className="absolute w-[400px]"
                                        initial={{ y: 1400, opacity: 0.9 }}
                                        animate={{ y: -1000, opacity: 1 }}
                                        transition={{
                                            duration: 2.5,
                                            delay: i * 0.3,
                                            ease: "easeOut",
                                        }}
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            // width: `${40 + Math.random() * 40}px`,
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}


                {/* 
            {currentStep === 7 && (
                <div className="">
                    {[['5vw', '7vh', '#bd6ecf'], ['35vw', '23vh', '#7dd175'], ['23vw', '33vh', '#349d8b'],
                    ['57vw', '43vh', '#347a9d'], ['7vw', '68vh', '#c66053'], ['77vw', '42vh', '#bfaa40'],
                    ['83vw', '68vh', '#e3bae8'], ['37vw', '86vh', '#8762cb'], ['87vw', '94vh', '#9a90da']].map(([left, top, fill], idx) => (
                        <svg key={idx} className='w-[25px] invisible -z-1 absolute' style={{ left, top, fill }} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="20" r="20" />
                        </svg>
                    ))}
                </div>
            )} */}

                {currentStep === 7 && (
                    <>
                        <div className="text-center flex flex-col items-center justify-center gap-4 fade-in">
                            <p className='text-3xl font-medium'>Okay, now come back and tell me if you liked it.</p>
                            <p className='text-3xl font-medium cursor-pointer' onClick={() => {
                                setCurrentStep(1);
                                setVisibleSteps([]);
                                setInsideStep(1);
                                setShowSend(false);
                                navigate('/');
                            }}>Or click, if you want to watch it again.</p>
                            <motion.p
                                variants={rotateEmoji}
                                initial="initial"
                                animate="animate"
                                className="inline-block origin-bottom font-medium text-[5rem]"
                            >
                                <span className='text-red-500 font-bold relative bottom-[3px]'>:</span>)
                            </motion.p>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
};

export default HappyBirthday;
