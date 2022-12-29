---
sidebar_position: 5
---

import BunnyPlayer from "@site/src/components/BunnyPlayer";

# 🎲 Color Randomisation

Options relevant to the orels1/Standard Color Randomisation shader

-----

This shader provides a quick way to tint a bunch of objects using the same material based on their world position.

In practice, this means that you can duplicate the same mesh many times, move them around, and get a differently colored mesh in each of the spots, see demo below

<BunnyPlayer videoId="c0f31e6c-a86c-4cc5-99ca-2f38a05f300c" />

<br />

:::info

While the demo above shows the objects moving, generally speaking you are not expected to move these in runtime, as this shader is primarily an environment design tool

:::

:::caution Do not static batch

Static batching removes correct object origin data, utilize GPU instancing instead

:::

## Options

<p align="center">
  <img alt="Color Randomisation settings" src="/img/docs/orl-standard/color-random/color-random.png" />

  <br />

  <small>Color Randomisation settings</small>
</p>

- Color Palette: Controls the tinting, can be any size, but generally it can be as small as possible. It is advise to set it to no compression, point filter and clamp
- Mask By: Controls the masking of the tint, has multiple options
  - Albedo: Uses the main Albedo texture for tint masking. Additional options are provided to filter the albedo data
  - Mask Texture: Uses an extra texture to mask the tinting effect
- Mask Contrast: Only visible when **Mask By** is set to **Albedo**. Allows you to select a subset of the albedo colors as the mask source. See example below
- Randomisation Mask: Only visible when **Mask By** is set to **Mask Texture**. Specifies the texture to be used for the tint masking
- Tint Strength: Controls the intensity of the applied tinting
- Color Boost: Tinting can often darken the original colors. Color boost allows you to lift the gamma of the colors which can help combat that

<BunnyPlayer videoId="697ecbb9-336f-4b01-9cb2-00b7352153c0" />

<p align="center">
  <small>Adjusting Mask Contrast</small>
</p>
