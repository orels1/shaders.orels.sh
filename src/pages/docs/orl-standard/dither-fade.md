---
title: Dither Fade Shader
description: Options relevant to the orels1/Standard Dither Fade shader and other Dither Fade variants
---

Options relevant to the orels1/Standard Dither Fade shader and other Dither Fade variants

---

A distance fade shader that uses a special dither texture for a smooth cutout transition during the fade.

Has both PBR and VFX (Unlit) variants:

- orels1/Standard Dither Fade
- orels1/VFX/Dither Fade

{% video url="https://iframe.mediadelivery.net/embed/165/3da52777-7b1d-49d4-8293-3e2e7429f415?autoplay=true&loop=true&muted=true" title="Dither Fade Demo" /%}

![Dither Fade Inspector](/img/docs/orl-standard/dither-fade/dither-fade.png "Dither Fade Inspector")

- Dither Texture: The texture used to fade the dissolve effect. Is expected to be a special Bayer/other dither texture. The shader package comes with one included
- Fade Start: Controls the distance at which the fading will start. Is defined in World Units
- Fade End: Controls the distance at which the fading will end. Is defined in World Units
- Override Fade: When enabled - provides manual control over the fade. Useful for animations
- Fade Progress: Only visible when **Override Fade** is enabled. Controls the fade progress, where 1 is fully faded out