---
title: Toon UV Discard
description: A Toon shader with support for hiding parts of the mesh based on the UV tile they're in
---

A Toon shader with support for hiding parts of the mesh based on the UV tile they're in

---

{% video url="https://iframe.mediadelivery.net/embed/165/94725fcf-d455-4c40-b0ab-285c487ac48c?autoplay=true&loop=true&muted=true" title="UV Discard in Action" /%}

UV Discard might be an intimidating concept at first. But if you are comfortable doing simple edits in blender you should be able to use this technique without issue!

The core idea is to optionally hide anything that exists on a particular UV "tile". Usually, UV coordinates in something like Blender only go from 0 to 1, but nothing stops you from putting things beyond that range.

![Example UV Layout in Blender](/img/docs/toon/uv-discard/uv-discard-image-1.png "Example UV Layout in Blender")

This shader takes advantage of that and the fact that when shifting by whole values (1, 2, 3, etc) the UVs will wrap around.

![UV Discard Inspector](/img/docs/toon/uv-discard/uv-discard-image.png "UV Discard Inspector")

Altogether, this allows you to offset UVs of, for example, your jacket or boots by a 1 on X axis, and then hide them by toggling **Hide 1** in the UV Discard options

The shader also encourages the use of unused UV maps on your model so you dont even have to affect your main UVs to leverage this technique.

![UV 3 In Blender](/img/docs/toon/uv-discard/uv-discard-image-2.png "UV 3 In Blender")

{% callout type="note" title="Performance" %}
While it might look more complicated than a blend shape or just a toggle approach, it is generally more performant than either of those, so I encourage you to try!
{% /callout %}