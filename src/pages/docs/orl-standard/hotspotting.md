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

Both of the above are included with the shader to be used together with the `Hotspot` mesh provided in the `Runtime/Assets` folder of the ORL Shaders package.

{% callout type="note" title="Use material variants" %}
If you're using Unity 2022 or newer - it is highly recommended to use Material Variants when setting up Hotspotting materials. That way you can define the base settings like the hotspot mask and normal on the parent material and lock them, using the variants to only change the texture set and other individual settings
{% /callout %}

## Per-Tile Variance

- Add per-tile variance: Enables the per-tile variance features
- Hotspot Id: Hotspot Tile mask, using a unique shade of gray for each tile, this should match the layout of **Hotpost Mask** and **Hotspot Normal**
- Variance Offset: Offsets the variance to add a little bit of randomness to the tile adjustments
- Albedo Variance: Adjusts the amount of variance applied to albedo
- Smoothness Variance: Adjusts the amount of variance applied to smoothness

## Dirt

- Dirt Mask: The main noise texture to be used for painting dirt on the surface
- Dirt Color: Controls the color of the applied dirt
- Dirt Smoothness Modifier: Adjusts the smoothness of the dirt
- Dirt Masking: Adjusts the spread of the dirt from the edges of the tiles
- Groove AO: Controls the strength of Ambient Occlusion in the grooves between the tiles
- AO Masking: Controls the spread of the AO from the grooves of the tiles

## Details

![Hotspotting Details](/img/docs/orl-standard/hotspotting/hotspotting-details.png "Hotspotting Details")

Hotspotting details act as a second material layer to be applied inside each of the hotspot tiles. This enables you to make materials like rusty metal that is only rusted on the edges, chipped paint, mossy stone, or any other mixed material that could benefit from such layering.

- Masking: Controls the spread and edge sharpness of the overlaid details
- Detail Normal: The normal map of the details
- Detail Masks: Texture containing Metallic/Smoothness and AO maps. By default, uses this channel setup:
  - Red: Metallic
  - Green: AO
  - Alpha: Smoothness
- Detail Tint Color: Tints the details Albedo with a color
- Detail Albedo: The main albedo texture of the detail overlay
