---
sidebar_position: 3
---

import BunnyPlayer from "@site/src/components/BunnyPlayer";

# 🌀 Vertex Animation

Options relevant to the orels1/Standard Vertex Animation shader

-----

Vertex Animation shader aims to provide you with a simple way to add simple animations to your meshes, with support for GPU Instancing. Which can be very handy for things like power-ups or collectibles in the world, allowing them all to run in a single batch and avoid the use of animators.

This shader has a couple of different effects which are documented separately below. All of them can be combined together.

:::caution Local Space limitations

Note that combining multiple effects that are used in Local Space mode can produce some odd results at times, so try different combinations of Local Space and World Space if you encounter any issues

:::

## Spin

A simple spin effect with configurable Axis and Origin point

<BunnyPlayer videoId="d0b9e444-d36b-4dae-afed-58a420a0b5ad" />

<br />

<p align="center">
  <img alt="Spin effect options" src="/img/docs/orl-standard/vertex-animation/vertex-animation-spin-inspector.png" />

  <small>Spin effect options</small>
</p>

- Spinning: Controls the application of spin effect. Options are: None/Local/World, where Local and World controls the reference space used for applying the effect
- Spin Axis: The axis of spin in Local/World space based on the **Spinning** setting. Where something like X: 1, Y: 0, Z: 0 will spin the object along the X axis in Local/World space, and X: 0, Y: 1, Z: 0 will spin along the Y
- Spin Origin Point: The origin point of the spin, by default is set to 0,0,0, which is the object's pivot point. Note that the origin point is always applied in **local space**
- Spin Speed: Controls the speed of the spin. Negative values reverse the spin direction

:::caution Normalize the Axis

Note that setting axis to a non-normalized value (where a sum of X/Y/Z is above or below 1) can result in unpredicted effects, but at the same time - feel free to experiment!

:::

## Float

Applies a floating effect to the object

<BunnyPlayer videoId="ef7abed9-52cf-4c88-9f96-61fb3195dbbc" />

<br />

<p align="center">
  <img alt="Float effect options" src="/img/docs/orl-standard/vertex-animation/vertex-animation-float-inspector.png" />

  <br />

  <small>Float effect options</small>
</p>

- Floating: Controls the application of float effect. Options are: None/Local/World, where Local and World controls the reference space used for applying the effect
- Float Axis: The axis of floating in Local/World space based on the **Floating** setting. Where something like X: 1, Y: 0, Z: 0 will float the object along the X axis in Local/World space, and X: 0, Y: 1, Z: 0 will float along the Y
- Float Speed: Controls the speed of the float effect
- Float Amount: Controls the amount of movement applied
Two Way: Determines if the object should only move in the positive direction along the specified **Float Axis**, purely a convenience function

## Scale

Applies uniform scaling to the object

<BunnyPlayer videoId="f289b1d7-dc10-4cb1-b77c-e474b30974e6" />

<br />

<p align="center">
  <img alt="Scale effect options" src="/img/docs/orl-standard/vertex-animation/vertex-animation-scale-inspector.png" />

  <br />

  <small>Scale effect options</small>
</p>

- Scaling: Controls the application of the scaling effect. Options are: None/Uniform
- Scale Speed: The speed of the scaling effect
- Scale Amount: Controls the amount of scaling applied