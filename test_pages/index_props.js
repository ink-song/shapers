import projectConfig from '/shapers/pagic.config.js';
export default {
    'prev': {
        "text": "Introduction",
        "link": "introduction/index.html"
    },
    'next': {
        "text": "Markdown test",
        "link": "test_pages/markdown_test.html"
    },
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "test_pages/README.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "test_pages/index.html",
    'title': "Vue3 + Ts",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>Vue3 + Ts</h1>\n<p>The test pages.</p>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement("link", { crossOrigin: "anonymous", href: "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css", integrity: "sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X", rel: "stylesheet" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/shapers/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "Vue3 + Ts"),
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
    'updated': "2021-03-20T02:45:43.000Z",
    'excerpt': "The test pages.",
    'cover': undefined,
    'sidebar': [
        {
            "text": "Introduction",
            "link": "introduction/index.html",
            "pagePath": "introduction/README.md"
        },
        {
            "link": "test_pages/index.html",
            "children": [
                {
                    "text": "Markdown test",
                    "link": "test_pages/markdown_test.html",
                    "pagePath": "test_pages/markdown_test.md"
                },
                {
                    "text": "Front matter test",
                    "link": "test_pages/front_matter_test.html",
                    "pagePath": "test_pages/front_matter.md"
                },
                {
                    "text": "React hooks test",
                    "link": "test_pages/react_hooks_test.html",
                    "pagePath": "test_pages/react_hooks_test.tsx"
                }
            ],
            "pagePath": "test_pages/README.md",
            "text": "Vue3 + Ts"
        },
        {
            "text": "Folder",
            "children": [
                {
                    "text": "Foo",
                    "link": "folder/foo.html",
                    "pagePath": "folder/foo.md"
                },
                {
                    "text": "Custom sidebar text",
                    "link": "folder/bar.html",
                    "pagePath": "folder/bar.md"
                }
            ]
        }
    ]
};
