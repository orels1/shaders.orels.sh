---
sidebar_position: 3
---

import BunnyPlayer from "@site/src/components/BunnyPlayer";

# 🔲 Block Fader

A very specific fade in/out effect

-----

While the use of this shader is very limited to a particular need, I felt like it won't hurt to share it too. It allows you to fade the mesh in and out based on a predefined amount of columns

<BunnyPlayer videoId="9998a40b-9555-4bbf-b08a-60cdf3986339" />

<br />

<p align="center">
  <img alt="Block Fader Inspector" src="/img/docs/vfx/block-fader/block-fader.png" />
</p>

## Settings

- Progress: Controls the progress of the transition. Generally meant to be animated
- Fader Columns: The amount of columns to divide the mesh into. Uses the X coordinate of the first UV channel to do the division
- Enabled Fader Remapping: Enabling this allows to remap the progress values to offset, speed up or slow down the effect, while keeping the progress the same. Useful when you have many meshes of different sizes animated together, since you can use the same progress value across all of them and just remap accordingly
- Min - Max: Only visible if **Enable Fader Remapping** is checked. Sets the minimum and maximum values of the **Progress** parameter to be used for the actual fading
