import React from 'react'
import AnimatedTitle from './AnimatedTitle'

const Story = () => {
    return (
        <section id='story' className='min-h-dvh w-screen bg-black text-blue-50' >
            <div className='flex size-full flex-col items-center py-10 pb-24'>
                <p className='font-general text-sm uppercase md:text-[10px] ' >The Multiversal IP World</p>
                <div className='relative size-full'>
                    <AnimatedTitle title={''} />


                </div>
            </div>
        </section>
    )
}

export default Story