---
title: Holographic Parallax Shader
description: Simple stacked-parallax shader fitted for holograms
---

Simple stacked-parallax shader fitted for holograms

---

{% video url="https://iframe.mediadelivery.net/embed/165/1b13ab3b-b217-45f6-971f-a15a279f81ff?autoplay=true&loop=true&muted=true" loading="lazy" title="Holographic Parallax with video as a source" /%}

![Holographic Parallax Inspector](/img/docs/vfx/holographic-parallax/holographic-parallax-inspector.png "Holographic Parallax Inspector")

- Stacked Layers: Controls the number of stacked layers to draw
  - Ten/Six/Four/Two: Sets the number of layers to draw to 10, 6, 4 or 2
- Stacked Texture: The source texture to use
- Tint Color: Controls the tint of the topmost layer
- Stacked Color: Controls the tint of the stacked layers
- Stacked Color Smoothing: Controls the smoothness of the transition from the source texture color to the **Stacked Color**
  - You can set the **Stacked Color** to black and crank up the smoothing if you do not want this effect
- Stacked Intensity: Controls the brightness of the stacked layers
- Layer Fade: Controls the amount each layer fades by. Every next layer fades more than the previous one
- Layer Step: Controls the depth offset of each layer
- Angle Falloff: Controls how much the brightness/opacity of the stacked layers drops off when looking straight at the mesh surface vs at a glancing angle. This mimics real-world displays

## Dark Color Filter

- Dark Color Filter Enabled: Controls whether the filter is applied. When enabled - any colors below **Dark Threshold** in brightness will be cut out
- Dark Threshold: Controls the threshold below which the colors will be cut

{% video url="https://iframe.mediadelivery.net/embed/165/e0748f63-4623-4862-bc8c-3de84f6c1504?autoplay=true&loop=true&muted=true" title="An example of dark color filter" /%}

## Flicker

- Flicker Enabled: Controls whether the flicker effect is applied
- Flicker Speed: Sets the speed of the flicker
- Flicker Range: Controls the brightness range of the flicker effect. Setting this to a high range might be unpleasant to look at when up close, so make sure you use it wisely

## Masking

- Alpha Mask: The texture to use for masking
- Mask Channel: Controls which channel of the texture is used for masking
  - R/G/B/A: Uses the Red/Green/Blue/Alpha channel of the texture
- Mask Strength: Controls the strength of the masking effect
- Culling Mode: Controls the culling mode of the mesh
  - Off: Disables culling
  - Front: Culls the front faces
  - Back: Culls the back faces