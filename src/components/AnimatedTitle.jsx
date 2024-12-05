import gsap from 'gsap/all'
import React, { useEffect, useRef } from 'react'

const AnimatedTitle = ({ title, containerClass }) => {
    const containerRef = useRef(null)
    useEffect(() => {
        // Create a GSAP context for managing scoped animations
        const ctx = gsap.context(() => {
            // Create a timeline for the animation
            const titleAnimation = gsap.timeline({
                // Configure the ScrollTrigger
                scrollTrigger: {
                    trigger: containerRef.current, // The element that triggers the animation
                    start: '300 bottom',          // Animation starts when the trigger is 100px above the bottom of the viewport -> 300 mean 300 of trigger, bottom mean bottom of viewport
                    end: 'center bottom',         // Animation ends when the trigger reaches the center of the viewport
                    toggleActions: 'play none none reverse',
                    // toggleActions: Specifies actions to take on scroll:
                    // 'play': Play animation when trigger starts
                    // 'none': No action when entering or exiting the trigger
                    // 'reverse': Reverse the animation when scrolling back past the start
                }
            });

            // Define the animation for elements with the class 'animated-word'
            titleAnimation.to('.animated-word', {
                opacity: 1,                            // Animate opacity to fully visible
                transform: 'translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)',
                // Animate position and rotation to reset
                ease: 'power2.inOut',                  // Use a smooth easing function for the transition
                stagger: 0.2                          // Apply a 0.02-second delay between animations of each word
            });
        }, containerRef); // Scope the animation to the containerRef element

        // Cleanup function to revert the animation context when the component unmounts
        return () => ctx.revert();
    }, []); // Empty dependency array ensures this runs only once


    return (

        <div className={`animated-title ${containerClass}`} ref={containerRef} >
            {
                title.split('br').map((line, index) => (
                    <div key={index} className='flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3'>
                        {
                            line.split(' ').map((word, i) => (
                                <span key={i} className='animated-word' dangerouslySetInnerHTML={{ __html: word }} />

                            ))
                        }
                    </div>
                ))
            }
        </div>


    )
}

export default AnimatedTitle