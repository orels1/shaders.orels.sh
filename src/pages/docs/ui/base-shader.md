---
title: Main UI Shader
description: Options relevant to the orels1/UI/Main shader
---

Options relevant to the orels1/UI/Main shader

---

This is a base shader for all the other UI shaders in the ORL Shader package. It supports all the native Unity UI functionality with an additional HDR Glow effect for emissive UI elements.

![Main Inspector](/img/docs/ui/base-shader/ui-base-shader-inspector.png "Main Inspector")

- Sprite Texture: **Not meant to be changed**. The texture used byt he UI Image element, set by the Unity UI system
- Glow: The HDR color to multiply the texture by

The rest of the options are internal to Unity and are not meant to be changed.

This shader is used by all the other UI shaders in the ORL Shader package, so all of them get the Glow option automatically.

{% callout type="note" title="Overlay Variants" %}
All of the shaders in the UI category also have an "Overlay" variant that renders on top of all the other objects. This is useful for things like world-space HUDs.
{% /callout %}