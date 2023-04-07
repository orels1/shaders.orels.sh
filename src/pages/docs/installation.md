---
title: Installation
description: Step-by-step guides to setting up the shaders in your project.
---

There are a couple of ways to install the shaders depending on the type of your project. This page will guide you through the process

---

## Using the VRChat Creator Companion

Add the following repo listing to your VCC

```
https://orels1.github.io/orels-Unity-Shaders/index.json
```

Or use the Add to VCC button below

{% link-button href="vcc://vpm/add-repo?url=https://orels1.github.io/orels-Unity-Shaders/index.json" variant="secondary" text="Add to VCC" /%}

Open the Project Management screen for your project and add the "ORL Shaders" package.

You should be able to see all the shaders in your shaders list under the "orels1" category!

## For any other Unity project

- Download and import the latest release from the [releases page](https://github.com/orels1/orels-Unity-Shaders/releases) (the first .unitypackage file)
- All of the shaders should be added under the orels1 category in the shaders list
- Check out these docs to learn more about the shaders available! Base Shader docs is a good place to start
- Enjoy!

## Using the Unity Package Manager via git

{% callout type="warning" title="Advanced use-case" %}
This method is only recommended for advanced users due to fairly poor implementation of the Unity Package Manager.
{% /callout %}

You can also install the shader systems via the Unity Package Manager. You can use the following git URLs to install the shader package (in the order of dependencies):

```
https://github.com/orels1/orels-Unity-Shaders.git?path=Packages/sh.orels.shaders.inspector
```
```
https://github.com/orels1/orels-Unity-Shaders.git?path=Packages/sh.orels.shaders.generator
```
```
https://github.com/orels1/orels-Unity-Shaders.git?path=Packages/sh.orels.shaders
```

You should now be able to use the shaders in your project!

## Learning about the shaders

You can find documentation for all of the shaders in the [shader list](/shaders/).

## Getting Updates

If you're updating from an old version, most of the time you can just get the latest release the same way you got the original package and that's it. There are exceptions for major version upgrades, so check out the [Migration Guides](/docs/migration) section to learn more.

---

## Getting help

If you're having trouble with the shaders, you can ask for help in my [discord server](https://discord.gg/orels1).

If you are a shader developer yourself and want to file a code-specific issue with a bit more detail, drop by the github repo and [submit an issue there](https://github.com/orels1/orels-Unity-Shaders/issues/new)!
