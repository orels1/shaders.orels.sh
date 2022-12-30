---
sidebar_position: 10
---

# 🔠 Layered Material

Options relevant to the orels1/Standard Layered Material shader

-----

This is a special shader that replicates most of the Base Shader settings, but does it per-layer with up to 4 layers

Layers are masked using vertex colors, which allows you to utilize the same material on more different meshes, while keeping visual variety. The shader includes a debugging mode for ease of use

:::info Triplanar Variant

This shader also has a variant with [Triplanar Effects](/docs/orl-standard/triplanar-effects) support for added variety

:::

<p align="center">
  <img alt="Layered Material Demo" src="/img/docs/orl-standard/layered-material/layered-material-demo.png" />

  <br />

  <small>An example mesh using different material layers for the body and the handles</small>

  <br />
  <br />

  <img alt="Layered Material Debug View" src="/img/docs/orl-standard/layered-material/layered-material-debug.png" />

  <br />

  <small>Vertex Color debug view</small>
</p>

## General Settings

<p align="center">
  <img alt="Layered Material Demo" src="/img/docs/orl-standard/layered-material/layered-material-inspector.png" />

</p>

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

:::info Texture Sampling Cost

While this shader does its best to not do unnecessary operations, overall sampling a lot of textures has a cost, so make sure you actually need these features before using it

:::