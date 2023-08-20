---
title: Puddles Shader
description: Options relevant to the orels1/Standard Puddles shader
---

Options relevant to the orels1/Standard Puddles shader

---

This shader allows you to add puddles to any PBR material, using a generic mask texture or leveraging height to add a water layer to the surface.

{% video url="https://iframe.mediadelivery.net/embed/165/198c68d6-52e9-4a6b-b01c-5a97c519605a?autoplay=true&loop=true&muted=true&preload=true" title="Puddles in action" /%}

![Puddles Inspector](/img/docs/orl-standard/puddles/puddles-image.png "Puddles Inspector")

## General Settings

- Puddles Mode: controls how puddles will be applied to the surface
  - Height Based: the most realistic of the three options, requires a **Height** texture to be added in the Parallax section. If you want to just use the **Height** texture without parallax - use the **Texture Mask** mode
  - Texture Mask: simple texture-based puddles, that leverage the **Puddles**** Mask** texture. Make sure **Mask Strength** is above 0
  - Vertex Color Mask: same as the **Texture Mask** but uses vertex colors instead
- Vertex Channel: Only visible when **Puddles Mode** is set to **Vertex Color Mask**. Controls which color channel is used to mask the puddles
- Water Level: Adjusts the level of the puddles by filtering through the mask
- Water Edge Smoothing: smooths out the edges of the puddles. High values can apply a "wet" effect to the whole surface of the material
- Color: The color tint of the puddles. Darker colors work best

## Masking Settings

- Puddles Mask: masks the puddles based on the texture. Black pixels will not have puddles. When **Puddles Mode** is set to **Texture Mask** this will act as the primary driver for the puddles
  - A sample texture is provided in ORL Shader Generator -> Runtime -> Assets -> Puddles_mask
- Mapping Space: controls how the **Puddles Mask** is mapped to the surface
  - World Space: biplanar projection in World coordinates
  - Local Space: biplanar projection in Local coordinates
  - UV: UV projection
  - Triplanar: triplanar projection in World coordinates
- Mapping Axis: only visible when **Mapping Space** is set to **World Space** or **Local Space**. Controls which axis are used for biplanar projection
- Mask Strength: controls the influence of **Puddles Mask** over the puddles. If **Puddles Mode** is set to **Texture Mask** - it is recommended to set this to 1

## Raindrops Settings

- Enable Raindrops: adds raindrops to the puddles
- Raindrops Texture: controls the raindrops effect. A sample texture is provided
  - Red Channel: defines the raindrop progression gradient, essentially how the raindrop will animate. By default is a simple radial gradient
  - Green/Blue Channels: defines the raindrop normal. This is the actual water ripple normal that will be applied to the surface
  - Alpha Channel: controls the time offset of each raindrop, allowing for a more random animation
- Mapping Space: controls how the **Raindrops Texture** is mapped to the surface
  - World Space: biplanar projection in World coordinates
  - Local Space: biplanar projection in Local coordinates
  - UV: UV projection
- Mapping Axis: only visible when **Mapping Space** is set to **World Space** or **Local Space**. Controls which axis are used for biplanar projection
- Amount: controls the amount of raindrops to show
- Normal Strength: controls the strength of the raindrop normals. Lower values look like lighter rain
- Speed: controls the speed of the raindrops animation
- Layer 2 Rotation: rotates the 2nd layer of raindrops for a more randomized effect