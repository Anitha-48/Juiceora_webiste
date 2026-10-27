import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import storyVideo from '../puplic/images/Hero-animate-scroll.mp4'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollVideoScene({
  triggerRef,
  onReady,
  source = storyVideo,
  label = 'Juice-making video, controlled by scrolling',
  className = 'hero-video',
  onProgress,
}) {
  const root = useRef(null)
  const video = useRef(null)

  useLayoutEffect(() => {
    const element = video.current
    if (!element) return undefined

    let media
    let setupFrame = null
    const ctx = gsap.context(() => {
      media = gsap.matchMedia()
      media.add({
        all: 'all',
        reduce: '(prefers-reduced-motion: reduce)',
        small: '(max-width: 700px)',
      }, ({ conditions }) => {
        const { reduce, small } = conditions
        if (reduce) {
          element.pause()
          if (element.readyState >= 1) element.currentTime = 0
          return
        }

        let timeline
        let seekFrame = null
        let latestTime = 0
        const playhead = { time: 0 }
        const seekToLatestTime = () => {
          seekFrame = null
          if (element.seeking) return
          const nextTime = Math.max(0, Math.min(element.duration, latestTime))
          if (Math.abs(element.currentTime - nextTime) > 1 / 48) {
            element.currentTime = nextTime
          }
        }
        const queueSeek = (time) => {
          latestTime = time
          if (seekFrame === null && !element.seeking) {
            seekFrame = requestAnimationFrame(seekToLatestTime)
          }
        }
        const onSeeked = () => queueSeek(latestTime)
        const setup = () => {
          if (timeline || !triggerRef.current || !Number.isFinite(element.duration) || element.duration <= 0) return
          timeline = gsap.timeline({
            scrollTrigger: {
              trigger: triggerRef.current,
              start: 'top top',
              end: () => `+=${Math.max(window.innerHeight * 2, element.duration * window.innerHeight * (small ? 0.3 : 0.5))}`,
              scrub: true,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                triggerRef.current?.style.setProperty('--video-progress', self.progress)
                onProgress?.(self.progress)
              },
            },
          })
          timeline.to(playhead, {
            time: element.duration,
            duration: 1,
            ease: 'none',
            onUpdate: () => queueSeek(playhead.time),
          })
          element.addEventListener('seeked', onSeeked)
          ScrollTrigger.refresh()
        }

        const scheduleSetup = () => {
          if (setupFrame !== null) return
          setupFrame = requestAnimationFrame(() => {
            setupFrame = null
            setup()
          })
        }

        element.addEventListener('loadedmetadata', scheduleSetup)
        if (element.readyState >= 1) scheduleSetup()

        return () => {
          if (setupFrame !== null) {
            cancelAnimationFrame(setupFrame)
            setupFrame = null
          }
          if (seekFrame !== null) cancelAnimationFrame(seekFrame)
          element.removeEventListener('loadedmetadata', scheduleSetup)
          element.removeEventListener('seeked', onSeeked)
          timeline?.scrollTrigger?.kill()
          timeline?.kill()
          element.pause()
        }
      })
    }, root)

    return () => {
      media?.revert()
      ctx.revert()
    }
  }, [triggerRef])

  return (
    <div className={className} ref={root} role="img" aria-label={label}>
      <video
        className="scroll-story-video"
        ref={video}
        src={source}
        muted
        playsInline
        preload="auto"
        tabIndex={-1}
        onLoadedData={onReady}
        onError={onReady}
      />
    </div>
  )
}
