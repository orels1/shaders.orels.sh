---
title: Changelog
description: ORL Shaders Changelog
---

ORL Shaders Changelog

---

## v7.0.0

### Summary

Version 7.0.0 ads lots of new features, improvements, and bugfixes. This release was heavily driven by community requests in my Discord, so if you have any suggestions or feedback - [please let me know!](https://discord.gg/orels1)

### New Shaders

- **PBR**
  - [Hotspotting](/docs/orl-standard/hotspotting): An auto-hotspotting shader that can be used to quickly set up reusable hotspot materials

### New Features

- **Extra Passes** are now supported by the shader generator!
  - This allows you to add extra passes to your shaders without losing all the features of the shader generator (compared to using `%PostPasses` and `%PrePasses`)
  - Read more about it [here](/docs/generator/orl-shader-definition/#extra-pass-string-pass-name)
- Standard-Based shaders can now adjust Stencil parameters
- You can now occlude baked specular via Realtime Shadows. This effect is not physically accurate but can be helpful when used on dynamic objects
- Vertex Lights now properly light up objects using Standard shaders. This requires enabling vertex lighting in Advanced Settings
- You can now apply in-shader tonemapping on mobile platforms. This can drastically improve the look of your environments on Quest/Android. [See the full docs here](/docs/orl-standard/base-shader/#other-advanced-options)
- Toon shader now fully sports baking. Recommended to be used with a directional lightmap for best results
- Toon shader now has support for vertex-color masking of outline thickness
- Toon shader can now use outlines without stencil. This can be useful for adding extra detail
- LTCGI effect brightness can now be clamped to a 0-1 range and has a Maximum Brightness setting
- You can now use BIRP Standard shader-style Detail Albedo mixing. This can be toggled via "Legacy Albedo Mixing" when using the Separated Detail Map mode.
- "Baked Specular Occlusion" slider has been added to the Lightmapping section of all the Standard shaders. This can be used to control how much occlusion is applied to baked specular, e.g. from directional lightmaps or lightprobes.
- Added a "Force Discard" toggle to the [UI Sheen](/docs/ui/sheen) shader. This can be used to force-discard transparent pixels of the sprite to avoid white line artifacts on the edges of the sprite.
- Shader Generator now supports `%PostVertex` function blocks in all Templates. This allows you to modify the final output of the Vertex shader, after the `VertexBase` function runs.
- The [VFX Clouds](/docs/vfx/clouds) shader got a major update.
  - Now supports Directional Light-based shading, using a color ramp (similar to toon shaders).
  - Now supports normal recalculation. This provides more accurate shading that follows the extruded shape of the clouds. This effect can be a little noisy, so you can use the Precision slider to adjust it until it looks good.
- You can now use all 8 UV channels by defining `NEED_UV4`/`NEED_UV5`/`NEED_UV6`/`NEED_UV7` in your shader defines.
- Configurable shaders can now accept arbitrary modules from anywhere in your project. Using the new "Custom Module" checkbox. This allows you to add modules that are not included in the shader generator.
- Bakery Volumes are now supported in all PBR Shaders. Check out the [Lightmapping section](/docs/orl-standard/base-shader#lightmapping) for more information.
- The Shader Inspector can now show a Vector2 field for Vector properties. The most basic usage looks like this `%Vector2(Min, Max)`. Check out the relevant [Shader Inspector section](/docs/inspector/overview#vector-2-field) for more information.
- You can now draw a Bakery Volume Assigner field in the Shader Inspector by using `%BakeryVolumeAssigner()`. Check out the relevant [Shader Inspector section](/docs/inspector/overview#bakery-volume-assigner) for more information.
- All of the keywords has been limited to their respective shader stages. This should improve shader complication and mesh channel resolving times.
- You can now use a new block type `%CheckedInclude()` to only include a shader include file (e.g. a `.cginc` or `.hlsl`) if that file actually exists on disk. This is useful when working around conitional includes via keywords that sometimes produce errors in console. Check out the relevant [Shader Generator Section](/docs/generator/orl-shader-definition#checked-include-string-path) for more information.
- You can now define a hook point similar to the Template files inside your function blocks. Check out the [Template docs](/docs/generator/templates#template-hook-points) for more information.
- `%ShaderModifiers` as well as all of the `%PassModifiers` variants (like `%MetaPassModifiers`) now support overriding. This means that values you set in your `.orlshader` file will override the values in the `FragmentBase` or other files of your lighting model and other dependencies. Check out [Shader Modifiers](/docs/generator/orl-shader-definition#shader-modifiers) for more information.
- Render Type selector. All PBR and VFX shaders now have a render type selector. This allows you to switch between Opaque, Cutout, Transparent, and Fade blending modes. There is also a "Custom" option which allows you to specify your own blending parameters.
  - This also introduces a new shader tag `ORL_RenderType` which allows you to enforce a particular value of the render type, prevent the user from changing it. See the [Special Tags](/docs/inspector/overview#special-tags) section for more information.
  - The dropdown itself uses a new `%RenderType()` drawer function to display the available options and set the relevant properties on the material. See the [Render Type](/docs/inspector/overview#setting-render-type) section for more information.
  - This change means that if your render type is one of the preset options - you can use the `ORL_RenderType` tag to enable it without having to set any `%ShaderModifiers` or `%PassModifiers` yourself. However, you can still use those blocks to override the blending behaviour thanks to the new sorting and overriding mechanisms mentioned above.
- You can now bake down procedural materials using something like a [Hotspotting](/docs/orl-standard/hotspotting) shader into static textures and PBR materials. Check out the [Map Baker](/docs/map-baker) section for more information.
- You can now turn off passing normal maps to the GSAA calculation. This can help avoid a "pixelation" effect on high frequency normal maps.
- Toon shaders now properly support Vertex Lights
- Toon shaders now have a new **Raise Minimum Light** checkbox which allows you to bump the minimum brightness of your material in environments with no lighting data.
- Toon shaders can now sample lightprobe colors uniformly, which is desireable in some cases

### Bugfixes

- The tangent normals sign is now properly calculated per-vertex. This should not affect most users
- Specular occlusion now properly occludes reflection probes again. You might need to tune the Specular Occlusion slider to adjust the effect. Please note that the slider has been renamed to "Reflection Probe Occlusion" in the UI
- Fixed off-by-one errors in the channel selector for Albedo and Emission textures
- Shader tags are now de-duplicated automatically, this can help with some issues with Bakery Lightmapper
- Gradient editor now correctly handles "Fixed" blending mode. Thanks [@lackofbindings](https://github.com/lackofbindings) for the fix!
- All UV channels have been changed to use `float4` instead of `half4` to avoid precision issues on mobile platforms.
- Fixed a number of issues with the Texture Packer when using mixed color spaces.
- Fixed an issue where Triplanar Effects would not map the textures correctly resulting in flipped textures on the sides.

### Other Changes

- The channel packer will now default Alpha channel slot to read from the Red channel, as that is the most common use-case
- Updated the Tessellated Displacement shader to use latest shader generator tech. It now has MONOSH and can be used with Configurable shaders.
- "Specular Occlusion" has been renamed to "Reflection Probe Occlusion" to better reflect what is happening under the hood.
- Some properties in the Lightmapping section were moved around to improve usability.
- [Dissolve](/docs/orl-standard/dissolve) now has configurable **Cutoff Range** with adjusted defaults. Thanks [@lackofbindings](https://github.com/lackofbindings) for the suggestion!
- The generator now includes a `BiRPtoURP` translation file. Based on [Error.mdl's implementation](https://github.com/Error-mdl/URP-ShaderIncludes-For-BiRP). You can now use it to write code that would be cross-compatible between URP and BiRP. [Check out the source file](https://github.com/orels1/orels-Unity-Shaders/blob/main/Packages/sh.orels.shaders.generator/Runtime/Sources/Libraries/CoreRPShaderLibrary/BiRPtoURP.orlsource) to see whats available!
- Depth texture definition is now always included. You no longer need to specify `NEED_DEPTH` in your defines.
- Configurable shaders can now be hand edited in code. This allows you to use the UI to set up the basic shader and then use code to edit it further. However, this makes it no longer editable via UI. A relevant warning will be shown in the inspector and the editing UI will be locked. You can use a "Force Reset" button to clear your changes and sync the shader back to the configuration.
- `%RemapSlider()` and `CombineWith()` functions have improved layout that is more consistent with other properties.
- The inspector of the PBR shaders has been simplified and sectioned in a better way. Stencils now exist in their own sections as they are not expected to be changed frequently.

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
