---
sidebar_position: 1
---

# Development Basics

:::caution BETA NOTICE

This area of documentation is currently only relevant for the `mss-integration` branch of the repository, which is not released to public yet

:::

While ORL Shaders is primarily a shaders package - it also comes included with a everything you need to write your own shaders that leverage the improved PBR base (compared to Unity's Standard rendering).

This is achieved by using a special ScriptedImporter-powered [ORL Shader Definition](orl-shader-definition). Which provides you with a way to define a whole shader via a couple lines of code, and focus on what actually matters - the shader-specific Vertex and Fragment code.

:::tip Similarities

If you ever used BetterShaders - some of these things will look familiar. As I'm personally coming from that asset, and tried to accommodate most of the things I love about it, but in my own way

:::

## Creating a Shader

To create a new shader with ORL shaders - right click anywhere in the project, and select the `Create/Shader/ORL/PBR Shader` menu item. This will create a new skeleton `.orlshader` file for you with the PBR lighting settings set. So you can start adding your own custom code right there.

You can also select VFX preset for the unlit shader setup, but if you are following this guide - use the PBR one.

:::caution Path Resolution

ORL Shader Definition will automatically try to resolve paths for built in modules and templates, so you will not need to put full paths to those yourself.

For your own dependencies you can either provide relative paths, or absolute paths that start with `Assets/`.

Note that **relative paths cannot go up a folder**, like `../SomeOtherParent`, use absolute paths for that

:::

### Generating a Shader File

After creating the definition - you can now click "Generate Shader" in the UI to create a Unity shader file. Select the folder you just made the Shader Definition in to keep things organized.

<p align="center">
  <img alt="Shader Definition Inspector" src="/img/docs/development/development-basics/development-basics-new-definition.png" />

  <small>Shader Definition Inspector</small>
</p>


A new shader file with the same name as the shader definition should appear.

<p align="center">
  <img alt="New shader in the project" src="/img/docs/development/development-basics/development-basics-project-view.png" />

  <br/>

  <small>New shader in the project</small>
</p>

You can now right click on the newly created shader, and click Create -> Material to quickly create a new material from that shader.

It will look something like this

<p align="center">
  <img alt="Newly created material" src="/img/docs/development/development-basics/development-basics-new-material.png" />

  <br/>

  <small>Newly created material</small>
</p>

For ease of use - I recommend creating a sphere in the scene and dropping that material onto it, so you can instantly see the changes.


### Adding your first effect

Now that you have an `.orlshader` file created - open it in any editor of your choice.

A basic setup with a simple fragment function that samples the main texture will be provided to you.

```hlsl
#T#FragmentFunction
void MyFragment() {
    half2 uv = d.uv0.xy * _MainTex_ST.xy + _MainTex_ST.zw;
    half3 albedo = SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, uv).rgb;
    
    o.Albedo = albedo;
}
```

Let's expand it a bit by adding a tint color and emission texture. Things are more fun when they glow!

### Add new Properties

As with the regular shaders - you'll need to define your properties so they can be set in the editor.

In the `.orlshader` that is done via the `#S#Properties` block. It works the same way as it normally would.

Add a `_EmissionMap` texture and a `_Color` to the properties block. It should now look like this

```hlsl
#S#Properties
_MainTex("Main Texture", 2D) = "white" {}
_Color("Tint", Color) = (1,1,1,1)
_EmissionMap("Emission", 2D) = "black" {}
```

### Add a Texture variable

Now that you have your property added - we need to create a variable to use it in the actual fragment function.

`.orlshader` built-in templates provide you with a nice CoreRP based sampling library, that unifies the sampling code across all possible platforms. We're gonna use that here!

:::info CoreRP sampling lib

If you're curious, [you can check out the sampling library here!](https://github.com/orels1/orels-Unity-Shaders/blob/mss-migration/Sources/Editor/UnitySamplingLib.stemplate)

:::

To define a texture variable - simply use `TEXTURE2D(_EmissionMap);`
And to define a SamplerState - use `SAMPLER(sampler_EmissionMap);`

For the rest of the variables - syntax is exactly the same as usual.

Now all together it should look something like this

```hlsl
#S#FragmentVariables
float4 _MainTex_ST;
half4 _Color; // our tint color

TEXTURE2D(_MainTex);
SAMPLER(sampler_MainTex);
TEXTURE2D(_EmissionMap); // our newly created texture
SAMPLER(sampler_EmissionMap); // the sampler for the texture
```

Doing that allows us to use this texture in our fragment function!

### Tint the Main Texture

Manipulating the main texture that is already provided in the template is super easy!

As you can see - the value of that texture is being assigned to an `o.Albedo` field of our surface struct.

You can see what [other fields are available here](/docs/development//orl-shader-definition#surfacedata).

```hlsl
void MyFragment() {
    half2 uv = d.uv0.xy * _MainTex_ST.xy + _MainTex_ST.zw;
    half3 albedo = SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, uv).rgb;
    
    albedo *= _Color; // tint the sampled texture by our tint color

    o.Albedo = albedo;
}
```

### Sample the Texture

Now we can actually sample the texture and display some colors!

Since we're using the sampling library - the sampling process can also benefit from those macros.

You can use `SAMPLE_TEXTURE2D(<texture>, <sampler>, <uv>)` to get the values.

:::info Other texture types

For other textures like 3D or Cubemap, as well as sampling specific mipmaps - just adjust the name of the macros accordingly.

For example, `SAMPLE_TEXTURE2D_LOD` allows you to pass a specific mip level. and `SAMPLE_TEXTURECUBE` allows you to sample cubemaps!

You can look up the full list of macros in the [CoreRP sampling library](https://github.com/orels1/orels-Unity-Shaders/blob/mss-migration/Sources/Editor/UnitySamplingLib.stemplate#L77-L97)

:::

Now let's sample the texture!

```hlsl
void MyFragment() {
    half2 uv = d.uv0.xy * _MainTex_ST.xy + _MainTex_ST.zw;
    half3 albedo = SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, uv).rgb;
    
    albedo *= _Color; // tint the sampled texture by our tint color

    o.Albedo = albedo;
    half3 emission = SAMPLE_TEXTURE2D(_EmissionMap, sampler_EmissionMap, uv).rgb;
    o.Emission = emission;
}
```

As you can see - its pretty straightforward. The actual lighting calculations and such are handled by the template of your choosing!

### Regenerate the shader

Now that you have made your changes - save the file and switch back to Unity. (If you have auto-refresh disabled - you'll need to press Ctrl+R for the shader to be updated).

Now click on the `.orlshader` file and click Generate Shader again to update the actual Unity shader with the new code.

You should see your newly added Emission texture and Tint color in the inspector now!


<p align="center">
  <img alt="Updated Material" src="/img/docs/development/development-basics/development-basics-updated-shader.png" />

  <br/>

  <small>Updated Material</small>
</p>

### Next Steps

From here you can go as deep as you want adding all kinds of fancy effects!

And I also encourage you to check out the [ORL Shader Definition](/docs/development/orl-shader-definition) documentation for all the things available to you in the `.orlshader` file!

And if you want to learn more about creating modules that can be composed together - check out [this page](/docs/development/creating-your-own-modules).