---
title: Changelog
description: ORL Shaders Changelog
---

ORL Shaders Changelog

---

## v7.1.1

### Bugfixes

- Fixed an Exception when a new texture property is added to the shader while inspecting a connected material

## v7.1.0

### Summary

Version 7.1.0 fixes issues with the "Sampling Macro Stripping" generation mode, this is required for the shaders to be supported by d4rkpl4y3r's avatar optimizer.

### Bugfixes

- Fixed broken shaders being generated when exporting with "Strip Sampling Macros" option
  - This shoudl allow the shaders to support texture combining via d4rkpl4y3r's avatar optimizer
- Layered Material Mask Sliders (Smoothness/AO) now work correctly
- Most included Inspector Drawers now correctly pass down the `[Tooltip]` property attribute, improving documentation

### Changes

- Layered Material now supports UV selection for the Mask texture
- Layered Material's Base Layer now supports UV selection
- Added Tooltips to the Layered Material shader
- Added a new way to add tooltips to a shader, using a `*.orlloc` file, this is still in development on a separate `feature/localization` branch

## v7.0.0

### Summary

Version 7.0.0 adds lots of new features, improvements, and bugfixes. This release was heavily driven by community requests in my Discord, so if you have any suggestions or feedback - [please let me know!](https://discord.gg/orels1)

### New Shaders

- **PBR**
  - [Hotspotting](/docs/orl-standard/hotspotting): An auto-hotspotting shader that can be used to quickly set up reusable hotspot materials
  - [AreaLit](/docs/orl-standard/arealit): A special variant of the main shader with included AreaLit support.
  - [Decals](/docs/orl-standard/decals): A simple Decalery-compatible decals shader.
  - [VRSL GI](/docs/orl-standard/vrslgi): A special variant of the main shader with included VRSL GI support.
- **Toon**
  - Version 2 of the toon shader is now available! Here are the highlights:
    - You can now have up to 4 matcaps, detail normal layers and decals
    - Most things can be masked by a mask texture with channel and UV selection
      - This allows you to make use of highly tiled detail textures that can preserve high quality detail at low resolutions
    - UV Discard is now included by default
    - PBR Reflections have been redone and are now based on the ORL Standard shader
  - You can find the [full docs here](/docs/toon/v2)

### New Features

- **Extra Passes** are now supported by the shader generator!
  - This allows you to add extra passes to your shaders without losing all the features of the shader generator (compared to using `%PostPasses` and `%PrePasses`)
  - Read more about it [here](/docs/generator/orl-shader-definition/#extra-pass-string-pass-name)
- **Cloth** Shading mode added to all PBR shaders.
  - This is still experimental, so please report any issues you encounter
  - You can learn more about it [here](/docs/orl-standard/base-shader#shading-mode)
- **ClearCoat** Option added to all PBR shaders in default shading mode
  - This is still experimental and might not support all sources of lighting, please report any issues you encounter
  - You can learn more about it [here](/docs/orl-standard/base-shader#shading-mode)
- **Screen Space Reflections** module
  - This module allows you to add screen space reflections to any PBR shader.
  - Due to its cost - it is not included in any shaders by default, but you can use it via [Configurable Shaders](/docs/configurable-shaders)
  - You can learn more about it [here](/docs/configurable-shaders/modules/ssr)
  - The implementation is based on [Mochie's shaders](https://github.com/MochiesCode/Mochies-Unity-Shaders)
- **VRC Light Volumes** module
  - This module adds support for [RED_SIM's VRC Light Volumes](https://github.com/REDSIM/VRCLightVolumes/tree/main)
  - The module is included **and enabled by default** in Toon shaders. It is included **and disabled by default** in PBR (Standard) shaders.
  - There is currently no support for this in VFX shaders as they do not sample lightprobes, however - you can implement it in a custom VFX shader by providing a spot for relevant hooks: `%CustomProbesSetupFunctions` and `%CustomProbesFunctions`. The latter requires creating a `half3 indirectDiffuse` variable prior to the hook, which will then get populated by the light volume color data.
- **LTCGI** support for Toon shaders both v1 and v2. Thanks [@fundale](https://github.com/fundale) for the contribution!
- **Custom GI Diffuse Ramp** module for Toon v2 shaders. This allows you to add a toon-style ramp to the diffuse lighting from custom GI sources, e.g. LTCGI.
  - Thanks [@fundale](https://github.com/fundale) for the contribution!
- **Masked Tweaks** module
  - This module allows you to tweak your material's parameters based on a mask texture
  - You can learn more about it [here](/docs/configurable-shaders/modules/masked-tweaks)
- **Layered Material** shader got a major update
  - A new "base layer" everything stacks on top of was added
    - This makes it easier to use with terrain-style setups
  - Mask debugging for each individual layer was added
  - Normal "leaking" between layers is fixed
  - Every layer now has a bespoke strength slider to simplify setup
  - Every layer can now use triplanar UV mapping
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
- You can now explicitly turn on passing normal maps to the GSAA calculation. Leaving it off can help avoid a "pixelation" effect on high frequency normal maps.
  - This is turned off by default on all materials. You can turn it on for your existing materials via Tools > orels1 > Upgrade Materials.
- Toon shaders now properly support Vertex Lights.
- Toon shaders now have a new **Raise Minimum Light** checkbox which allows you to bump the minimum brightness of your material in environments with no lighting data.
- Toon shaders can now sample lightprobe colors uniformly, which is desireable in some cases.
- Glitch Screen shader now has a separate **Transparency** texture that can be used to control the alpha channel of the material. It now also supports different render types.
- You can now enable LTCGI on mobile platforms.
- Toon shaders now support using Bicubic sampling for the normal map. This can be useful for lower resolution/more aliased normal maps.
- Toon shaders now have a "Monochrome Lighting" slider. This allows you to control how much the color of the environment lighting affects the object's color. At 1 only the intensity of the lighting is used.
- Added a **Depth Fade** module. It behaves like the Soft Particles mode in the default unity Particle Shaders.
  - This module is not currently included in any shaders, but you can use it via [Configurable Shaders](/docs/configurable-shaders)
  - You can learn more about it [here](/docs/configurable-shaders/modules/depth-fade)
- Added a **Vertex Colors** module. It allows you to use the vertex color data to control various properties of the material.
  - It is most useful for things like Particles, so you can use "Color over Lifetime" option to drive material Color and Alpha.
  - This module is not currently included in any shaders, but you can use it via [Configurable Shaders](/docs/configurable-shaders)
  - You can learn more about it [here](/docs/configurable-shaders/modules/vertex-colors)
- You can now define hook points within your modules.
  - This was previously only available in the Template files
  - Using this feature - you can inject extra code into things like Data Structs or functions
  - Read more here: [Hook Points](/docs/generator/orl-shader-definition#hook-points)
- Added box projection contact hardening to the PBR shaders.
  - Based on [DavidM's implementation](https://github.com/frostbone25/Unity-Improved-Box-Projected-Reflections/tree/main)
  - Improves the accuracy of reflections closer to the "surface" of the mesh
  - See [Base Shader](/docs/orl-standard/base-shader#lightmapping) for more info
- Shader Generator now has a Project Settings window.
  - This allows you to add or remove always included modules, change the default lighting model, and remap modules to your custom ones.
  - Take a look at the [Project Settings](/docs/generator/project-settings) docs page for more information.
- Shader Generator now supports writing to `SV_Depth` in the PBR shaders. Check out the [ORL Shader Definition docs](/docs/generator/orl-shader-definition#optional-features) for more info.
- Shader Inspector can now add H3 headers via `### Some Header` syntax
- You can now add horizontal separators in the Shader Inspector via `---`, e.g. `UI_Separator("---", Int) = 0`
- Standard shaders now support a fast triplanar UV mode as one of the **Mapping Space** options
- [Dissolve](/docs/orl-standard/dissolve) can now use Vertex Colors as a source of dissolve. Thanks [@lackofbindings](https://github.com/lackofbindings) for the contribution!
- The Shader Inspector can now show a Vector3 field for Vector properties. The most basic usage looks like this `%Vector3(Hue, Saturation, Value)`. Check out the relevant [Shader Inspector section](/docs/inspector/overview#vector-3-field) for more information.
- More blocks support `Order` parameters
  - You can now supply an `Order` parameter to the following blocks:
    - `%LibraryFunctions()`
    - `%DataStructs()`
    - `%PassModifiers()`
- Layered Material shader now supports masking via Alpha Channel

### Bugfixes

- The tangent normals sign is now properly calculated per-vertex. This should not affect most users
- Specular occlusion now properly occludes reflection probes again. You might need to tune the Specular Occlusion slider to adjust the effect. Please note that the slider has been renamed to "Reflection Probe Occlusion" in the UI
  - You can migrate existing materials via Tools > orels1 > Upgrade Materials. This will adjust the new specular values to be closer to the pre-upgrade look
- Fixed off-by-one errors in the channel selector for Albedo and Emission textures
- Shader tags are now de-duplicated automatically, this can help with some issues with Bakery Lightmapper
- Gradient editor now correctly handles "Fixed" blending mode. Thanks [@lackofbindings](https://github.com/lackofbindings) for the fix!
- All UV channels have been changed to use `float4` instead of `half4` to avoid precision issues on mobile platforms.
- Fixed a number of issues with the Texture Packer when using mixed color spaces.
- Fixed an issue where Triplanar Effects would not map the textures correctly resulting in flipped textures on the sides.
- Fixed an issue where the material emission values where not multiplied correctly (to mimic Unity's Standard emission behaviour)
  - You can migrate existing materials via Tools > orels1 > Upgrade Materials. This will multiply the emission to match your current scene values
- Fixed an issue with cutout materials not tiling the texture correctly in the shadowcaster pass
- Vertex Animation shader inspector behaves correctly again
- Fixed a number of issues with specular occlusion being overly aggressive
- Improved UV derivative issues in the Glitch Screen shader. This could cause unwanted artifacts on the edges of the glitch
- Fixed AudioLink band selection in the Toon Shader
- [VRChat Features](/docs/orl-standard/base-shader#vr-chat-features) now hides the material from main view correctly
- Fixed an issue where VertexAnimation would misbehave on Mobile platforms
- Commented out lines no longer trip the parser. This means you can now comment out ORL Shader Definition blocks and they will be correctly ignored

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
- `CreateMeshData` function of `MeshData` struct now takes in a `facing` parameter to flip the TBN matrix for correct normal directions on meshes with visible backfaces.
- Since all shaders can now be Opaque/Transparent/Cutout/Fade, the Cutout shader has been renamed to Foliage and will recieve relevant features in the future
- The [Clouds](/docs/vfx/clouds) shader now has a Depth Blending option that allows you to disable the blending even when the depth buffer is present.
- The [Clouds](/docs/vfx/clouds) shader now respects the transparency of Bottom and Top gradient colors
- All the built-in templates now have a `%PassFunctions` block inserted before the all the other function definitions.
  - This allows you to add functions that depend on speific structs and other per-pass data that you want to reference inside your other functions
- AreaLit module can now be used in the VFX-based shaders
- LTCGI module has been upgraded to the V2 API.
  - If you're using LTCGI - make sure to update your LTCGI version to V2+
  - This also adds an Alpha premultiply and more granular specular/diffuse controls. Check out the [LTCGI docs](/docs/orl-standard/ltcgi) for more information
- VRSLGI module can now be used in the VFX-based shaders
- Parallax module has been updated to use simpler code and support angle-based flattening, which can help with layering artifacts

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
