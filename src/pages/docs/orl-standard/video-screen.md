---
title: Video Screen Shader
description: Options relevant to the orels1/Standard Video Screen shader
---

Options relevant to the orels1/Standard Video Screen 

---

An [UdonSharp Video](https://github.com/MerlinVR/USharpVideo) compatible shader for your video screens. Built on top of the main PBR shader.

There are also extra versions of this shader for different use-cases:

- orels1/VFX/Unlit Video Screen: An unlit version of the shader, it lacks any other material parameters, but might be preferable when you just need the raw video
- orels1/UI/Video Screen: Same as the VFX one, but compatible with Unity UI

![Video Screen Inspector](/img/docs/orl-standard/video-screen/video-screen-inspector.png "Video Screen Inspector")

## Settings

- Meta Pass Emission: Controls the strength of the emission provided during baking. Useful for Realtime GI
- Target Aspect Ratio: Controls the target aspect ratio of the video texture. By default is set to 16:9, is adjusted automatically by USharpVideo when the video is loaded
- Is AVPro Input: Adjusts the color/UV settings to work with AVPro videos. Set automatically by USharpVideo

{% callout type="warning" title="Enable Emission" %}
For the Standard variant of this shader to work correctly - don't forget to enable Emission and set its color to white (or any other non-black color). Otherwise you won't be able to see the video!
{% /callout %}