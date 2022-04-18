---
sidebar_position: 2
---

# 🌌 Cubemap Screen 

Fake skybox screen, inspired by Boneworks

-----

Allows you to create a flat surface that would look like a window to the outside, only to break up into screen subpixels up close for a neat gotcha moment.

<div style={{ position: "relative", paddingBottom: "calc(58.82% + 44px)" }}><iframe src='https://gfycat.com/ifr/AmpleHeartfeltDouglasfirbarkbeetle' frameborder='0' scrolling='no' width='100%' height='100%' style={{ position: "absolute", top: 0, left: 0}} allowfullscreen></iframe></div>

<br />

<p align="center">
  <img alt="Cubemap Screen Inspector" src="/img/docs/vfx/cubemap-screen/cubemap-screen.png" />
</p>

## Settings

- Cubemap: The cubemap to display
- Rotation: Controls the rotation of the cubemap
- Blur Level: Controls the blurring of the cubemap. To get nicer blur - set the **Convolution** setting of the cubemap to "Specular" in the inspector
- SubPixel Texture: Texture used for each pixel. There is one included in the `orels1/Sources/Editor/Assets/Textures` folder!

:::caution Tiling Settings

It is important to set the Tiling of the SubPixel texture to match the size of your object. Values in the 100s are expected, since it represents the amount of horizontal and vertical pixels your fake screen will have

:::

- Red Scale: Controls the intensity of the red color channel
- Green Scale: Controls the intensity of the green color channel
- Blue Scale: Controls the intensity of the blue color channel
- Emission Boosts: Controls the brightness of the final image

:::info Credit where credit is due

This effect is heavily based on the implementation made by Xiexe, [which you can find here](https://github.com/Xiexe/RGBSubPixelDisplay-Shader), and it includes one of the texture his provides. Check it out if you want a similar effect for something like a regular video player screen or any other texture!

:::