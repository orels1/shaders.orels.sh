---
title: Clouds Shader
description: Stylized, performant and cross-platform cloud layer shader
---

A simple Cloud Layer shader

---

This shader is aimed at providing a passable cloud layer effect for background use without using any noise generators. The effect is fully unlit and relies on the artistic use of gradients to look correct in the environment

{% callout type="note" title="Mesh Requirements" %}
Put this shader on a pre-subdivided mesh. I recommend anywhere from 32k to 128k triangles for a small to medium-sized layer (room scale). And 512k for outdoor clouds. The shader will not work well with a low-poly mesh.
{% /callout %}


{% video url="https://iframe.mediadelivery.net/embed/165/b4a74774-d7f3-4137-b28c-c1b7c1bd1b6a?autoplay=true&loop=true&muted=true" title="Clouds Demo" /%}

![Cloud Inspector](/img/docs/vfx/clouds/clouds.png "Example setup used in the Demo world for the outdoor clouds")

## Settings

- Noise Tex: A special pre-baked noise texture that is not meant to be changed
- Depth Transparency: Controls the amount of depth-based blending applied. Based on the name - requires a depth light (see below)
- Color Bottom: Controls the start color of the gradient
- Color Top: Controls the end color of the gradient
- Height Bottom: Controls the position of the gradient start, applied in local space
- Height Top: Controls the position of the gradient end, applied in local space
- Extrusion Mode: Determines the way the cloud movement is done
  - Normal: The mesh will move along the normal vectors of the surface
  - World Space: The mesh will be moved along the pre-determined direction in world space
- Extrusion Direction: Only visible when Extrusion Mode is set to World Space. Controls the world-space direction of the extrusion applied by the cloud noise
- Only Top: Only visible when Extrusion Mod is set to World Space. Limits the vertex movement to the upwards-facing vertices

{% callout type="note" title="Requires Depth Pass" %}
The depth blending effect requires a depth pass in the world. The easiest way to achieve one is to create a light with settings like this:

- Intensity 0.001
- Shadow Type: Hard Shadows
- Strength: 0.001
- Culling Mask: Only Stereo Left
{% /callout %}