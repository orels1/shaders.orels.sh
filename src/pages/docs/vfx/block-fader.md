---
title: Block Fader
description: A very specific fade in/out effect
---

A very specific fade in/out effect

---

While the use of this shader is very limited to a particular need, I felt like it won't hurt to share it too. It allows you to fade the mesh in and out based on a predefined amount of columns

{% video url="https://iframe.mediadelivery.net/embed/165/9998a40b-9555-4bbf-b08a-60cdf3986339?autoplay=true&loop=true&muted=true" title="Block Fader Demo" /%}

![Block Fader Inspector](/img/docs/vfx/block-fader/block-fader.png "Example setup used in the Demo world for the outdoor clouds")

## Settings

- Progress: Controls the progress of the transition. Generally meant to be animated
- Fader Columns: The amount of columns to divide the mesh into. Uses the X coordinate of the first UV channel to do the division
- Enabled Fader Remapping: Enabling this allows to remap the progress values to offset, speed up or slow down the effect, while keeping the progress the same. Useful when you have many meshes of different sizes animated together, since you can use the same progress value across all of them and just remap accordingly
- Min - Max: Only visible if **Enable Fader Remapping** is checked. Sets the minimum and maximum values of the **Progress** parameter to be used for the actual fading
