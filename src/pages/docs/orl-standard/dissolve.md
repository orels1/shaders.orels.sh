---
title: Dissolve Shader
description: Options relevant to the orels1/Standard Dissolve shader and other Dissolve variants
---

Options relevant to the orels1/Standard Dissolve shader and other Dissolve variants

---

This shader provides a customizable cutout dissolve effect on top of Standard. It can be used to create a variety of effects, from simple fade to more complex ones like the one shown below

{% video url="https://iframe.mediadelivery.net/embed/165/3e08653f-f12e-41fd-9712-0b27107c2960?autoplay=true&loop=true&muted=true" title="An Advanced Dissolve Effect" /%}

![Dissolve Inspector](/img/docs/orl-standard/dissolve/dissolve-inspector.png "Dissolve Inspector")

- Cutoff: Any pixels with an alpha value below this value will be cut out
- Fade Based On: Controls how the dissolve effect is applied. The values selected here will be then passed to the Alpha channel and used by the **Cutoff** to control the fade
  - Local Position: Fades the dissolve effect based on the mesh local position
  - UV: Fades the dissolve effect based on the UV coordinates
  - Texture: Fades the dissolve effect based on the value of the Fade texture. Generally is expected to be a gradient of some sort
- Fade Texture: The texture used to fade the dissolve effect. Only used when **Fade Based On** is set to Texture
- Fade Direction: Controls the direction of the applied fade gradient
  - X/Y: Fade in the X/Y direction
  - Z: Fade in the Z direction. When **Fade Based On** is set to UV, this will not apply any fading
  - Negative X/Y: Fade in the negative X/Y direction
  - Negative Z: Fade in the negative Z direction. When **Fade Based On** is set to UV, this will not apply any fading
  - When **Fade Based On** is set to Texture, X/Y/Z instead picks the R/G/B channels of the texture
- Debug Fade Gradient: Shows the fade gradient as a black to white albedo color on your mesh. Helps to visualize the settings of the fade gradient
- Use Baked Noise: Controls whether or not to multiply base gradient by a pre-baked noise texture. This can be used to add more randomness to the fade gradient
- Noise Scale: Only visible when **Use Baked Noise** is enabled. Controls the scale of the noise texture
- Noise Texture: Only visible when **Use Baked Noise** is enabled. The noise texture used to multiply the base gradient. By default will be set to a special noise texture that combines into a 3d noise
- Noise Strength: Only visible when **Use Baked Noise** is enabled. Controls the influence of the baked noise texture over the base gradient
- Scroll Speed (X,Y,Z): Controls the speed of the noise texture scrolling in the X/Y/Z direction
- Overlay Texture: Specifies an optional texture to multiply the base gradient by. Works best with tiling patterns. Can be used to add more detail to the fade gradient
- Overlay Channel: Only visible when **Overlay Texture** is set. Controls which channel of the overlay texture to use
- Overlay Strength: Only visible when **Overlay Texture** is set. Controls the influence of the overlay texture over the base gradient
- Add Glowing Border: Adds a glowing border near the cutout edge
- Border Width: Controls the width of the glowing border
- Border Color: Controls the color of the glowing border

{% callout type="note" title="Demo Texture" %}
A demo texture is provided with the shader. It can be found in the **Packages/ORL Shader Generator/Runtime/Assets** folder and is called **Dissolve Pattern**. It has 3 channels with different patterns. R being a Hex pattern, G being a square tile, and B being a triangle pattern. You can use this texture to test the **Overlay Texture** option
{% /callout %}
