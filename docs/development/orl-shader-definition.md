# ORL Shader Definition

How the shaders are made

-----

As mentioned in the credits section of the main page - the ORL Shader package is built with the Modular Shader System by VRLabs. Its an incredibly powerful system, but sadly it didn't fit my style of development out of the box.

Basically it requires you to wire up your modules and templates inside Unity - using a custom editor. Which works well, but I just got too used to a much simpler setup Better Shaders provide, where you can define your whole shader in a text file, and still get all the benefits of code generation.

Introducing - ORL Shader Definition, and its corresponding format - `.orlshader`. This is an abstraction layer on top of MSS which allows you to generate a full shader without ever interacting with MSS system directly. In this case - MSS is used as a building backend, which is what it is really good at!

## Shader Anatomy

The `.orlshader` file supports multiple sections and templates to be defined within it, with only one being mandatory - the settings.

Basically every section apart from Settings is optional. You can see a full shader example [at the bottom of this page](#shader-example)

### `#S#Settings`

Required. Contains the general settings for the shader

- Name: Name of the shader (will be used in the final shader path)
- Author: Your name
- Version: Shader version (for MSS internals)
- Template: A Base shader template
  - ORL Shader Package comes with 2 templates: PBR and VFX (unlit), you can create your own templates by copy pasting one of those into an `stemplate` file
  - Paths to the templates are resolved relative to the Shader Definition File
- CustomEditor: Name of the custom editor class to be used for the shader
- FragmentQueue: MSS-queue of the Fragment function, allows to override execution ordering
  - E.g., a value of -100 here will make your function execute before other modules that do not have any value specified
- VertexQueue: MSS-queue of the Vertex function, allows to override execution ordering
- ColorQueue: MSS-queue of the Color function, allows to override execution ordering
- ShadowQueue: MSS-queue of the Shadow function, allows to override execution ordering

```hlsl
// settings example
#S#Settings
Name "orels1/Standard"
Author "orels1"
Version "5.0.0"
Template "ORL PBR Template.stemplate"
CustomEditor "Needle.MarkdownShaderGUI"
```

### `#S#Includes`

Contains the list of other shader modules to include, can be both `.asset` MSS modules and `.orlshader` shader files. All of the includes are resolved relative to the Shader Definition file

:::tip Self Include

You can use `self` to include current shader's module in a specific spot, if not specified - it will be appended after other includes

:::

```hlsl
// includes example
#S#Includes
"ORL Utility Functions.asset"
"self"
"ORL PBR Module.asset"
```

### `#S#Properties`

Contains your shader properties, uses regular ShaderLab properties syntax

```hlsl
// properties example
#S#Properties
[ToggleUI]UI_FaderHeader ("# Block Fader", Int) = 0
_Progress ("Progress", Range(0, 1.1)) = 0
_FaderColumns ("Fader Columns", Int) = 10
[ToggleUI]_FaderRemap ("Enable Fader Remapping", Int) = 0
_FaderRemapMin ("Min", Float) = 0.15
_FaderRemapMax ("Max", Float) = 0.95
```

### `#T#ShaderFeatures`

Contains a list of shader feature / multi compile pragmas for the shader

```hlsl
// features example
#T#ShaderFeatures
#pragma shader_feature_local DETAILS_OVERLAY
```

### `#T#ShaderDefines`

Contains a list of defines for the shader

ORL Shader Definition has some addition features you can request by specifying special defines, [see below](#optional-features)

```hlsl
// defines example
#T#ShaderDefines
#if !defined(PLAT_QUEST)
  #define _INTEGRATE_CUSTOMGI
#endif
```

### `#T#ShaderTags`

Contains a list of top-level tags that will be appended to the `Tags { }` list

```hlsl
// shader tags example
#T#ShaderTags
"Queue" = "AlphaTest" "RenderType" = "TransparentCutout"
```

### `#T#PassTags`

Same as [ShaderTags](#tshadertags) but for individual passes

```hlsl
// pass tags example
#T#PassTags
"LTCGI"="Always"
```

### `#T#PassModifiers`

Contains a list of extra modifiers that will be appended right below tags

Usually used for things like `Blend` keywords or `Cull Off`, etc

```hlsl
// pass modifiers example
#T#PassModifiers
Blend SrcAlpha OneMinusSrcAlpha
```

### `#S#FragmentVariables`

Contains a list of variables used in the Fragment function. You must declare all the shared variables (like the ones bound to the properties) here so they can be de-duplicated across all included modules

E.g., `half _Cutoff` or `half4 _MainTex_ST` etc

```hlsl
// fragment variables example
#S#FragmentVariables
half _Progress;
int _FaderColumns;
int _FaderRemap;
half _FaderRemapMin;
half _FaderRemapMax;
```

### `#T#FragmentFunction`

Contains your fragment code that will be injected into the Fragment stage of the shader

You should define it as a `void` function that takes no parameters, you can access mesh data and set outputs based on the Data structs, [see below](#mesh-and-surface-data)

```hlsl
// fragment function example
void CutoutFragment() {
  #if !defined(_NATIVE_A2C)
  if (o.Alpha < _Cutoff)  {
    clip(-1);
  }
  #endif
}
```

### `#S#VertexVariables`

Same as [FragmentVariables](#sfragmentvariables) but for the Vertex function

### `#T#VertexFunction`

Same as [FragmentFunction](#tfragmentfunction) but now its injected into the vertex stage

### `#S#ColorVariables`

Same as [FragmentVariables](#sfragmentvariables) but for the FinalColor modifier function

### `#T#ColorFunction`

Contains your FinalColor modifier code. It is appended after the lighting calculations have already been done, and allows to affect the very final output of the shader

Modifying anything but the `FinalColor` variable here will not have any effect

### `#S#ShadowVariables`

Same as [FragmentVariables](#sfragmentvariables) but for the custom shadow fragment pass

### `#T#ShadowFunction`

Contains your custom shadowcaster function. By Default it does not have access to any mesh data or fragment shader evaluation results for performance reasons.

You can change that behavior and run the full set of fragment functions by using a special define [see below](#optional-features)

## Optional Features

The main PBR and VFX templates allow you to enable optional features by specifying some special defines in your `#T#ShaderDefines` section

- `NEED_DEPTH`: Adds the depth texture macro, which creates a depth texture as `_CameraDepthTexture`
- `NEED_FRAGMENT_IN_SHADOW`: Forces the shadowcaster pass to execute all of the included fragment functions (except the lighting calculation), useful if you want to utilize the final calculated alpha to augment the shadow silhouette.
- `EXTRA_V2F_0`, `EXTRA_V2F_1`, `EXTRA_V2F_2`: Tells the PBR/VFX templates to compile in extra float4s in the Vertex stage so you can pass some custom data to your Fragment stage, see the struct definition below

## Mesh and Surface Data

ORL Shader Definition's PBR and VFX templates provide all the relevant data via a couple of structs, which are described below

All of the structs used in the PBR and VFX templates are located in the `Shaders/orels1/Sources/Editor/Data Templates.stemplatecollection`

### VertexData

You will be manipulating and accessing this in the vertex functions

The vertex data should be accessed via the `vD` variable, for example

```hlsl
void MyVertex() {
  vD.vertex.xyz += vD.normal.xyz * 0.1;
}
```

```hlsl
struct VertexData
{
  float4 vertex : POSITION;
  float3 normal : NORMAL;
  float4 tangent : TANGENT;
  float4 color : COLOR;
  float2 uv0 : TEXCOORD0;
  float2 uv1 : TEXCOORD1;
  float2 uv2 : TEXCOORD2;
  float2 uv3 : TEXCOORD3;
  UNITY_VERTEX_INPUT_INSTANCE_ID
};
```

### FragmentData

You shouldn't mess with this beyond injecting `extraV2F` data, for example

```hlsl
// first - declare that you need an extra v2f in your defines
#T#ShaderDefines
#define EXTRA_V2F_0

// then pass data in your vertex function
#T#VertexFunction
void MyVertex() {
  FragData.extraV2F0.r = mySuperRandomFunction();
}

// then consume data in your fragment function
#T#FragmentFunction
void MyFragment() {
  o.Emission.rgb = d.extraV2F0.r;
}
```

- First, you define that you need an extra v2f variable, you can request up to 3, [see Optional Features](#optional-features)
- Then you pass it via the `FragData` variable
- Then you consume it via the `MeshData` variable - `d`, e.g., `d.extraV2F0.xyz`

### MeshData

Contains all of the relevant vectors and parameters you might want to use in your Fragment/FinalColor code. Passed as a variable called `d` (mostly for easier BetterShaders interop)

```hlsl
struct MeshData
{
  half2 uv0;
  half2 uv1;
  half2 uv2;
  half2 uv3;
  half3 vertexColor;
  half3 normal;
  half3 worldNormal;
  half3 localSpacePosition;
  half3 worldSpacePosition;
  half3 worldSpaceViewDir;
  half3 tangentSpaceViewDir;
  float3x3 TBNMatrix;
  // extraV2Fs exist only when you defined `EXTRA_V2F_0` etc
  float4 extraV2F0;
  float4 extraV2F1;
  float4 extraV2F2;
};
```

For example - you can access mesh UVs like this

```hlsl
#T#FragmentFunction
void MyFragment() {
  half2 uv = d.uv0.xy + _Time.y;
}
```

### SurfaceData

This is the struct that will be used in the lighting function. The PBR template consumes all of the provided values, while the VFX template only uses `Albedo` and `Alpha` to construct the FinalColor

```hlsl
struct SurfaceData
{
  half3 Albedo;
  half3 Emission;
  half Metallic;
  half Smoothness;
  half Occlusion;
  half3 Normal;
  half Alpha;
};
```

For example, this is how you would make your material look red and metallic. _Because red goes fasta'_

```hlsl
#T#FragmentFunction
void MyFragment() {
  o.Albedo = half3(1, 0, 0);
  o.Metallic = 1;
}
```

### FinalColor

`FinalColor` is a value that contains the result of the final lighting calculation. You can modify its value using the Color Function, [see ColorFunction above](#tcolorfunction)

For example, this is how you would lower the overall brightness of the material no matter what kind of calculations happened prior to that

```hlsl
#T#ColorFunction
void MyColor() {
  FinalColor.rgb *= 0.5; // halves the overall values
}
```

:::tip VFX Template

In the VFX template `FinalColor` is constructed from `o.Albedo` and `o.Alpha`, so the `FragmentFunction` essentially operates on the FinalColor directly. As such, there is no need to use a `ColorFunction` in there, altho that option is still available if you have a very deeply stacked shader and want to add some global controls.

:::


## Shader Example

Below is an example of a shader with all the possible sections present. You can also find this example in the `Shaders/orels1/Sources/Editor/ORL Shader Example.txt`

```hlsl
#S#Settings
Name "SHADER NAME"
Author "Your Name"
Version "1.0.0"
Template "ORL PBR Template.stemplate"
CustomEditor "Needle.MarkdownShaderGUI"

#S#Includes
"ORL Utility Functions.asset"
"self"
"ORL PBR Module.asset"

#S#Properties
[ToggleUI]UI_MainHeader("# My Awesome Settings", Int) = 0
_Level("Level", Range(0,1)) = 0
_Mask("Mask", 2D) = "black" {}
_Brightness("Brightness", Range(0,2)) = 1
_Cutoff("Cutoff", Range(0, 1)) = 0.5

#T#ShaderFeatures
#pragma shader_feature_local FANCY_FEATURE

#T#ShaderDefines
#define MY_THING

#T#ShaderTags
"Queue" = "AlphaTest" "RenderType"="TransparentCutout"

#T#PassTags
"MyTag"="MyValue"

#T#PassModifiers
Cull Off

#S#FragmentVariables
float _Level;
float4 _Mask_ST;

TEXTURE2D(_Mask);
SAMPLER(sampler_Mask);
// these macros are defined in the UnitySamplingLib.stemplate
// if you are using the ORL PBR or VFX Module - you have access to those

#T#FragmentFunction
void MyFragment() {
  half2 uv = d.uv0.xy * _Mask_ST.xy + _Mask_ST.zw;
  half mask = SAMPLE_TEXTURE2D(_Mask, sampler_Mask, uv).r;

  o.Albedo = mask * _Level;
}

#S#VertexVariables
float _Level;

#T#VertexFunction
void MyVertex() {
  vD.vertex.xyz += vD.normal * _Level * 0.1;
}

#S#ColorVariables
half _Brightness;

#T#ColorFunction
void MyColor() {
  FinalColor.rgb *= _Brightness;
}

#S#ShadowVariables
half _Cutoff;
TEXTURE2D(_Mask);
SAMPLER(sampler_Mask);

#T#ShadowFunction
void MyShadow() {
  half mainAlpha = SAMPLE_TEXTURE2D(_Mask, sampler_Mask, uv).a;
  if (mainAlpha < _Cutoff) {
    clip(-1);
  }
}
```
