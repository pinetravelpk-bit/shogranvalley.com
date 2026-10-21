# Travel experience upgrade

The existing Next.js site now has a three-scene cinematic homepage, sticky navigation, destination cards, scroll reveals, hover effects, a reading-progress line and an animated route illustration. Existing imported content, hotel routes and media URLs remain in place. Original homepage introduction and statistics remain visible below the hero.

The three silent MP4 loops in public/travel are animated pans/zooms of the site's existing photographs, not original camera footage. Replace valley.mp4, meadows.mp4 and forest.mp4 with owned video footage to use real travel films. Poster images remain visible when video autoplay is unavailable. Visitors can pause the slideshow; reduced-motion settings disable automatic slides, video and decorative animation. Scrolling is native and is not intercepted.

Phones receive a fixed Explore / Hotels / Tours / Plan trip / Get app navigation bar. Hotel booking controls sit above it; the booking sheet opens above both bars. The web app manifest, icons and service worker support Add to Home Screen on compatible browsers over HTTPS. Installation remains a browser feature; this is a PWA, not an App Store or Google Play native app. iPhone visitors receive Safari installation instructions when no browser install prompt is available.

Only the generic offline screen and its icon are cached. Live pages, rates, customer records, admin responses and booking requests are never cached by the service worker. Browsing current information and sending an enquiry require internet. The private hosted preview still simulates enquiries; deploy the full Next.js project for the existing booking/admin APIs.

Validation: both production and static-preview builds; existing migration and booking tests; exported local assets, manifest icons and video files. Browser interaction, installation and actual-device visual verification were unavailable in this environment. Check iOS Safari and Android Chrome before production launch.
