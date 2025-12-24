---
title: Vertex Colors Module
description: Adjust your material's parameters via mesh vertex colors
---

Adjust your material's parameters via mesh vertex colors

---

Vertex Colors can be a very useful source of data for your shaders. They can provide easy tinting solutions, or be used to pass data from particle systems. As there are a lot of potential uses for vertex colors - this is a standalone module that can work in any shader.

![Vertex Colors Inspector](/img/docs/configurable-shaders/modules/vertex-colors.png "Vertex Colors Inspector")

## Compatibility

✨ This module is compatible with all lighting models


## Settings

- Albedo: Multiplies the albedo by the vertex color
  - Albedo Strength: Controls the strength of the albedo multiplier
- Alpha: Multiplies the alpha by the vertex color
  - Alpha Strength: Controls the strength of the alpha multiplier
  - Channel: Controls which channel of the vertex color is used for the alpha multiplier
  - Alpha Premultiply: Multiplies the albedo by the Alpha. This is useful for things like Particle Effects or other additive shaders.
- Emission: Multiplies the emission by the vertex color
  - Emission Strength: Controls the strength of the emission multiplier
- Metallic: Multiplies the metallic by the vertex color
  - Metallic Strength: Controls the strength of the metallic multiplier
  - Channel: Controls which channel of the vertex color is used for the metallic multiplier
- Smoothness: Multiplies the smoothness by the vertex color
  - Smoothness Strength: Controls the strength of the smoothness multiplier
  - Channel: Controls which channel of the vertex color is used for the smoothness multiplier
- Occlusion: Multiplies the occlusion by the vertex color
  - Occlusion Strength: Controls the strength of the occlusion multiplier
  - Channel: Controls which channel of the vertex color is used for the occlusion multiplier
