import { Fragment, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import Highlight, { defaultProps } from 'prism-react-renderer'

import { Button } from '@/components/Button'
import { HeroBackground } from '@/components/HeroBackground'
import blurCyanImage from '@/images/blur-cyan.png'
import blurIndigoImage from '@/images/blur-indigo.png'
import heroStandardImage from '@/images/hero-standard.png'

const codeLanguage = 'javascript'
const code = `export default {
  strategy: 'predictive',
  engine: {
    cpus: 12,
    backups: ['./storage/cache.wtf'],
  },
}`

const tabs = [
  { name: 'Standard', content: (
    <Image
      src={heroStandardImage}
      alt="Standard"
      className="inset-0 absolute aspect-[640/350]"
      quality={100}
      width={640}
      height={350}
    />
  )},
  { name: 'AudioLink', content: (
    <div className="flex align-center justify-center w-[200%] h-[200%] relative -top-[50%] -left-[50%]">
      <iframe
        src="https://iframe.mediadelivery.net/embed/165/3dae482c-5b97-4a96-af7b-a78707b7606d?autoplay=true&loop=true"
        loading="lazy"
        allow="accelerometer; gyroscope; autoplay; encrypted-media;"      
        className="aspect-[1276/826]"
      >
      </iframe>  
    </div>
  ) },
  { name: 'Neon', content: (
    <div className="flex align-center justify-start w-[200%] h-[200%] relative -top-[50%] -left-[50%]">
      <iframe
        src="https://iframe.mediadelivery.net/embed/165/29bf1994-fcc7-4006-ad91-c753a284084d?autoplay=true&loop=true"
        loading="lazy"
        allow="accelerometer; gyroscope; autoplay; encrypted-media;"
        className="aspect-[1876/826]"
      >
      </iframe>  
    </div>
  ) },
  { name: 'Vertex Animation', content: (
    <div className="flex align-center justify-center w-[200%] h-[200%] relative -top-[50%] -left-[50%]">
      <iframe
        src="https://iframe.mediadelivery.net/embed/165/d0b9e444-d36b-4dae-afed-58a420a0b5ad?autoplay=true&loop=true"
        loading="lazy"
        allow="accelerometer; gyroscope; autoplay; encrypted-media;"
        className="aspect-[1276/826]"
      >
      </iframe>  
    </div>
  ) },
  { name: 'Clouds', content: (
    <div className="flex align-center justify-center w-[200%] h-[200%] relative -top-[50%] -left-[50%]">
      <iframe
        src="https://iframe.mediadelivery.net/embed/165/b4a74774-d7f3-4137-b28c-c1b7c1bd1b6a?autoplay=true&loop=true"
        loading="lazy"
        allow="accelerometer; gyroscope; autoplay; encrypted-media;"
        className="aspect-[1276/826]"
      >
      </iframe>
    </div>
  ) },
]

function TrafficLightsIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 42 10" fill="none" {...props}>
      <circle cx="5" cy="5" r="4.5" />
      <circle cx="21" cy="5" r="4.5" />
      <circle cx="37" cy="5" r="4.5" />
    </svg>
  )
}

export function Hero() {
  const [selectedTab, setSelectedTab] = useState(0)
  return (
    <div className="overflow-hidden bg-slate-900 dark:-mb-32 dark:mt-[-4.5rem] dark:pb-32 dark:pt-[4.5rem] dark:lg:mt-[-4.75rem] dark:lg:pt-[4.75rem]">
      <div className="py-16 sm:px-2 lg:relative lg:py-20 lg:px-0">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-16 gap-x-8 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
          <div className="relative z-10 md:text-center lg:text-left">
            <div className="relative">
              <p className="inline bg-gradient-to-r from-orange-200 via-red-400 to-orange-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                orels Unity Shaders
              </p>
              <p className="mt-3 text-2xl tracking-tight text-slate-400">
                A collection of practical Unity shaders for your next project.
              </p>
              <div className="mt-8 flex gap-4 md:justify-center lg:justify-start">
                <Button href="#quick-start">Get started</Button>
                <Button href="https://github.com/orels1/orels-Unity-Shaders" target="_blank" variant="secondary">
                  View on GitHub
                </Button>
              </div>
            </div>
          </div>
          <div className="relative lg:static xl:pl-10">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-300 via-sky-300/70 to-blue-300 opacity-10 blur-lg" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-300 via-sky-300/70 to-blue-300 opacity-10" />
              <div className="relative rounded-2xl overflow-hidden bg-[#0A101F]/80 ring-1 ring-white/10 backdrop-blur aspect-[640/350]">
                <div className="absolute -top-px left-20 right-11 h-px bg-gradient-to-r from-sky-300/0 via-sky-300/70 to-sky-300/0" />
                <div className="absolute -bottom-px left-11 right-20 h-px bg-gradient-to-r from-blue-400/0 via-blue-400 to-blue-400/0" />
                <div className="pl-4 pt-4 pb-8 relative z-20 bg-gradient-to-b from-slate-900 to-slate-900/0">
                  <div className="mt-1 flex text-xs flex-wrap">
                    {tabs.map((tab, index) => (
                      <div
                        key={tab.name}
                        onClick={() => setSelectedTab(index)}
                        className={clsx(
                          'flex h-6 rounded-full cursor-pointer ml-2',
                          tabs[selectedTab].name === tab.name
                            ? 'bg-gradient-to-r from-orange-400/30 via-orange-400 to-orange-400/30 p-px font-medium text-orange-300'
                            : 'text-slate-300 hover:text-orange-300'
                        )}
                      >
                        <div
                          className={clsx(
                            'flex items-center rounded-full px-2.5',
                            tabs[selectedTab].name === tab.name && 'bg-slate-800'
                          )}
                        >
                          {tab.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 z-10">
                  {tabs[selectedTab].content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
