---
title: Vertical Fog Shader
description: Options relevant to the orels1/Standard Vertical Fog shader
---

Options relevant to the orels1/Standard Vertical Fog shader

---

This shader applies a world-space gradient to the affected meshes, which is often useful for emulating height fog for distant meshes, like skybox-type cityscapes

{% video url="https://iframe.mediadelivery.net/embed/165/1a6825e5-6070-4e3f-8918-ef4f17653783?autoplay=true&loop=true&muted=true" title="Vertical Fog Demo" /%}

![Vertical Fog Inspector](/img/docs/orl-standard/vertical-fog/vertical-fog-inspector.png "Vertical Fog Inspector")

## Settings

- Bottom Color: The start color of the gradient
- Top Color: The end color of the gradient, both start and end support alpha values
- Start Height: The beginning of the gradient, in world space
- End Height: The end of the gradient, in world space
- Tint: Global tint applied to the whole mesh after the gradient application. Helps with skybox/cloud/ground layer blending in cases where GI isn't really available easily