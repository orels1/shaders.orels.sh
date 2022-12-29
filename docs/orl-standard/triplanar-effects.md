---
sidebar_position: 8
---

import BunnyPlayer from "@site/src/components/BunnyPlayer";

# 🪄 Triplanar Effects

Options relevant to the orels1/Standard Triplanar Effects shader

-----

This shader adds world-aligned triplanar effects like Damage and Dirt to the meshes, which helps with breaking up the visible tiling and quickly adds variance to your textures

:::info Layered Material Variant

These effects are also available for the Layered Material version of the shader, they behave the same way

:::

<BunnyPlayer videoId="32feb07e-bea5-48f2-98e8-4e3e33fd36a7" />

<br />

<p align="center">
  <img alt="Triplanar Effects Inspector" src="/img/docs/orl-standard/triplanar-effects/triplanar-effects-inspector.png" />
</p>

## General Settings

- Triplanar Masks: Specifies the texture to be used for applying the effects. Different channels are used for different things. The number besides the texture slot controls the scale of the texture
  - Red: Currently Unused
  - Green: Used as a Damage mask
  - Blue: Used as a Dirt mask
  - Alpha: Currently Unused

## Dirt

<BunnyPlayer videoId="d090727f-8429-464c-bc09-c0c4d41d56fa" />

<br />

- Dirt Mode: Controls how the dirt effect is applied. Options are: None/Local Space/World Space, where the Local Space and World space control only the masking of the dirt effect. The actual dirt texture is always applied in world space
- Dirt Mask Power: Controls the expansion of the dirt mask, as well as the contrast of the dirt applied
- Dirt Color: Controls the tint of the dirt applied
- Dirt Smoothness: Modifies the smoothness of the surface where dirt is applied
- Dirt Gradient Min: Controls the start position of the dirt mask gradient, the space of the coordinates is defined by the **Dirt Mode** setting
- Dirt Gradient Max: Controls the end position of the dirt mask gradient, the space of the coordinates is defined by the **Dirt Mode** setting
- Dirt Opacity: Controls the global opacity of the dirt, 0 completely kills the effect
- Use Planar Mask: Limits the dirt to being applied only to the bottom facing parts of the mesh

<BunnyPlayer videoId="c219969a-dc22-492d-b9e8-3dfec880f5f5" />

<p align="center">
  <small>Another example of using Dirt to break up visual tiling</small>
</p>

## Damage

Damage can provide a simple way to add visual chipping/discoloration to a lot of meshes while keeping it all the same material

<BunnyPlayer videoId="74c5db99-95f0-43eb-b8bf-59475a67aa21" />

<p align="center">
  <small>Using the Damage effect and a Normal map to create a more dented/damaged look</small>
</p>

- Damage Mode: Controls whether the damage is enabled or not
- Damage Albedo: An extra albedo texture to use to apply the damage coloring, if not provided - will tint the underlying surface by the **Damage Color**. The number beside it controls the tiling of it and the **Damage Normal** texture
- Damage Color: Controls the tint of the damaged areas
Smoothness Min - Max: Adjusts the smoothness range of the damaged surface
- Damage Normal: Applies the provided normal texture in the areas masked by the Triplanar Mask. The slider besides it controls the intensity of the normal
- Flip Y (UE Mode): Similar to the main normal map - allows flipping the green channel for the DirectX-created normal maps
- Damage Amount: The global effect strength slider