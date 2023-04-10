---
title: Cubemap Screen Shader
description: Fake skybox screen, inspired by Boneworks
---

Fake skybox screen, inspired by Boneworks

---

Allows you to create a flat surface that would look like a window to the outside, only to break up into screen subpixels up close for a neat gotcha moment.

{% video url="https://iframe.mediadelivery.net/embed/165/88f23d26-d8fe-49df-880c-36625f158010?autoplay=true&loop=true&muted=true" title="Cubemap Screen Demo" /%}

![Cubemap Screen Inspector](/img/docs/vfx/cubemap-screen/cubemap-screen.png "Cubemap Screen Inspector")

## Settings

- Cubemap: The cubemap to display
- Rotation: Controls the rotation of the cubemap
- Blur Level: Controls the blurring of the cubemap. To get nicer blur - set the **Convolution** setting of the cubemap to "Specular" in the inspector
- SubPixel Texture: Texture used for each pixel. There is one included in the `Packages/ORL Shader Generator/Runtime/Assets` folder!

{% callout type="warning" title="Tiling Settings" %}
It is important to set the Tiling of the SubPixel texture to match the size of your object. Values in the 100s are expected, since it represents the amount of horizontal and vertical pixels your fake screen will have
{% /callout %}

- Red Scale: Controls the intensity of the red color channel
- Green Scale: Controls the intensity of the green color channel
- Blue Scale: Controls the intensity of the blue color channel
- Emission Boosts: Controls the brightness of the final image

{% callout type="note" title="Credit where credit is due" %}
This effect is heavily based on the implementation made by Xiexe, [which you can find here](https://github.com/Xiexe/RGBSubPixelDisplay-Shader), and it includes one of the texture his provides. Check it out if you want a similar effect for something like a regular video player screen or any other texture!
{% /callout %}