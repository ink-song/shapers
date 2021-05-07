// import { React } from 'https://deno.land/x/pagic/mod.ts';

export default {
  srcDir: '.',
  exclude: [],
  root: '/shapers/',
  theme: 'docs',
  plugins: ['clean', 'init', 'md', 'tsx', 'sidebar', 'prev_next', 'ga', 'script', 'layout', 'out'],
  title: "Shaper's Docs",
  description: "Shaper's Docs",
  nav: [
    {
      text: "It's me",
      link: '/shapers/introduction/index.html',
    },
    {
      text: 'About',
      link: '/shapers/about/index.html',
      align: 'right',
    },
  ],
  github: 'https://github.com/ink-song/shapers.githup.io',
  sidebar: {
    '/': [
      'introduction/README.md',
      {
        link: 'technology/README.md',
        children: ['technology/vue3.md'],
      },
      {
        text: 'Life',
        children: [
          'life/guitar.md',
          {
            text: '',
            link: 'folder/bar.md'
          }
        ]
      },
      {
        text: 'Study',
        children: [
          'study/HowWeLearn.md',
          {
            text: '',
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
