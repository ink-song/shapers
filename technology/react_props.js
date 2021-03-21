import projectConfig from '/shapers/pagic.config.js';
import ReactHooksTest from './react_content.js';
export default {
    'prev': undefined,
    'next': undefined,
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "technology/react.tsx",
    'layoutPath': "_layout.tsx",
    'outputPath': "technology/react.html",
    'title': "React hooks test",
    'content': React.createElement(ReactHooksTest, { config: {
            branch: 'main',
            description: 'Shaper\'s Docs',
            exclude: [
                '**/.*',
                '**/package.json',
                '**/package-lock.json',
                '**/node_modules',
                'pagic.config.ts',
                'pagic.config.tsx',
                '**/config.gypi',
                '**/CVS',
                '**/npm-debug.log',
                'dist'
            ],
            github: 'https://github.com/ink-song/shapers.githup.io',
            include: undefined,
            nav: [
                {
                    link: '/shapers/introduction/index.html',
                    text: 'It\'s me'
                },
                {
                    align: 'right',
                    link: '/shapers/about/index.html',
                    text: 'About'
                }
            ],
            outDir: 'dist',
            plugins: [
                'clean',
                'init',
                'md',
                'tsx',
                'script',
                'layout',
                'out',
                'sidebar',
                'prev_next',
                'ga'
            ],
            port: 8000,
            root: '/shapers/',
            serve: false,
            sidebar: {
                '/': [
                    'introduction/README.md',
                    {
                        children: [
                            'technology/vue3.md'
                        ],
                        link: 'technology/README.md'
                    },
                    {
                        children: [
                            'life/guitar.md',
                            {
                                link: 'folder/bar.md',
                                text: ''
                            }
                        ],
                        text: 'Life'
                    }
                ]
            },
            srcDir: '.',
            theme: 'docs',
            title: 'Shaper\'s Docs',
            tools: {
                backToTop: true,
                editOnGitHub: true
            },
            watch: false
        }, content: null, head: null, layoutPath: "_layout.tsx", outputPath: "technology/react.html", pagePath: "technology/react.tsx", script: null, title: "React hooks test" }),
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/shapers/index.js", type: "module" })),
    'sidebar': [
        {
            "text": "Introduction",
            "link": "introduction/index.html",
            "pagePath": "introduction/README.md"
        },
        {
            "link": "technology/index.html",
            "children": [
                {
                    "text": "Vue3 + TypeScript",
                    "link": "technology/vue3.html",
                    "pagePath": "technology/vue3.md"
                }
            ],
            "pagePath": "technology/README.md",
            "text": "Technology"
        },
        {
            "text": "Life",
            "children": [
                {
                    "text": "Guitar",
                    "link": "life/guitar.html",
                    "pagePath": "life/guitar.md"
                },
                {
                    "text": "",
                    "link": "folder/bar.md"
                }
            ]
        }
    ]
};
