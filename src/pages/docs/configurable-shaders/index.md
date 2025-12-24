---
title: Configurable Shaders
description: A system to mix and match different ORL shader modules together to get the result you want
---

A system to mix and match different ORL shader modules together to get the result you want

---

{% video url="https://iframe.mediadelivery.net/embed/165/12f1372a-1f10-419b-8860-f0b5664486e2?autoplay=true&loop=true&muted=true" title="Configurable Shader in Action" /%}

## What is a Configurable Shader?

A configurable shader is a shader that is made up of one or multiple modules provided by the ORL Shaders package.

If you ever wanted to "add LTCGI to VertexAnimation shader" or "have support for distance Dither Fade in the Layered Material shader" this tool is for you!

You can also use it to create an Uber shader that combines all the inidivudl features you want, so then objects using them can be batched together.

## Creating a new Shader

Making a new Configurable Shader is super easy! Just right click in your project window and select Create -> Shader -> orels1 -> Configurable Shader. Give it a name at the top of the inspector that opened and you're good to go!

![New Empty Configurable Shader](/img/docs/root/configurable-shaders/configurable-shaders-image.png "New Empty configurable Shader")

## Modifying the Shader

By default, the shader uses the PBR lighting model, which is good for most cases, and only the **BaseColor** module is included, which renders a texture tinted by a color.

Let's make something more interesting and add a Dissolve module.

Click on the `+` button in the Modules section to add a new module. And change it to **Dissolve**

![Dissolve Module Selected](/img/docs/root/configurable-shaders/configurable-shaders-image-1.png "Dissolve Module Selected")

If you make a new material and assign this new shader to it - you'll see that it has all of the options of the [Dissolve](/docs/orl-standard/dissolve) shader.

## Using a Base Shader

Sometimes you only want to slightly tweak a shader that already exists. E.g. add LTCGI support to the Vertex Animation shader.

This can also be easily done with Configurable Shaders.

Instead of adding every module by hand, simply select **ORL Standard Vertex Animation** in the Base Shader dropdown and remove the **BaseColor** module, as we don't need it anymore.

![Vertex Animation Base Shader](/img/docs/root/configurable-shaders/configurable-shaders-image-2.png "Vertex Animation Base Shader")

Now you can add the desired module in the modules list and it will be "stacked" on top of the base shader.

![Vertex Animation with LTCGI](/img/docs/root/configurable-shaders/configurable-shaders-image-3.png "Vertex Animation with LTCGI")

And that's it! You can use this new shader as you would any other in your project, and it will benefit from any future updates I make to either base shaders or the modules.

## Finding Modules

The full list of modules is only available within Unity when you condifure the shaders using the Inspector.

However, modules that aren't included in any shaders by default are also listed under the Modules section [of the shaders list](/docs/shaders-list), as well as under the Modules section of the sidebar menu.

## Custom Modules

If you have shader developers on your team, or you're comfortable writing shaders yourself, you can also create your own modules and use them via Configurable Shaders by simply checking the "Custom Module" checkbox in the inspector and selecting your custom module file (`*.orlsource`).

## Things to keep in mind

There are some caveats to the system that you should be aware of. The inspector will try to do its best to tell you if any issues are expected, but it's not perfect.

- You should not have repeating modules
- You shouldn't use **BaseColor** modules with Base Shaders
- Toon modules work best with the Toon Lighting Model or a Toon base shader
- Use VFX for best performance, unless you need PBR features like lightmapping or reflection probes