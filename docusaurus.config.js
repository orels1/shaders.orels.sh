// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/shadesOfPurple');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ORL Shaders',
  tagline: 'A Collection of Unity BIRP shaders of varied quality',
  url: 'https://shaders.orels.sh',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'orels1', // Usually your GitHub org/user name.
  projectName: 'orels-Unity-Shaders', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/orels1/shaders.orels.sh/tree/main/',
          sidebarCollapsible: false,
        },
        blog: {
          showReadingTime: false,
          // Please change this to your repo.
          editUrl:
            'https://github.com/orels1/shaders.orels.sh/tree/main/',
          path: 'releases',
          routeBasePath: 'releases'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    require.resolve('docusaurus-plugin-image-zoom')
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true
      },
      navbar: {
        title: 'ORL Shaders',
        logo: {
          alt: 'ORL Shader Family',
          src: 'img/orl.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'orl-shader-family',
            position: 'left',
            label: 'Docs',
          },
          {to: '/releases', label: 'Releases', position: 'left'},
          {
            href: 'https://github.com/orels1/orels-Unity-Shaders',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'ORL Shader Family',
                to: '/docs/orl-shader-family',
              },
              {
                label: 'ORL Standard',
                to: '/docs/orl-standard/base-shader',
              },
              {
                label: 'VFX',
                to: '/docs/vfx/clouds',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/orels1',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/orels1_',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Releases',
                to: '/releases',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/orels1/orels-Unity-Shaders',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} orels1. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['csharp', 'glsl', 'hlsl']
      },
      hideableSidebar: true,
      zoom: {
        selector: '.markdown :not(em) > img',
        config: {
          // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
          background: {
            light: 'rgb(255, 255, 255)',
            dark: 'rgb(50, 50, 50)'
          }
        }
      },
    }),
};

module.exports = config;
