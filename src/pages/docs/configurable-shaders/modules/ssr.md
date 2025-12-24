---
title: SSR Module
description: A screen space reflections module
---

A screen space reflections module

---

This provides support for Screen Space Reflections in any PBR shader.

{% video url="https://iframe.mediadelivery.net/embed/165/eaa0222e-4396-4b6d-9c9e-27fb6bef5f9a?autoplay=true&loop=true&muted=true" title="SSR Demo" /%}

![SSR Inspector](/img/docs/configurable-shaders/modules/ssr.png "SSR Inspector")

## Compatibility

✅ PBR  |  ❌ VFX  |  ❌ Toon  |  ❌ UI

## Settings

- Enable SSR: Enables the effect
- Maximum Steps: Controls the maximum number of steps the rays are allowed to take. Higher values will result in more accurate reflections, but will also be more expensive.
- Step Size: Controls the size of each step. Lower values will result in more accurate reflections, but will reduce the maximum distance the rays can travel.
- Edge Fade: Controls the smoothness and distance of the fade of reflections from the edges of the screen. This can help mask the limited nature of Screen Space effects.
- Baked Reflection Strength: Controls the strength of regular baked reflection probes. Sometimes bright probes can look bad when combined with SSR, you can use this to reduce the strength of the probes.

## Internal Parameters

These are internal to the SSR algorithm and generally shouldn't be changed

- Intersection (L)
- Intersection (R)
- Noise Texture


{% callout type="note" title="Requires Depth Pass" %}
This effect requires a depth pass in the world. The easiest way to achieve one is to create a light with settings like this:

- Intensity 0.001
- Shadow Type: Hard Shadows
- Strength: 0.001
- Culling Mask: Only Stereo Left
{% /callout %}
