# Btyedance

 ### [HTTP和HTTPS](https://www.huaweicloud.com/articles/d81c7888a0713fca6141423cefb8661d.html)
   + HTTP
     + Hyper Text Transfer Protocol（超文本传输协议）
     + 客户端浏览器和web服务器之间的应用层通信协议
     + 所有的www文件都必须遵循这个标准
   + TCP和IP
     + tcp和udp协议是在传输层，，web以http协议作为应用层，以封装HTTP文本信息，然后使用TCP/IP作为传输层协议将他们发到网络上
     + 7层关系![7层关系](./7层.png)
     + TCP和UDP就像卡车，IP就像高速公路，HTTP就像卡车携带的货物
     + 从下至上来看，物理层-> 数据链路层-> 网络层-> 传输层-> 会话层-> 表示层-> 应用层
   + SSL和TSL
     + SSL：（Secure Sockets Layer 安全嵌套层），SSL协议分为两层： SSL 记录协议（SSL record protocol），它建立在可靠的传输协议上，例如TCP，为高层协议提供数据封装，压缩，加密等基本功能的支持； SSL 握手协议（SSL handleshake protocol），它建立在SSL 记录协议上，用于实际的传输前，通讯双方进行身份认证，协商加密，交换密钥等
     + TSL：SSL的继任者传输层安全（Transport Layer Security）：为网络通信提供安全及数据完整性的安全协议，以及检验客户端和服务器是否安全。
     + TSL和SSL在传输层对 网络进行加密，SSL在应用层和TCP层之间，应用层不再直接传输给传输层，而是传递给SSL层，SSL层从应用层收到的数据进行加密，并增加自己的SSL头
   + HTTPS
     + Hyper Text Transfor Protocol over Sercure Socket Layer（以目的为安全的HTTP通道），即HTTP的安全版，即HTTP加入了SSL层，HTTPS的安全基础是SSL，因此加密的信息就需要SSL
  + HTTPS和HTTP区别
     + HTTP协议是以明文方式发送内容，不提供任何方式的数据加密。HTTPS在HTTP协议的基础上，加入了SSL协议，SSL依靠证书来验证服务的身份，并为浏览器和服务器之间的通信加密。
     + HTTPS的主要作用： 
       + 对数据进行加密，并建立一条信息安全通道，来保证传输过程中的数据安全
       + 对网站服务器进行真实身份识别
     + HTTPS和HTTP主要区别
       + HTTPS需要到ca申请证书，一般免费证书很少
       + HTTP是超文本传输协议，是明文传输。HTTPS则是具有安全性的SSL加密传输协议
       + HTTP和HTTPS使用的链接方式不同，HTTP常用的是80端口，HTTPS为443