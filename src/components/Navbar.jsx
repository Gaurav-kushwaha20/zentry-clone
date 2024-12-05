import React, { useRef, useState, useEffect } from 'react'
import { TiLocationArrow } from 'react-icons/ti'
import { useWindowScroll } from 'react-use'
import gsap from 'gsap'

const Navbar = () => {
    const navContainerRef = useRef()
    const navItems = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact'];
    const audioElementRef = useRef(null)
    const [isAudioPlaying, setisAudioPlaying] = useState(false)
    const [isIndicatorActive, setisIndicatorActive] = useState(false)
    const [lastScrollY, setlastScrollY] = useState(0)
    const [isNavVisible, setIsNavVisible] = useState(true)
    const { y: currentScrollY } = useWindowScroll()

    useEffect(() => {
        // console.log("Current scroll: ", currentScrollY)
        if (currentScrollY === 0) {
            setIsNavVisible(true)
            navContainerRef.current.classList.remove('floating-nav')
        } else if (currentScrollY > lastScrollY) {
            setIsNavVisible(false)
            navContainerRef.current.classList.add('floating-nav')
        } else if (currentScrollY < lastScrollY) {
            setIsNavVisible(true)
            navContainerRef.current.classList.add('floating-nav')

        }
        setlastScrollY(currentScrollY)
        // console.log("last scroll: ", lastScrollY)
    }, [currentScrollY, lastScrollY])

    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            // opacity: isNavVisible ? 1 : 0,
            duration: 0.5,
        })
    }, [isNavVisible])


    const toggleAudioIndicator = () => {
        setisAudioPlaying(prev => !prev);
        setisIndicatorActive(prev => !prev)
    }

    useEffect(() => {
        if (isAudioPlaying) {
            audioElementRef.current.play()
        } else {
            audioElementRef.current.pause()
        }
    }, [isAudioPlaying])


    return (
        <div ref={navContainerRef} className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6 '>
            <header className='absolute top-1/2 w-full -translate-y-1/2'>
                <nav className='flex size-full items-center justify-between p-4'>
                    <div className=' flex items-center gap-7'>
                        <img src="/img/logo.png" alt="logo" className='w-10' />

                        <button id='product-button' title='products'
                            rightIcon={<TiLocationArrow />}
                            containerClass='bg-blue-50 md:flex hidden item-center justify-center'
                        />
                    </div>
                    <div className='flex h-full items-center'>
                        <div className='hidden md:block' >
                            {
                                navItems.map((item) => (
                                    <a href={`#${item.toLocaleLowerCase()}`} className='nav-hover-btn' key={item}>{item}</a>
                                ))}
                        </div>

                        <button className='ml-10 flex items-center space-x-0.5' onClick={toggleAudioIndicator}>
                            <audio src="/audio/loop.mp3" ref={audioElementRef} loop />
                            {
                                [1, 2, 3, 4, 5].map((bar) => (
                                    <div className={`text-blue-50 indicator-line ${isIndicatorActive ? 'active' : ''}`} key={bar} style={{ animationDelay: `${bar * 0.1}s` }} />

                                ))
                            }

                        </button>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Navbar