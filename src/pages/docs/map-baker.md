---
title: Map Baker
description: A way to bake down procedural shader effects into static textures and PBR materials
---

A way to bake down procedural shader effects into static textures and PBR materials

---

![Map Baker](/img/docs/root/map-baker/map-baker-ui.png "Map Baker")

## What is Map Baker?

Map baker is a tool that allows you to bake down procedural shader effects into static textures and PBR materials. This means that after configuring a material using something like a [Hotspotting](/docs/orl-standard/hotspotting) shader, you can bake the result into a static ORL Standard material and use it without the performance impact of the full hotspotting effect.

## Usage

Select a material you would like to bake

### Baking Individual Textures

- Set a bake path either by typing it in or using the Folder Picker button
- Click the texture channel you want to bake
- The new baked texture will be created in the specified folder

### Baking Entire Materials

- Set a bake path either by typing it in or using the Folder Picker button
- Click "Bake Material"
- After baking all the individual textures - a new material using ORL Standard shader will be created in the specified folder

## Limitations

This technically works with any shader, but it might not work well with shaders that base their effects on camera angles or mesh data, as baking is performed on a flat quad mesh without any camera data.
