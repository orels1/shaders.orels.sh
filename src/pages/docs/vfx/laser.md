---
title: Laser Shader
description: A simple laser shader with support for trail renderers
---

A simple laser shader with support for trail renderers

---

{% video url="https://iframe.mediadelivery.net/embed/165/37f9c8f9-e372-4ce0-9681-0503605fa3e1?autoplay=true&loop=true&muted=true" title="Laser Shader Demo" /%}

![Laser Shader](/img/docs/vfx/laser/laser-image.png "Laser Shader")

- Color: Controls the main color of the laser
- Use Trail Color: Enabling this ignores the **Color** and uses the vertex color of the Trail Renderer instead
- Noise Coordinate Space: Controls which coordinate space the noise is applied in
  - Local Space: applies the noise in local space. Best for objects that you want to move and resize without affecting the noise looc
  - World Space: applies the noise in world space. Best for objects that you want to move around but not resize
  - UV Space: applies the noise in UV space. Best for flat objects that do not work well with Local 
    - Selecting UV space also enables `Scale Y` controls

{% callout type="note" title="Noise Coordinate Space" %}
When used with a line renderer - UV Space is recommended for all the noise space parameters

You might need to increase the noise scale quite a bit as a result as well, while keeping Noise Scale Y low, usually around 0.01-0.1
{% /callout %}

The rest of parameters is repeated for both the 1st and 2nd noise layers

- Noise Scale: Controls the scale of the noise applied to the laser. The higher the scale the more the effect will look like a cloud of particles
- Noise Strength: Controls the brightness of the noise layer
- Noise Contrast: Controls the range of values used by the noise layer
- Noise Scroll Space: Sets the coordinate space used for the noise layer. When set to Local Space - you can freely scale the object and the relative noise scale will stay the same.
- 1st Noise Scroll Scroll (X/Y/Z): Sets the scrolling speed of the noise layer along the X/Y/Z axis

Waviness parameters allow you to add an extra level of detail to the effect

- Waviness Texture: Sets the texture to be multiplied over the noise effect. Useful for making the noise pattern non-uniform across the length of the laser beam
- Waviness Contrast: Controls the range of values used by the waviness texture
- Waviness Scroll (X/Y): Sets the scrolling speed of the waviness texture along the X/Y axis

{% callout type="note" title="Waviness Texture" %}
Try out different textures in the **Waviness Texture slot**! Even the default particle texture with X tiling set to a high value can yield some interesting results.
{% /callout %}

The following parameters are internal and are generally not meant to be modified

- Noise Texture: A special pre-baked noise texture