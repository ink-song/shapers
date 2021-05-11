import projectConfig from '/shapers/pagic.config.js';
export default {
    'prev': undefined,
    'next': undefined,
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "README.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "index.html",
    'title': undefined,
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p><img src="./images/tobeaman.png" alt="to be a man"></p>\n<pre><code>风吹落枯叶，枯叶滋养土壤，肥沃的土壤帮助果实，缓慢而坚定的生长\n</code></pre>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement("link", { crossOrigin: "anonymous", href: "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css", integrity: "sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X", rel: "stylesheet" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/shapers/index.js", type: "module" })),
    'contentTitle': undefined,
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p><img src="./images/tobeaman.png" alt="to be a man"></p>\n<pre><code>风吹落枯叶，枯叶滋养土壤，肥沃的土壤帮助果实，缓慢而坚定的生长\n</code></pre>'
        } }),
    'toc': null,
    'author': "ink-song",
    'contributors': [
        "ink-song",
        "shaper"
    ],
    'date': "2021-03-05T01:33:36.000Z",
    'updated': "2021-05-11T07:58:55.000Z",
    'excerpt': "风吹落枯叶，枯叶滋养土壤，肥沃的土壤帮助果实，缓慢而坚定的生长 ",
    'cover': "./images/tobeaman.png",
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
            "text": "Study",
            "children": [
                {
                    "text": "How We Learn",
                    "link": "study/HowWeLearn.html",
                    "pagePath": "study/HowWeLearn.md"
                },
                {
                    "text": "",
                    "link": "folder/bar.md"
                }
            ]
        }
    ]
};
