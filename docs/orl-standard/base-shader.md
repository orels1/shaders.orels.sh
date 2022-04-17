---
sidebar_position: 1
---

# 💡 Base Shader

This functionality is common to almost all of the ORL Standard-based shaders

-----

All of the standard shaders have names beginning with Standard, from pure Standard to Standard Triplanar Effects and others

This page describes all of the properties that are shared between almost all of the Standard-family shaders, while other pages in this group describe settings specific to each one of the special variants

## Shader Overview

![Standard Preview](/img/docs/orl-standard/base-shader/image.png)

<p align="center">
  <img alt="Standard Editor" src="/img/docs/orl-standard/base-shader/image2.png" />
</p>

The UI is broken down into multiple sections some of which you can probably collapse since you will likely not be touching them too often, e.g., "Advanced Features" and "Internal".

We will now go through every section, explaining the features it provides.

:::info Optional Settings

Note that not all of the settings are always visible, some options will show and hide based on the textures/toggles you select

:::

## Main Settings

<p>
<div className="row">
  <div className="col">
    <img alt="Settings on a new material" src="/img/docs/orl-standard/base-shader/image3.png" />
  </div>
  <div className="col">
    <img alt="Settings on a filled material" style={{maxHeight: 305}} src="/img/docs/orl-standard/base-shader/image4.png" />
  </div>
</div>
</p>

- Culling Mode: switches culling between Back/Front/Off
- Main Color: Main tint color
- Albedo: The Main Texture, its tiling and offset will be used by **all** the textures in the material, unless the texture slot provides its own tiling/offset parameters
- Mapping Space: Allows you to select between UV-mapped and Local Space/World Space aligned textures, which is useful for flat surfaces like Floors or Ceilings
  - UV: Uses the first UV channel to display the texture
  - Local Space: uses local coordinates on the provided X and Y axis to display the texture
  - World Space: uses world coordinates on the provided X and Y axis to display the texture (useful for maintaining constant scale among many meshes)
- X Axis and Y Axis: Only visible when **Mapping Space** is not in UV mode. Allows to select which axis (X/Y/Z) to use for displaying the textures
- Masks: Texture containing Metallic/Smoothness and AO maps. By default uses this channel setup:
  - Red: Metallic
  - Green: AO
  - Blue: Detail mask
  - Alpha: Smoothness
- Metal/AO/Detail/Smooth selectors: Only visible when **Masks** texture is plugged in (see screenshots above). Allows you to select which channel to use for which map. E.g., you can remap to an unreal-style RMAO setup using these options
- Roughness Mode: Only visible when **Masks** texture is plugged in. Flips the Smooth channel to accommodate for roughness maps, useful for Unreal Engine assets
- Smoothness: Controls global smoothness level, uses this value across the whole material. Only visible when there is no **Masks** texture provided
- Smoothness Remap: Allows you to adjust the range of smoothness values of the provided Smoothness map. Very useful for reusing existing textures for a wide variety of effects
- Metallic: Controls global metalness level, uses this value across the whole material. Only visible when there is no **Masks** texture provided
- Metallic Remap: Allows you to adjust the range of metalness values of the provided Metal map. Similar in application to the Smoothness Remap
- AO Strength: Only visible when Masks texture is plugged in. Controls the strength of the provided Ambient Occlusion map
- Detail as Tint Mask: Only visible when **Masks** texture is plugged in. Utilizes the provided **Detail** texture to mask portions of the **Albedo** which will be tinted by the **Main Color**
- Normal Map: The Normal texture with the normal strength slider
- Flip Y (UE Mode): Only visible when **Normal Map** texture is plugged in. Flips the green channel of the normal map for DirectX-style normal maps, which are commonly found in something like Unreal Engine assets.
- Emission: Specifies that the object emits light
- Emission Map: The emission texture with the Emission Tint, you can leave the texture blank and just adjust the tint if you want the object to emit one solid color

## Parallax

:::info Parallax Cost

ORL Standard uses a parallax technique called Parallax Occlusion Mapping, which is a fairly expensive effect, and you generally only want it on materials that require parallax to look good, an example below is one such material

:::

<div style={{position: "relative", paddingTop: "64.73354231974922%"}}><iframe src="https://iframe.mediadelivery.net/embed/165/351d94ca-08e3-4318-8b14-1b75b9b6f9d7?autoplay=true&loop=true&muted=true" loading="lazy" style={{border: "none", position: "absolute", top: 0, height: "100%", width: "100%"}} allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen="true"></iframe></div>

<p align="center">
  <small>Parallax Material example</small>
</p>

<br />

<p align="center">
  <img alt="Parallax effect controls" src="/img/docs/orl-standard/base-shader/parallax-inspector.png" />
</p>

Most parallax options are hidden until **Enable Parallax** is checked

- Enable Parallax: Toggles the special Parallax variant of the shader
- Height: The parallax heigh texture, **MUST** be set to linear ("sRGB" unchecked on the texture importer). The slider allows you to control the strength of the extrusion
- Height Ref Plane: Moves the reference plane of the texture up and down, will change the perceived distance of the effect from the surface (see video below below)
- Steps Min / Steps Max: Controls the quality of the effect. Default settings will probably be fine, unless you're using very high height intensity value, which will expose the "layering" of the effect.

<div style={{position: "relative", paddingTop: "64.73354231974922%"}}><iframe src="https://iframe.mediadelivery.net/embed/165/fb9820c0-9acd-4c8d-9c4a-8888c8a87c76?autoplay=true&loop=true&muted=true" loading="lazy" style={{border: "none", position: "absolute", top: 0, height: "100%", width: "100%"}} allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen="true"></iframe></div>

<p align="center">
  <small>Height Ref Plane adjustment</small>
</p>

## Details

Details section allows adding extra variety to the surface with its own set of mapping settings. There are two modes available for the source textures, which are described below. The effect is filtered by the Detail channel of the **Masks Map** from the **Main Settings**, which is Blue by default.

<p>
<div className="row">
  <div className="col">
    <img alt="Details map using Packed mode" src="/img/docs/orl-standard/base-shader/details-packed.png" />
  </div>
  <div className="col">
    <img alt="Details map using Separated mode" src="/img/docs/orl-standard/base-shader/details-separated.png" />
  </div>
</div>
</p>

<p align="center">
  <small>Packed Mode inspector vs Separated Mode inspector</small>
</p>

- Enable Details: Enables the effect
- Ignore Mask: Ignores the detail mask, which is usually taken from the Blue channel of the **Masks Map** texture from the **Main Settings**. This is useful if you are not using any masks texture at all
- Detail Map Mode: Controls how the details map is set up, which also changes its behaviour a bit
  - Packed: This mimics HDRP detail map. [You can read more about it here](https://docs.unity3d.com/Packages/com.unity.render-pipelines.high-definition@12.0/manual/Mask-Map-and-Detail-Map.html#detail-map). This means you can use this mode with any HDRP assets out of the box. TL;DR: Albedo is packed into the Red channel, Smoothness into Blue, Normal into Green and Alpha
  - Separated: A more classic mode, similar to the BIRP. Has separated slots for Detail Normals and Albedo + Smoothness, where Smoothness is packed into the Alpha channel of the **Details Map**.
- Details Map: The main details texture
- Details Normal Map: Only visible when **Detail Map Mode** is set to **Separated**. Allows specifying a bespoke normal map for detail
- Mapping Space: Allows you to select between UV-mapped and Local Space/World Space aligned textures, which is useful for flat surfaces like Floors or Ceilings
  - UV: Uses the first UV channel to display the texture
  - Local Space: uses local coordinates on the provided X and Y axis to display the texture
  - World Space: uses world coordinates on the provided X and Y axis to display the texture (useful for maintaining constant scale among many meshes)
- X Axis and Y Axis: Only visible when **Mapping Space** is not in UV mode. Allows to select which axis (X/Y/Z) to use for displaying the texture
- Albedo Scale: Used to brighten and darken the texture, as only one channel is available. Values below 0.5 - darken, and above 0.5 - lighten the original **Albedo**.
- Normal Scale: Controls the strength of the detail normal.
- Flip Y (UE Mode): Flips the Green channel of the detail normals. Allows the usage of DirectX normal maps, like the ones in the assets for Unreal Engine
- Smooth Scale: Allows to offset the smoothness using the details map. Values below 0.5 - make the surface more rough, above 0.5 - make it more smooth

<div style={{position: "relative", paddingTop: "64.73354231974922%"}}><iframe src="https://iframe.mediadelivery.net/embed/165/e9ae56db-968d-44cc-a29d-317d80ca50b7?autoplay=true&loop=true&muted=true" loading="lazy" style={{border: "none", position: "absolute", top: 0, height: "100%", width: "100%"}} allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen="true"></iframe></div>

<p align="center">
  <small>Adding detail Normal and Albedo</small>
</p>

## Advanced Features

<p align="center">
  <img alt="Advanced Features controls" src="/img/docs/orl-standard/base-shader/advanced-features.png" />
</p>

### GSAA

<div style={{position: "relative", paddingTop: "64.73354231974922%"}}><iframe src="https://iframe.mediadelivery.net/embed/165/acfeb44e-4b00-4581-9459-88e2dfcacd71?autoplay=true&loop=true&muted=true" loading="lazy" style={{border: "none", position: "absolute", top: 0, height: "100%", width: "100%"}} allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen="true"></iframe></div>

<p align="center">
  <small>GSAA Example</small>
</p>

GSAA, or Geometric Specular Anti Aliasing, helps avoid severe specular aliasing (often manifesting as "sparkles" visually) on metallic objects. It is enabled by default, as it is generally a very desirable effect

- GSAA Enabled: Toggles the effect
- GSAA Variance: Controls the change of the Normal direction required to be considered for GSAA filtering
- GSAA Threshold: Controls the cutoff of the variance which will be considered for GSAA filtering

### Other Advanced Options

- Force Box Projection: Enables support for Box Projected reflection probes on platforms that do not support it natively, e.g. Android (Oculus Quest). This is fairly expensive for mobile hardware, so use it sparingly

## Lightmapping

<p align="center">
  <img alt="Advanced Features controls" src="/img/docs/orl-standard/base-shader/lightmapping.png" />
</p>

- Specular Occlusion: Controls the amount of Specular Occlusion applied to the material. This helps limit the amount of "unity shine" which is often present on metallic surfaces (see comparison below). This applies to both lightmapped and non-lightmapped objects
- Specular Roughness Mod: Allows you to influence the roughness of Baked Specular, which can sometimes be too intensive due to imperfections of Baked Specular direction
- Bicubic Sampling: Dramatically increases quality of the baked shadows, especially on the lower resolution lightmaps at a fairly small performance hit
- Baked Specular: Toggles the display of baked specular. Only relevant when using some kind of Directional lightmap, e.g., Dominant Direction or Bakery's RNM or SH.
- Enable Bakery Features: Allows usage of bakery-specific features like RNM or SH lightmaps
- Bakery Mode: Specifies whether to use RNM or SH lightmaps for Baked Specular
- Bakery Non-Linear SH: Enables the Non-Linear SH sampling that can improve the contrast of the lighting on the mesh, especially with high-frequency normal maps

<div style={{position: "relative", paddingTop: "64.73354231974922%"}}><iframe src="https://iframe.mediadelivery.net/embed/165/884ea2b0-6ef3-4ebf-b97c-e6fcbfcff7df?autoplay=true&loop=true&muted=true" loading="lazy" style={{border: "none", position: "absolute", top: 0, height: "100%", width: "100%"}} allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen="true"></iframe></div>

<p align="center"><small>Specular Occlusion in action</small></p>


<p align="center">
  <img alt="Without Baked Specular" src="/img/docs/orl-standard/base-shader/baked-specular-off.png" />

  <small>Without Baked Specular</small>
</p>

<p align="center">
  <img alt="With Baked Specular" src="/img/docs/orl-standard/base-shader/baked-specular-on.png" />

  <small>With Baked Specular</small>
</p>

## Internal

:::caution Debug Information

You do not have to adjust settings shown in the Internal section, these are provided only for debugging

:::

- DFG LUT: The DFG-multiscatter LUT texture used for the specular calculations
- RNM0/RNM1/RNM2: Bakery-specific texture slots for RNM and SH support

## Cutout Variant

There is also a cutout variant of the Standard shader, which provides all the same features, but with support for regular and Alpha To Coverage cutout

<p align="center">
  <img alt="With Baked Specular" src="/img/docs/orl-standard/base-shader/cutout-inspector.png" />
</p>

## Examples

Here are some example material screenshots

<p align="center">
  <img alt="Plaster" src="/img/docs/orl-standard/base-shader/pbr-demo-plaster.png" />

  <small>Plaster</small>

  <img alt="Metal" src="/img/docs/orl-standard/base-shader/pbr-demo-metal.png" />

  <small>Metal</small>

  <img alt="Plastic" src="/img/docs/orl-standard/base-shader/pbr-demo-plastic.png" />

  <small>Plastic</small>

  <img alt="Wood" src="/img/docs/orl-standard/base-shader/pbr-demo-wood.png" />

  <small>Wood</small>
</p>