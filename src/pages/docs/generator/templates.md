---
title: Templates
description: Shader templates in ORL Shader Generator
---

This page goes over the built-in templates in ORL Shader Generator and the features they provide.

Docs for creating your own templates will be added at a later date.

---

## What is a Template

A Template is an `.orltemplate` file which serves as a basis for the shader generator. Every single module in the system is eventually inserted into the base template at a hook-up point.

## Template Hook Points

All of your Shader or Lighting Model blocks are inserted into the base template at a hook-up point.

For example, when you define a `%Properties()` block in your `.orlshader` file, it will be inserted into the base template at the `%Properties` hook point.

So when a shader file like this

```hlsl
// My.orlshader

%Properties()
{
    _Color("Color", Color) = (1,1,1,1)
}
```

Is being processed with a template like this

```hlsl
// MyTemplate.orltemplate

Properties
{
   %Properties
}
```

The resulting shader output will look like this

```hlsl
Properties
{
    _Color("Color", Color) = (1,1,1,1)
}
```

Since version 7.0.0, you can also define hook points within your function blocks, like `%Vertex()`, `%Fragment()` or even `%FragmentBase()`. The latter allows you to, for example, insert a call to a custom gi function into the base lighting calculation of the PBR lighting model via `%CustomGI()` block.

Check [Optional Features section](/docs/generator/orl-shader-definition#optional-features) for more information.

## Template Features

Parts of the template can be conditionally added or removed, which can be used to include whole passes.

A template feature is defined by adding a new `TempalteFeature` block inside a template.

```hlsl
// template code

%TemplateFeature("CustomPass")
{
    Pass
    {
        Name "CustomPass"
        Tags { "LightMode" = "ForwardBase" }
        Cull Front
        HLSLPROGRAM
        #include "CustomPass.hlsl"
        ENDHLSL
    }
}

// template code
```

To utilize this template feature in module or a shader, you only need to add a list of enabled template features like this

```hlsl
%TemplateFeatures("CustomPass")
```

This will enable the `CustomPass` template feature, which will add the `CustomPass` pass to the shader.

The docs for `TemplateFeatures` can be found [here](/docs/generator/orl-shader-definition#template-features-string-features).

## Built-in Templates

All built-in templates are located in Packages -> ORL Shader Generator -> Runtime -> Sources -> Templates.

But you can reference them via an `@` shorthand via the `%Template` block.

```hlsl
%Template("@/Templates/PBR")
```

- PBR
  - Contains no shader features
- Toon
  - Contains the following shader features
    - `PrePass`: adds a configurable pre-pass. Useful for 2-pass transparency
      - Enabling this feature allows you to use the `%PrePassModifiers` block and the `%PrePassColor` function
- VFX
  - Contains no shader features
- UI
  - Contains no shader features