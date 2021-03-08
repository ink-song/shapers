// import { React } from 'https://deno.land/x/pagic/mod.ts';

export default {
  srcDir: '.',
  exclude: ['LICENSE'],
  root: '/shapers/',

  theme: 'docs',
  plugins: ['sidebar', 'prev_next'],
  title: 'Pagic template docs',
  description: 'Use this template to create a Pagic site with the docs theme',
  nav: [
    {
      text: 'Docs',
      link: '/shapers/introduction/index.html',
    },
    {
      text: 'Pagic',
      link: 'https://pagic.org/',
    },
    {
      text: 'About',
      link: '/shapers/about/index.html',
      align: 'right',
    },
  ],
  github: 'https://github.com/ink-sonng/shaper',
  sidebar: {
    '/': [
      'introduction/README.md',
      {
        link: 'test_pages/README.md',
        children: ['test_pages/markdown_test.md', 'test_pages/front_matter.md', 'test_pages/react_hooks_test.tsx'],
      },
      {
        text: 'Folder',
        children: [
          'folder/foo.md',
          {
            text: 'Custom sidebar text',
            link: 'folder/bar.md'
          }
        ]
      }
    ],
  },
  tools: {
    editOnGitHub: true,
    backToTop: true,
  },

  port: 8000,
};
