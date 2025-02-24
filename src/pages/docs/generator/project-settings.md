---
title: Project Settings
description: Configure the ORL Shader Generator in your project
---

There are some cases where you might want to tweak the generator settings in your project: removing built-in modules, changing the default lighting model, or remapping built-in modules to your custom ones. The Project Settings window allows you to do that.

---

![Project Settings Window](/img/docs/generator/project-settings/project-settings.png "Project Settings Window")

## Always Included Blocks

This defines a list of all the always included module files (contianing essential blocks like VertexData struct). You can add or remove modules from this list.

### Usage Example

In case you'd want to swap out the base VertexData struct with your own - you can do that by remoivng the `@/Structs/VertexData` module from the list and adding your own. For example, if you want to skip passing around extra UV channels or vertex colors.

## Default Lighting Model

Configures which lighting model is used if you do not specify one in your `.orlshader` file.`

## User Module Remaps

Aliases any module to a different file. This is done during the module resolution process and should allow you to change modules in any shader, either built-in or made by you.

### Usage Example

Let's say you want to create your own version of the Details module using a custom-packed details texture. Adding a remap for the `@/Modules/Details` to something like `/Assets/Shaders/Modules/CustomDetails` will replace every inclusion of `@/Modules/Details` with your custom module.

This follows the same path resolution rules as any other entry in the `%Includes` block.

