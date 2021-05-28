import projectConfig from '/pagic.config.js';
export default {
    'prev': {
        "text": "Guitar",
        "link": "life/guitar.html"
    },
    'next': {
        "text": "",
        "link": "interview/btyedance.html"
    },
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "interview/btyedance.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "interview/btyedance.html",
    'title': "Btyedance",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>Btyedance</h1>\n<h3 id="http%E5%92%8Chttps"><a href="https://www.huaweicloud.com/articles/d81c7888a0713fca6141423cefb8661d.html">HTTP和HTTPS</a><a class="anchor" href="#http%E5%92%8Chttps">§</a></h3>\n<ul>\n<li>HTTP\n<ul>\n<li>Hyper Text Transfer Protocol（超文本传输协议）</li>\n<li>客户端浏览器和web服务器之间的应用层通信协议</li>\n<li>所有的www文件都必须遵循这个标准</li>\n</ul>\n</li>\n<li>TCP和IP\n<ul>\n<li>tcp和udp协议是在传输层，，web以http协议作为应用层，以封装HTTP文本信息，然后使用TCP/IP作为传输层协议将他们发到网络上</li>\n<li>7层关系<img src="./7%E5%B1%82.png" alt="7层关系"></li>\n<li>TCP和UDP就像卡车，IP就像高速公路，HTTP就像卡车携带的货物</li>\n<li>从下至上来看，物理层-&gt; 数据链路层-&gt; 网络层-&gt; 传输层-&gt; 会话层-&gt; 表示层-&gt; 应用层</li>\n</ul>\n</li>\n<li>SSL和TSL\n<ul>\n<li>SSL：（Secure Sockets Layer 安全嵌套层），SSL协议分为两层： SSL 记录协议（SSL record protocol），它建立在可靠的传输协议上，例如TCP，为高层协议提供数据封装，压缩，加密等基本功能的支持； SSL 握手协议（SSL handleshake protocol），它建立在SSL 记录协议上，用于实际的传输前，通讯双方进行身份认证，协商加密，交换密钥等</li>\n<li>TSL：SSL的继任者传输层安全（Transport Layer Security）：为网络通信提供安全及数据完整性的安全协议，以及检验客户端和服务器是否安全。</li>\n<li>TSL和SSL在传输层对 网络进行加密，SSL在应用层和TCP层之间，应用层不再直接传输给传输层，而是传递给SSL层，SSL层从应用层收到的数据进行加密，并增加自己的SSL头</li>\n</ul>\n</li>\n<li>HTTPS\n<ul>\n<li>Hyper Text Transfor Protocol over Sercure Socket Layer（以目的为安全的HTTP通道），即HTTP的安全版，即HTTP加入了SSL层，HTTPS的安全基础是SSL，因此加密的信息就需要SSL</li>\n</ul>\n</li>\n<li>HTTPS和HTTP区别\n<ul>\n<li>HTTP协议是以明文方式发送内容，不提供任何方式的数据加密。HTTPS在HTTP协议的基础上，加入了SSL协议，SSL依靠证书来验证服务的身份，并为浏览器和服务器之间的通信加密。</li>\n<li>HTTPS的主要作用：\n<ul>\n<li>对数据进行加密，并建立一条信息安全通道，来保证传输过程中的数据安全</li>\n<li>对网站服务器进行真实身份识别</li>\n</ul>\n</li>\n<li>HTTPS和HTTP主要区别\n<ul>\n<li>HTTPS需要到ca申请证书，一般免费证书很少</li>\n<li>HTTP是超文本传输协议，是明文传输。HTTPS则是具有安全性的SSL加密传输协议</li>\n<li>HTTP和HTTPS使用的链接方式不同，HTTP常用的是80端口，HTTPS为443</li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement("link", { crossOrigin: "anonymous", href: "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css", integrity: "sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X", rel: "stylesheet" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "Btyedance"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h3 id="http%E5%92%8Chttps"><a href="https://www.huaweicloud.com/articles/d81c7888a0713fca6141423cefb8661d.html">HTTP和HTTPS</a><a class="anchor" href="#http%E5%92%8Chttps">§</a></h3>\n<ul>\n<li>HTTP\n<ul>\n<li>Hyper Text Transfer Protocol（超文本传输协议）</li>\n<li>客户端浏览器和web服务器之间的应用层通信协议</li>\n<li>所有的www文件都必须遵循这个标准</li>\n</ul>\n</li>\n<li>TCP和IP\n<ul>\n<li>tcp和udp协议是在传输层，，web以http协议作为应用层，以封装HTTP文本信息，然后使用TCP/IP作为传输层协议将他们发到网络上</li>\n<li>7层关系<img src="./7%E5%B1%82.png" alt="7层关系"></li>\n<li>TCP和UDP就像卡车，IP就像高速公路，HTTP就像卡车携带的货物</li>\n<li>从下至上来看，物理层-&gt; 数据链路层-&gt; 网络层-&gt; 传输层-&gt; 会话层-&gt; 表示层-&gt; 应用层</li>\n</ul>\n</li>\n<li>SSL和TSL\n<ul>\n<li>SSL：（Secure Sockets Layer 安全嵌套层），SSL协议分为两层： SSL 记录协议（SSL record protocol），它建立在可靠的传输协议上，例如TCP，为高层协议提供数据封装，压缩，加密等基本功能的支持； SSL 握手协议（SSL handleshake protocol），它建立在SSL 记录协议上，用于实际的传输前，通讯双方进行身份认证，协商加密，交换密钥等</li>\n<li>TSL：SSL的继任者传输层安全（Transport Layer Security）：为网络通信提供安全及数据完整性的安全协议，以及检验客户端和服务器是否安全。</li>\n<li>TSL和SSL在传输层对 网络进行加密，SSL在应用层和TCP层之间，应用层不再直接传输给传输层，而是传递给SSL层，SSL层从应用层收到的数据进行加密，并增加自己的SSL头</li>\n</ul>\n</li>\n<li>HTTPS\n<ul>\n<li>Hyper Text Transfor Protocol over Sercure Socket Layer（以目的为安全的HTTP通道），即HTTP的安全版，即HTTP加入了SSL层，HTTPS的安全基础是SSL，因此加密的信息就需要SSL</li>\n</ul>\n</li>\n<li>HTTPS和HTTP区别\n<ul>\n<li>HTTP协议是以明文方式发送内容，不提供任何方式的数据加密。HTTPS在HTTP协议的基础上，加入了SSL协议，SSL依靠证书来验证服务的身份，并为浏览器和服务器之间的通信加密。</li>\n<li>HTTPS的主要作用：\n<ul>\n<li>对数据进行加密，并建立一条信息安全通道，来保证传输过程中的数据安全</li>\n<li>对网站服务器进行真实身份识别</li>\n</ul>\n</li>\n<li>HTTPS和HTTP主要区别\n<ul>\n<li>HTTPS需要到ca申请证书，一般免费证书很少</li>\n<li>HTTP是超文本传输协议，是明文传输。HTTPS则是具有安全性的SSL加密传输协议</li>\n<li>HTTP和HTTPS使用的链接方式不同，HTTP常用的是80端口，HTTPS为443</li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#http%E5%92%8Chttps" }, "HTTP\u548CHTTPS")))),
    'author': "shaper",
    'contributors': [
        "shaper"
    ],
    'date': "2021-05-27T08:55:28.000Z",
    'updated': "2021-05-28T01:23:24.000Z",
    'excerpt': "HTTP和HTTPS - HTTP - Hyper Text Transfer Protocol（超文本传输协议） - 客户端浏览器和web服务器之间的应用层通信协议 - 所有的www文件都必须遵循这个标准 - TCP和IP - tcp和udp协议是在传输层，，web以http协议作为应用层，...",
    'cover': "./7层.png",
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
                    "text": "Btyedance",
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
