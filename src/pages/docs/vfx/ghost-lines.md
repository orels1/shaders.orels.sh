---
title: Ghost Lines Shader
description: Eerie glowing shader with line pattern overlay
---

Lines overlay on top of a glowing vertex wobble shader. Inspired by Ghostwire: Tokyo.

---

{% video url="https://iframe.mediadelivery.net/embed/165/d93de200-d0f3-4817-90e2-1ba2de6b4810?autoplay=true&loop=true&muted=true" title="Ghost Lines shader with default settings" /%}

![Ghost Lines Inspector](/img/docs/vfx/ghost-lines/ghost-lines-inspector.png "Ghost Lines Inspector")

- Settings Mode: Controls the visibility of settings
  - Basic: Limits the settings to the most commonly used ones
  - Full: Shows all the settings

The documentation below describes all the settings, set the **Settings Mode** to **Full** to see them all.

While this shader has a lot of settings, the defaults should look good out of the box, so you can just drop it onto the mesh and call it a day.

You can achieve very interesting combinations if you take advantage of the provided settings though, so don't be afraid to experiment!

## Base Glow Settings

- Gradient Direction: Controls the direction of the Glow gradient
  - X/Y/Z: Sets the gradient to be aligned with the X/Y/Z axis
- Gradient Sharpness: Adjust the sharpness of the glow gradient. The smaller the value - the more area the gradient will cover
- Gradient Range (Min/Max): Adjust the range of the glow gradient in Local Space. X - gradient start, Y - gradient end
- Top Color: Adjusts the end color of the gradient
- Bottom Color: Adjusts the start color of the gradient
- Rim Light Sharpness: Controls how sharp the rim light falloff will be. Higher values push the rim light toward the edges
- Rim light Push: Pushes the rim light gradient toward the center

## Lines Settings

- Origin: Sets the point from which the lines will originate
- Movement: Controls the movement speed of the lines across the mesh surface
- Scale: Controls the number of lines
- Nudge: Shifts the line gradient across the line width. 0.5 will make the gradient start in the middle of the line. Only visible when **Falloff** is above 0
- Falloff: Controls the gradient falloff of the lines. The lines become solid at 0
- Strength: Controls the visibility of the lines

## Lines Distortion

- Distortion Texture: Sets the texture that will be used for the distortion. Not intended to be modified as it uses a special noise texture
- Scale: Controls the scale of the distortion noise. Higher values generate more complex patterns
- Strength: Controls the strength of the distortion
- Movement: Controls the scrolling of the distortion texture

## Lines Colors

- Top Lines Color: Sets the color of the lines at the top of the mesh
- Bottom Lines Color: Sets the color of the lines at the bottom of the mesh

## Material Influence

- Lines Influence PBR: Enables Lines influence over the Metallic/Smoothness/Albedo properties of the material
- Metallic Influence: Controls the amount of influence the lines have over the Metallic property of the material
- Smoothness Influence: Controls the amount of influence the lines have over the Smoothness property of the material
- Albedo Influence: Controls the amount of influence the lines have over the Albedo of the material

## Vertex Wobble

- Wobble Scale: Controls the frequency of the wobble. High polycount mesh is recommended at higher values
- Wobble Strength: Controls the strength of the wobble
- Wobble Movement: Controls the speed and direction of wobble movement across the mesh surface
- Wobble Y Range (Min/Max): Limits the range of the wobble on the Y axis of the mesh in Local Space. X - wobble start, Y - wobble end


The full inspector looks like this

![Ghost Lines Full Inspector](/img/docs/vfx/ghost-lines/ghost-lines-inspector-full.png "Ghost Lines Full Inspector")