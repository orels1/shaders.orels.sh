---
title: Migration Guides
description: How to migrate from old versions of the shaders
---

# General Updates

Unless stated [in a list](#major-version-migrations) below, updating ORL Shaders is a simple process

## Using Unitypackages

If you installed the shaders by downloading a unitypackage from github - simply download the latest unitypackage and import it into your project, replacing the current files.

## Using the VRChat Creator Companion

If you used the VCC to install the shaders, you can update them by going to the VCC and clicking the "Update" button next to the ORL Shaders entry. This should update all the necessary dependencies as well

## Major version Migrations

{% callout type="warning" %}
If your ORL Shaders are inside the `Assets` folder - you are on an old version and should use the guide below to migrate!
{% /callout %}

The following versions have breaking changes and require a migration step

- v6+, see [Migrating to v6](/docs/migration/any-to-v6)