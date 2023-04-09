---
title: Scrolling Texture Shader
description: Options relevant to the orels1/UI/Scrolling Texture shader
---

Options relevant to the orels1/UI/Scrolling Texture shader

---

This shader provides simple UI scrolling texture functionality with an optional Parallax effect to be used with Unity UI

{% video url="https://iframe.mediadelivery.net/embed/165/5abf3260-dc89-49be-a407-6d039335d912?autoplay=true&loop=true&muted=true" title="Scrolling Demo" /%}

![Scrolling Inspector](/img/docs/ui/scrolling/scrolling-inspector.png "Scrolling Inspector")

- Scroll Speed (X/Y): Controls the speed of texture scrolling
- Texture Tiling: Controls the texture tiling
- Parallax Offset: Controls the parallax offset of the texture for a fake-depth effect
- Edge Fade: Enables the edge fading effect
- Fade Scale: Controls the size of the fade shape. The larger the scale - the closer the fade will be to the edge of the UI element. Only visible when **Edge Fade** is enabled
- Fade Amount: Controls the amount of smooth blending applied to the edge fade. Only visible when **Edge Fade** is enabled
- Edge Rounding: Controls the amount of rounding applied to the edge fade rectangle corners. Only visible when **Edge Fade** is enabled

{% callout type="note" title="Parallax Offset" %}
Make sure your root Canvas component has **Normal** and **Tangent** checked in the **Additional Shader Channels** dropdown when using Parallax Offset setting.
{% /callout %}