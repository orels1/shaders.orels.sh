---
title: LTCGI Shader
description: Options relevant to the orels1/Standard LTCGI shader
---

Options relevant to the orels1/Standard LTCGI shader

---

A special variant of the main shader with included LTCGI support. If you are not aware of what LTCGI is - it's a great modern Realtime area light algorithm that was implemented to run in VRChat by `_pi_`, [check out their repo](https://github.com/PiMaker/ltcgi)!

{% video url="https://iframe.mediadelivery.net/embed/165/d53e3baf-7ae1-4948-a098-10b32a1f45e0?autoplay=true&loop=true&muted=true" title="A demo of ORL Standard with LTCGI integration" /%}

{% callout type="note" title="LTCGI Dependency" %}
You must import the LTCGI package into the project for the shader to work correctly
{% /callout %}

![LTCGI Inspector](/img/docs/orl-standard/ltcgi/ltcgi.png "LTCGI Inspector")

## Settings

- Integrate LTCGI: Toggles LTCGI on and off
- Enable on Mobile: Allows LTCGI effects to be calculated on mobile platforms
- Clamp Brightness: Enabled brightness normalization and clamping to prevent brightness spikes
  - Max Brightness: Maximum allowed brightness
