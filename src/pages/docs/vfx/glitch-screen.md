---
title: Glitch Screen Shader
description: Fake screen shader with a variety of glitch effects
---

A set of glitch effects overlaid on top of a fake CRT shader. Inspired by Stray

---

{% video url="https://iframe.mediadelivery.net/embed/165/167030df-d0f1-474d-8a6f-ecc06b46208a?autoplay=true&loop=true&muted=true&preload=true" title="Glitch Screen Shader with default settings" /%}

![Glitch Screen Inspector](/img/docs/vfx/glitch-screen/glitch-screen-image.png "Glitch Screen Inspector")

## General Settings

- Base Texture: the base texture of the poster to be used for the glitch effect
- Emission: controls the emission of the **Base Texture**. When using **Subpixel Effect** it is recommended to set the emission intensity higher
- Effects Cycle Speed: controls the overall frequency of the glitch effects

## Subpixel Effect Settings

- Add Subpixel Effect: adds a CRT-like subpixel effect to base texture
- Horizontal Pixels: controls the number of horizontal pixels
- Vertical Pixels: controls the number of vertical pixels
- Color Scales (R,G,B): controls the color intensity of each color component of a pixel

## Shift Glitch Settings

The main glitch effect that shifts pixels of the **Base Texture** around based on a special texture

- Shift Mask: the texture that will be used to drive the shift effect. Default texture is provided
  - Red Channel: controls which areas ar going to be shifted
  - Green Channel: offsets the shift time to make a more "staggered" effect
  - Blue Channel: controls how much the area will be shifted by
  - Alpha Channel: A special 64x64 grid of time offsets. This effectively acts as randomisation noise for the shift effect. Every cycle it will go to the next tile in the grid and offset the current time value by the value of that grid cell. Is not meant to be modified
- Shift Chance: controls how often the shift effect will occur
- Shift Randomisation Amount: controls how much the shift distance will differ between each cycle

## Color Glitch Settings

Adds a pixelated invert-color glitch effect on top of the shifted image

- Mask: the texture that will drive the color glitch. Default texture is provided
  - Red Channel: an 8x4 grid of areas that will be affected. The intensity will offset the time when the effect will occur
  - Green Channel: a 32x32 grid of time offsets for individual pixels on the poster. This is what drives the actual color inversion and when it happens
  - Blue Channel: unused
  - Alpha Channel: a 64x64 grid of time offsets. Acts the same way as the **Shift Masks** alpha channel. Not meant to be modified
- Chance: controls how often the color glitch will occur
- Speed: controls the speed of pixel inversion animation
