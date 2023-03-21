---
title: Layered Material
description: Options relevant to the orels1/Standard Layered Material shader
---

Options relevant to the orels1/Standard Layered Material shader

---

This is a special shader that replicates most of the Base Shader settings, but does it per-layer with up to 4 layers

Layers are masked using vertex colors, which allows you to utilize the same material on more different meshes, while keeping visual variety. The shader includes a debugging mode for ease of use

{% callout type="note" title="Triplanar Variant" %}
This shader also has a variant with [Triplanar Effects](/docs/orl-standard/triplanar-effects) support for added variety
{% /callout %}

![Layered Material Demo](/img/docs/orl-standard/layered-material/layered-material-demo.png "An example mesh using different material layers for the body and the handles")

**Mask Debugging** view with **Mask Type** set to Vertex Color

![Layered Material Debug View](/img/docs/orl-standard/layered-material/layered-material-debug.png "Vertex Color debug view")

## General Settings

![Layered Material Inspector](/img/docs/orl-standard/layered-material/layered-material-inspector.png "Layered Material Inspector")

- Layer Count: The amount of layers used. Can go between 1 and 4
- Mask Type: Controls what is used for masking. Options are: Vertex Colors or a Texture
- Mask Texture: Only visible when **Mask Type** is set to Texture. This will be used to mask the layers by color
- Mask Debugging: Displays the mask values on the mesh based on selected **Mask Type**

## Per-Layer Settings

All of the options here are cloned from the [Base Shader's Main Settings](/docs/orl-standard/base-shader#main-settings), check that documentation for more info

The layers are by default filtered using these colors:

- Layer 1: Black
- Layer 2: Red
- Layer 3: Green
- Layer 4: Blue

But you can swap the colors around if you want

{% callout type="note" title="Texture Sampling Cost" %}
While this shader does its best to not do unnecessary operations, overall, sampling a lot of textures has a cost, so make sure you actually need these features before using it
{% /callout %}