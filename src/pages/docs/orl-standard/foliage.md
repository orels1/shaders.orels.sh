---
title: Foliage Shader
description: Options relevant to the orels1/Standard Foliage shader
---

Options relevant to the orels1/Standard Foliage shader

---

{% callout type="note" title="Renamed Shader" %}
This shader was previously known as Standrd Cutout and has been renamed as all of the PBR shaders now support Cutout/Transparent/Opaque/Fade render modes.

It will receive relevant features in the future
{% /callout %}

![Foliage Inspector](/img/docs/orl-standard/foliage/foliage.png "Foliage Inspector")

## Settings

- Cutoff: Controls the alpha cutoff value
- Alpha to Coverage (A2C): Enables native Alpha to Coverage support. This results in cleaner edges with less aliasing if MSAA is enabled
- Enable Dither Fade: Enables distance-based dither fade.
