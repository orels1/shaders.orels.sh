---
title: Changelog
description: ORL Shaders Changelog
---

ORL Shaders Changelog

---

## v6.2.0 (in progress)

### New Shaders

- **PBR**
  - Puddles
- **Toon**
  - UV Discard

### New Features

- **Configurable Shaders**
  - This new system allows you to mix and match all of the features available in the ORL Shader Package to your liking!
  - To start, right-click anywhere in your project, then Create -> Shader -> orels1 -> Configurable Shader. This will make a new instance of a configurable shader you can set up in the inspector
  - Give your shader a name
  - Select the "Lighting Model" you want to use, the default is PBR which should work well for most use-case
  - Add any modules you want to add
  - If you want to add something "on top" of an existing shader. E.g. you want the Puddles Shader to Dissolve - then you can select "Standard Puddles" in the Base  Shader dropdown and then add a Dissolve module on top
  - Click Apply!
  - You can now select the new shader on the material of your choosing

{% callout type="note" title="Module Compatibility" %}
Not every module is compatible with every other module. The Inspector will try to make it clear when you're trying to do something unsupported, but I encourage you to mix and match and see what works! Sometimes things might work better in a particular order, as you're essentially "stacking" effects together. The modules on top of the list are added first
{% /callout %}

- **AmbientCG Library**
  - There is now experimental support for the [AmbientCG Material Library](https://ambientcg.com), which is a library of CC0 PBR materials you can use in your projects. It is meant to speed up your workflow especially when prototyping a new environment.
  - Note that this works best with PBR shaders, so any Standard variant should work well!
  - **This is very experimental so if something breaks, please let me know!**
- `%SetProp()` drawer function has been added to the inspector
  - This allows you to set a property of your material to some specific value based on another value
  - E.g. you can set the Stencil operation to Keep or Replace depending on whether the Outline is enabled or not (used by the main Toon shader)

### Other Changes

- Improved Specular Occlusion defaults and overall behavior
- Fixed LTCGI path (requires LTCGI update)
- New "Rim Mask" option for the Toon's AudioLink module
- Fixed Vertex Animation shaders batching incorrectly
- Added support for backface tint for Toon shaders
- Added `facing` param support for making your own shaders (used by Toon)
- Fixed a bug where the toon shader would break Unity UI masks
- Neon Tube shader now has masking support for the covered part
- Matrix variables are now properly supported by the generator
- Repack texture button no longer looks ugly at some UI scaling levels 🎉The majority of Toon shader features now support independent tiling options, great for detail textures!
- The VRChat Features docs link is now pointing to the correct spot

## v6.1.0

[See the git diff](https://github.com/orels1/orels-Unity-Shaders/compare/da7f20d0465a041d5a94e33b7ab1f3161d09e28c...b71492ce38c8a576d76ba0af3deec65d9b92dcbe)

{% video url="https://iframe.mediadelivery.net/embed/165/41a40b87-5036-4c41-9b19-545d055deb56?autoplay=true&loop=true&muted=true" title="6.1.0 Release Trailer" /%}

### Summary

Update 6.1 brings 20 new shaders, a whole new UI shader group, and redone documentation with better demos and layouts.

It is also the first release to support the VCC!

### New Shaders

- **PBR**
  - Dither Fade
  - Dissolve
  - Video Screen
- **VFX**
  - Ghost Lines
  - Shield
  - Laser
  - Holographic Parallax
- **UI** (New Pack)
  - Base Shader
  - Overlay
  - Audio Link
  - Layered Parallax
  - Scrolling Texture
  - Sheen
  - Video Screen

### New Shader Variants

- LTCGI Cutout
- AudioLink Vertex Animation

### Other Changes

- Added gradient editor to the **Ramp** slot in the **Toon** shader
- Improved the naming and location of repacked textures
- Added VCC Support
- Added Overlay, Screen and Lighten blends to the utility module

### Known Issues

- Specular occlusion is currently not as aggressive on metallic surfaces as desired. I'm currently looking into reworking the specular occlusion code to make it work properly
