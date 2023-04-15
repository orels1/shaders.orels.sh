---
title: Laser Shader
description: A simple laser shader with support for trail renderers
---

A simple laser shader with support for trail renderers

---

{% video url="https://iframe.mediadelivery.net/embed/165/37f9c8f9-e372-4ce0-9681-0503605fa3e1?autoplay=true&loop=true&muted=true" title="Laser Shader Demo" /%}

![Laser Shader](/img/docs/vfx/laser/laser-inspector.png "Laser Shader")

- Color: Controls the main color of the laser
- Use Trail Color: Enabling this ignores the **Color** and uses the vertex color of the Trail Renderer instead
- Noise Scale: Controls the scale of the noise applied to the laser. The higher the scale the more the effect will look like a cloud of particles
- 1st Noise Strength: Controls the brightness of the 1st noise layer
- 1st Noise Contrast: Controls the range of values used by the noise layer
- 1st Noise Scroll Space: Sets the coordinate space used for the noise layer. When set to Local Space - you can freely scale the object and the relative noise scale will stay the same.
- 1st Noise Scroll Scroll (X/Y/Z): Sets the scrolling speed of the noise layer along the X/Y/Z axis
- 2nd Noise scale/Strength/Contrast... sets the same parameters for the 2nd noise layer
- Waviness Texture: Sets the texture to be multiplied over the noise effect. Useful for making the noise pattern non-uniform across the length of the laser beam
- Waviness Contrast: Controls the range of values used by the waviness texture
- Waviness Scroll (X/Y): Sets the scrolling speed of the waviness texture along the X/Y axis
- Noise Texture: A special pre-baked noise texture. Not meant to be modified

{% callout type="note" title="Waviness Texture" %}
Try out different textures in the **Waviness Texture slot**! Even the default particular texture with X tiling set to a high value can yield some interesting results.
{% /callout %}