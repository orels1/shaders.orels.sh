---
title: Vertex Animation
description: Options relevant to the orels1/Standard Vertex Animation shader
---

Options relevant to the orels1/Standard Vertex Animation shader

---

Vertex Animation shader aims to provide you with a simple way to add simple animations to your meshes, with support for GPU Instancing. Which can be very handy for things like power-ups or collectibles in the world, allowing them all to run in a single batch and avoid the use of animators.

This shader has a couple of different effects which are documented separately below. All of them can be combined together.

{% callout type="warning" title="Local Space limitations" %}
Note that combining multiple effects that are used in Local Space mode can produce some odd results at times, so try different combinations of Local Space and World Space if you encounter any issues
{% /callout %}

## Spin

A simple spin effect with configurable Axis and Origin point

{% video url="https://iframe.mediadelivery.net/embed/165/d0b9e444-d36b-4dae-afed-58a420a0b5ad?autoplay=true&loop=true&muted=true" title="Spin effect" /%}

![Spin effect options](/img/docs/orl-standard/vertex-animation/vertex-animation-spin-inspector.png "Spin effect options")

- Spinning: Controls the application of spin effect. Options are: None/Local/World, where Local and World controls the reference space used for applying the effect
- Spin Axis: The axis of spin in Local/World space based on the **Spinning** setting. Where something like X: 1, Y: 0, Z: 0 will spin the object along the X axis in Local/World space, and X: 0, Y: 1, Z: 0 will spin along the Y
- Normalize Axis: Enables force-normalization of the **Spin Axis**. This is useful if you want to make sure that the axis is always kept as a unit-vector to avoid any mesh distortions
- Spin Origin Point: The origin point of the spin, by default is set to 0,0,0, which is the object's pivot point. Note that the origin point is always applied in **local space**
- Spin Speed: Controls the speed of the spin. Negative values reverse the spin direction
- Phase Offset: Controls the offset of the animation, allows you to specify per-material time offsets
- Position Offset: Enables the animation offset based on object's position
- Position Offset Axis: Controls the axis which is considered for position offset. Options are: XYZ/X/Y/Z, where XYZ uses object's position as is, while individual axis will only consider the world-space X/Y/Z axis position. All other objects with the same X/Y/Z value will have the same animation offset
- Position Offset Scale: Controls the strength of the position-based animation offset effect

## Float

Applies a floating effect to the object

{% video url="https://iframe.mediadelivery.net/embed/165/ef7abed9-52cf-4c88-9f96-61fb3195dbbc?autoplay=true&loop=true&muted=true" title="Float Effect" /%}

![Float Effect Options](/img/docs/orl-standard/vertex-animation/vertex-animation-float-inspector.png "Float Effect Options")

- Floating: Controls the application of float effect. Options are: None/Local/World, where Local and World controls the reference space used for applying the effect
- Float Axis: The axis of floating in Local/World space based on the **Floating** setting. Where something like X: 1, Y: 0, Z: 0 will float the object along the X axis in Local/World space, and X: 0, Y: 1, Z: 0 will float along the Y
- Normalize Axis: Enables force-normalization of the **Float Axis**. This is useful if you want to make sure that the axis is always kept as a unit-vector to avoid any mesh distortions
- Float Speed: Controls the speed of the float effect
- Float Amount: Controls the amount of movement applied
Two Way: Determines if the object should only move in the positive direction along the specified **Float Axis**, purely a convenience function
- Phase Offset: Controls the offset of the animation, allows you to specify per-material time offsets
- Position Offset: Enables the animation offset based on object's position
- Position Offset Axis: Controls the axis which is considered for position offset. Options are: XYZ/X/Y/Z, where XYZ uses object's position as is, while individual axis will only consider the world-space X/Y/Z axis position. All other objects with the same X/Y/Z value will have the same animation offset
- Position Offset Scale: Controls the strength of the position-based animation offset effect

## Scale

Applies uniform scaling to the object

{% video url="https://iframe.mediadelivery.net/embed/165/f289b1d7-dc10-4cb1-b77c-e474b30974e6?autoplay=true&loop=true&muted=true" title="Scale Effect" /%}

![Scale Effect Options](/img/docs/orl-standard/vertex-animation/vertex-animation-scale-inspector.png "Scale Effect Options")

- Scaling: Controls the application of the scaling effect. Options are: None/Uniform
- Scale Speed: The speed of the scaling effect
- Scale Amount: Controls the amount of scaling applied
- Phase Offset: Controls the offset of the animation, allows you to specify per-material time offsets
- Position Offset: Enables the animation offset based on object's position
- Position Offset Axis: Controls the axis which is considered for position offset. Options are: XYZ/X/Y/Z, where XYZ uses object's position as is, while individual axis will only consider the world-space X/Y/Z axis position. All other objects with the same X/Y/Z value will have the same animation offset
- Position Offset Scale: Controls the strength of the position-based animation offset effect