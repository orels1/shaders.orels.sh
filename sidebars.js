/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  mainSidebar: [
    'orl-shader-family',
    {
      type: 'category',
      label: 'ORL Standard',
      items: [
        { type: 'autogenerated', dirName: 'orl-standard' }
      ]
    },
    {
      type: 'category',
      label: 'VFX',
      items: [
        { type: 'autogenerated', dirName: 'vfx' }
      ]
    },
    {
      type: 'category',
      label: 'Migration Guides',
      items: [
        { type: 'autogenerated', dirName: 'migration' }
      ]
    },
    {
      type: 'category',
      label: 'Shader Inspector',
      items: [
        { type: 'autogenerated', dirName: 'inspector' }
      ]
    },
    {
      type: 'category',
      label: 'Shader Generator',
      items: [
        { type: 'autogenerated', dirName: 'generator' }
      ]
    }
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Tutorial',
      items: ['hello'],
    },
  ],
   */
};

module.exports = sidebars;
