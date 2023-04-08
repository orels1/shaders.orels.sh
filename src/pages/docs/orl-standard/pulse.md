---
title: Pulse
description: Options relevant to the orels1/Standard Pulse shader
---

Options relevant to the orels1/Standard Pulse shader

---

This shader provides a simple pulsing effect with an option to use a gradient for a "swipe" look. In combination with a mask texture slot - you can achieve a variety of effects.

{% video url="https://iframe.mediadelivery.net/embed/165/f32ac359-e09a-41b6-a983-22c9560e594f?autoplay=true&loop=true&muted=true" title="Pulse Demo" /%}

![Pulse Inspector](/img/docs/orl-standard/pulse/pulse-inspector.png "Pulse Inspector")

- Color: The color of the pulse effect
- Type: Controls the type of pulse effect
  - All At Once: Pulses the whole mesh at once
  - Gradient: Pulses the mesh based on a gradient. The gradient is applied to the mesh based on the **Gradient Source** setting
- Gradient Source: Controls how the gradient is applied to the mesh. Only visible when **Type** is set to Gradient
  - Local Position: Applies the gradient based on the mesh local position
  - UV: Applies the gradient based on the UV coordinates
  - Texture: Applies the gradient based on the value of the **Gradient Texture**. Generally is expected to be a gradient of some sort
- Gradient Direction: Controls the direction of the applied fade gradient
  - X/Y: Fade in the X/Y direction
  - Z: Fade in the Z direction. When **Fade Based On** is set to UV, this will not apply any fading
  - Negative X/Y: Fade in the negative X/Y direction
  - Negative Z: Fade in the negative Z direction. When **Fade Based On** is set to UV, this will not apply any fading
  - When **Fade Based On** is set to Texture, X/Y/Z instead picks the R/G/B channels of the texture
- Debug Gradient: Shows the gradient as a black to white albedo color on your mesh. Helps to visualize the settings
- Automatic: Automatically pulses the mesh based on the **Speed** setting
- Speed: Only visible when **Automatic** is enabled. Controls the speed of the pulse effect
- Progress: Controls the progress of the pulse effect. Only visible when **Automatic** is disabled. Is expected to be used via animators