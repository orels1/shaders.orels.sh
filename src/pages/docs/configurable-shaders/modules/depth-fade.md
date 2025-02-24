---
title: Depth Fade Module
description: Fade objects in and out based on depth information
---

Fade objects in and out based on depth information

---

If you want to fade out some obejcts when they are close to a surface behind them - you can use the Depth Fade module to achieve that. It is set up to mimic unity's Soft Particles mode.

![Depth Fade Inspector](/img/docs/configurable-shaders/modules/depth-fade.png "Depth Fade Inspector")

## Compatibility

✨ This module is compatible with all lighting models

## Settings

- Enable Depth Fade: Enables the effect
- Near Distance: Controls the distance at which the object will start fading out
- Far Distance: Controls the distance at which the object will be fully faded out
- Alpha Premultiply: Multiplies the albedo by the alpha, which can be useful for things like particle effects or any other additive shaders

{% callout type="note" title="Requires Depth Pass" %}
This effect requires a depth pass in the world. The easiest way to achieve one is to create a light with settings like this:

- Intensity 0.001
- Shadow Type: Hard Shadows
- Strength: 0.001
- Culling Mask: Only Stereo Left
{% /callout %}
