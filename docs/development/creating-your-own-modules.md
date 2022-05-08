---
sidebar_position: 3
---

# Creating Your Own Modules

:::tip Check out the basics first

If you have yet to go through the [Development Basics](/docs/development/development-basics) guide, I highly recommend checking that out first, before diving into modules.

:::

## The Concept

Conceptually modules are pieces of shader code that can be chained into your larger shader to handle a particular effect. For example, in ORL Standard - Parallax and Details are modules separate from the main shader!

They are not meant to be compiled into a full working shader on their own, but otherwise they are created the same way as any other `.orlshader`-based shader.

## Creating a Module

Start by creating new `.orlshader` module via the `Create/Shader/ORL/Shader Module` menu. Technically an ORL Shader Module is just the same kind of shader as any other, but we just skip all the includes or templates as we do not need them.

:::tip

You don't need to generate actual shader files for modules, as they're only gonna be included in other shaders instead of being used directly

:::

Now that you have that handled - let's make a pulsing emission module!

Let's start by adding a simple pulse to the emission output.

```hlsl
#T#FragmentFunction
void PulsingEmissionFragment() {
  half pulse = (sin(_Time.y) + 1) / 2;

  o.Emission = pulse;
}
```

We can already test this by including it any other shader! For example, let's include it in the one we made in the [Development Basics](/docs/development/development-basics) guide.

To include a shader definition as a submodule - simply add it to the list of includes.

```hlsl
#S#Includes
"ORL Utility Functions.asset"
"self"
"PulsingEmission.orlshader"
"ORL PBR Module.asset"
```

You can now regenerate your main shader and it should show the effect.

### Expanding the module

Just pulsing white isn't too fun, so let's try to mess with it a bit.

First, since this is a module included in a shader that already had emission, instead of completely replacing emission - we can stack on top of it!

In the case of the shader we made in the basics tutorial - it makes sense to reuse the original emission map already passed to `o.Emission` so only the provided texture pulses.

We can also add speed controls to make our pulsing faster or slower.

All you need to do is to add the new Property and Variable, and then update the FragmentFunction of your module to use `*=` instead of `=` when affecting the emission.

Here's the full final code of the module

```hlsl
#S#Settings
Name "PulsingEmission"
Author "YOUR_NAME"
Version "1.0.0"

#S#Properties
_PulseSpeed("Pulse Speed", Range(0, 10)) = 1

#S#FragmentVariables
half _PulseSpeed;

#T#FragmentFunction
void PulsingEmissionFragment() {
  half pulse = (sin(_Time.y * _PulseSpeed) + 1) / 2;

  o.Emission *= pulse;
}
```

If you regenerate your main shader now - you should see only the provided emission texture pulse. And you'll be able to adjust the pulsing speed by moving the "Pulse Speed" slider!

### Next Steps

From here the sky really is the limit! You can add all kinds of effects all in separate modules to be able to quickly add snippets of code to a larger shader on-demand!

I highly recommend checking out the [ORL Shader Definition docs](/docs/development/orl-shader-definition) to see what kinds of things you can influence and add to your modules to make your shaders more interesting.
