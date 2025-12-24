---
title: Masked Tweaks Module
description: Adjust your material's parameters via a mask texture
---

Adjust your material's parameters via a mask texture

---

When you want to provide an easy way to adjust surface parameters without swapping materials or editing textures - it can be useful to use a mask texture.

Masked Tweaks can be used to adjust Albedo and Smoothness parameters of the surface based on RGBA channels of a mask texture.

![Masked Tweaks Inspector](/img/docs/configurable-shaders/modules/masked-tweaks.png "Masked Tweaks Inspector")

## Compatibility

✨ This module is compatible with all lighting models

Note: Only the PBR lighting model supports the **Tweak Smoothness** option

## Settings

- Enable Masked Tweaks: Enables the effect
- Masked Tweaks Map: The RGBA mask texture to use for tweaking

### Colors

- Swap Colors: Enables swapping the colors completely based on the **Masked Tweaks Map**
  - You can adjust the Alpha value of the colors below to control the strength of the swapping
  - Red Mask Color: Sets the color to use where the mask texture is red
  - Green Mask Color: Sets the color to use where the mask texture is green
  - Blue Mask Color: Sets the color to use where the mask texture is blue
  - Alpha Mask Color: Sets the color to use where the mask texture's alpha is above 0
- HSV Adjustment: Enables adjusting the HSV of the Albedo based on the **Masked Tweaks Map**
  - Red Mask Channel
    - Adjusment Strength: Controls the strength of the adjustment where the mask texture is red
    - Hue: Shifts the hue
    - Saturation: Adjusts the saturation
    - Value: Adjusts the value
  - Green Mask Channel: Same as above, but for green
  - Blue Mask Channel: Same as above, but for blue
  - Alpha Mask Channel: Same as above, but for alpha above 0

### Smoothness

- Tweak Smoothness: Enables tweaking the smoothness based on the **Masked Tweaks Map**
- Offset Smoothness: Enables adjusting the original smoothness instead of replacing it
- Red Mask Smoothness: Sets the smoothness to use where the mask texture is red
- Green Mask Smoothness: Sets the smoothness to use where the mask texture is green
- Blue Mask Smoothness: Sets the smoothness to use where the mask texture is blue
- Alpha Mask Smoothness: Sets the smoothness to use where the mask texture's alpha is above 0
