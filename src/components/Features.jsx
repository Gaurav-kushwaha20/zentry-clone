import React, { useState, useRef } from 'react'
import { TiLocationArrow } from 'react-icons/ti'

const BentoCard = ({ src, title, description, isCommingSonn }) => {

    return (
        <div className='relative size-full '>
            <video
                src={src}
                loop
                muted
                autoPlay
                className='absolute left-0 top-0 size-full object-cover object-center'
            />
            <div className=' relative z-10 flex size-full flex-col justify-between p-5 text-blue-50'>
                <div>
                    <h1 className=' bento-tittle special-font'>{title}</h1>
                    {description && (
                        <p className='mt-3 max-w-64 text-xs md:text-base'>{description}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

const BentoTilt = ({ className, children }) => {
    const [transformStyle, setTransformStyle] = useState('');
    const itemRef = useRef(null);

    const handleMouseMove = (e) => {
        const rect = itemRef.current.getBoundingClientRect(); // Get element dimensions
        const x = e.clientX - rect.left; // Mouse X relative to element
        const y = e.clientY - rect.top;  // Mouse Y relative to element
        // e.clientX return the x-coordinate of the mouse pointer starting from left i.e. 0 to right max. It is relative to the viewport, not the element. It is the distance from the left edge of the viewport to the mouse pointer.

        // Calculate tilt effect (adjust multipliers for sensitivity)
        const rotateX = ((y / rect.height) - 0.5) * 100; // Max tilt of 20 degrees
        const rotateY = ((x / rect.width) - 0.5) * -100;

        // Update transform style
        const newTransform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        setTransformStyle(newTransform);
    };

    const handleMouseLeave = () => {
        setTransformStyle(''); // Reset style on mouse leave
    };

    return (
        <div
            className={className}
            ref={itemRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform: transformStyle, transition: 'transform 0.2s ease' }} // Smooth reset
        >
            {children}
        </div>
    );
};





const Features = () => {
    return (
        <section className='bg-black pb-52 lg:px-28'>
            <div className='container mx-auto px-3 md:px-10'>
                <div className='px-5 py-32'>
                    <p className='font-circular-web text-lg text-blue-50'>Into the Metagame Layer</p>

                    <p className='max-w-md font-circular-web text-lg text-blue-50 opacity-50 '>Immerse Yourself in a rich and ever-expanding universe where a vibrant array of product converge into an interconnected overlay experience on your world</p>
                </div>
                <div className='border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]'>
                    <BentoCard
                        src="videos/feature-1.mp4"
                        title={<>radi <b>n</b>t</>}
                        description="A cross-platform metagame app, turning your activities across web2 and web3 games into a rewarding adventure"
                        isCommingSonn           // if we don't provide any value inside the inCommingSoon, it will be by default true
                    />
                </div>

                <div className='grid h-[135vh] grid-cols-2 grid-rows-3 gap-2'>
                    <BentoTilt className='bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2'>
                        <BentoCard
                            src={'videos/feature-2.mp4'}
                            title={<><b>zigma</b></>}
                            description={"An anime and gaming-inspired NFT collection - the IP primed for expansion"}
                        />
                    </BentoTilt>
                    <BentoTilt className='bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0'>
                        <BentoCard
                            src={'videos/feature-3.mp4'}
                            title={<><b>nexus</b></>}
                            description={'A gamified social hub, adding a new dimension of play to social interaction for web3 communities'}
                        />
                    </BentoTilt>
                    <BentoTilt className='bento-tilt_1 me-14 md:col-span-1 md:me-0 '>
                        <BentoCard
                            src={'videos/feature-4.mp4'}
                            title={<><b>azul</b></>}
                            description={'A cross world AI Agent - elevating your gameplay to be more fun and productive'}
                        />
                    </BentoTilt>
                    <BentoTilt className='bento-tilt_2'>
                        <div className='flex size-full flex-col justify-between bg-violet-300 p-5'>
                            <h1 className='bento-title special-font max-w-64 text-black'><b>More comming soon</b></h1>
                            <TiLocationArrow className='m-5 scale-[5] self-end' />
                        </div>
                    </BentoTilt>
                    <BentoTilt className='bento-tilt_2'>
                        <video src="/videos/feature-5.mp4"
                            loop
                            muted
                            autoPlay
                            className='size-full object-cover object-center'
                        />
                    </BentoTilt>
                </div>

            </div>
        </section>
    )
}

export default Features