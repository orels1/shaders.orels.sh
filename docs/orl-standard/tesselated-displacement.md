---
sidebar_position: 7
---

# 🦔 Tessellated Displacement

Options relevant to the orels1/Standard Tessellated Displacement shader

-----

The other common technique of using the Height texture, compared to [Parallax](/docs/orl-standard/base-shader#parallax), is Vertex Displacement. Where the mesh vertices are physically moved up and down based in the height texture value. Usually this effect is also paired with tessellation, as otherwise there won't be enough vertices to produce a high quality effect

:::caution Performance Considerations

Tessellation can get expensive fairly quickly, so its not recommended to use tessellation factors beyond 10 too much

:::

:::danger AMD Compatibility

Some AMD GPUs are known to have issues with Tessellation, so it might be a good idea to have this as an option on a toggle

:::

<p align="center">
  <img alt="Tessellation Demo" src="/img/docs/orl-standard/tessellation/tessellation-demo.png" />

  <br />
  <br />

  <img alt="Tessellation Inspector" src="/img/docs/orl-standard/tessellation/tessellation-inspector.png" />
</p>

## Settings

- Displacement Map: The height texture to use for displacement. This **MUST** be set to linear (the sRGB checkbox unchecked on the texture importer)
- Displacement Amount: The amount of vertex displacement to apply
- Displacement Offset: The base offset of the height texture. Changing this value practically moves the zero point of the texture up and down. Generally speaking, this allows you to normalize some more extreme height maps so your mesh doesnt become too big or too small
- Tessellation Fade Start: Controls the distance at which the Tessellation level will start to decrease
- Tessellation Fade End: Controls the distance at which the Tessellation will stop subdividing the mesh completely
- Subdivision Level: Controls the maximum count of subdivisions