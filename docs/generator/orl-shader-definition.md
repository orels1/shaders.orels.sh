---
sidebar_position: 2
---

# ORL Shader Definition

How the shaders are made

-----

As mentioned in the credits section of the main page - the ORL Shader package is built with the ORL Shader Generator which works by assembling a bunch of separated Modules into a single shadder based on a Template and a core Lighting Model. At the root of it all is an ORL Shader Definition, and its corresponding format - `.orlshader`.

## Shader Anatomy

The `.orlshader` file supports multiple blocks all of which are optional, except for the `%ShaderName()`.

You can see all of the blocks available to you out of the box in the built-in templates in the shader example [at the bottom of this page](#shader-example).


:::info Provided blocks

Beyond the configuration blocks like `%ShaderName()` and `%LightingModel()` - everything else is template-dependent. So a `%ShaderDefines` block will only be embedded in the shader if the base template of the lighting model has a `%ShaderDefines` hook inside of it.

This means, if you're using a custom template, you can add any new directives you want, and they will be inserted into the template as-is. You can read more about custom templates [over here](/docs/generator/creating-templates)

:::

### `%ShaderName(string name)`

Required. Defines the name on which the shader will be registered in unity.

```hlsl
%ShaderName("orels1/Standard")
```

### `%LightingModel(string path)`

Defines the lighting model to use, defaults to `PBR` if not specified.

```hlsl
%LightingModel("@/LightingModels/Toon") // will pick the Toon lighting model from the shader generator package
```

Lighting models are special kinds of `.orlsource` modules,that specify where the rest of the code gets included in the shader using the `target` keyword in their `%Includes()` block. Check out the built in LightingModels to see how they work.

You can also create your own lighting models, and use them in your shaders. Check out the [Creating Lighting Models](/docs/generator/creating-lighting-models) guide for more info.

### %Template(string path)

Defines the template to use. Is meant to be defined inside of the LightingModel, but can be overriden here if needed.

```hlsl
%Template("@/Templates/Toon")
```

### `%CustomEditor(string className)`

Defines the custom editor to use, no default is provided, but you can use the ORL Shader Inspector by specifying the following

```hlsl
%CustomEditor("ORL.ShaderInspector.InspectorGUI")
```

### `%Includes()`

Contains the list of other shader modules to include, can be `.orlshader` shader files or `.orlsource` modules. The order of the includes is important, as the modules will be included in the order they are specified. The resolver will recursively follow the trail of includes and pull in any submodules if they are needed.

:::tip Self Include

You should use `self` to include current shader's module in a specific spot

:::

```hlsl
%Includes()
{
    "@/Modules/AudioLink", // include a module from the generator package
    "@/Shaders/ORL Standard", // include a base shader form the shaders package
    "../MyModule", // include a module from the parent folder,
    "self" // mount point for the current shader
}
```

:::info Batteries Included ⚡

To make the development process nice and easy, a lot of things come pre-included, so unless defined otherwise - the following defaults will be provided:
- A PBR `LightingModel`
- A set of `FragmentData`, `VertexData`, `MeshData` and `SurfaceData` structs
- A base `VertexFunction`
- A pack of Utility functions like `remap`, `invLerp`, `HSV2RGB`, etc (check out `Utilities.orlsource` in the generator package)
- A CoreRP sampling library for unified cross-platform cross-pipleine sampling macros

:::

### `%Properties()`

Contains your shader properties, uses regular ShaderLab properties syntax

```hlsl
%Properties()
{
    UI_FaderHeader ("# Block Fader", Int) = 0
    _Progress ("Progress", Range(0, 1.1)) = 0
    _FaderColumns ("Fader Columns", Int) = 10
    [ToggleUI]_FaderRemap ("Enable Fader Remapping", Int) = 0
    _FaderRemapMin ("Min", Float) = 0.15
    _FaderRemapMax ("Max", Float) = 0.95
}
```

### `%ShaderFeatures()`

Contains a list of shader feature / multi compile pragmas for the shader

```hlsl
%ShaderFeatures()
{
    #pragma shader_feature_local DETAILS_OVERLAY
}
```

### `%ShaderDefines()`

Contains a list of defines for the shader

Built in LightingModels provide some addition features you can request by specifying special defines, [see below](#optional-features)

```hlsl
%ShaderDefines()
{
    #if !defined(PLAT_QUEST)
        #define _INTEGRATE_CUSTOMGI
    #endif
}
```

### `%ShaderTags()`

Contains a list of top-level tags that will be appended to the `Tags { }` list

```hlsl
%ShaderTags()
{
    "Queue" = "AlphaTest" "RenderType" = "TransparentCutout"
}
```

### `%ShaderTags()`

Same as [ShaderTags](#shadertags) but for individual passes

```hlsl
%PassTags()
{
    "LTCGI"="Always"
}
```

### `%PassModifiers()`

Contains a list of extra modifiers that will be appended right below tags in the `ForwardBase` pass

Usually used for things like `Blend` keywords or `Cull Off`, etc.

```hlsl
%PassModifiers()
{
    Blend SrcAlpha OneMinusSrcAlpha
}
```

Some built-in LightingModels (like Toon and PBR) also support modifying other passes, like:

```hlsl
%AddPassModifiers()
{
  // Modifiers for ForwardAdd
}

%MetaPassModifiers()
{
  // Modifiers for Meta
}

%ShadowPassModifiers()
{
  // Modifiers for ShadowCaster
}
```

### `%Variables`

Contains a list of variables used in the pass. You must declare all the shared variables (like the ones bound to the properties) here so they can be de-duplicated across all included modules

E.g., `half _Cutoff` or `half4 _MainTex_ST` etc

```hlsl
%Variables()
{
    half _Progress;
    int _FaderColumns;
    int _FaderRemap;
    half _FaderRemapMin;
    half _FaderRemapMax;
}
```

### `%Fragment(string functionName)`

Contains your fragment code that will be injected into the Fragment stage of the shader

You should define it as a `void` function that takes in w/e shader data you might need to be included, you can [see the list of built-in Data structs here](#mesh-and-surface-data)

```hlsl
%Fragment("CutoutFragment")
{
    void CutoutFragment(SurfaceData o)
    {
        #if !defined(_NATIVE_A2C)
        if (o.Alpha < _Cutoff)
        {
           clip(-1);
        }
        #endif
    }
}
```

:::caution

You must provide a function name, and it must be unique across all included modules, otherwise it will get deduplicated. Providing a function name allows you to include other functions in the same code block, which can be useful for refactoring.

:::

### `%Vertex(string functionName)`

Same as [Fragment](#fragmentstring-functionname) but now its injected into the vertex stage

### `%Color(string functionName)`

Contains your FinalColor modifier code. It is appended after the lighting calculations have already been done, and allows to affect the very final output of the shader

Modifying anything but the `FinalColor` variable here will not have any effect

```
%Color("MyColor")
{
    void MyColor(inout half4 FinalColor)
    {
        FinalColor.rgb *= (sin(_Time.y) + 1) / 2.0;
    }
}
```

### `%Shadow(string functionName)`

Contains your custom shadowcaster function. By Default it does not have access to any mesh data or fragment shader evaluation results for performance reasons.

You can change that behavior and run the full set of fragment functions by using a special define [see below](#optional-features)


:::tip Order Overload

All of the function directives can optionally take an `order` int parameter, like this

```hlsl
%Framgent("MyFragment", -100)
{
    void MyFragment(SurfaceData o)
    {
        // some code
    }
}
```

This will make this fragment function be called before functions with no order specified, and after functions with a higher order specified.

So if your function gets included like this

```hlsl
%Includes()
{
    "self",
    "MyAwesomeModuleWithFunction"
}
```

Then despite the module being included below the `self` keyword, its Fragment function will still be called before the `self` fragment function.

This is primarily useful for maintaining a particular order of properties, while adjusting how the actual code gets executed. For example, the ORL Standard shader uses this to call Parallax UV adjustments before any other function while injecting its properties below the MainSettings of the base shader it is included from.

:::

### `%PrePasses()`

Contains a list of extra passes that will be appended at the beginning of the shader before the main passes.

Note that these do not use the `Variables` and `Textures` in Built-In render pipeline, so you'll have manually define the full contents of the pass.

All of the LibraryFunctions, however, including the sampling library and utilities, will be available to you.

```hlsl
%PrePasses()
{
    GrabPass { _GrabTexture }

    Pass
    {
        Cull Off

        CGPROGRAM

        // some shader code

        ENDCG
    }
}
```

### `%PostPasses()`

Contains a list of extra passes that will be appended at the end of the shader after the main passes.

Note that these do not use the `Variables` and `Textures` in Built-In render pipeline, so you'll have manually define the full contents of the pass.

All of the LibraryFunctions, however, including the sampling library and utilities, will be available to you.

```hlsl
%PostPasses()
{
    Pass
    {
        Cull Off

        CGPROGRAM

        // some shader code

        ENDCG
    }
}
```

## Optional Features

The built-in templates allow you to enable optional features by specifying some special defines in your `%ShaderDefines` section

- `NEED_DEPTH`: Adds the depth texture macro, which creates a depth texture as `_CameraDepthTexture`
- `NEED_FRAGMENT_IN_SHADOW`: Forces the shadowcaster pass to execute all of the included fragment functions (except the lighting calculation), useful if you want to utilize the final calculated alpha to augment the shadow silhouette.
- `EXTRA_V2F_0`, `EXTRA_V2F_1`, `EXTRA_V2F_2`, `EXTRA_V2F_3`: Tells the the templates to compile in extra float4s in the Vertex stage so you can pass some custom data to your Fragment stage, see the struct definition below

## Mesh and Surface Data

ORL Shader Generator's built-in templates provide all the relevant data via a couple of structs, which are described below

All of the structs are located in `/Packages/sh.orels.shaders.generator/Runtime/Sources/Structs`. With root-level folder containing structs shared between the templates, and individual folders containing LightingModel specific structs

### VertexData

You will be manipulating and accessing this in the vertex functions

The vertex data should be accessed via the `v` variable, for example

```hlsl
void MyVertex(VertexData v)
{
    v.vertex.xyz += v.normal.xyz * 0.1;
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

Unless you're planning to roll your own lighting models, the most you should do is use the extraV2F slots via the optional feature defines.

```hlsl
// first - declare that you need an extra v2f in your defines
%ShaderDefines()
{
    #define EXTRA_V2F_0
}

// then pass data in your vertex function
%Vertex("MyVertex")
{
    void MyVertex(inout FragmentData o)
    {
        o.extraV2F0.r = mySuperRandomFunction();
    }
}

// then consume data in your fragment function
%Fragment("MyFragment")
{
    void MyFragment(FragmentData i)
    {
        o.Emission.rgb = i.extraV2F0.r;
    }
}
```

- First, you define that you need an extra v2f variable, you can request up to 3, [see Optional Features](#optional-features)
- Then you pass it via the `FragData` variable
- Then you consume it via the `MeshData` variable - `d`, e.g., `d.extraV2F0.xyz`

### MeshData

Contains all of the relevant vectors and parameters you might want to use in your Fragment/FinalColor code. Passed as a variable called `d`. Can vary per lighting model, but here is the one from the PBR/VFX one at the time of writing. Check out `/Packages/sh.orels.shaders.generator/Runtime/Sources/Structs/PBR` for the latest version.

```hlsl
struct MeshData
{
    half2 uv0;
    half2 uv1;
    half2 uv2;
    half2 uv3;
    #if !defined(UNITY_PASS_SHADOWCASTER)
    half4 lightmapUv;
    #endif
    half4 vertexColor;
    half3 normal;
    half3 worldNormal;
    half3 localSpacePosition;
    half3 worldSpacePosition;
    half3 worldSpaceViewDir;
    half3 tangentSpaceViewDir;
    float3x3 TBNMatrix;
    float4 extraV2F0;
    float4 extraV2F1;
    float4 extraV2F2;
    float4 extraV2F3;
    float4 screenPos;
};
```

For example - you can access mesh UVs like this

```hlsl
%Fragment("MyFragment")
{
    void MyFragment(MeshData d)
    {
        half2 uv = d.uv0.xy;
    }
}
```

### SurfaceData

This is the struct that will be used in the lighting function. The PBR template consumes all of the provided values, while the VFX template only uses `Albedo`, `Emission`, and `Alpha` to construct the FinalColor. And the Toon shader has its own set of values. Check out `/Packages/sh.orels.shaders.generator/Runtime/Sources/Structs` to see whats available.

Here's the PBR SurfaceData struct at the time of writing

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
%Fragment("MyFragment")
{
    void MyFragment(inout SurfaceData o)
    {
        o.Albedo = half3(1, 0, 0);
        o.Metallic = 1;
    }
}
```

:::tip

Don't forget to add `inout` to any struct which values you plan to modify! Otherwise they won't propagate to the next stage

:::

### FinalColor

`FinalColor` is a value that contains the result of the final lighting calculation. You can modify its value using the Color Function, [see Color function above](#colorstring-functionname)

For example, this is how you would lower the overall brightness of the material no matter what kind of calculations happened prior to that

```hlsl
%Color("MyColor")
{
    void MyColor(inout half4 FinalColor)
    {
      FinalColor.rgb *= 0.5; // halves the overall values
    }
}
```

:::tip VFX Template

In the VFX template `FinalColor` is constructed from `o.Albedo` and `o.Alpha`, so the `Fragment` function essentially operates on the FinalColor directly. As such, there is no need to use a `ColorFunction` in there.

:::


## Shader Example

Below is an example of a shader with all the blocks supported by the built-in toon template. You can also find this example in the `/Packages/sh.orels.shaders/Runtime/Shaders/ORL Shader Example.txt`

```hlsl
%ShaderName("My Awesome Shader")
%LightingModel("@/LightingModels/Toon")
%CustomEditor("ORL.ShaderInspector.InspectorGUI")

%Properties()
{
    UI_MainHeader("# My Awesome Settings", Int) = 0
    _Level("Level", Range(0,1)) = 0
    _Mask("Mask", 2D) = "black" {}
    _Brightness("Brightness", Range(0,2)) = 1
    _Cutoff("Cutoff", Range(0, 1)) = 0.5
}

%Includes()
{
  "@/Shaders/ORL Standard",
  "self"
}


%ShaderFeatures()
{
    #pragma shader_feature_local FANCY_FEATURE
}

%ShaderDefines()
{
    #define MY_THING
}

%ShaderTags()
{
    "Queue" = "AlphaTest" "RenderType"="TransparentCutout"
}

%PassTags()
{
    "MyTag"="MyValue"
}

%PassModifiers()
{
    Cull Off
}

%AddPassModifiers()
{
    Blend One One
}

%MetaPassModifiers()
{
    Cull Off
}

%ShadowPassModifiers()
{
  Cull Off
}

%PrePasses()
{
    GrabPass { _GrabTexture }
}

%Variables()
{
    float _Level;
    float4 _Mask_ST;
    float _Brightness;
}

%Textures()
{
    TEXTURE2D(_Mask);
    SAMPLER(sampler_Mask);
}

%Fragment("MyFragment")
{
    void MyFragment(MeshData d, inout SurfaceData o)
    {
        half2 uv = d.uv0.xy * _Mask_ST.xy + _Mask_ST.zw;
        half mask = SAMPLE_TEXTURE2D(_Mask, sampler_Mask, uv).r;

        o.Albedo = mask * _Level;
    }
}

%Vertex("MyVertex")
{
    void MyVertex(inout VertexData v)
    {
        v.vertex.xyz += v.normal * _Level * 0.1;
    }
}

%Color("MyColor")
{
    void MyColor(inout half4 FInalColor)
    {
       FinalColor.rgb *= _Brightness;
    }
}

%Shadow("MyShadow")
{
    void MyShadow(MeshData d)
    {
        half2 uv = d.uv0.xy * _Mask_ST.xy + _Mask_ST.zw;
        half mainAlpha = SAMPLE_TEXTURE2D(_Mask, sampler_Mask, uv).a;
        if (mainAlpha < _Cutoff)
        {
            clip(-1);
        }
    }
}

%PostPasses()
{
    Pass
    {
        CGPROGRAM
        // shader code
        ENDCG
    }
}
```
