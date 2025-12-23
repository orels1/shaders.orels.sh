---
title: Layered Material Shader
description: Options relevant to the orels1/Standard Layered Material shader
---

Options relevant to the orels1/Standard Layered Material shader

---

This is a special shader that replicates most of the Base Shader settings, but does it per-layer with up to 5 total layers, with one base layer and 4 masked layers stacked on top.

Layers can be masked either with vertex colors (e.g. an ID mask) or a multi-channel apcked texture, which allows you to utilize the same material on more different meshes, while keeping visual variety. The shader includes a debugging mode for ease of use.

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
- Debug Channel: Controls which channel to display during debugging. Only visible when **Mask Debugging** is enabled

## Base Layer Settings

![Base Layer](/img/docs/orl-standard/layered-material/layered-material-base.png "Base Layer")

Base layer acts like a very stripped down ORL Standard material, with the usual set of textures and controls. If you want more information - check out [Base Shader's Main Settings](/docs/orl-standard/base-shader#main-settings) documentation.

## Per-Layer Settings

![Per-Layer Settings](/img/docs/orl-standard/layered-material/layered-material-layer.png "Per-Layer Settings")

Every additional layer beyond base has the same set of settings, including some masking options.

- Mask Channel: Defines which channel of Vertex Colors or Mask Texture to use
  - R/G/B/A are the main options you're expected to use
  - Black/White are special in a way that Black will appear only where all channels combined are 0, and White - wehre all of them are 1. This creates a pretty harsh mask edge, but it can be useful for hardsurface details that have defined edges
- Mask Remap: Controls the contrast of the mask. This allows you to "nudge" the edge of the mask without needing to edit the base texture
- Layer Strength: Controls how visible the layer is
- Show Mask: Skips rendering the actual layer and simply outputs its mask as black and white value. Useful for debugging

The rest of the options primarily mimic [Base Shader's Main Settings](/docs/orl-standard/base-shader#main-settings), check that documentation for more info.

One special addition is the **Enable Triplanar** checkbox, which allows you to use triplanar mapping for individual layers.

This can get pretty expensive, so make sure to only enable for layers that really need it, use regular UV channels where possible.

If you enable the Triplanar option, the following settings become available:

- Tiling: Controls the world-space tiling of the textures
- Blend: Controls the blend between the axis. Higher blend values result in more "bleed" between the top-side-front projected textures. Generally you want to find the lowest value that doesn't create harsh edges between sides
- Power: Offers a more granular control of blending. Higher power - means sharper transition between the projections
