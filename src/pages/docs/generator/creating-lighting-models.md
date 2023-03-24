---
title: Creating Lighting Models
description: Learn how to create lighting models for your shaders
---

While ORL Shader Generator comes with 3 lighting models pre-included: a standard PBR model, a Toon model and an Unlit VFX model, you might want to create something custom for your needs.

Level of effort for creating a lighting model can vary from defining a single lighting function, to creating your own template with a set of custom structs and functions.

In this guide we'll go over implementing a Blinn-Phong lighting model. If you just want a TL;DR, check out the [Recap Section](#recap) at the bottom of the page.

## Creating a Blinn-Phong lighting model

Let's start simple and create a new lighting model that implements basic Blinn-Phong lighting. Something a bit more interesting than pure diffuse, but not as complex as anything BRDF-based.

First thing to do is to organize our workspace, let's start with the following directory structure:

- `Assets`
  - `Shaders`
    - `Functions`
      - `BlinnPhong` : Our FragmentBase function will go here
    - `LightingModels` : Our lighting model definition will go here
    - `Structs`
      - `BlinnPhong` : Our SurfaceData struct will go here

This mimics the structure in the `sh.orels.shaders.generator` package, but feel free to organize your files any other way you like. The following examples will assume this structure though.

### Defining the LightingModel

Now that we have our workspace set up, let's create a new `.orlsource` file in the `LightingModels` folder and name it `BlinnPhong.orlsource`.

Then add the following contents to it

```hlsl
// Assets/Shaders/LightingModels/BlinnPhong.orlsource
%Template("@/Templates/PBR")

%Includes()
{
    "target",
    "@/Structs/MeshData",
    "/Assets/Shaders/Structs/BlinnPhong/SurfaceData",
    "/Assets/Shaders/Functions/BlinnPhong/FragmentBase",
}
```

Let's break this down a bit.

```hlsl
%Template("@/Templates/PBR")
```

As you can see, we're going to reuse the PBR template. Which provides a nice default setup, handling all the main passes for the Built-In Render Pipeline. We'll just need to define our own lighting function.

```hlsl
%Includes()
{
    "target", // user code mounts here
    "other stuff..."
}
```

Next we specify where will the "user" code get included, basically anything that utilizes our lighting model will be mounted in the `target` spot. It is generally a good practice to include your lighting model code after the `target` keyword, since you want your lighting calculations to run last in the chain.

Of course if you want something to be ordered differently - feel free to move it around as you see fit.

```hlsl
%Includes()
{
    "target",
    "@/Structs/MeshData",
```

Then we add the MeshData struct reference, so we have something to access the mesh data through. In this case we're just using the built in one as it provides a good baseline.

```hlsl
%Includes()
{
    "target",
    "@/Structs/MeshData",
    "/Assets/Shaders/Structs/BlinnPhong/SurfaceData",
```

Afterwards, we include a reference to our custom SurfaceData struct. We haven't made one yet, but we'll do so in a moment. We could've used PBR SurfaceData, but it has more things than Blinn-Phong model expects, so we're going to make our own.

```hlsl
%Includes()
{
    "target",
    "@/Structs/MeshData",
    "/Assets/Shaders/Structs/BlinnPhong/SurfaceData",
    "/Assets/Shaders/Functions/BlinnPhong/FragmentBase",
}
```

Finally, we reference our FragmentBase function - the core of our lighting. FragmentBase is responsible for taking `SurfaceData` and converting it to a `FinalColor` that will be rendered on screen.

If you ever written `CustomLighting` function for a Unity Surface Shader, this should be fairly familiar to you.

### Defining the SurfaceData struct

Now that we have our lighting model defined, let's create a SurfaceData struct for it.

Create a new `.orlsource` file in the `Structs/BlinnPhong` folder and name it `SurfaceData.orlsource`.

Then add the following contents to it

```hlsl
// Assets/Shaders/Structs/BlinnPhong/SurfaceData.orlsource
%DataStructs()
{
    struct SurfaceData
    {
        half3 Albedo;
        half3 Specular;
        half Smoothness;
    };

    SurfaceData CreateSurfaceData()
    {
        SurfaceData o = (SurfaceData) 0;
        o.Albedo = 1;
        o.Specular = 1;
        o.Smoothness = 0.5;
        return o;
    }
}
```

All the structs in the built-in templates are meant to be included in the `%DataStructs()` block, technically, you can put as many structs as you want here, but I found that its a good practice to split it up as one struct per file to keep things organized.

The built-in templates also expect you to define a `CreateSurfaceData()` function, which initializes the `SurfaceData` struct with some nice defaults. Here we define it to be all white, with a bit of smoothness.

Having a `CreateSurfaceData` function allows us to decouple the base templates from the specific `SurfaceData` struct and keep it within the realm of the LightingModel code instead.

### Defining the FragmentBase function

With all the setup done, let's finally define our FragmentBase function.

As mentioned earlier, the sole purpose of the FragmentBase function is to take the `SurfaceData` and convert it to a `FinalColor` that will be rendered on screen. How you do it is fully up to you, and it can be as simple as a single line of code, or as complex as a full-blown BRDF.

For example, this is the one-line function the `VFX` lighting model uses

```hlsl
%FragmentBase("FragmentBase")
{
    void FragmentBase(SurfaceData o, inout half4 FinalColor)
    {
        FinalColor = half4(o.Albedo.rgb + o.Emission.rgb, o.Alpha);
    }
}
```

Since that template is meant to render the exact colors you pass. But for our Blinn-Phong model, we'll need to do a bit more work.

Let's start by creating a new `.orlsource` file in the `Functions/BlinnPhong` folder and name it `FragmentBase.orlsource`.

Then add the following contents to it

```hlsl
// Assets/Shaders/Functions/BlinnPhong/FragmentBase.orlsource
%ShaderModifiers()
{
    ZWrite On
    ZTest LEqual
    Cull Back
}

%FragmentBase("FragmentBase")
{
    void FragmentBase(MeshData d, SurfaceData o, inout half4 FinalColor)
    {
        FinalColor.rgb = o.Albedo;
        FinalColor.a = 1;
    }
}
```

As you can see, we're specifying the `MeshData`, `SurfaceData`, and `FinalColor` as function parameters, as we'll need the mesh normal (contained in MeshData) to calculate the lighting, SurfaceData's albedo and smoothness to figure out the specular and then FinalColor to write our result to.

We're also adding a list of `ShaderModifiers`, the PBR template uses properties to define things like ZWrite, ZTest and Culling, so we pass them directly as we're not exposing them as properties right now.

For now we'll just render the albedo color, but we'll add the lighting in a moment.

Technically, we can already create a fully functional shader with just this, so let's do that to help us see how the output changes as we refine our lighting code.

Create a new `.orlshader` file somewhere, like in `Assets/Shaders`.

Then add the following contents to it

```hlsl
// Assets/Shaders/MyShader.orlshader
%ShaderName("MyShader")
%LightingModel("LightingModels/BlinnPhong")

%Properties()
{
    _Color("Color", Color) = (1, 1, 1, 1)
    _MainTex("Albedo", 2D) = "white" {}
    _Smoothness("Smoothness", Range(0, 1)) = 0.5
    _Specular("Specular", Color) = (1, 1, 1, 1)
}

%Variables()
{
    half4 _Color;
    half4 _Specular;
    half _Smoothness;
    half4 _MainTex_ST;
}

%Textures()
{
    TEXTURE2D(_MainTex);
    SAMPLER(sampler_MainTex);
}

%Fragment("MyFragment")
{
    void MyFragment(MeshData d, inout SurfaceData o)
    {
        half2 uv = d.uv0.xy * _MainTex_ST.xy + _MainTex_ST.zw;
        half3 albedo = SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, uv).rgb;
        o.Albedo = albedo * _Color.rgb;
        o.Specular = _Specular.rgb;
        o.Smoothness = _Smoothness;
    }
}
```

If any of these things seem unfamiliar, I recommend you go back and read the [Development Basics](/docs/generator/development-basics) tutorial first.

Now create a sphere in the scene and assign a new material using our newly created shader to it. It should render as plain white sphere, which is what we want.

Changing the `Color` property should also tint the sphere, and assigning albedo texture should render it according to the sphere UVs, nothing groundbreaking here.

Now that we got our test shader set up, let's start with some basic diffuse lighting.

#### Diffuse lighting

Let's update our lighting model to take a simple Dot Product between the light and the mesh normal to calculate the diffuse portion of the lighting.

```hlsl
// Assets/Shaders/Functions/BlinnPhong/FragmentBase.orlsource
%FragmentBase("FragmentBase")
{
    void FragmentBase(MeshData d, SurfaceData o, inout half4 FinalColor)
    {
        half NoL = saturate(dot(_WorldSpaceLightPos0.xyz, d.worldNormal));
        FinalColor.rgb = o.Albedo * NoL * _LightColor0.rgb;
        FinalColor.a = 1;
    }
}
```

Since our `MeshData` already gives us the world-space mesh normal in the `worldNormal` variable, all we need to do is take a dot of that vs the main light direction to get the classic Normal dot Light (or NoL as named in this code) to work.

Then we just multiply our calculated albedo by the NoL and the main Light color to get the simplest form of diffuse lighting.

You can rotate your main directional light around to see that it responds correctly.

#### Specular Lighting

As we all know, diffuse lighting, while nice and smooth, is not enough to make a realistic looking material. We need to add some specular highlights to make it look anything like a real world surface.

To do that, we'll need to calculate the specular lighting using the Blinn-Phong model.

```hlsl
// Assets/Shaders/Functions/BlinnPhong/FragmentBase.orlsource
%FragmentBase("FragmentBase")
{
    void FragmentBase(MeshData d, SurfaceData o, inout half4 FinalColor)
    {
        half NoL = saturate(dot(_WorldSpaceLightPos0.xyz, d.worldNormal));
        FinalColor.rgb = o.Albedo * NoL * _LightColor0.rgb;
        FinalColor.rgb *= 1 - max(o.Specular.r, max(o.Specular.g, o.Specular.b));

        half3 halfVector = normalize(_WorldSpaceLightPos0.xyz + d.worldSpaceViewDir);
        half NoH = saturate(dot(d.worldNormal, halfVector));
        half3 specular = o.Specular * _LightColor0.rgb * pow(NoH, o.Smoothness * 128);
        FinalColor.rgb += specular;

        FinalColor.a = 1;
    }
}
```

Here we add the half-vector based Blinn-Phong specular, and also adjust our albedo by the specular tint to abide by the energy conservation law;

You should now be able to adjust all of the properties on your new material and they will reflect the lighting calculations you just added!

And that is it. That + the base template is how all of the lighting models in ORL Shaders work, but let's recap it, since there is a lot of steps we went through.

## Recap

If you want to create a new LightingModel for the ORL Shader Generator you need to do the following:

1. Create a LightingModel .orlsource file
  - In it, specify the template to be used and the list of `Includes`
  - You must include the `target` keyword in the `Includes` block, as well as a module containing the FragmentBase function
2. If you're going to use a custom SurfaceData struct, you should create a new .orlsource file for it, otherwise, include one of the built-in `SurfaceData` structs in your LightingModel .orlsource file
  - If using the built-in templates you should define both the `SurfaceData` and the `CreateSurfaceData` function inside the `%DataStructs()` block
3. Create a FragmentBase .orlsource file to host your lighting function
  - In it you must include a `%FragmentBase` block with a function that writes to `FinalColor`

And that's it! You can now use your new LightingModel in your shaders by specifying a path to it in the `%LightingModel` block.

Here's a full example of a Blinn-Phong lighting model we implemented in this guide:

```hlsl
// Assets/Shaders/LightingModels/BlinnPhong.orlsource
%Template("@/Templates/PBR")

%Includes()
{
    "target",
    "@/Structs/MeshData",
    "/Assets/Shaders/Structs/BlinnPhong/SurfaceData",
    "/Assets/Shaders/Functions/BlinnPhong/FragmentBase",
}
```

```hlsl
// Assets/Shaders/Structs/BlinnPhong/SurfaceData.orlsource
%DataStructs()
{
    struct SurfaceData
    {
        half3 Albedo;
        half3 Specular;
        half Smoothness;
    };

    SurfaceData CreateSurfaceData()
    {
        SurfaceData o = (SurfaceData) 0;
        o.Albedo = 1;
        o.Specular = 1;
        o.Smoothness = 0.5;
        return o;
    }
}
```

```hlsl
// Assets/Shaders/Functions/BlinnPhong/FragmentBase.orlsource
%ShaderModifiers()
{
    ZWrite On
    ZTest LEqual
    Cull Back
}

%FragmentBase("FragmentBase")
{
    void FragmentBase(MeshData d, SurfaceData o, inout half4 FinalColor)
    {
        half NoL = saturate(dot(_WorldSpaceLightPos0.xyz, d.worldNormal));
        FinalColor.rgb = o.Albedo * NoL * _LightColor0.rgb;
        FinalColor.rgb *= 1 - max(o.Specular.r, max(o.Specular.g, o.Specular.b));

        half3 halfVector = normalize(_WorldSpaceLightPos0.xyz + d.worldSpaceViewDir);
        half NoH = saturate(dot(d.worldNormal, halfVector));
        half3 specular = o.Specular * _LightColor0.rgb * pow(NoH, o.Smoothness * 128);
        FinalColor.rgb += specular;

        FinalColor.a = 1;
    }
}
```

And a simple shader using it:

```hlsl
// Assets/Shaders/MyShader.orlshader
%ShaderName("MyShader")
%LightingModel("LightingModels/BlinnPhong")

%Properties()
{
    _Color("Color", Color) = (1, 1, 1, 1)
    _MainTex("Albedo", 2D) = "white" {}
    _Smoothness("Smoothness", Range(0, 1)) = 0.5
    _Specular("Specular", Color) = (1, 1, 1, 1)
}

%Variables()
{
    half4 _Color;
    half4 _Specular;
    half _Smoothness;
    half4 _MainTex_ST;
}

%Textures()
{
    TEXTURE2D(_MainTex);
    SAMPLER(sampler_MainTex);
}

%Fragment("MyFragment")
{
    void MyFragment(MeshData d, inout SurfaceData o)
    {
        half2 uv = d.uv0.xy * _MainTex_ST.xy + _MainTex_ST.zw;
        half3 albedo = SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, uv).rgb;
        o.Albedo = albedo * _Color.rgb;
        o.Specular = _Specular.rgb;
        o.Smoothness = _Smoothness;
    }
}
```