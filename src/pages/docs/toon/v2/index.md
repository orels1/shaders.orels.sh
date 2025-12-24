---
title: Toon Shader
description: A versatile Toon shader aimed at use with PC version of VRChat
---
<!-- markdownlint-disable MD024 -->

ORL Shaders package comes with a fully-featured Toon shader geared towards use in VRChat. It combines some lighting features of the [ORL Standard](/docs/orl-standard/base-shader) shader with Toon features like Ramp, Right Lights, Matcaps, Outlines, and more.

You can find this toon shader under `orels1/Toon/v2/Main` in the shaders list.

{% callout type="note" title="Transparent and Cutout Variants" %}
This shader has a Transparent and Cutout variants under `orels1/Toon/v2/Transparent` and `orels1/Toon/v2/Cutout` respectively. For things like Hair with partial transparency an `orels1/Toon/v2/Transparent PrePass` shader is recommended
{% /callout %}

![Toon Shader Demo](/img/docs/toon/v2/toon-overview.png "Example of the Toon shader in action")

As you can see, there are a lot of features packed into this shader. But do not fret, most of them are disabled by default, so you can pick and choose what suits your needs.

This documentation is broken up into modules that correspond to the foldouts in the shader inspector so you can easily find them.

## Main Settings

![Toon Shader Main Settings](/img/docs/toon/v2/toon-main-settings.png "Main Settings of the Toon shader")

- Main Color: Controls the tint of Albedo texture
- Tint By Vertex Color: Enables tinting of albedo by meshes' vertex colors
- Albedo Texture: The main texture of the material
- UV Set: Controls the set of UVs used by most effects, unless otherwise specified
- Hue: Controls the hue shift of the material
- Saturation: Controls the saturation of the material
- Value: Controls the value of the material

## VRCLightVolumes

![VRCLightVolumes controls](/img/docs/orl-standard/base-shader/vrclightvolumes.png)

- Enable VRC Light Volumes: Enables the VRC Light Volumes module

There are currently no other controls for the VRCLightVolumes module as it directly replaces lighting data from the lightprobes.

## Shading Settings

![Toon Shader Shading Settings](/img/docs/toon/v2/toon-shading-settings.png "Shading Settings of the Toon shader")

- Ramp: Controls the ramp texture used for the Toon effect. Uses black-to-white grayscale gradient by default. You can supply a fully white texture to avoid being shaded by lighting.
- Offset Ramp by Occlusion: Controls whether the occlusion will use the ramp to create shadow colors, essentially using it as a baked shadow
  - If you're coming from Toon Shader v1, this is essentially the old "Integrated" mode
- Shadow Sharpness: Controls the sharpness of realtime shadows
- Uniform Lightprobe Color: Samples the lightprobe color uniformly instead of using mesh normal directions, resulting in a single consistent environment lighting color across the whole mesh. Can be useful for more stylized looking lighting.

**Shadow Sharpness** 0 vs 1

![Shadow Sharpness 0](/img/docs/toon/v2/toon-shadow-sharpness-0.png "Shadow Sharpness 0")

![Shadow Sharpness 1](/img/docs/toon/v2/toon-shadow-sharpness-1.png "Shadow Sharpness 1")

## Normals

![Toon Shader Normals](/img/docs/toon/v2/toon-normals.png "Toon Shader Normals")

- Normal Map: The normal map of the material
- Normal Map Tiling Mode: Controls how the normal map is tiled across the mesh
  - Synced With Albedo: The normal map will be tiled together with the albedo texture
  - Independent: The normal map will be tiled independently of the albedo texture
- Normal Tiling: Controls the tiling factor of the normal map. If **Normal Map Tiling Mode** is set to "Synced With Albedo", this will multiply the tiling set by the **Albedo** texture
- Normal Map Scale: Controls the strength of the normal map, and can be used to flip the direction as well
- Flip Y: Flips the Y axis of the normal map, this allows usage of DirectX-based normals
- Use Bicubic Sampling: Enables a more expensive but higher quality normal map sampling mode. This can be useful for lower resolution/more aliased normal maps. Often you can decrease the resolution of the normal map as a result of using this, while still getting a good result.

## Detail Normals

![Toon Shader Detail Normals](/img/docs/toon/v2/toon-detail-normals.png "Toon Shader Detail Normals")

- Detail Normal Mask: The mask texture for the detail normal map. Allows you to control where the detail normal is applied
- UV Set: Controls which UV set the Detail Normals will use

### Layer Settings

You can apply up to 4 detail normal layers to the material. This is most useful when used together with the **Detail Normal Mask** texture, as each normal layer can be controlled by a different channel of the mask texture. E.g. you can have 4 highly detailed tiled layers while using low-res normal maps.

Each layer has the same set of settings:

- Enable Layer: Toggles the detail normal layer
- Detail Normal: The extra normal map texture to be applied on top
- Detail Normal Scale: Controls the strength of the detail normal map
- Flip Y: Flips the Y axis of the detail normal map
- Mask Channel: Controls which channel of the **Detail Normal Mask** texture will be used to control the detail normal
- Mask Strength: Controls the strength of the detail normal map

## Specular

![Toon Shader Specular](/img/docs/toon/v2/toon-specular.png "Toon Shader Specular")

- Enable Specular: Enables the specular effect
- Specular Map: Controls various specular properties of the material. Will be multiplied by the respective values from sliders below
  - Red Channel: Controls the intensity of specular
  - Green Channel: Controls the amount of specular albedo tint (makes the specular more metallic)
  - Blue Channel: Controls the roughness of the material when applying specular
- Tiling Mode: Controls how the specular map is tiled across the mesh
  - Synced With Albedo: The specular map will be tiled together with the albedo texture
  - Independent: The specular map will be tiled independently of the albedo texture
- Specular Tiling: Controls the tiling factor of the specular map. If **Specular Tiling Mode** is set to "Synced With Albedo", this will multiply the tiling set by the **Albedo** texture
- Tint: Controls the tint of the specular highlight
- Intensity: Controls the strength of the applied specular
- Roughness: Controls the roughness of the surface when calculating specular. The rougher - the more diffuse the specular will be
- Sharpness: Controls the sharpness of the specular highlight, when fully sharp - specular will become a flat colored circle, works well for glossy effects
- Anisotropy: Controls the amount of anisotropic bending applied to the specular. Anisotropy depends on the UV layout of the mesh, and will break up on UV seams. this is limitation of Unity's Tangent calculations
  - Values Below and Above 0 bend the specular in different directions
- Albedo Tint: Controls the global level of specular albedo tint, this mimics the behavior of a Metallic surface

- Specular Mask: Controls the mask texture for the specular effect.
- Mask Channel: Controls which channel of the **Specular Mask** texture will be used to mask the specular
- Mask Strength: Controls the strength of masking of the specular effect, 0 means mask is not applied, 1 means mask is fully applied

## Matcaps

![Toon Shader Matcap](/img/docs/toon/v2/toon-matcaps.png "Toon Shader Matcaps")

- Matcap Mask: Controls the mask texture for the matcap effect.
- UV Set: Controls the UV channel used when sampling the **Matcap Mask** texture

### Layer Settings

- Enable Layer: Toggles the matcap layer
- Matcap: The matcap texture to use
- Tint: Controls the tint of the matcap
- UV Mode: Controls how the UVs of the matcap are calculated
  - UTS: Calculates UVs similar to the old Unity Chan Toon Shader, produces OK results, but can be distracting in VR
  - Top Pinch: The classic toon shader matcap mode, similar to the Toon Shader v1. Creates a visual "pinching" effect when looking at the surface from top or bottom
  - Double Sided: The most uniformly looking matcap mode, based on Poiyomi Toon Shader.
- Border: Scales the matcap UVs from the edges
- Matcap Blur Level: Controls the blurring of the matcap. Implemented by sampling a lower mip which can be a bit low quality for very reflective surfaces, use artistically
- Tint Matcap to Diffuse: Controls the amount of albedo tint applied to the matcap. Can be used to nicely blend matcap into the underlying material
- Blend Mode: Defines how the matcap will blend with the underlying material
  - Additive: Additive blending, the matcap is added on top of the surface color
  - Multiply: Multiplicative blending, the matcap is multiplied with the surface color
  - Subtract: Subtractive blending, the matcap is subtracted from the surface color
- Strength: Controls the strength of the matcap effect
- Mask Channel: Controls which channel of the **Matcap Mask** texture will be used to mask the matcap
- Mask Strength: Controls the strength of masking of the matcap effect, 0 means mask is not applied, 1 means mask is fully applied

## Decals

![Toon Shader Decals](/img/docs/toon/v2/toon-decals.png "Toon Shader Decals")

- Decals Mask: The mask texture for the decals effect.
- UV Set: Controls which UV set the Decals Mask will use

### Layer Settings

You can apply up to 4 decal layers to the material.

- Enable Layer: Toggles the decal layer
- Decal: The decal texture to be applied on top
- UV Set: Controls which UV set the Decal will use
- Scale: Scales the decal. The scale is applied from the center of the decal
- Offset X/Y: Moves the decal
- Rotation: Rotates the decal from the center
- Tile Decal: Enables tiling of the decal
  - Tiling X/Y: Controls the tiling of the decal

#### Colors

![Toon Shader Decals Colors](/img/docs/toon/v2/toon-decals-colors.png "Toon Shader Decals Colors")

- Tint: Controls the tint of the decal
- Multiply By Albedo: Controls the amount of albedo tint applied to the decal
  - Very useful when using decals that use tiled textures and simple color albedo. This way you can hue shift multiple different decal layers at once via albedo hue shift
- Use Emission: Adds Emission to the decal, uses Tint color
- Rim Fade: Adds a rim-style edge fade effect to the decal color
- Rim Fade Power: Controls the sharpness of the rim fade
- Invert Rim Fade: Flips the faded edge
- Rim Fade Underlay: Controls the color rim fade will fade out to. Multiplies the decal color

#### Masking

![Toon Shader Decals Masking](/img/docs/toon/v2/toon-decals-masking.png "Toon Shader Decals Masking")

- Mask Channel: Controls which channel of the **Decals Mask** texture will be used to control the decal
- Mask Strength: Controls the strength of the decal effect
- Clip Decal: Enables clipping of the decal. By default clips to a rectangle edge
- Circle Clip: Switches clipping to a circular shape. Best for badges and other circular elements
- Clip Size: Controls the size of the clipping shape
- Clip Falloff: Controls the edge fadeout of the clipping shape

## Rim Light

![Toon Shader Rim Light](/img/docs/toon/v2/toon-rim-light.png "Toon Shader Rim Light")

- Enable Rim Light: Enables the rim light effect
- Tint: Controls the color of the rim light
- Intensity: Controls the intensity of the rim light
- Albedo Tint: Controls the amount of albedo tint applied to the rim light
- Environment Tint: Controls how much the rim light will be tinted by the environment reflections and lightprobes
- Spread: Controls how far the rim light will extend from the edges of the mesh.
- Sharpness: Controls the sharpness of the rim light. If set to 1 - will become a flat color with a sharp edge instead of a smooth gradient
- Threshold: Controls how much the rim light will be offset by the light direction. 1 - Will only show up in the areas hit by the light, 0 - will show up everywhere
- Attenuation: Controls how much the rimlight will be visible in shadowed areas. 0 - always visible

## Rim Shadow

![Toon Shader Rim Shadow](/img/docs/toon/v2/toon-rim-shadow.png "Toon Shader Rim Shadow")

Rim shadow is an that emphasizes the curved shapes of the mesh by darkening the material at glancing angles. At times can even mimic a simple AO effect.

- Enable Rim Shadow: Enables the rim shadow effect
- Tint: Controls the color of the rim shadow. If set to white - no rim shadowing effect will be applied, as it multiplies the color underneath
- Albedo Tint: Controls the amount of albedo tint applied to the rim shadow. Works well with skin materials as it can add a little redness to the shadowed areas
- Spread: Controls how far the rim shadow will extend into the mesh. 1 - will cover all of the mesh no matter the angle to the camera
- Sharpness: Controls the sharpness of the rim shadow. If set to 1 - will become a flat color with a sharp edge instead of a smooth gradient
- Threshold: Controls how much the rim shadow will be offset by the light direction. 1 - Will only show up in the areas in shadow, 0 - will show up everywhere

## Reflections

![Toon Shader Reflections](/img/docs/toon/v2/toon-reflections.png "Toon Shader Reflections")

This implements the same reflection logic as the ORL Standard shader, with an addition of a fallback cubemap.

- Metallic Smoothness: Controls the metallic and smoothness parameters of the material when sampling reflections. Works the same way Unity Standard Shader metallic-smoothness texture works.
- Smoothness: Controls the smoothness level of the surface
  - Smoothness Remap: Controls how the smoothness value is remapped if the **Metallic Smoothness** texture is used
- Metallic: Controls the metallic level of the surface
  - Metallic Remap: Controls how the metallic value is remapped if the **Metallic Smoothness** texture is used
- Anisotropy: Controls the bending of the sampled reflection. Values Above and Below 0 bend the reflection in different directions
- Reflectivity: Controls the reflectivity of the material. Generally should be 0.5 for most PBR materials

### Masking

- Reflection Mask: Controls the strength of the applied reflection via a mask texture
- UV Set: Controls the UV channel used when sampling the **Reflection Mask** texture
- Mask Channel: Controls which channel of the **Reflection Mask** texture will be used to mask the reflection
- Mask Strength: Controls the strength of masking of the reflection, 0 means mask is not applied, 1 means mask is fully applied
- Reflection Strength: Controls the strength of the reflection effect. This is the value that will be multiplied by the **Reflection Mask** texture

### Tweaks

- Reflection Occlusion: Controls how much the PBR reflections will be occluded by the occlusion texture and lightprobe shadows
- Realtime Shadow Reflection Occlusion: Similar to the above, but will occlude the reflections by the realtime shadows
- Fallback Cubemap: The Cubemap to be used in Baked Cubemap mode or in PBR mode when no reflection probes are present in the environment.
- DFG: An internal LUT that controls the reflection strength at different angles. You're not meant to touch this

## AudioLink

ORL Toon supports AudioLink and provides a couple of different effects for you to choose.

There are some settings that are shared between all the modes

### Single Channel

![Toon Shader AudioLink Single Channel](/img/docs/toon/v2/toon-audiolink-single-channel.png "Toon Shader AudioLink Single Channel")

The most basic mode, pulses the material with a selected color, based on the intensity of the selected channel. Has a Mask Map to control which areas of the material are affected.

- AudioLink Map: The mask texture to control which areas of the material are affected by the AudioLink effect
- UV Set: Controls the UV channel used when sampling the **AudioLink Map**
- Color: Controls the color of the effect
- Frequency Band: Controls which frequency is used to perform the pulsing
- Smoothing Level: Controls the amount of smoothness to add to the Audio Link data. Helps to reduce the "jerkiness" of the effect

### Packed Map

![Toon Shader AudioLink Packed Map](/img/docs/toon/v2/toon-audiolink-packed-map.png "Toon Shader AudioLink Packed Map")

Packed map is a more advanced mode of AudioLink effect, which allows you to pulse different areas off the material based on different frequencies, as well as show a VU-Meter-like effect in the Gradient mode.

- AudioLink Map: The mask texture to control which areas of the material are affected by the AudioLink effect.
  - Red Channel: Will pulse based on the intensity of Low Frequency band
  - Green Channel: Will pulse based on the intensity of Mid and High Mid frequency bands
  - Blue Channel: Will pulse based on the intensity of High Frequency band
- UV Set: Controls the UV channel used when sampling the **AudioLink Map**
- Smoothing Level: Controls the amount of smoothness to add to the Audio Link data. Helps to reduce the "jerkiness" of the effect
- Red Channel
  - Gradient: Enables VU Meter effect for the elements colored Red in the **AudioLink Map**
  - Color: Controls the color of the effect
- Green Channel
  - Gradient: Enables VU Meter effect for the elements colored Green in the **AudioLink Map**
  - Color: Controls the color of the effect
- Blue Channel
  - Gradient: Enables VU Meter effect for the elements colored Blue in the **AudioLink Map**
  - Color: Controls the color of the effect

{% callout type="note" title="" %}
You can use the alpha channel of the AudioLink Map to control the overall intensity of the effect and smooth-out the edges when in Packed Map mode
{% /callout %}

### UV-Based

![Toon Shader AudioLink UV-Based](/img/docs/toon/v2/toon-audiolink-uv-based.png "Toon Shader AudioLink UV-Based")

UV-Based mode uses the UV coordinates of the mesh to display audio link history. This mode is very useful for creating scrolling effects.

- AudioLink Map: The mask texture to control which areas of the material are affected by the AudioLink effect
- UV Set: Controls the UV channel used when sampling the **AudioLink Map** as well as the UV channel used to sample the AudioLink history
- Color: Controls the color of the effect
- History Sample Amount: Controls how much of the AudioLink history will be sampled. Smaller values will visually speed-up the effect

{% callout type="note" title="UV Layout" %}
The UV layout you should use is similar to the ORL Standard AudioLink effect, where the Y axis is split into 4 parts, each representing a frequency band. The X axis is used to sample the history.

![UV Layout Reference](/img/docs/orl-standard/audio-link/audio-link-uv-layout.png "UV Layout Reference")
{% /callout %}

## Emission

![Toon Shader Emission](/img/docs/toon/v2/toon-emission.png "Toon Shader Emission")

- Emission Map: The emission map to use
- Emission Map Channel: Controls which channel of the **Emission Map** texture will be used to control the emission
- Color: Controls the color of the emission
- Hue: Controls the hue shift of the emission
- Saturation: Controls the saturation of the emission
- Value: Controls the value of the emission
- Tint To Diffuse: Controls the amount of albedo tint applied to the emission. This will help saturate the color
- Scale w/ Light: Controls whether the emission should be adjusted based on the current light intensity. This allows you to make it so your material only glows in the dark. Default is "No"
- Scaling Sensitivity: Only visible if **Emission Scale w/ Light** is set to "Yes". Controls the the light level needed to turn off Emission. The emission will only be visible if the current lighting is less than the value specified, e.g. if set to 0.5 - the emission will show up when the light is 0.49 and lower

## Outline

![Toon Shader Outline](/img/docs/toon/v2/toon-outline.png "Toon Shader Outline")

- Enable Outline: Enables the outline effect
- Texture: Controls the outline color
- Color: Controls the tint of the outline texture
- Lighting Mode: Controls how the outline is lit. Defaults to Lit
  - Lit: Uses environment lighting to light the outline
  - Emissive: Uses the outline color directly
- Albedo Tint: Controls how much the outline is tinted by the albedo texture
- Width Mask: Controls the widths of the outline via the red channel of the texture. It will multiply the **Width** value by the texture value
- Width: Controls the width of the outline
- Adjust by Vertex Color: Enables adjusting the width of the outline by the vertex color of the mesh. Uses the red channel of the vertex color and multiplies the width by its value.
- Ignore Stencils: Skips the stencil test for the outline.
  - This is useful when you want to see outlines on top of the surface of your mesh instead of just around it. E.g. if you have clothing with folding details or things like buttons, you can use this to outline them as well.

{% callout type="note" title="Outline Approach" %}
ORL Toon uses a pass-based outline, which avoids using geometry shaders, but will have visual splits on hard edges. It does benefit from using stencils, on the other hand, so it works in the Transparent mode as well.
{% /callout %}

## UV Discard

![Toon Shader UV Discard](/img/docs/toon/v2/toon-uv-discard.png "Toon Shader UV Discard")

UV Discard is a technique that allows you to hide parts of the mesh based on the UV tile they're in.

You can find more information here [in the UV Discard documentation](/docs/toon/uv-discard)

## Advanced Settings

![Toon Advanced Settings](/img/docs/toon/v2/toon-advanced-settings.png "Toon Advanced Settings")

- Culling Mode: Controls the culling applied to the mesh
  - Back: Culls visible backfaces
  - Front: Culls visible frontfaces
  - Off: Renders in double-sided mode
- Depth Write: Controls whether the object writes to depth
- Depth Test: Controls how the depth testing is performed, you generally never need to change this
- Raise Minimum Light: Increases the minimum lighting level of the material in environments with no lighting data
- Monochrome Lighting: Controls how much the color of the environment lighting affects the object's color. At 1 only the intensity of the environment lighting is used, while the color is ignored.
