# Essential Space, redesigned

A clickable UI/UX prototype for a concept redesign of Essential Space on the Nothing Phone (3a), by Jaiwardhan Panwar.

On my parents' two Phone (3a) devices, roughly 7 in 10 Essential Space captures were accidental presses of the Essential Key, and they rarely noticed. The prototype covers three flows:

1. **Capture moment**: a chip appears next to the key with Undo and Keep.
2. **Review tray**: likely accidental captures are held for 7 days instead of cluttering the feed.
3. **Search**: answers the question ("₹1,240, due on 12 October") instead of listing screenshots.

## Run locally

It is a plain static site with no build step:

```bash
npx serve .
```

## Deploy

Hosted on Vercel. Pushing to `main` redeploys. `vercel.json` sets clean URLs, long-term caching for fonts and basic security headers.

## Credits

Fonts: Doto, Space Grotesk and Space Mono, all under the SIL Open Font License, via Fontsource.

Unsolicited concept. Not affiliated with or endorsed by Nothing Technology Limited.
