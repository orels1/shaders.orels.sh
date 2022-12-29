---
sidebar_position: 3
---

# Creating Modules

:::tip Check out the basics first

If you have yet to go through the [Development Basics](/docs/generator/development-basics) guide, I highly recommend checking that out first, before diving into modules.

:::

## The Concept

Conceptually modules are pieces of shader code that can be chained into your larger shader to handle a particular effect. For example, in ORL Standard - Parallax and Details are modules separate from the main shader!

They are not meant to be compiled into a full working shader on their own, but otherwise they are created the same way as any other `.orlshader`-based shader.

## Creating a Module

Start by creating new `.orlsource` module via the `Create/Shader/ORL/Shader Module` menu. These files are not compiled into a full shader, and serve as simple containers for our directives that will be then assembled into a full shader by the generator.


Now that you have that handled - let's make a pulsing emission module!

Let's start by adding a simple pulse to the emission output.

```hlsl
%Fragment("PulsingEmissionFragment")
{
    void PulsingEmissionFragment(inout SurfaceData o)
    {
        half pulse = (sin(_Time.y) + 1) / 2;

        o.Emission = pulse;
    }
}
```

We can already test this by including it any other shader! For example, let's include it in the one we made in the [Development Basics](/docs/generator/development-basics) guide.

To include a shader definition as a submodule - simply add it to the list of includes.

```hlsl
%Includes()
{
  "self",
  "PulsingEmission"
}
```

You can now refresh your assets and the shader should regenerate with the new module included!

### Expanding the module

Just pulsing white isn't too fun, so let's try to mess with it a bit.

First, since this is a module included in a shader that already had emission, instead of completely replacing emission - we can stack on top of it!

In the case of the shader we made in the basics tutorial - it makes sense to reuse the original emission map already passed to `o.Emission` so only the provided texture pulses.

We can also add speed controls to make our pulsing faster or slower.

All you need to do is to add the new Property and Variable, and then update the FragmentFunction of your module to use `*=` instead of `=` when affecting the emission.

Here's the full final code of the module

```hlsl
%ShaderName("PulsingEmission")

%Properties()
{
    _PulseSpeed("Pulse Speed", Range(0, 10)) = 1
}

%Variables()
{
    half _PulseSpeed;
}

%Fragment("PulsingEmissionFragment")
{
    void PulsingEmissionFragment(inout SurfaceData o) {
        half pulse = (sin(_Time.y * _PulseSpeed) + 1) / 2;

        o.Emission *= pulse;
    }
}
```

If you refresh your assets now - you should see only the provided emission texture pulse. And you'll be able to adjust the pulsing speed by moving the "Pulse Speed" slider!

:::info

As you might've noticed, we can include all kinds of directives inside the shader module, similar to how we did it in the main Shaded Definition files. This is one of the key powers of using the generator over simply splitting your shaders with `#includes` as every module can define all of the things it needs and exposes, from including other modules, to properties and textures. Which makes it easy to reuse them in different shaders!

:::

### Next Steps

From here the sky really is the limit! You can add all kinds of effects all in separate modules to be able to quickly add snippets of code to a larger shader on-demand!

I highly recommend checking out the [ORL Shader Definition docs](/docs/generator/orl-shader-definition) to see what kinds of things you can influence and add to your modules to make your shaders more interesting.
