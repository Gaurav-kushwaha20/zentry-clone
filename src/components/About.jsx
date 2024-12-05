import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import React from 'react'
import AnimatedTitle from './AnimatedTitle'
gsap.registerPlugin(ScrollTrigger)
const About = () => {
    useGSAP(() => {
        const clipAnimation = gsap.timeline({       // allowing multiple animation to be sequenced
            scrollTrigger: {                        // property integrates GSAP with scrilling events, triggering animation based on scroll positions
                trigger: '#clip',                   // when the element with id = 'clip' is scrolled into view, the animation will start
                start: 'center center',             // first 'center' refers to the center of the trigger element, second 'center' refers to the center of the viewport
                end: '+=800 center',                // +=800 means the animation will continue for an additonal 800px of scroll beyond the start point
                scrub: 0.5,                         // 0.5 means the animation will be scrubbed at 50% of the scroll speed
                pin: true,                          // pinning the element to the viewport, so it doesn't move when scrolled, this creates a sticky effect
                pinSpacing: true                    // ensures proper around the pinned element so that other content doesn't overlap or shift
            }
        })

        clipAnimation.to('.mask-clip-path', {       // adds animation to the element with class 'mask-clip-path'
            width: '100vw',                         // sets the width of the element to 100% of the viewport width
            height: '100vh',                        // sets the height of the element to 100% of the viewport height
            borderRadius: 0                         // removes the border radius of the element
        })
    })
    return (
        <div id='about' className='w-screen min-h-screen'>
            <div className='relative mb-8 mt-8 text-sm uppercase md:text-[10px]  '>
                <h1>welcome to zentry</h1>
                <AnimatedTitle title={"disc<b>o</b>ver the world's l<b>a</b>rgest shared adventure"} containerClass={'mt-5 !text-black text-center'} />
                <div className='about-subtext mt-10 '>
                    <p>The games of game begin your life, now an epic MMORPG</p>
                    <p>zentry unites every player from countless games and platforms</p>
                </div>
            </div>

            <div className='h-dvh w-screen ' id='clip'>
                <div className='mask-clip-path about-image'>
                    <img src="/img/about.webp" alt="background" className='absolute left-0 top-0 size-full object-cover' />
                </div>
            </div>
        </div>
    )
}

export default About