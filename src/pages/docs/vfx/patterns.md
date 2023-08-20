---
title: Patterns
description: Options relevant to the orels1/VFX/Patterns shader
---

Options relevant to the orels1/VFX/Patterns shader

---

This shader aims to provide an easy way to add background detail to your environments. It can be used to add a varity of patterns with a powerful kaleidoscope UV effect that can transform a simple effect to a constantly evolving pattern

{% video url="https://iframe.mediadelivery.net/embed/165/d3aff253-24db-458f-a566-9eb605478488?autoplay=true&loop=true&muted=true&preload=true" title="Build-In Patterns Presets" /%}

![Patterns Inspector](/img/docs/vfx/patterns/patterns-image.png "Patterns Inspector")

{% callout type="note" title="Presets Included" %}
This shader is the first to receive a set of built-in Presets. Simply select one from the **Selected Preset** dropdown in the **Patterns** section and it will load up a preset. Note that it will replace all the current settings with the ones stored in the preset (a warning will be displayed)
{% /callout %}

- Selected Preset: loads a preset from the list of available presets
- Super Sampling: controls the level of Super Sampling applied to the effect. Can improve appearance at a distance at a slight performance cost
- Color 1: the first color used in the pattern
- Color 2: the second color used in the pattern

## Kaleidoscope Settings

Kaleidoscope UVs convert even the simplest patterns into interesting and complex effects. I highly recommend you try it out!

- Kaleidoscope UV: enables the kaleidoscope UV transformations
- Slice Count: controls the number of slices in the kaleidoscope. Higher values will result in more complex patterns
- Spin Speed: controls the speed of the kaleidoscope rotation
- Spin Time Offset: offsets the starting time of the kaleidoscope rotation. Can be used with **Spin Speed** set to 0 to select a particular rotation that looks best in your effect
- Tiling: controls the overall tiling of the kaleidoscope effect

## Circles Settings

- Circle Origin: controls the origin point of the expanding circles pattern in UV space. Only X and Y values are used
- Circle Count: controls the number of circles in the pattern. Not exact, adjust as necessary
- Circle Smoothing: adjusts the smoothing of the circles. Higher values result in visually "blurrier" circles
- Expand Speed: controls the speed of the expanding animation. Negative values will invert the animation
- Time Offset: offsets the starting time of the expanding effect. Can be used with **Expand Speed** set to 0 to select a particular frame that looks best in your effect

## Lines Mask Settings

Lines mask adds repeating lines on top of the base effect. Best demonstrated by the **Circular Lines** preset.

- Add Lines: enables the lines mask
- Line Thickness: controls the thickness of the lines
- Line Smoothing: controls the amount of smoothing applied to the lines. Higher values result in visually "blurrier" lines
- Offset (Degrees): controls how much lines are offset from each other. E.g. a value of 30 will add a line every 30 degrees, a value of 180 will only have 2 lines 180 degrees apart, etc
- Spin Speed: controls how fast the lines are rotating
- Alternate Spin: alternates the direction of the lines rotation per circle. Does not work well with negative Spin Speed values
- Spin Time Offset: offsets the starting time of the lines rotation. Can be used with **Spin Speed** set to 0 to select a particular rotation that looks best in your effect