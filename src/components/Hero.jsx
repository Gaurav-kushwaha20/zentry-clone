import React, { useEffect, useRef, useState } from 'react';
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
    const [currentIndex, setcurrentIndex] = useState(1)
    const [hasClicked, setHasClicked] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [loadedVideos, setLoadedVideos] = useState(0)
    const [fullVideoIndex, setfullVideoIndex] = useState(3)
    const totalVideo = 4
    const nextVideoRef = useRef(null)


    const handleMiniVideoClick = () => {
        setHasClicked(true)
        setcurrentIndex((currentIndex % totalVideo) + 1)
        setfullVideoIndex(currentIndex)
    }
    const getVideoSrc = (index) => `/videos/hero-${index}.mp4`

    const handleVideoLoad = () => {
        setLoadedVideos((prev) => prev + 1)
    }

    useEffect(() => {
        if (loadedVideos === totalVideo - 1) {
            setIsLoading(false)
        }
    }, [loadedVideos])


    // gsap special zoom in effect
    useGSAP(() => {
        if (hasClicked) {
            gsap.set('#next-video', { visibility: 'visible' })

            gsap.to('#next-video', {
                transformOrigin: 'center center',
                scale: 1,
                width: '100%',
                height: '100%',
                duration: 3,
                ease: 'power1.inOut',
                onStart: () => nextVideoRef.current.play(),
            })

            gsap.from('#current-video', {
                transformOrigin: 'center center',
                scale: 0,
                duration: 1.5,
                ease: 'power1.inOut',
            })
        }
    }, { dependencies: [currentIndex], revertOnUpdate: true })
    // scroll polygol effect
    useGSAP(() => {
        gsap.set('#video-frame', {
            clipPath: 'polygon(0 0, 16% 0, 71% 100%, 0 99%)',
            borderRadius: '0 0 40% 10%'
        })

        gsap.from('#video-frame', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            borderRadius: '0 0 0 0',
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: '#video-frame',
                start: 'center center',
                end: 'bottom center',
                scrub: true
            }
        })
    })

    return (
        <div className={'relative h-dvh w-screen overflow-x-auto'} id='hero'>
            {isLoading && (
                <div className='flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50'>
                    <div className='three-body'>
                        <div className='three-body__dot' />
                        <div className='three-body__dot' />
                        <div className='three-body__dot' />

                    </div>
                </div>
            )}
            <div className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75" id="video-frame">
                <div>
                    <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                        <div onClick={handleMiniVideoClick} className=' origin-center scale-50 opacity-0 transition-all duration-700 ease-in hover:scale-100 hover:opacity-100'>
                            <video ref={nextVideoRef}
                                src={getVideoSrc(currentIndex)}
                                loop
                                muted
                                id='current-video'
                                className='size-64 origin-center scale-150 object-cover object-center'
                                onLoadedData={handleVideoLoad}
                            />
                        </div>
                    </div>
                    <video src={getVideoSrc(fullVideoIndex)} loop muted autoPlay id='next-video' className='absolute-center invisible absolute z-20 size-64 object-cover object-center' onLoadedData={handleVideoLoad} />
                    <video src={getVideoSrc(fullVideoIndex)} muted loop autoPlay className='absolute left-0 top-0 size-full object-cover object-center' onLoadedData={handleVideoLoad} />
                </div>
                <h1 className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75'>G<b>a</b>mming</h1>
                <div className='absolute left-0 top-0 z-40 size-full'>
                    <div className='mt-24 px-5 sm:px-10 '>
                        <h1 className='special-font hero-heading text-blue-100'>redefi<b>n</b>e</h1>
                        <p className='mb-5  max-w-64 text-sm sm:text-xl font-robert-medium text-blue-100 '>Enter the meta game layer <br />unlease the play economy </p>
                        <Button id='watch-trailer' title='watch trailer' leftIcon={<TiLocationArrow />} containerClass='!bg-yellow-300 flex-container gap-1' />
                    </div>
                </div>
            </div>
            <h1 className='special-font hero-heading absolute bottom-5 right-5 text-black'>G<b>a</b>mming</h1>

        </div>
    );
}

export default Hero;


