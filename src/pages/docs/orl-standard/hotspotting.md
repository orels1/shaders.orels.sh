---
title: Hotspotting
description: Automated hotspotting shader, turning any texture set into a hotspotting-ready material
---

Automated hotspotting shader, turning any texture set into a hotspotting-ready material

{% .lead %}

---

Hotspotting is a great technique that allows you to quickly texture a large amount of surfaces with nice edge detail while using a single material

This technique is supported by tooling like

- [DreamUV](https://github.com/leukbaars/DreamUV), [ZenUV](https://sergeytyapkin.gumroad.com/l/ZenUV) for Blender

- [UModeler for Unity](https://youtu.be/MIHY5Ijr_HM)

The part that currently takes the most time in hotspotting is the material setup, you need to create the final sliced atlas that can then be used on the surfaces. This shader aims to automate this process by taking a single texture set and turning it into a hotspotting-ready material.

{% video url="https://iframe.mediadelivery.net/embed/165/ebcb599c-636b-4f6f-85d5-f466c2a3f859?autoplay=true&loop=true&muted=true" title="Hotspotting Demo" /%}

![Hotspotting Overview](/img/docs/orl-standard/hotspotting/hotspotting-overview.png "Hotspotting Overview")

## General Settings

- Hotspot Mask: The main mask which matches the UV layout of your source hotspot mesh
- Hotspot Normal: The hotspot groove normal map adds grooves between different tiles of the hotspot texture.
- Tiling X: Controls the hotspot mask/normal tiling in X
- Tiling Y: Controls the hotspot mask/normal tiling in Y
- Hotspot Rotation: Controls the hotspot mask/normal rotation

Both of the above are included with the shader to be used together with the `Hotspot` mesh provided in the `Runtime/Assets` folder of the ORL Shaders package.

{% callout type="note" title="Use material variants" %}
If you're using Unity 2022 or newer - it is highly recommended to use Material Variants when setting up Hotspotting materials. That way you can define the base settings like the hotspot mask and normal on the parent material and lock them, using the variants to only change the texture set and other individual settings
{% /callout %}

## Groove Detail

- Dirt: The main noise texture to be used for painting dirt on the surface
- Mask Min/Max: Controls the spread of the dirt from the edges of the tiles
- Nudge: Shifts the dirt with precise control
- Sharpness: Controls the sharpness of the dirt edge. Can be effective at creating a sharper edge wear effect
- Dirt Mask Strength: Controls the influence dirt mask has over the edge mask
- Color: Controls the color of the applied dirt
- Color Blend Mode: Controls how the color is blended with base albedo
  - Blend: Simply blends from base albedo to dirt color
  - Add: Adds the dirt color to the base albedo
  - Multiply: Multiplies the dirt color with the base albedo
  - Overlay: Uses Overlay blending mode similar to Photoshop (Lightens the light colors and darkens the dark ones)
- Blend Amount: Controls the intensity of Albedo changes
- Smoothness Blend Mode: Controls how the dirt smoothness is blended with the base smoothness
  - Add: **Smoothness Modifier** is added on top of the base smoothness
  - Multiply: The base smoothness is multiplied by the **Smoothness Modifier**
- Smoothness Modifier: Adjusts the smoothness of the dirt

### Groove AO

- AO Strength: Controls the strength of Ambient Occlusion in the grooves between the tiles
- Mask Min/Max: Controls the spread of the AO from the grooves of the tiles
- Nudge: Shifts the AO with precise control
- Sharpness: Controls the sharpness of the AO edge.

## Per-Tile Variance

![Hotspot Per-Tile Variance](/img/docs/orl-standard/hotspotting/hotspotting-per-tile.png "Hotspot Per-Tile Variance")

- Add per-tile variance: Enables the per-tile variance features
- Hotspot Id: Hotspot Tile mask, using a unique shade of gray for each tile, this should match the layout of **Hotpost Mask** and **Hotspot Normal**
- Variance Offset: Offsets the variance to add a little bit of randomness to the tile adjustments
- Albedo Variance: Adjusts the amount of variance applied to albedo
- Smoothness Variance: Adjusts the amount of variance applied to smoothness

## Details

![Hotspot Details](/img/docs/orl-standard/hotspotting/hotspotting-details.png "Hotspot Details")

Hotspotting details act as a second material layer to be applied inside each of the hotspot tiles. This enables you to make materials like rusty metal that is only rusted on the edges, chipped paint, mossy stone, or any other mixed material that could benefit from such layering.

### Masking

- Mask Min/Max: Controls the spread of the detail textures within the tiles
- Mask Sharpness: Further adjusts the sharpness of the mask edge
- Dirt Mask Influence: Controls how much the **Dirt Mask** influences the blending of the detail layer
- Dirt Mask Influence Mode: Controls how does the **Dirt Mask** influence the blending of the detail layer
  - Subtract: Subtracts the dirt mask value from the detail mask, creating a more varied edge
  - Multiply: Multiplies the dirt mask value with the detail mask
- Invert Dirt Mask Influence: Inverts the dirt mask influence when suing **Subtract** mode. Useful for breaking up the detail layer via the **Dirt Mask**

### Material Properties

- Color: Tints the details Albedo with a color
- Albedo: The main albedo texture of the detail overlay
- Masks: Texture containing Metallic/Smoothness and AO maps. By default, uses this channel setup:
  - Red: Metallic
  - Green: AO
  - Alpha: Smoothness
- Normal: The normal map of the details
- Normal Scale: Scales the normal map of the details
- Normal Blend Mode: Controls how the detail normals blend with the base layer normals
  - Blend: Adds both normals together, useful for adding extra surface detail, e.g. rust on top of a metal surface, where you want the detail normal to follow the base normal
  - Replace: Replaces the base normal with the detail normal in the masked region, e.g. tree bark on top of exposed wood grain
