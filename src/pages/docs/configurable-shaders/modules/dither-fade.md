---
title: Dither Fade Module
description: Fade objects in and out via dithering based on distance to camera
---

Fade objects in and out via dithering based on distance to camera

---

Uses cutout dithering to provide a fade effect. Dithering is performed in screen space and can be a litlte jarring in VR if used closed to camera.

A stable world-space dither might be available in the future.

{% video url="https://iframe.mediadelivery.net/embed/165/3da52777-7b1d-49d4-8293-3e2e7429f415?autoplay=true&loop=true&muted=true" title="Dither Fade Demo" /%}

![Dither Fade Inspector](/img/docs/orl-standard/dither-fade/dither-fade.png "Dither Fade Inspector")

## Compatibility

✨ This module is compatible with all lighting models

## Settings

- Dither Texture: The texture used to fade the dissolve effect. Is expected to be a special Bayer/other dither texture. The shader package comes with one included
- Fade Start: Controls the distance at which the fading will start. Is defined in World Units
- Fade End: Controls the distance at which the fading will end. Is defined in World Units
- Override Fade: When enabled - provides manual control over the fade. Useful for animations
- Fade Progress: Only visible when **Override Fade** is enabled. Controls the fade progress, where 1 is fully faded out
