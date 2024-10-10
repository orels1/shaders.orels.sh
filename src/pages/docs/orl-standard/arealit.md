---
title: AreaLit Shader
description: Options relevant to the orels1/Standard AreaLit shader
---

Options relevant to the orels1/Standard AreaLit shader

---

A special variant of the main shader with included AreaLit support. It enables usage of the AreaLit GI system in your world.

AreaLit can be [Purchased on Booth here](https://booth.pm/en/items/3661829)

{% video url="https://iframe.mediadelivery.net/embed/165/ad2da779-0d2a-4773-be8a-04cec285360b?autoplay=true&loop=true&muted=true" title="A demo of ORL Standard with AreaLit integration" /%}

{% callout type="note" title="AreaLit Dependency" %}
You must import the AreaLit package into the project for the shader to work correctly
{% /callout %}

![AreaLit Inspector](/img/docs/orl-standard/arealit/arealit-inspector.png "AreaLit Inspector")

## Settings

- Integrate AreaLit: Toggles AreaLit on and off
- Enable on Mobile: Allows AreaLit effects to be calculated on mobile platforms
- Clamp Brightness: Enabled brightness normalization and clamping to prevent brightness spikes
  - Max Brightness: Maximum allowed brightness
- Opaque Lights: Controls whether or not lights can occlude each other
- Light Mesh: LightMesh data texture
- Light Texture 0: The first light texture, usually used for a video screen
- Light Texture 1: Secondary light texture, can be used for a second screen or any other image-based light
- Light Texture 2: Usually used for dynamic indirect lighting
- Light Texture 3: A texture array for static lights
- Shadowmask: RGBA mask that can be used together with pre-baked shadows. This allows you to bake shadows from individual emissive surfaces and use them in the AreaLit system.