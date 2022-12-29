---
sidebar_position: 1
---

# Migrating to v6

Migrating to the v6 versions is a 3 step process. This version is a complete rewrite with a totally new shader architecture. This means that all the old shaders are gone, and you will need to migrate your materials to the new shaders.

## Step 1: Remove the old shaders

While this might sound scary - its not actually a destructive process. Simply remove all the ORL shaders and their folders from your project.

For reference, here are the folders you need to remove if you used the v4 of ORL Shaders

- `Assets/Shaders/orels1/ORL`

And if you used the pre-release v5, delete the following

- `Assets/Shaders/orels1/ORL`
- `Assets/Shaders/orels1/LICENSE`
- `Assets/Shaders/orels1/README.md`
- `Assets/Shaders/orels1/Sources`

## Step 2: Import the new shaders

### For Any Unity Project

- [ ] [Download and import the lastest release of ORL Shaders, Shader Generator and Shader Inspector](https://github.com/orels1/orels-Unity-Shaders/releases)

### For VCC Users

- [ ] Add this repo listing to your VCC

```
Coming Soon (tm)
```

- [ ] Add ORL Shaders package to your project

## Step 3: Migrate your materials

After importing the new shaders, you will need to migrate your materials, which are currently pink.

You should see a new `Tools` menu in your topbar, with an `orels1` submenu inside. Click on `orels1` and then `Migrate Shaders`

<p align="center">
  <img alt="Tools submenu" src="/img/docs/migration/v6/v6-migrator.png" />
</p>


This will open a new window that will search for all of the materials that used ORL shaders before the migration and which it will migrate to the new ones.

<p align="center">
  <img alt="Migrator Window" src="/img/docs/migration/v6/v6-migrator-window.png" />
</p>

Click "Find Materials using ORL Shaders" to start the search. This will take a few seconds, and will show you a list of all the materials that need to be migrated.

<p align="center">
  <img alt="Materials to be migrated" src="/img/docs/migration/v6/v6-migrator-list.png" />
</p>


After confirming that the list looks OK you can click "Migrate Now" button to start the migration process. This will take a few seconds, and will show you the progress as it goes along.

If you're not comfortable migrating outright, you can check "Dry Run" to see what the migrator will do without actually applying any changes. It will print everything it is planning to do to the console.

When the migration is done - all of the materials should un-pink themselves. And you can now start using the new shaders.

## Step X: Rolling Back and Troubleshooting

Since this operation involves deleting stuff, I want to reassure you that you can always rollback, as long as you haven't closed the project yet and have the migration in your undo stack.

If you migrated the shaders and things are still totally pink or there are other unpredicted errors, you can immediately ctrl+Z to revert back to the all-pink old shaders, remove ORL Shaders from your project and import the last version you've been using from github.

This will restore all the references to what they were.

If you encounter issues that force you to revert, please report them [either on github](https://github.com/orels1/orels-Unity-Shaders/issues/new) or by joining the [discord](http://discord.gg/orels1) and asking for help.