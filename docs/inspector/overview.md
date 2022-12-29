---
sidebar_position: 0
---

# Inspector Overview

ORL Shader Inspector is a Property-based shader GUI system for Unity. It is designed to be easy to use and extend, without requiring you to write much, if any, C# code when developing new shaders.

## Features

- H1 and H2 headers
- Headers acting as foldouts with default expanded states
- Min/Max Sliders
- Gradients generator
- Texture-based keywords
- ShowIf conditions for property visibility control
- Property combining for rendering multiple properties on a single line
- Texture Packing
- Keyword debugging

## Installation

### Unity Package Manager

You can add this package to any unity project if you have git installed by simply using the following git url in the package manager:

```
https://github.com/orels1/orels-Unity-Shaders.git#packages?path=Packages/sh.orels.shaders.inspector
```

### Unity Package

You can download the latest version of the inspector [as a unitypackage here](https://github.com/orels1/orels-Unity-Shaders/releases)

### VRChat Creator Companion

Add this repo listing to your VCC

```
Coming Soon (tm)
```

Afterwards - add ORL Shader Inspector package to your project

Having issues? [Hop by the discord](https://discord.gg/orels1)

## Usage

To use the inspector, simply reference it via the CustomEditor keyword in your shadder

```hlsl
CustomEditor "ORL.ShaderInspector.InspectorGUI"
```

When using ORL Shader Generator, you can use it by simply adding the following block

```hlsl
%CustomEditor("ORL.ShaderInspector.InspectorGUI")
```

### Headers

Headers are used to group properties together. The H1 top-level headers generate foldouts, while H2 headers simply appear as bold labels.

To add a header, simply add the following property to the list of your shader properties

```hlsl
UI_SomeHeader("# Some Header", Int) = 0
```

The default value you provide will specify if the section will be expanded or collapsed by default. So if you pass `1` - the section will be expanded.

H2 headers are added in a similar fashion, although the default value does not matter as they aren't foldouts

```hlsl
UI_SomeSubheader("## Some Subheader", Int) = 0
```

:::tip

Prefix your properties with `UI` so they won't ever clash with any shader properties and clearly indicate that they do not bear any shader-specific meaning.

:::

### Min/Max Sliders

It is often useful to provide remapping functionality to your shader properties. For example, you might want to remap a value from 0-1 to 0.1-0.8, to increase contrast of a Smoothness texture for example, or define an operating range of some modifier.

To do so, you can use the `%RemapSlider()` function.

```hlsl
_SmoothnessRemap("Smoothness %RemapSlider(0,1)", Vector) = (0,1,0,0)
```

This will generate a Min Max Slider that operates in the 0-1 range as defined by the arguments passed into the `RemapSlider` function.

This means you can define any arbitrary range you want, e.g., if you want a slider that works within -10 to 10 range, you can do so as such

```hlsl
_MovementRange("Movement Range %RemapSlider(-10,10)", Vector) = (-5,5,0,0)
```

The default values you provide to the Vector constructor at the end - will be used to initialize the slider.

You can access your newly remapped values in the `x` and `y` components of the vector.

### Conditional Properties

In complex shaders - there is often a need to hide and show properties based on other properties, defined shader keywords or passed textures.

This why ORL Shader Inspector ships with a fairly in depth property condition system. The `%ShowIf()` function allows you to define a condition that will be evaluated and hide or show the property based on the result.

The most basic usage looks like this

```hlsl
[Toggle(KEYWORD_ON)]_Keyword("Some Toggle", Int) = 0
_SomeProperty("Some Property %ShowIf(KEYWORD_ON)", Float) = 0
```

This will only show the `_SomeProperty` property if the `KEYWORD_ON` is enabled. Otherwise the property will be completely hidden.

The list of supported conditions is as follows

- Keywords, true if defined
- Textures, true if set
- Float and Int properties
  - Can be used as True/False, where any non-zero value will return True
  - Can also be used with direct value comparison, which is useful for `Enum` properties

All of the above can be inverted with `!` as well as combined in many ways using the `&&` and `||` operators and parentheses.

That means you can do something like this

```hlsl
_SomeExtraProperty("Some Extra Property %ShowIf(SHOW_EXTRA && (KEYWORD_ON || _SomeProperty > 0.5) && _MyEnum != 1 && !_BumpMap)", Float) = 0
```

Where this property will only be shown if

- `SHOW_EXTRA` is defined
- And either `KEYWORD_ON` is defined or `_SomeProperty` is greater than 0.5
- And `_MyEnum` is not equal to 1
- And `_BumpMap` texture is not set

Any complex shader GUI is bound to use this Function the most

### Property Combining

There is often a need to combine multiple properties into a single line. For example you might want to provide channel remapper, which requires 4 Enum properties on the single line.

The `%CombineWith()` function allows you to do just that.

```hlsl
[Enum(R,0,G,1,B,2,A,3)]_MetallicChannel("Metallic %CombineWith(_AOChannel, _DetailsChannel, _SmoothnessChannel)", Int) = 0
[HideInInspector][Enum(R,0,G,1,B,2,A,3)]_AOChannel("AO", Int) = 1
[HideInInspector][Enum(R,0,G,1,B,2,A,3)]_DetailsChannel("Details", Int) = 2
[HideInInspector][Enum(R,0,G,1,B,2,A,3)]_SmoothnessChannel("Smooth", Int) = 3
```

Since the rest of the properties are already rendered by the root _MetallicChannel, we can safely `HideInInspector` everything that gets bundled inside `CombineWith`.

### Texture-based Keywords

Sometimes you might want to define a keyword based on the presence of a texture. For example, you might want to enable a keyword if a `_BumpMap` texture is set to skip sampling the normal map unless its present.

To do so, you can use the `%SetKeyword()` function.

```hlsl
_BumpMap("Normal Map %SetKeyword(NORMALMAP_ON)", 2D) = "white" {}
```

This way you can add a relevant shader_feature and wrap your sampling code in `#if defined(NORMALMAP_ON)` so it will only be executed if the texture is set.

### Gradient Generator

ORL Shader Inspector ships with a built-in Gradient Generator, which allows you to generate a gradient texture on the fly.

```hlsl
_Gradient("Gradient %Gradient()", 2D) = "white" {}
```

The above will generate a simple gradient picker with a black-to-white gradient pre-filled, but not generated as a texture.

You can also pass a default value to the function, which will be used to initialize the gradient.

```hlsl
_Gradient("Gradient %Gradient((0,1,0,1), (1,0,0,1))", 2D) = "white" {}
```

This will generate a Green to Red gradient, which you can then modify.

Since the gradients are not textures as is, you will need to click the "Save Gradient" button to actually generate the texture to be used by the shader.

The regular texture slot is also kept so you can pass any other texture you want to use instead.

Its important to note that the gradient data is stored on the Material itself, so if you drag the generated gradient texture into a different material, it will pick up the gradient it was generated from. But you can always go back to the original material and save that gradient as a preset if you want to reuse it as a base for new gradients.

:::tip Don't forget to save!

The inspector will always display a warning message reminding you to save your gradients into textures, if the texture slot is empty. Unfortunately, for gradient slots that are already populated - you'll need to remember to save your gradients manually.

:::

### Required Textures

Sometimes you might want to require a texture to be set, as well as provide a default value for it. Baked noise masks and other atlases are often good candidates for this.

To do so, you can use the `%RequiredTexture()` function.

```hlsl
_NoiseMask("Noise Mask %RequiredTexture(Asset/Textures/BakedNoise)", 2D) = "white" {}
```

This will auto-set the texture from the provided path if no texture is currently provided.
To make the system more flexible, though, it also allows the user to pass a different texture into the slot and the system will not override it.

### Texture Packer

ORL Shader Inspector ships with a built-in Texture Packer, which is most handy for optimizing your texture taps, as well as working with various asset packs that might not have textures in a compatible format.

You do not need to do anything special to display the packer, every texture slot will have a Repack Texture button near it which will bring up the packing UI.

Here you can specify which textures to use, fill values for cases when no texture is passed, as well as invert the final result.

The textures are loaded directly from disk to avoid any texture compression issues and save with High Quality compression by default.

### Note Field

Sometimes you want to add inline documentation to your properties, like listing which channels are used for what, or what the texture is supposed to be.

To do so, you can use the markdown quote notation like this

```hlsl
UI_ChannelsNote("> R: Albedo, G: Normal G, B: Smooth, A: Normal R", Int) = 0
```

### Link Field

You might also want to link full external documentation in your inspector, and for that a markdown link notation is used

```hlsl
UI_DetailsDocs("[This module has documentation](https://shaders.orels.sh/docs/orl-standard/base-shader#details)", Int) = 0
```

### Single-Line Textures

While full-size texture slots with Tiling and Offset fields can be useful, often you want to render a single-line texture slot, which is more compact and takes less space.

To do so - add a `>` after the texture property display name

```hlsl
_BumpMap("Normal Map >", 2D) =  "bump" { }
```

### Combine and Experiment

A lot of the above features are designed to be combined with each other, so you can create complex shader GUIs with ease.

For example, you can make a single-line texture that is only shown when a condition is set, sts a keyword based on its presence, and provides a gradient generator

```hlsl
_SomeSpecialTexture("Special Texture > %ShowIf(_SpecialModuleEnabled) %SetKeyword(SPECIAL_ON) %Gradient()", 2D) = "white" {}
```