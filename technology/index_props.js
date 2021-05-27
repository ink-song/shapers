import projectConfig from '/pagic.config.js';
export default {
    'prev': {
        "text": "Introduction",
        "link": "introduction/index.html"
    },
    'next': {
        "text": "Vue3 + TypeScript",
        "link": "technology/vue3.html"
    },
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "technology/README.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "technology/index.html",
    'title': "Technology",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>Technology</h1>\n<p>The test pages.</p>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement("link", { crossOrigin: "anonymous", href: "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css", integrity: "sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X", rel: "stylesheet" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "Technology"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>The test pages.</p>'
        } }),
    'toc': null,
    'author': "ink-song",
    'contributors': [
        "ink-song",
        "shaper"
    ],
    'date': "2021-03-05T01:33:36.000Z",
    'updated': "2021-03-21T01:49:46.000Z",
    'excerpt': "The test pages.",
    'cover': undefined,
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
        },
        {
            "text": "Interview",
            "children": [
                {
                    "text": "字节跳动面试进阶",
                    "link": "interview/btyedance.html",
                    "pagePath": "interview/btyedance.md"
                },
                {
                    "text": "",
                    "link": "interview/btyedance.html",
                    "pagePath": "interview/btyedance.md"
                }
            ]
        },
        {
            "text": "Study",
            "children": [
                {
                    "text": "How We Learn",
                    "link": "study/HowWeLearn.html",
                    "pagePath": "study/HowWeLearn.md"
                },
                {
                    "text": "",
                    "link": "study/HowWeLearn.html",
                    "pagePath": "study/HowWeLearn.md"
                }
            ]
        }
    ]
};
