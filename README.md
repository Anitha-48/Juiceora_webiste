# Juicora website

## Run locally

Install the project dependencies with `npm install`, then start the Vite development server with `npm run dev`. Run `npm run build` to create the production bundle.

## Scroll-controlled process video

The home page opens with a short JUICORA-branded loading intro, then reveals `src/puplic/images/Hero-animate-scroll.mp4` filling the viewport; the headline, description, and hero buttons are removed. This web-optimized H.264 copy has front-loaded MP4 metadata and keyframes every 0.5 seconds for responsive seeking. The intro waits for the video's first frame and has a timeout fallback. Video time is scrubbed by scroll position: scrolling down advances the process and scrolling back reverses it. The video hero pins while its timeline plays, with a shorter scroll distance on mobile. The video is muted and does not autoplay. Visitors who prefer reduced motion see a static frame instead.

The pomegranate video story replaces the four former homepage feature boxes. Its opening copy fades out over the final part of the video; no CTA is overlaid on the video. Four fruit-benefit cards appear below it, followed by a scroll-controlled blueberry video story with no text overlay and the page CTA; the benefit copy distinguishes whole-fruit fibre from juiced fruit. The blueberry scene uses `src/puplic/images/blue berry-animate-scroll.mp4`, optimized with front-loaded metadata and keyframes every 0.5 seconds.

The scroll-controlled player is in `src/components/ScrollVideoScene.jsx`; GSAP ScrollTrigger is cleaned up when the component unmounts. Its `scrub: true` setting keeps each timeline locked to the scroll position without continuing to move after scrolling stops. Video seeks are coalesced while a decode is in progress, then the latest target is applied; the final seek tolerance is under half a 24 fps frame. The pomegranate story replaces the four home-page feature cards and uses `src/puplic/images/Pomegrant-animate-scroll.mp4`, a web-optimized copy with metadata at the start and keyframes every 0.5 seconds.

Product and route pages remain available at `/juices`, `/about`, `/benefits` and `/contact`.

The homepage and juice catalog show eight fruit flavours. Cards use fruit photography or custom fruit illustrations (no bottle artwork behind the images) and enter with a staggered reveal.
