---
title: Changelog
description: ORL Shaders Changelog
---

ORL Shaders Changelog

---

## v6.4.0

### Summary

Update 6.4.0 focuses on improving the current feature set, quality-of-life changes, and fixing bugs

### New Shaders

- **PBR**
  - [Hotspotting](/docs/orl-standard/hotspotting): An auto-hotspotting shader that can be used to quickly set up reusable hotspot materials

### New Features

- Standard-Based shaders can now adjust Stencil parameters
- You can now occlude baked specular via Realtime Shadows. This effect is not physically accurate but can be helpful when used on dynamic objects
- Vertex Lights now properly light up objects using Standard shaders. This requires enabling vertex lighting in Advanced Settings
- You can now apply in-shader tonemapping on mobile platforms. This can drastically improve the look of your environments on Quest/Android. [See the full docs here](/docs/orl-standard/base-shader/#other-advanced-options)
- Toon shader now fully sports baking. Recommended to be used with a directional lightmap for best results
- Toon shader now has support for vertex-color masking of outline thickness
- Toon shader can now use outlines without stencil. This can be useful for adding extra detail
- LTCGI effect brightness can now be clamped to a 0-1 range and has a Maximum Brightness setting
- You can now use BIRP Standard shader-style Detail Albedo mixing. This can be toggled via "Legacy Albedo Mixing" when using the Separated Detail Map mode.

### Bugfixes

- The tangent normals sign is now properly calculated per-vertex. This should not affect most users
- Specular occlusion now properly occludes reflection probes again. You might need to tune the Specular Occlusion slider to adjust the effect
- Fixed off-by-one errors in the channel selector for Albedo and Emission textures
- Shader tags are now de-duplicated automatically, this can help with some issues with Bakery Lightmapper

### Other Changes

- The channel packer will now default Alpha channel slot to read from the Red channel, as that is the most common use-case
- Updated the Tessellated Displacement shader to use latest shader generator tech. It now has MONOSH and can be used with Configurable shaders.

## v6.3.0

### Summary

Update 6.3.0 focuses on smaller features and incremental improvements to existing shaders

### New Features

- Cutout shaders now support LOD Crossfade
  - No extra configuration is required, but [here's some extra info](/docs/orl-standard/base-shader/#lod-crossfade)
- All shaders that have a "VRChat Features" block now have a "VRC Fallback" dropdown
  - This allows you to select how the shader will be displayed when your shaders are blocked by the user's safety settings
  - You can see full documentation [here](/docs/orl-standard/base-shader/#vr-chat-features)
- [VFX Laser Shader](/docs/vfx/laser) now supports UV-Space noise for better compatibility with Line Renderers
  - Also improved the overall VFX Laser Shader inspector layout
- [`%OverrideTag()`](/docs/inspector/overview#setting-an-override-tag-based-on-an-enum) drawer function has been added to the inspector
  - This allows you to set per-material Shader Tag overrides based on an enum value
  - The VRC Features module uses it to set the `VRCFallback` tag value

### Other Changes

- Toon shaders now have the VRChat Features module that was missing before
- The `facing` parameter has been changed from using `VFACE` to `SV_IsFrontFace` for better compatibility. It is also now a `bool` type instead of `fixed`

## v6.2.0

![6.2.0 Release](</img/docs/root/changelog/changelog-Shader_v6.2_Splash.png>)

### Summary

Update 6.2.0 brings a couple of new and highly requested shaders like **Puddles**. It also adds a new system for creating your own custom shaders called **Configurable Shaders**, and a bunch of new features and improvements to existing shaders.

### New Shaders

- **PBR**
  - [Puddles](/docs/orl-standard/puddles): a puddles variant of the PBR shader with support for different puddle drivers, e.g. based on Depth texture, mask texture or a vertex color. Also includes the rain droplets effect
- **VFX**
  - [Patterns](/docs/vfx/patterns): a collection of procedural patterns you can use to make looping effects for extra background detail
  - [Glitch Screen](/docs/vfx/glitch-screen): a shader aiming to create a glitchy screen effect, inspired by Stray    
- **Toon**
  - [UV Discard](/docs/toon/uv-discard): a shader that allows you to hide pieces of your mesh using UV Tiles
  - Transparent PrePass: a variant of the transparent shader with 2-Pass transparency. Useful for things like Hair on avatars

### New Features

- [**Configurable Shaders**](/docs/configurable-shaders)
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

- [`%SetProp()`](/docs/inspector/overview#setting-prop-values-based-on-other-props) drawer function has been added to the inspector
  - This allows you to set a property of your material to some specific value based on another value
  - E.g. you can set the Stencil operation to Keep or Replace depending on whether the Outline is enabled or not (used by the main Toon shader)
- [`%Preset(<path to presets folder>)`](/docs/inspector/overview#presets) drawer function which displays a dropdown of Unity material presets from a particular folder
  - This is used by the VFX Patterns shader to display a bunch of pre-made effects you can build on top of
- [`%TemplateFeature(<FeatureName>)`](/docs/generator/templates#template-features) support
  - This allows you to define a block or piece of the template as optional, and then enable/disable it inside the specific shader module via [`%TemplateFeatures("MyFeature")`](/docs/generator/orl-shader-definition#template-features-string-features)
  - This is now used for the 2-Pass Transparency Toon Shader

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
- Added support for exporting generated shaders without CoreRP sampling macros (for external tool compatibility)
- Added support for switching between World Space and Local Space for Laser and Shield shaders
- Fixed an issue where the texture packer would not read the correct texture color space
- Rim Light in Toon shaders now respects the alpha value of a color
- Width slider for the Outline is now using a Logarithmic scale for better control at low values
- Toon Transparent shader now supports a separate alpha texture
- Added a `VFX` variant of Layered Parallax

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
