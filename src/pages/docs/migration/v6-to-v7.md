---
title: Migration to v7
description: How to migrate from any v6 release to v7.x
---

# Migrating to v7

Migrating to the v7 from v6 is a very simple process

## Step 1: Update the shaders

### For Any Unity Project

[Download and import the latest full release (the first .unitypackage file)](https://github.com/orels1/orels-Unity-Shaders/releases)

You should grab the `combined` `.unitypackage` file from the latest release. It contains all the shaders and tools. It should be named like

```
sh.orels.shaders-combined-X.X.X.unitypackage
```

### For VCC Users

Simply update the package to v7.x.x on the project management screen

## Step 2: Migrate your materials

After updating the package - open the Material Upgrader window by clikcing the `Tools` menu and then `orels1` -> `Upgrade Materials`

In the new window - simply click "Find Materials using ORL Shaders" and then "Upgrade Now"

## Step 3: You're done!

Enjoy using the new shaders!

## Step X: Rolling Back and Troubleshooting

If you encounter any issues - you can always revert back by using Undo.
You can also do a "Dry Run" to see what the migrator will do without actually applying any changes.

If you encounter issues that force you to revert, please report them [either on github](https://github.com/orels1/orels-Unity-Shaders/issues/new) or by joining the [discord](http://discord.gg/orels1) and asking for help.
