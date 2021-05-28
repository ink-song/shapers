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
            __html: '<h1>Btyedance</h1>\n<h3 id="http%E5%92%8Chttps"><a href="https://www.huaweicloud.com/articles/d81c7888a0713fca6141423cefb8661d.html">HTTP和HTTPS</a><a class="anchor" href="#http%E5%92%8Chttps">§</a></h3>\n<h4 id="http">HTTP<a class="anchor" href="#http">§</a></h4>\n<ul>\n<li>Hyper Text Transfer Protocol（超文本传输协议）</li>\n<li>客户端浏览器和web服务器之间的应用层通信协议</li>\n<li>所有的www文件都必须遵循这个标准</li>\n</ul>\n<h4 id="tcp%E5%92%8Cip">TCP和IP<a class="anchor" href="#tcp%E5%92%8Cip">§</a></h4>\n<ul>\n<li>tcp和udp协议是在传输层，，web以http协议作为应用层，以封装HTTP文本信息，然后使用TCP/IP作为传输层协议将他们发到网络上</li>\n<li>7层关系<img src="./7%E5%B1%82.png" alt="7层关系"></li>\n<li>TCP和UDP就像卡车，IP就像高速公路，HTTP就像卡车携带的货物</li>\n<li>从下至上来看，物理层-&gt; 数据链路层-&gt; 网络层-&gt; 传输层-&gt; 会话层-&gt; 表示层-&gt; 应用层</li>\n</ul>\n<h4 id="ssl%E5%92%8Ctsl">SSL和TSL<a class="anchor" href="#ssl%E5%92%8Ctsl">§</a></h4>\n<ul>\n<li>SSL：（Secure Sockets Layer 安全嵌套层），SSL协议分为两层： SSL 记录协议（SSL record protocol），它建立在可靠的传输协议上，例如TCP，为高层协议提供数据封装，压缩，加密等基本功能的支持； SSL 握手协议（SSL handleshake protocol），它建立在SSL 记录协议上，用于实际的传输前，通讯双方进行身份认证，协商加密，交换密钥等</li>\n<li>TSL：SSL的继任者传输层安全（Transport Layer Security）：为网络通信提供安全及数据完整性的安全协议，以及检验客户端和服务器是否安全。</li>\n<li>TSL和SSL在传输层对 网络进行加密，SSL在应用层和TCP层之间，应用层不再直接传输给传输层，而是传递给SSL层，SSL层从应用层收到的数据进行加密，并增加自己的SSL头</li>\n</ul>\n<h4 id="https">HTTPS<a class="anchor" href="#https">§</a></h4>\n<ul>\n<li>Hyper Text Transfor Protocol over Sercure Socket Layer（以目的为安全的HTTP通道），即HTTP的安全版，即HTTP加入了SSL层，HTTPS的安全基础是SSL，因此加密的信息就需要SSL</li>\n</ul>\n<h5 id="https%E5%92%8Chttp%E5%8C%BA%E5%88%AB">HTTPS和HTTP区别<a class="anchor" href="#https%E5%92%8Chttp%E5%8C%BA%E5%88%AB">§</a></h5>\n<ul>\n<li>HTTP协议是以明文方式发送内容，不提供任何方式的数据加密。HTTPS在HTTP协议的基础上，加入了SSL协议，SSL依靠证书来验证服务的身份，并为浏览器和服务器之间的通信加密。</li>\n<li>HTTPS的主要作用：\n<ul>\n<li>对数据进行加密，并建立一条信息安全通道，来保证传输过程中的数据安全</li>\n<li>对网站服务器进行真实身份识别</li>\n</ul>\n</li>\n<li>HTTPS和HTTP主要区别\n<ul>\n<li>HTTPS需要到ca申请证书，一般免费证书很少</li>\n<li>HTTP是超文本传输协议，是明文传输。HTTPS则是具有安全性的SSL加密传输协议</li>\n<li>HTTP和HTTPS使用的链接方式不同，HTTP常用的是80端口，HTTPS为443</li>\n</ul>\n</li>\n</ul>\n<h3 id="%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3%E8%B7%A8%E5%9F%9F">如何解决跨域<a class="anchor" href="#%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3%E8%B7%A8%E5%9F%9F">§</a></h3>\n<h4 id="%E4%BB%80%E4%B9%88%E6%98%AF%E8%B7%A8%E5%9F%9F-%E4%B8%80%E4%B8%AA%E5%9F%9F%E4%B8%8B%E7%9A%84%E8%84%9A%E6%9C%AC%E6%88%96%E6%96%87%E6%A1%A3%E6%83%B3%E5%8E%BB%E8%AE%BF%E9%97%AE%E5%8F%A6%E4%B8%80%E4%B8%AA%E5%9F%9F%E7%9A%84%E8%B5%84%E6%BA%90%E8%BF%99%E9%87%8C%E7%9A%84%E8%B7%A8%E5%9F%9F%E6%98%AF%E5%B9%BF%E4%B9%89%E7%9A%84">什么是跨域： 一个域下的脚本或文档想去访问另一个域的资源，这里的跨域是广义的。<a class="anchor" href="#%E4%BB%80%E4%B9%88%E6%98%AF%E8%B7%A8%E5%9F%9F-%E4%B8%80%E4%B8%AA%E5%9F%9F%E4%B8%8B%E7%9A%84%E8%84%9A%E6%9C%AC%E6%88%96%E6%96%87%E6%A1%A3%E6%83%B3%E5%8E%BB%E8%AE%BF%E9%97%AE%E5%8F%A6%E4%B8%80%E4%B8%AA%E5%9F%9F%E7%9A%84%E8%B5%84%E6%BA%90%E8%BF%99%E9%87%8C%E7%9A%84%E8%B7%A8%E5%9F%9F%E6%98%AF%E5%B9%BF%E4%B9%89%E7%9A%84">§</a></h4>\n<h4 id="%E4%BB%80%E4%B9%88%E6%98%AF%E5%B9%BF%E4%B9%89%E7%9A%84%E8%B7%A8%E5%9F%9F">什么是广义的跨域<a class="anchor" href="#%E4%BB%80%E4%B9%88%E6%98%AF%E5%B9%BF%E4%B9%89%E7%9A%84%E8%B7%A8%E5%9F%9F">§</a></h4>\n<ul>\n<li>资源跳转（a链接，重定向，表单提交）</li>\n<li>资源嵌入（&lt; link&gt;,&lt; iframe&gt;&lt; script&gt;,background: url之类的文件外链）</li>\n<li>脚本请求：js发起的ajax请求，dom和js的跨域操作等</li>\n<li>其实我们所说的跨域都是狭义下的跨域，是由浏览器同源策略下限制的一类请求</li>\n</ul>\n<h4 id="%E5%90%8C%E6%BA%90%E7%AD%96%E7%95%A5sop-same-origin-policy">同源策略（SOP same origin policy）<a class="anchor" href="#%E5%90%8C%E6%BA%90%E7%AD%96%E7%95%A5sop-same-origin-policy">§</a></h4>\n<ul>\n<li>是一种约定：指协议+域名+端口三者相同，即使两个不同的域名指向同一个ip地址，也不是同源。它是浏览器最核心也是最基本的安全功能，如果缺少同源策略，浏览器很容易受到XSS，CSFR的攻击。</li>\n<li>同源策略限制后的几种行为\n<ul>\n<li>localStorage,cooike,indexDB无法获取</li>\n<li>DOM和js对象无法获取</li>\n<li>AJAX请求无法发送</li>\n</ul>\n</li>\n</ul>\n<h4 id="%E5%B8%B8%E8%A7%81%E7%9A%84%E8%B7%A8%E5%9F%9F%E5%9C%BA%E6%99%AF">常见的跨域场景<img src="./%E5%B8%B8%E8%A7%81%E8%B7%A8%E5%9F%9F%E6%83%85%E6%99%AF.png" alt="常见的跨域场景"><a class="anchor" href="#%E5%B8%B8%E8%A7%81%E7%9A%84%E8%B7%A8%E5%9F%9F%E5%9C%BA%E6%99%AF">§</a></h4>\n<h4 id="%E5%B8%B8%E8%A7%81%E7%9A%84%E8%B7%A8%E5%9F%9F%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88">常见的跨域解决方案<a class="anchor" href="#%E5%B8%B8%E8%A7%81%E7%9A%84%E8%B7%A8%E5%9F%9F%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88">§</a></h4>\n<ul>\n<li>1.JSONP跨域：\n<ul>\n<li>原理：通常为了减轻web服务器的负载压力，我们将js，img，css等静态资源分离到另一台独立域名的服务器上，在html页面中再通过相应的标签从不同的域名加载静态资源，而被浏览器允许，基于此原理，我们可以动态创建script，再请求一个带参网址实现跨域。</li>\n<li>原生实现：\n<ul>\n<li>前端</li>\n</ul>\n<pre class="language-autoit"><code class="language-autoit"><span class="token operator">&lt;</span>script<span class="token operator">></span>\nvar script <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">\'script\'</span><span class="token punctuation">)</span><span class="token comment">;</span>\nscript<span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token string">\'text/javascript\'</span><span class="token comment">;</span>\n\n<span class="token operator">/</span><span class="token operator">/</span> 传参一个回调函数名给后端，方便后端返回时执行这个在前端定义的回调函数\nscript<span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token string">\'<a class="token url-link" href="http://www.domain2.com:8080/login?user=admin&amp;callback=handleCallback\'">http://www.domain2.com:8080/login?user=admin&amp;callback=handleCallback\'</a></span><span class="token comment">;</span>\ndocument<span class="token punctuation">.</span>head<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>script<span class="token punctuation">)</span><span class="token comment">;</span>\n\n<span class="token operator">/</span><span class="token operator">/</span> 回调执行函数\nfunction <span class="token function">handleCallback</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span> {\n    <span class="token function">alert</span><span class="token punctuation">(</span>JSON<span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token comment">;</span>\n}\n<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>\n</code></pre>\n<ul>\n<li>服务端返回如下（返回时即执行全局函数）：</li>\n</ul>\n<pre class="language-autoit"><code class="language-autoit"><span class="token function">handleCallback</span><span class="token punctuation">(</span>{<span class="token string">"status"</span><span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token string">"user"</span><span class="token punctuation">:</span> <span class="token string">"admin"</span>}<span class="token punctuation">)</span>\n</code></pre>\n</li>\n</ul>\n</li>\n</ul>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement("link", { crossOrigin: "anonymous", href: "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css", integrity: "sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X", rel: "stylesheet" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "Btyedance"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h3 id="http%E5%92%8Chttps"><a href="https://www.huaweicloud.com/articles/d81c7888a0713fca6141423cefb8661d.html">HTTP和HTTPS</a><a class="anchor" href="#http%E5%92%8Chttps">§</a></h3>\n<h4 id="http">HTTP<a class="anchor" href="#http">§</a></h4>\n<ul>\n<li>Hyper Text Transfer Protocol（超文本传输协议）</li>\n<li>客户端浏览器和web服务器之间的应用层通信协议</li>\n<li>所有的www文件都必须遵循这个标准</li>\n</ul>\n<h4 id="tcp%E5%92%8Cip">TCP和IP<a class="anchor" href="#tcp%E5%92%8Cip">§</a></h4>\n<ul>\n<li>tcp和udp协议是在传输层，，web以http协议作为应用层，以封装HTTP文本信息，然后使用TCP/IP作为传输层协议将他们发到网络上</li>\n<li>7层关系<img src="./7%E5%B1%82.png" alt="7层关系"></li>\n<li>TCP和UDP就像卡车，IP就像高速公路，HTTP就像卡车携带的货物</li>\n<li>从下至上来看，物理层-&gt; 数据链路层-&gt; 网络层-&gt; 传输层-&gt; 会话层-&gt; 表示层-&gt; 应用层</li>\n</ul>\n<h4 id="ssl%E5%92%8Ctsl">SSL和TSL<a class="anchor" href="#ssl%E5%92%8Ctsl">§</a></h4>\n<ul>\n<li>SSL：（Secure Sockets Layer 安全嵌套层），SSL协议分为两层： SSL 记录协议（SSL record protocol），它建立在可靠的传输协议上，例如TCP，为高层协议提供数据封装，压缩，加密等基本功能的支持； SSL 握手协议（SSL handleshake protocol），它建立在SSL 记录协议上，用于实际的传输前，通讯双方进行身份认证，协商加密，交换密钥等</li>\n<li>TSL：SSL的继任者传输层安全（Transport Layer Security）：为网络通信提供安全及数据完整性的安全协议，以及检验客户端和服务器是否安全。</li>\n<li>TSL和SSL在传输层对 网络进行加密，SSL在应用层和TCP层之间，应用层不再直接传输给传输层，而是传递给SSL层，SSL层从应用层收到的数据进行加密，并增加自己的SSL头</li>\n</ul>\n<h4 id="https">HTTPS<a class="anchor" href="#https">§</a></h4>\n<ul>\n<li>Hyper Text Transfor Protocol over Sercure Socket Layer（以目的为安全的HTTP通道），即HTTP的安全版，即HTTP加入了SSL层，HTTPS的安全基础是SSL，因此加密的信息就需要SSL</li>\n</ul>\n<h5 id="https%E5%92%8Chttp%E5%8C%BA%E5%88%AB">HTTPS和HTTP区别<a class="anchor" href="#https%E5%92%8Chttp%E5%8C%BA%E5%88%AB">§</a></h5>\n<ul>\n<li>HTTP协议是以明文方式发送内容，不提供任何方式的数据加密。HTTPS在HTTP协议的基础上，加入了SSL协议，SSL依靠证书来验证服务的身份，并为浏览器和服务器之间的通信加密。</li>\n<li>HTTPS的主要作用：\n<ul>\n<li>对数据进行加密，并建立一条信息安全通道，来保证传输过程中的数据安全</li>\n<li>对网站服务器进行真实身份识别</li>\n</ul>\n</li>\n<li>HTTPS和HTTP主要区别\n<ul>\n<li>HTTPS需要到ca申请证书，一般免费证书很少</li>\n<li>HTTP是超文本传输协议，是明文传输。HTTPS则是具有安全性的SSL加密传输协议</li>\n<li>HTTP和HTTPS使用的链接方式不同，HTTP常用的是80端口，HTTPS为443</li>\n</ul>\n</li>\n</ul>\n<h3 id="%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3%E8%B7%A8%E5%9F%9F">如何解决跨域<a class="anchor" href="#%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3%E8%B7%A8%E5%9F%9F">§</a></h3>\n<h4 id="%E4%BB%80%E4%B9%88%E6%98%AF%E8%B7%A8%E5%9F%9F-%E4%B8%80%E4%B8%AA%E5%9F%9F%E4%B8%8B%E7%9A%84%E8%84%9A%E6%9C%AC%E6%88%96%E6%96%87%E6%A1%A3%E6%83%B3%E5%8E%BB%E8%AE%BF%E9%97%AE%E5%8F%A6%E4%B8%80%E4%B8%AA%E5%9F%9F%E7%9A%84%E8%B5%84%E6%BA%90%E8%BF%99%E9%87%8C%E7%9A%84%E8%B7%A8%E5%9F%9F%E6%98%AF%E5%B9%BF%E4%B9%89%E7%9A%84">什么是跨域： 一个域下的脚本或文档想去访问另一个域的资源，这里的跨域是广义的。<a class="anchor" href="#%E4%BB%80%E4%B9%88%E6%98%AF%E8%B7%A8%E5%9F%9F-%E4%B8%80%E4%B8%AA%E5%9F%9F%E4%B8%8B%E7%9A%84%E8%84%9A%E6%9C%AC%E6%88%96%E6%96%87%E6%A1%A3%E6%83%B3%E5%8E%BB%E8%AE%BF%E9%97%AE%E5%8F%A6%E4%B8%80%E4%B8%AA%E5%9F%9F%E7%9A%84%E8%B5%84%E6%BA%90%E8%BF%99%E9%87%8C%E7%9A%84%E8%B7%A8%E5%9F%9F%E6%98%AF%E5%B9%BF%E4%B9%89%E7%9A%84">§</a></h4>\n<h4 id="%E4%BB%80%E4%B9%88%E6%98%AF%E5%B9%BF%E4%B9%89%E7%9A%84%E8%B7%A8%E5%9F%9F">什么是广义的跨域<a class="anchor" href="#%E4%BB%80%E4%B9%88%E6%98%AF%E5%B9%BF%E4%B9%89%E7%9A%84%E8%B7%A8%E5%9F%9F">§</a></h4>\n<ul>\n<li>资源跳转（a链接，重定向，表单提交）</li>\n<li>资源嵌入（&lt; link&gt;,&lt; iframe&gt;&lt; script&gt;,background: url之类的文件外链）</li>\n<li>脚本请求：js发起的ajax请求，dom和js的跨域操作等</li>\n<li>其实我们所说的跨域都是狭义下的跨域，是由浏览器同源策略下限制的一类请求</li>\n</ul>\n<h4 id="%E5%90%8C%E6%BA%90%E7%AD%96%E7%95%A5sop-same-origin-policy">同源策略（SOP same origin policy）<a class="anchor" href="#%E5%90%8C%E6%BA%90%E7%AD%96%E7%95%A5sop-same-origin-policy">§</a></h4>\n<ul>\n<li>是一种约定：指协议+域名+端口三者相同，即使两个不同的域名指向同一个ip地址，也不是同源。它是浏览器最核心也是最基本的安全功能，如果缺少同源策略，浏览器很容易受到XSS，CSFR的攻击。</li>\n<li>同源策略限制后的几种行为\n<ul>\n<li>localStorage,cooike,indexDB无法获取</li>\n<li>DOM和js对象无法获取</li>\n<li>AJAX请求无法发送</li>\n</ul>\n</li>\n</ul>\n<h4 id="%E5%B8%B8%E8%A7%81%E7%9A%84%E8%B7%A8%E5%9F%9F%E5%9C%BA%E6%99%AF">常见的跨域场景<img src="./%E5%B8%B8%E8%A7%81%E8%B7%A8%E5%9F%9F%E6%83%85%E6%99%AF.png" alt="常见的跨域场景"><a class="anchor" href="#%E5%B8%B8%E8%A7%81%E7%9A%84%E8%B7%A8%E5%9F%9F%E5%9C%BA%E6%99%AF">§</a></h4>\n<h4 id="%E5%B8%B8%E8%A7%81%E7%9A%84%E8%B7%A8%E5%9F%9F%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88">常见的跨域解决方案<a class="anchor" href="#%E5%B8%B8%E8%A7%81%E7%9A%84%E8%B7%A8%E5%9F%9F%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88">§</a></h4>\n<ul>\n<li>1.JSONP跨域：\n<ul>\n<li>原理：通常为了减轻web服务器的负载压力，我们将js，img，css等静态资源分离到另一台独立域名的服务器上，在html页面中再通过相应的标签从不同的域名加载静态资源，而被浏览器允许，基于此原理，我们可以动态创建script，再请求一个带参网址实现跨域。</li>\n<li>原生实现：\n<ul>\n<li>前端</li>\n</ul>\n<pre class="language-autoit"><code class="language-autoit"><span class="token operator">&lt;</span>script<span class="token operator">></span>\nvar script <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">\'script\'</span><span class="token punctuation">)</span><span class="token comment">;</span>\nscript<span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token string">\'text/javascript\'</span><span class="token comment">;</span>\n\n<span class="token operator">/</span><span class="token operator">/</span> 传参一个回调函数名给后端，方便后端返回时执行这个在前端定义的回调函数\nscript<span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token string">\'<a class="token url-link" href="http://www.domain2.com:8080/login?user=admin&amp;callback=handleCallback\'">http://www.domain2.com:8080/login?user=admin&amp;callback=handleCallback\'</a></span><span class="token comment">;</span>\ndocument<span class="token punctuation">.</span>head<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>script<span class="token punctuation">)</span><span class="token comment">;</span>\n\n<span class="token operator">/</span><span class="token operator">/</span> 回调执行函数\nfunction <span class="token function">handleCallback</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span> {\n    <span class="token function">alert</span><span class="token punctuation">(</span>JSON<span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token comment">;</span>\n}\n<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>\n</code></pre>\n<ul>\n<li>服务端返回如下（返回时即执行全局函数）：</li>\n</ul>\n<pre class="language-autoit"><code class="language-autoit"><span class="token function">handleCallback</span><span class="token punctuation">(</span>{<span class="token string">"status"</span><span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token string">"user"</span><span class="token punctuation">:</span> <span class="token string">"admin"</span>}<span class="token punctuation">)</span>\n</code></pre>\n</li>\n</ul>\n</li>\n</ul>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#http%E5%92%8Chttps" }, "HTTP\u548CHTTPS"),
                React.createElement("ol", null)),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3%E8%B7%A8%E5%9F%9F" }, "\u5982\u4F55\u89E3\u51B3\u8DE8\u57DF"),
                React.createElement("ol", null)))),
    'author': "shaper",
    'contributors': [
        "shaper"
    ],
    'date': "2021-05-27T08:55:28.000Z",
    'updated': "2021-05-28T13:26:11.000Z",
    'excerpt': "HTTP和HTTPS HTTP - Hyper Text Transfer Protocol（超文本传输协议） - 客户端浏览器和web服务器之间的应用层通信协议 - 所有的www文件都必须遵循这个标准 TCP和IP - tcp和udp协议是在传输层，，web以http协议作为应用层，以封...",
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
