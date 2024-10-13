---
title: VRSL GI Shader
description: Options relevant to the orels1/Standard VRSL GI shader
---

Options relevant to the orels1/Standard VRSL GI shader

---

A special variant of the main shader with included VRSL GI support. It enables usage of the VRSL: GI system in your world.

VRSL GI can be [Purchased on Gumroad here](https://acchosen.gumroad.com/l/vrslgi_dmx?layout=profile&recommended_by=library)

{% video url="https://iframe.mediadelivery.net/embed/165/21c10939-fae8-4024-abec-0aa6ea549930?autoplay=true&loop=true&muted=true" title="A demo of ORL Standard with VRSL GI integration" /%}

{% callout type="note" title="VRSL GI Dependency" %}
You must import the VRSL GI Shader Pack into the project for the shader to work correctly. [You can get it here](https://github.com/AcChosen/VR-Stage-Lighting-GI-ShaderPack/releases)
{% /callout %}

![VRSL GI Inspector](/img/docs/orl-standard/vrslgi/vrslgi.png "VRSL GI Inspector")

## Settings

- Integrate VRSL GI: Toggles VRSL GI on and off
- VRSL GI Strength: Controls the overall strength of the VRSL GI effect. Values above 1 will boost the intensity
- VRSL Diffuse Mix: Controls how much the Material's albedo affects the GI effects
- Use VRSL GI Specular: Enables VRSL GI Specular
- VRSL Specular Function: Only visible when **Use VRSL GI Specular** is enabled. Controls the Specular function to use for VRSL GI
  - GGX: Uses the GGX specular function, this is the default and is closest to the main ORL Shaders specular look
  - Beckman: Uses the Beckmann specular algorithm, a little more lightweight without sacrificing quality in a meaningful way
  - Phong: Uses the simplest specular calculation. Fastest of all the options, but also the simplest one
- Max Specular Brightness: Only visible when **Use VRSL GI Specular** is enabled. Controls the maximum brightness of the specular component of the GI effect
- Use VRSL Shadow Mask 1: Enables the use of Shadow mask texture for VRSL GI
- VRSL GI Shadow Mask 1: The shadow mask texture to use for VRSL GI
- VRSL Shadow Mask UV Set: Only visible when **Use VRSL GI Shadow Mask 1** is enabled. Controls which UV set the shadow mask texture is using
  - UV0: Uses the first UV channel
  - UV1: Uses the second UV channel (lightmap UV)
  - UV2: Uses the third UV channel
  - UV3: Uses the fourth UV channel
  - UV1_Lightmap_ST: Uses the second uv channel (lightmap UV), but multiplied by lightmap scale and offset. This can be useful when using built in baking tools
- Active Channels: Controls which channels of the shadowmask texture are used for VRSL GI
  - R
  - RG
  - RGB
  - RGBA
- VRSL SM 1 R Strength: Controls the strength of the R channel of the VRSL GI shadow mask
- VRSL SM 1 G Strength: Controls the strength of the G channel of the VRSL GI shadow mask
- VRSL SM 1 B Strength: Controls the strength of the B channel of the VRSL GI shadow mask
- VRSL SM 1 A Strength: Controls the strength of the A channel of the VRSL GI shadow mask
