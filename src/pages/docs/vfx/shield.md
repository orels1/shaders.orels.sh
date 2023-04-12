---
title: Shield Shader
description: Multi-layered energy shield shader with pre-baked noise
---

Multi-layered energy shield shader with pre-baked noise

---

{% video url="https://iframe.mediadelivery.net/embed/165/be86f3f9-2f0c-485a-b127-5156652945d5?autoplay=true&loop=true&muted=true" title="Shield Shader Demo" /%}

![Shield Shader](/img/docs/vfx/shield/shield-inspector.png "Shield Shader")

- Global Tint: Sets the tint color applied to the whole effect
- Noise Texture: A special pre-baked noise texture. Not meant to be modified
- Layer 1
  - Color: Controls the color of the layer
  - Smoothing: Sets the level of smoothing applied to the layer lines. The higher the value - the more blurred the effect will be
  - Width: Controls the width of the lines. Becomes solid blobs at high values
  - Movement: Controls the movement of the effect in World Space along the X/Y/Z axis
- Layer 2: Provides the same settings as **Layer 1** but for the 2nd layer of the effect
- Depth Blend Enabled: Toggles the depth-based edge highlight effect when near other objects in the environment
- Blend Distance: Controls how far the objects need to be from the effect to start blending
- Blend Tint: Sets the tint color applied to the edge highlight effect


{% callout type="note" title="Depth Blending Requires Depth Pass" %}
The depth blending effect requires a depth pass in the world. The easiest way to achieve one is to create a light with settings like this:

- Intensity 0.001
- Shadow Type: Hard Shadows
- Strength: 0.001
- Culling Mask: Only Stereo Left
{% /callout %}