---
title: Tessellated Displacement Shader
description: Options relevant to the orels1/Standard Tessellated Displacement shader
---

Options relevant to the orels1/Standard Tessellated Displacement shader

---

The other common technique of using the Height texture, compared to [Parallax](/docs/orl-standard/base-shader#parallax), is Vertex Displacement. Where the mesh vertices are physically moved up and down based in the height texture value. Usually this effect is also paired with tessellation, as otherwise there won't be enough vertices to produce a high quality effect

{% callout type="warning" title="Shader Considerations" %}
Tessellation can get expensive fairly quickly, so its not recommended to use tessellation factors beyond 10 too much

Older AMD GPUs are also known to have issues with Tessellation, so it might be a good idea to have this as an option on a toggle
{% /callout %}

![Tessellation Demo](/img/docs/orl-standard/tessellation/tessellation-demo.png "Tessellation Demo")

![Tessellation Inspector](/img/docs/orl-standard/tessellation/tessellation-inspector.png "Tessellation Inspector")

## Settings

- Enable Phong Tessellation: Enables the Phong smoothing during tessellation. This will effectively add as a "subdivision" effect, smoothing curved surfaces.
- Tessellation Mode: Controls how the tessellation will be applied
  - Static: The tessellation will be applied at a fixed level
  - Distance Based: The tessellation will be based on the distance from the camera
  - Edge Length: The tessellation will be based on the edge length of the triangles in screen space. The longer the edge - the more subdivisions will be applied
- Tessellation Factor: Controls the maximum amount of subdivisions to apply. This is only visible when **Static** or **Distance Based** **Tessellation mode** is used.
- Start Distance: Sets the distance at which the tessellation will start fading out. Only visible when **Distance Based** **Tessellation mode** is used.
- End Distance: Sets the distance at which the tessellation will disengage completely. Only visible when **Distance Based** **Tessellation mode** is used.
- Max Edge Length: Sets the edge length at which the maximum tessellation factor will apply. Only visible when **Edge Length** **Tessellation mode** is used.
- Max Displacement: The maximum amount of world-space displacement you're expecting to see. If your triangles are starting to disappear - you will need to increase this value. Only visible when **Edge Length** **Tessellation mode** is used.

- Displacement Map: Controls the strength of displacement over surface. Usually the same as the Height map used for parallax.
- Displacement Amount: The amount of vertex displacement to apply.
- Displacement Offset: The base offset of the height texture. Changing this value practically moves the zero point of the texture up and down. Generally speaking, this allows you to normalize some more extreme height maps so your mesh doesnt become too big or too small.