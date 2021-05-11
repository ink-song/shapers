import projectConfig from '/pagic.config.js';
export default {
    'prev': {
        "text": "Guitar",
        "link": "life/guitar.html"
    },
    'next': undefined,
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "study/HowWeLearn.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "study/HowWeLearn.html",
    'title': "How We Learn",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>How We Learn</h1>\n<h3 id="1%E4%BB%80%E4%B9%88%E6%98%AF%E5%AD%A6%E4%B9%A0">1.什么是学习<a class="anchor" href="#1%E4%BB%80%E4%B9%88%E6%98%AF%E5%AD%A6%E4%B9%A0">§</a></h3>\n<h4 id="%E5%AD%A6%E4%B9%A0-%E5%9C%A8%E6%9C%89%E9%99%90%E7%9A%84%E4%BE%8B%E5%AD%90%E4%B8%AD%E6%89%BE%E5%87%BA%E9%97%AE%E9%A2%98%E5%92%8C%E7%AD%94%E6%A1%88%E4%B9%8B%E9%97%B4%E8%A7%84%E5%BE%8B%E7%9A%84%E8%BF%87%E7%A8%8B">学习： 在有限的例子中，找出问题和答案之间规律的过程<a class="anchor" href="#%E5%AD%A6%E4%B9%A0-%E5%9C%A8%E6%9C%89%E9%99%90%E7%9A%84%E4%BE%8B%E5%AD%90%E4%B8%AD%E6%89%BE%E5%87%BA%E9%97%AE%E9%A2%98%E5%92%8C%E7%AD%94%E6%A1%88%E4%B9%8B%E9%97%B4%E8%A7%84%E5%BE%8B%E7%9A%84%E8%BF%87%E7%A8%8B">§</a></h4>\n<h4 id="%E7%9F%A5%E8%AF%86-%E6%89%80%E6%89%BE%E5%87%BA%E6%9D%A5%E7%9A%84%E8%A7%84%E5%BE%8B%E5%B0%B1%E6%98%AF%E7%9F%A5%E8%AF%86">知识： 所找出来的规律就是知识。<a class="anchor" href="#%E7%9F%A5%E8%AF%86-%E6%89%80%E6%89%BE%E5%87%BA%E6%9D%A5%E7%9A%84%E8%A7%84%E5%BE%8B%E5%B0%B1%E6%98%AF%E7%9F%A5%E8%AF%86">§</a></h4>\n<ul>\n<li>如果你没有办法描述你的知识，那你就没有真正学会它，因为学习就是在用知识压缩原本无限的信息</li>\n</ul>\n<h3 id="2%E6%8A%8A%E4%B9%A6%E8%AF%BB%E8%96%84">2.把书读薄<a class="anchor" href="#2%E6%8A%8A%E4%B9%A6%E8%AF%BB%E8%96%84">§</a></h3>\n<h4 id="%E5%AD%A6%E4%B9%A0%E7%9A%84%E7%AC%AC%E4%B8%80%E6%AD%A5-%E6%98%8E%E7%99%BD%E4%BB%80%E4%B9%88%E6%98%AF%E9%97%AE%E9%A2%98%E4%BB%80%E4%B9%88%E6%98%AF%E9%97%AE%E9%A2%98%E7%9A%84%E7%AD%94%E6%A1%88-%E6%9C%89%E4%BA%9B%E4%BA%BA%E5%8E%8B%E6%A0%B9%E4%B8%8D%E7%9F%A5%E9%81%93%E4%BB%80%E4%B9%88%E6%98%AF%E9%97%AE%E9%A2%98%E7%9A%84%E7%AD%94%E6%A1%88%E5%8F%AA%E8%AE%B0%E4%BD%8F%E4%BA%86%E7%9F%A5%E8%AF%86%E7%9A%84%E6%8F%8F%E8%BF%B0-%E7%84%B6%E8%80%8C%E7%9F%A5%E8%AF%86%E4%B8%8D%E6%98%AF%E4%BF%A1%E6%81%AF%E5%AD%A6%E4%B9%A0%E4%B8%8D%E6%98%AF%E8%AE%B0%E5%BF%86%E8%BF%99%E4%B9%9F%E6%98%AF%E4%BA%BA%E4%BB%AC%E5%9C%A8%E6%95%99%E4%B8%8E%E5%AD%A6%E7%9A%84%E8%BF%87%E7%A8%8B%E5%B8%B8%E9%81%87%E5%88%B0%E7%9A%84%E9%97%AE%E9%A2%98%E4%BB%A5%E4%B8%BA%E6%8A%8A%E7%9F%A5%E8%AF%86%E5%91%8A%E8%AF%89%E4%BA%86%E6%9F%90%E4%BA%BA%E5%AF%B9%E6%96%B9%E5%B0%B1%E5%B0%B1%E5%8F%AF%E4%BB%A5%E5%AD%A6%E4%BC%9A%E7%84%B6%E8%80%8C%E7%9F%A5%E8%AF%86%E7%9A%84%E6%8F%8F%E8%BF%B0%E5%8F%AA%E6%98%AF%E5%AF%B9%E5%AD%A6%E4%B9%A0%E8%B5%B7%E5%88%B0%E4%BA%86%E5%BC%95%E5%AF%BC%E7%9A%84%E4%BD%9C%E7%94%A8%E6%9C%80%E7%BB%88%E7%9A%84%E5%AD%A6%E4%B9%A0%E4%B8%80%E5%AE%9A%E8%A6%81%E9%80%9A%E8%BF%87%E4%BE%8B%E5%AD%90%E7%90%86%E6%B8%85%E9%97%AE%E9%A2%98%E5%92%8C%E7%AD%94%E6%A1%88%E7%9A%84%E5%85%B3%E7%B3%BB%E6%9D%A5%E9%87%8D%E5%A1%91%E5%A4%A7%E8%84%91%E9%93%BE%E6%8E%A5%E8%BF%99%E4%B9%9F%E6%98%AF%E4%B8%BA%E4%BB%80%E4%B9%88%E8%AE%A8%E8%AE%BA%E5%86%99%E6%96%87%E7%AB%A0%E4%BC%9A%E4%BC%B4%E9%9A%8F%E7%9D%80%E4%BE%8B%E5%AD%90%E8%80%8C%E4%B8%8D%E6%98%AF%E5%8D%95%E7%BA%AF%E7%9A%84%E5%AF%B9%E7%9F%A5%E8%AF%86%E8%BF%9B%E8%A1%8C%E6%8F%8F%E8%BF%B0%E7%94%B1%E4%BA%8E%E5%AD%A6%E4%B9%A0%E6%98%AF%E4%B8%BA%E4%BA%86%E8%A7%A3%E5%86%B3%E6%96%B0%E9%97%AE%E9%A2%98%E6%89%80%E4%BB%A5%E9%9C%80%E8%A6%81%E9%AA%8C%E8%AF%81%E7%8E%B0%E6%9C%89%E4%BE%8B%E5%AD%90%E6%89%80%E6%8F%90%E7%82%BC%E7%9A%84%E7%9F%A5%E8%AF%86%E6%98%AF%E5%90%A6%E8%83%BD%E6%8F%8F%E8%BF%B0%E9%97%AE%E9%A2%98%E5%92%8C%E7%AD%94%E6%A1%88%E4%B9%8B%E9%97%B4%E7%9A%84%E8%A7%84%E5%BE%8B%E8%80%8C%E4%B8%8D%E6%98%AF%E4%BB%85%E4%BB%85%E8%AE%B0%E4%BD%8F%E4%BA%86%E8%BF%99%E4%BA%9B%E7%8E%B0%E6%9C%89%E7%9A%84%E4%BE%8B%E5%AD%90">学习的第一步： 明白什么是问题，什么是问题的答案。 有些人压根不知道什么是问题的答案，只记住了知识的描述。 然而知识不是信息，学习不是记忆，这也是人们在教与学的过程常遇到的问题，以为把知识告诉了某人，对方就就可以学会，然而知识的描述只是对学习起到了引导的作用，最终的学习一定要通过例子理清问题和答案的关系来重塑大脑链接。这也是为什么讨论，写文章会伴随着例子，而不是单纯的对知识进行描述。由于学习是为了解决新问题，所以需要验证现有例子所提炼的知识，是否能描述问题和答案之间的规律，而不是仅仅记住了这些现有的例子<a class="anchor" href="#%E5%AD%A6%E4%B9%A0%E7%9A%84%E7%AC%AC%E4%B8%80%E6%AD%A5-%E6%98%8E%E7%99%BD%E4%BB%80%E4%B9%88%E6%98%AF%E9%97%AE%E9%A2%98%E4%BB%80%E4%B9%88%E6%98%AF%E9%97%AE%E9%A2%98%E7%9A%84%E7%AD%94%E6%A1%88-%E6%9C%89%E4%BA%9B%E4%BA%BA%E5%8E%8B%E6%A0%B9%E4%B8%8D%E7%9F%A5%E9%81%93%E4%BB%80%E4%B9%88%E6%98%AF%E9%97%AE%E9%A2%98%E7%9A%84%E7%AD%94%E6%A1%88%E5%8F%AA%E8%AE%B0%E4%BD%8F%E4%BA%86%E7%9F%A5%E8%AF%86%E7%9A%84%E6%8F%8F%E8%BF%B0-%E7%84%B6%E8%80%8C%E7%9F%A5%E8%AF%86%E4%B8%8D%E6%98%AF%E4%BF%A1%E6%81%AF%E5%AD%A6%E4%B9%A0%E4%B8%8D%E6%98%AF%E8%AE%B0%E5%BF%86%E8%BF%99%E4%B9%9F%E6%98%AF%E4%BA%BA%E4%BB%AC%E5%9C%A8%E6%95%99%E4%B8%8E%E5%AD%A6%E7%9A%84%E8%BF%87%E7%A8%8B%E5%B8%B8%E9%81%87%E5%88%B0%E7%9A%84%E9%97%AE%E9%A2%98%E4%BB%A5%E4%B8%BA%E6%8A%8A%E7%9F%A5%E8%AF%86%E5%91%8A%E8%AF%89%E4%BA%86%E6%9F%90%E4%BA%BA%E5%AF%B9%E6%96%B9%E5%B0%B1%E5%B0%B1%E5%8F%AF%E4%BB%A5%E5%AD%A6%E4%BC%9A%E7%84%B6%E8%80%8C%E7%9F%A5%E8%AF%86%E7%9A%84%E6%8F%8F%E8%BF%B0%E5%8F%AA%E6%98%AF%E5%AF%B9%E5%AD%A6%E4%B9%A0%E8%B5%B7%E5%88%B0%E4%BA%86%E5%BC%95%E5%AF%BC%E7%9A%84%E4%BD%9C%E7%94%A8%E6%9C%80%E7%BB%88%E7%9A%84%E5%AD%A6%E4%B9%A0%E4%B8%80%E5%AE%9A%E8%A6%81%E9%80%9A%E8%BF%87%E4%BE%8B%E5%AD%90%E7%90%86%E6%B8%85%E9%97%AE%E9%A2%98%E5%92%8C%E7%AD%94%E6%A1%88%E7%9A%84%E5%85%B3%E7%B3%BB%E6%9D%A5%E9%87%8D%E5%A1%91%E5%A4%A7%E8%84%91%E9%93%BE%E6%8E%A5%E8%BF%99%E4%B9%9F%E6%98%AF%E4%B8%BA%E4%BB%80%E4%B9%88%E8%AE%A8%E8%AE%BA%E5%86%99%E6%96%87%E7%AB%A0%E4%BC%9A%E4%BC%B4%E9%9A%8F%E7%9D%80%E4%BE%8B%E5%AD%90%E8%80%8C%E4%B8%8D%E6%98%AF%E5%8D%95%E7%BA%AF%E7%9A%84%E5%AF%B9%E7%9F%A5%E8%AF%86%E8%BF%9B%E8%A1%8C%E6%8F%8F%E8%BF%B0%E7%94%B1%E4%BA%8E%E5%AD%A6%E4%B9%A0%E6%98%AF%E4%B8%BA%E4%BA%86%E8%A7%A3%E5%86%B3%E6%96%B0%E9%97%AE%E9%A2%98%E6%89%80%E4%BB%A5%E9%9C%80%E8%A6%81%E9%AA%8C%E8%AF%81%E7%8E%B0%E6%9C%89%E4%BE%8B%E5%AD%90%E6%89%80%E6%8F%90%E7%82%BC%E7%9A%84%E7%9F%A5%E8%AF%86%E6%98%AF%E5%90%A6%E8%83%BD%E6%8F%8F%E8%BF%B0%E9%97%AE%E9%A2%98%E5%92%8C%E7%AD%94%E6%A1%88%E4%B9%8B%E9%97%B4%E7%9A%84%E8%A7%84%E5%BE%8B%E8%80%8C%E4%B8%8D%E6%98%AF%E4%BB%85%E4%BB%85%E8%AE%B0%E4%BD%8F%E4%BA%86%E8%BF%99%E4%BA%9B%E7%8E%B0%E6%9C%89%E7%9A%84%E4%BE%8B%E5%AD%90">§</a></h4>\n<h3 id="3%E8%8B%B1%E6%96%87%E5%A6%82%E4%BD%95%E5%AD%A6">3.英文如何学：<a class="anchor" href="#3%E8%8B%B1%E6%96%87%E5%A6%82%E4%BD%95%E5%AD%A6">§</a></h3>\n<p>学习最重要的两步明确问题，输入和答案输出，用例子构建知识学习方式分为两大类，运动类（语言，运动）和思考类（数学，逻辑）。\n区别在于是否依靠意识，因为意识是后进化出来的，擅长解决的是推断问题，但速度缓慢。学不会的原因都出在错误的输入、输出，错误的学习方式，用思考类方式来学习所有知识，比如看书学游泳，不通过例子仅记忆知识。\n以语言为例四项能力的正确输入、输出、类型分别是（听声音-说想法-读文字-写想法），应试英语的普遍误区是输入、输出变成了完形填空，阅读选择等。这类从一些文字到到另一些文字做思考类问题，用百词斩背单词还容易产生另一种偏差输入输出变成了图片到中文，英语学习中作为致命的是插入的中文思考这个中间输出不仅输出错误，而且非常缓慢会让很多种懂外语但未经训练的人同时翻译中文的话，他们会反应不过来就是因为他们的大脑在这个过程中其实并不思考中文，当出国后就会发现所学英语的输入和真实英语的输入是不同的，根本用不了。不通过例子仅记忆知识也是特别常见的错误由于语言的由于语言的输入从来就不是一个单词，而是一个句子.要想把握句子中某个单词的真正含义.需要通过体会大量不同的列句，但多数时候，学生仅仅是记住了单词的中文描述，很多英语名师也都犯一样的错误，不管他们总结的再好，若仅仅是把他的总结告诉学生，学生永远都是把他的总结当成信息记忆，而不是作为知识学习。学不会英语，是因为搞错了输入输出。造成学到的是完全不同的知识。</p>\n<h3 id="4%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%E5%8E%9F%E7%90%86%E4%BA%BA%E7%94%9F%E4%B8%8E%E9%AB%98%E6%89%8B%E4%B9%8B%E5%B7%AE">4.思维导图原理：人生与高手之差<a class="anchor" href="#4%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%E5%8E%9F%E7%90%86%E4%BA%BA%E7%94%9F%E4%B8%8E%E9%AB%98%E6%89%8B%E4%B9%8B%E5%B7%AE">§</a></h3>\n<h4 id="%E5%AD%A6%E4%B9%A0%E6%B5%81%E7%A8%8B">学习流程<a class="anchor" href="#%E5%AD%A6%E4%B9%A0%E6%B5%81%E7%A8%8B">§</a></h4>\n<p><img src="./%E5%AD%A6%E4%B9%A0%E6%B5%81%E7%A8%8B.png" alt="学习流程"></p>\n<h4 id="%E5%B8%B8%E8%A7%84%E5%AD%A6%E4%B9%A0">常规学习<a class="anchor" href="#%E5%B8%B8%E8%A7%84%E5%AD%A6%E4%B9%A0">§</a></h4>\n<p><img src="./%E5%B8%B8%E8%A7%84%E5%AD%A6%E4%B9%A0.png" alt="常规学习"></p>\n<h4 id="%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%E7%9A%84%E5%AD%A6%E4%B9%A0%E6%A8%A1%E5%BC%8F">思维导图的学习模式<a class="anchor" href="#%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%E7%9A%84%E5%AD%A6%E4%B9%A0%E6%A8%A1%E5%BC%8F">§</a></h4>\n<p><img src="./%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%E7%9A%84%E4%BD%9C%E7%94%A8.png" alt="思维导图"></p>\n<h3 id="5%E5%A6%82%E4%BD%95%E8%AE%BE%E8%AE%A1%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE">5.如何设计思维导图<a class="anchor" href="#5%E5%A6%82%E4%BD%95%E8%AE%BE%E8%AE%A1%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE">§</a></h3>\n<p><img src="./%E5%A6%82%E4%BD%95%E8%AE%BE%E8%AE%A1%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE.png" alt="如何设计思维导图"></p>\n<h3 id="6%E8%B4%B9%E6%9B%BC%E6%8A%80%E5%B7%A7">6.费曼技巧<a class="anchor" href="#6%E8%B4%B9%E6%9B%BC%E6%8A%80%E5%B7%A7">§</a></h3>\n<h4 id="1%E6%96%B9%E6%B3%95%E5%8F%AA%E4%B8%8D%E8%BF%87%E6%98%AF%E8%BE%BE%E6%88%90%E7%9B%AE%E7%9A%84%E7%9A%84%E6%89%8B%E6%AE%B5%E6%89%8B%E6%AE%B5%E5%8F%AF%E4%BB%A5%E9%80%89%E6%8B%A9%E7%9B%AE%E7%9A%84%E6%89%8D%E6%98%AF%E6%A0%B8%E5%BF%83%E8%B4%B9%E6%9B%BC%E6%8A%80%E5%B7%A7%E5%8F%AA%E6%9C%89%E4%B8%A4%E6%AD%A5%E4%B8%80%E6%98%AF%E5%AD%A6%E4%B9%A0%E4%BA%8C%E6%98%AF%E8%A7%A3%E9%87%8A-%E5%AD%A6%E4%B9%A0%E6%97%B6%E9%80%9A%E8%BF%87%E5%9B%9B%E6%AD%A5%E6%B3%95%E5%88%99">1.方法只不过是达成目的的手段，手段可以选择，目的才是核心，费曼技巧只有两步，一是学习，二是解释。 学习时通过四步法则：<a class="anchor" href="#1%E6%96%B9%E6%B3%95%E5%8F%AA%E4%B8%8D%E8%BF%87%E6%98%AF%E8%BE%BE%E6%88%90%E7%9B%AE%E7%9A%84%E7%9A%84%E6%89%8B%E6%AE%B5%E6%89%8B%E6%AE%B5%E5%8F%AF%E4%BB%A5%E9%80%89%E6%8B%A9%E7%9B%AE%E7%9A%84%E6%89%8D%E6%98%AF%E6%A0%B8%E5%BF%83%E8%B4%B9%E6%9B%BC%E6%8A%80%E5%B7%A7%E5%8F%AA%E6%9C%89%E4%B8%A4%E6%AD%A5%E4%B8%80%E6%98%AF%E5%AD%A6%E4%B9%A0%E4%BA%8C%E6%98%AF%E8%A7%A3%E9%87%8A-%E5%AD%A6%E4%B9%A0%E6%97%B6%E9%80%9A%E8%BF%87%E5%9B%9B%E6%AD%A5%E6%B3%95%E5%88%99">§</a></h4>\n<ul>\n<li>\n<ol>\n<li>将信息压缩成知识</li>\n</ol>\n</li>\n<li>\n<ol start="2">\n<li>明确输入输出的任务</li>\n</ol>\n</li>\n<li>\n<ol start="3">\n<li>例子重塑大脑链接</li>\n</ol>\n</li>\n<li>\n<ol start="4">\n<li>拆分知识理清关系</li>\n</ol>\n</li>\n</ul>\n<h4 id="2%E8%A7%A3%E9%87%8A%E9%9C%80%E8%A6%81%E4%BD%BF%E7%94%A8%E6%96%B0%E7%9A%84%E4%BE%8B%E5%AD%90%E6%9D%A5%E9%AA%8C%E8%AF%81">2.解释需要使用新的例子来验证<a class="anchor" href="#2%E8%A7%A3%E9%87%8A%E9%9C%80%E8%A6%81%E4%BD%BF%E7%94%A8%E6%96%B0%E7%9A%84%E4%BE%8B%E5%AD%90%E6%9D%A5%E9%AA%8C%E8%AF%81">§</a></h4>\n<p><img src="./%E8%B4%B9%E6%9B%BC%E6%8A%80%E5%B7%A7.png" alt="费曼技巧"></p>\n<h4 id="3%E5%AD%A6%E4%B9%A0%E6%98%AF%E7%94%A8%E6%9C%89%E9%99%90%E7%9A%84%E4%BE%8B%E5%AD%90%E6%9D%A5%E5%8E%8B%E7%BC%A9%E4%BF%A1%E6%81%AF%E6%89%80%E5%8E%8B%E7%BC%A9%E7%9A%84%E4%BF%A1%E6%81%AF%E5%8C%85%E6%8B%AC%E4%BB%8E%E6%9C%AA%E8%A7%81%E8%BF%87%E7%9A%84%E6%83%85%E5%86%B5%E5%9B%A0%E4%B8%BA%E6%88%91%E4%BB%AC%E6%AD%A3%E6%98%AF%E8%A6%81%E7%94%A8%E7%9F%A5%E8%AF%86%E8%A6%81%E8%A7%A3%E5%86%B3%E4%BB%8E%E6%9C%AA%E8%A7%81%E8%BF%87%E7%9A%84%E9%97%AE%E9%A2%98%E5%AF%B9%E4%BA%8E%E5%B7%B2%E8%A7%81%E8%BF%87%E7%9A%84%E9%97%AE%E9%A2%98%E7%9B%B4%E6%8E%A5%E4%B8%8A%E7%BD%91%E6%90%9C%E7%B4%A2%E5%8D%B3%E5%8F%AF%E7%84%B6%E8%80%8C%E8%AE%B0%E4%BD%8F%E6%9F%90%E4%BA%9B%E5%86%85%E5%AE%B9%E5%8F%AA%E8%83%BD%E9%87%8D%E8%BF%B0%E6%9F%90%E4%BA%9B%E5%86%85%E5%AE%B9%E4%BD%86%E5%8D%B4%E6%97%A0%E6%B3%95%E8%A7%A3%E9%87%8A%E6%96%B0%E6%83%85%E5%86%B5%E4%B8%8E%E5%AD%A6%E4%B9%A0%E6%97%B6%E4%B8%8D%E5%90%8C%E8%A7%A3%E9%87%8A%E6%97%B6%E6%89%80%E7%94%A8%E7%9A%84%E4%BE%8B%E5%AD%90%E4%B8%8D%E5%86%8D%E6%98%AF%E5%AD%A6%E4%B9%A0%E6%97%B6%E7%9A%84%E4%BE%8B%E5%AD%90%E8%80%8C%E6%98%AF%E5%AF%B9%E6%96%B9%E9%9D%A2%E5%AF%B9%E6%83%85%E5%86%B5%E7%9A%84%E8%BE%93%E5%85%A5%E8%BE%93%E5%87%BA%E8%A6%81%E5%B8%AE%E5%AF%B9%E6%96%B9%E6%9D%A5%E7%90%86%E6%B8%85%E5%85%B3%E7%B3%BB%E5%A6%82%E6%9E%9C%E5%AF%B9%E6%96%B9%E6%97%A0%E6%B3%95%E7%90%86%E8%A7%A3%E5%88%99%E9%9C%80%E8%A6%81%E4%B8%BE%E6%96%B0%E7%9A%84%E4%BE%8B%E5%AD%90%E8%8B%A5%E8%BF%98%E6%97%A0%E6%B3%95%E7%90%86%E8%A7%A3%E5%88%99%E9%9C%80%E8%A6%81%E6%8D%A2%E6%96%B0%E7%9A%84%E8%A7%86%E8%A7%92%E8%BF%99%E4%BA%9B%E9%83%BD%E6%98%AF%E4%BD%A0%E5%9C%A8%E5%BD%93%E5%88%9D%E5%AD%A6%E4%B9%A0%E6%97%B6%E4%BB%8E%E6%9C%AA%E9%81%87%E5%88%B0%E8%BF%87%E7%9A%84%E6%83%85%E5%86%B5%E8%80%8C%E5%BD%93%E4%BD%A0%E5%8F%AF%E4%BB%A5%E4%BA%A7%E7%94%9F%E5%B9%B6%E8%A7%A3%E9%87%8A%E8%BF%99%E4%BA%9B%E6%96%B0%E7%9A%84%E6%83%85%E5%86%B5%E6%97%B6-%E4%B9%9F%E5%B0%B1%E9%AA%8C%E8%AF%81%E4%BA%86%E4%BD%A0%E7%9A%84%E5%AD%A6%E4%B9%A0%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%E6%98%AF%E4%BB%A5%E8%BF%87%E7%A8%8B%E4%B8%BA%E4%B8%BB%E5%AF%BC%E7%9A%84%E5%AD%A6%E4%B9%A0%E6%96%B9%E6%B3%95%E8%80%8C%E6%A0%B8%E5%BF%83%E5%9C%A8%E4%BA%8E%E6%8B%86%E5%88%86%E7%9F%A5%E8%AF%86%E8%80%8C%E8%B4%B9%E6%9B%BC%E6%8A%80%E5%B7%A7%E6%98%AF%E4%BB%A5%E7%9B%AE%E7%9A%84%E4%B8%BA%E5%AF%BC%E5%90%91%E7%9A%84%E5%AD%A6%E4%B9%A0%E6%96%B9%E6%B3%95%E6%A0%B8%E5%BF%83%E5%9C%A8%E4%BA%8E%E9%AA%8C%E8%AF%81%E7%9F%A5%E8%AF%86%E4%BD%86%E8%B4%B9%E6%9B%BC%E6%8A%80%E5%B7%A7%E6%97%A9%E5%9C%A8%E4%B8%A4%E5%B9%B4%E5%89%8D%E5%B0%B1%E5%86%99%E5%9C%A8%E4%BA%86%E5%AD%94%E5%AD%90%E8%AE%BA%E8%AF%AD%E4%B8%AD%E6%B8%A9%E6%95%85%E8%80%8C%E7%9F%A5%E6%96%B0%E5%8F%AF%E4%BB%A5%E4%B8%BA%E5%B8%88%E7%9F%A3%E8%BF%99%E9%87%8C%E7%9A%84%E6%95%85%E5%B0%B1%E6%98%AF%E6%97%A7%E7%9A%84%E7%9F%A5%E8%AF%86%E6%96%B0%E5%B0%B1%E6%98%AF%E4%BB%8E%E6%9C%AA%E8%A7%81%E8%BF%87%E7%9A%84%E6%83%85%E5%86%B5%E5%BD%93%E5%8F%AF%E4%BB%A5%E4%BB%8E%E6%9C%89%E9%99%90%E7%9A%84%E4%BE%8B%E5%AD%90%E4%B8%AD%E6%8F%90%E5%8F%96%E7%9F%A5%E8%AF%86%E6%9D%A5%E8%A7%A3%E9%87%8A%E6%96%B0%E6%83%85%E5%86%B5%E6%97%B6%E5%B0%B1%E6%84%8F%E5%91%B3%E7%9D%80%E4%BD%A0%E7%9C%9F%E6%AD%A3%E7%9A%84%E5%AD%A6%E4%BC%9A%E4%BA%86%E5%AE%83%E4%BE%BF%E5%8F%AF%E5%B0%86%E7%9F%A5%E8%AF%86%E6%95%99%E6%8E%88%E7%BB%99%E5%88%AB%E4%BA%BA">3.学习是用有限的例子来压缩信息，所压缩的信息包括从未见过的情况，因为我们正是要用知识要解决从未见过的问题。对于已见过的问题，直接上网搜索即可，然而记住某些内容只能重述某些内容，但却无法解释新情况。与学习时不同，解释时所用的例子不再是学习时的例子，而是对方面对情况的输入输出，要帮对方来理清关系，如果对方无法理解，则需要举新的例子，若还无法理解，则需要换新的视角。这些都是你在当初学习时从未遇到过的情况，而当你可以产生并解释这些新的情况时 ，也就验证了你的学习。思维导图是以过程为主导的学习方法，而核心在于拆分知识，而费曼技巧是以目的为导向的学习方法，核心在于验证知识，但费曼技巧早在两年前就写在了孔子论语中：“温故而知新，可以为师矣”，这里的故就是旧的知识，新就是从未见过的情况，当可以从有限的例子中提取知识来解释新情况时，就意味着你真正的学会了它，便可将知识教授给别人。<a class="anchor" href="#3%E5%AD%A6%E4%B9%A0%E6%98%AF%E7%94%A8%E6%9C%89%E9%99%90%E7%9A%84%E4%BE%8B%E5%AD%90%E6%9D%A5%E5%8E%8B%E7%BC%A9%E4%BF%A1%E6%81%AF%E6%89%80%E5%8E%8B%E7%BC%A9%E7%9A%84%E4%BF%A1%E6%81%AF%E5%8C%85%E6%8B%AC%E4%BB%8E%E6%9C%AA%E8%A7%81%E8%BF%87%E7%9A%84%E6%83%85%E5%86%B5%E5%9B%A0%E4%B8%BA%E6%88%91%E4%BB%AC%E6%AD%A3%E6%98%AF%E8%A6%81%E7%94%A8%E7%9F%A5%E8%AF%86%E8%A6%81%E8%A7%A3%E5%86%B3%E4%BB%8E%E6%9C%AA%E8%A7%81%E8%BF%87%E7%9A%84%E9%97%AE%E9%A2%98%E5%AF%B9%E4%BA%8E%E5%B7%B2%E8%A7%81%E8%BF%87%E7%9A%84%E9%97%AE%E9%A2%98%E7%9B%B4%E6%8E%A5%E4%B8%8A%E7%BD%91%E6%90%9C%E7%B4%A2%E5%8D%B3%E5%8F%AF%E7%84%B6%E8%80%8C%E8%AE%B0%E4%BD%8F%E6%9F%90%E4%BA%9B%E5%86%85%E5%AE%B9%E5%8F%AA%E8%83%BD%E9%87%8D%E8%BF%B0%E6%9F%90%E4%BA%9B%E5%86%85%E5%AE%B9%E4%BD%86%E5%8D%B4%E6%97%A0%E6%B3%95%E8%A7%A3%E9%87%8A%E6%96%B0%E6%83%85%E5%86%B5%E4%B8%8E%E5%AD%A6%E4%B9%A0%E6%97%B6%E4%B8%8D%E5%90%8C%E8%A7%A3%E9%87%8A%E6%97%B6%E6%89%80%E7%94%A8%E7%9A%84%E4%BE%8B%E5%AD%90%E4%B8%8D%E5%86%8D%E6%98%AF%E5%AD%A6%E4%B9%A0%E6%97%B6%E7%9A%84%E4%BE%8B%E5%AD%90%E8%80%8C%E6%98%AF%E5%AF%B9%E6%96%B9%E9%9D%A2%E5%AF%B9%E6%83%85%E5%86%B5%E7%9A%84%E8%BE%93%E5%85%A5%E8%BE%93%E5%87%BA%E8%A6%81%E5%B8%AE%E5%AF%B9%E6%96%B9%E6%9D%A5%E7%90%86%E6%B8%85%E5%85%B3%E7%B3%BB%E5%A6%82%E6%9E%9C%E5%AF%B9%E6%96%B9%E6%97%A0%E6%B3%95%E7%90%86%E8%A7%A3%E5%88%99%E9%9C%80%E8%A6%81%E4%B8%BE%E6%96%B0%E7%9A%84%E4%BE%8B%E5%AD%90%E8%8B%A5%E8%BF%98%E6%97%A0%E6%B3%95%E7%90%86%E8%A7%A3%E5%88%99%E9%9C%80%E8%A6%81%E6%8D%A2%E6%96%B0%E7%9A%84%E8%A7%86%E8%A7%92%E8%BF%99%E4%BA%9B%E9%83%BD%E6%98%AF%E4%BD%A0%E5%9C%A8%E5%BD%93%E5%88%9D%E5%AD%A6%E4%B9%A0%E6%97%B6%E4%BB%8E%E6%9C%AA%E9%81%87%E5%88%B0%E8%BF%87%E7%9A%84%E6%83%85%E5%86%B5%E8%80%8C%E5%BD%93%E4%BD%A0%E5%8F%AF%E4%BB%A5%E4%BA%A7%E7%94%9F%E5%B9%B6%E8%A7%A3%E9%87%8A%E8%BF%99%E4%BA%9B%E6%96%B0%E7%9A%84%E6%83%85%E5%86%B5%E6%97%B6-%E4%B9%9F%E5%B0%B1%E9%AA%8C%E8%AF%81%E4%BA%86%E4%BD%A0%E7%9A%84%E5%AD%A6%E4%B9%A0%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%E6%98%AF%E4%BB%A5%E8%BF%87%E7%A8%8B%E4%B8%BA%E4%B8%BB%E5%AF%BC%E7%9A%84%E5%AD%A6%E4%B9%A0%E6%96%B9%E6%B3%95%E8%80%8C%E6%A0%B8%E5%BF%83%E5%9C%A8%E4%BA%8E%E6%8B%86%E5%88%86%E7%9F%A5%E8%AF%86%E8%80%8C%E8%B4%B9%E6%9B%BC%E6%8A%80%E5%B7%A7%E6%98%AF%E4%BB%A5%E7%9B%AE%E7%9A%84%E4%B8%BA%E5%AF%BC%E5%90%91%E7%9A%84%E5%AD%A6%E4%B9%A0%E6%96%B9%E6%B3%95%E6%A0%B8%E5%BF%83%E5%9C%A8%E4%BA%8E%E9%AA%8C%E8%AF%81%E7%9F%A5%E8%AF%86%E4%BD%86%E8%B4%B9%E6%9B%BC%E6%8A%80%E5%B7%A7%E6%97%A9%E5%9C%A8%E4%B8%A4%E5%B9%B4%E5%89%8D%E5%B0%B1%E5%86%99%E5%9C%A8%E4%BA%86%E5%AD%94%E5%AD%90%E8%AE%BA%E8%AF%AD%E4%B8%AD%E6%B8%A9%E6%95%85%E8%80%8C%E7%9F%A5%E6%96%B0%E5%8F%AF%E4%BB%A5%E4%B8%BA%E5%B8%88%E7%9F%A3%E8%BF%99%E9%87%8C%E7%9A%84%E6%95%85%E5%B0%B1%E6%98%AF%E6%97%A7%E7%9A%84%E7%9F%A5%E8%AF%86%E6%96%B0%E5%B0%B1%E6%98%AF%E4%BB%8E%E6%9C%AA%E8%A7%81%E8%BF%87%E7%9A%84%E6%83%85%E5%86%B5%E5%BD%93%E5%8F%AF%E4%BB%A5%E4%BB%8E%E6%9C%89%E9%99%90%E7%9A%84%E4%BE%8B%E5%AD%90%E4%B8%AD%E6%8F%90%E5%8F%96%E7%9F%A5%E8%AF%86%E6%9D%A5%E8%A7%A3%E9%87%8A%E6%96%B0%E6%83%85%E5%86%B5%E6%97%B6%E5%B0%B1%E6%84%8F%E5%91%B3%E7%9D%80%E4%BD%A0%E7%9C%9F%E6%AD%A3%E7%9A%84%E5%AD%A6%E4%BC%9A%E4%BA%86%E5%AE%83%E4%BE%BF%E5%8F%AF%E5%B0%86%E7%9F%A5%E8%AF%86%E6%95%99%E6%8E%88%E7%BB%99%E5%88%AB%E4%BA%BA">§</a></h4>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement("link", { crossOrigin: "anonymous", href: "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css", integrity: "sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X", rel: "stylesheet" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "How We Learn"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h3 id="1%E4%BB%80%E4%B9%88%E6%98%AF%E5%AD%A6%E4%B9%A0">1.什么是学习<a class="anchor" href="#1%E4%BB%80%E4%B9%88%E6%98%AF%E5%AD%A6%E4%B9%A0">§</a></h3>\n<h4 id="%E5%AD%A6%E4%B9%A0-%E5%9C%A8%E6%9C%89%E9%99%90%E7%9A%84%E4%BE%8B%E5%AD%90%E4%B8%AD%E6%89%BE%E5%87%BA%E9%97%AE%E9%A2%98%E5%92%8C%E7%AD%94%E6%A1%88%E4%B9%8B%E9%97%B4%E8%A7%84%E5%BE%8B%E7%9A%84%E8%BF%87%E7%A8%8B">学习： 在有限的例子中，找出问题和答案之间规律的过程<a class="anchor" href="#%E5%AD%A6%E4%B9%A0-%E5%9C%A8%E6%9C%89%E9%99%90%E7%9A%84%E4%BE%8B%E5%AD%90%E4%B8%AD%E6%89%BE%E5%87%BA%E9%97%AE%E9%A2%98%E5%92%8C%E7%AD%94%E6%A1%88%E4%B9%8B%E9%97%B4%E8%A7%84%E5%BE%8B%E7%9A%84%E8%BF%87%E7%A8%8B">§</a></h4>\n<h4 id="%E7%9F%A5%E8%AF%86-%E6%89%80%E6%89%BE%E5%87%BA%E6%9D%A5%E7%9A%84%E8%A7%84%E5%BE%8B%E5%B0%B1%E6%98%AF%E7%9F%A5%E8%AF%86">知识： 所找出来的规律就是知识。<a class="anchor" href="#%E7%9F%A5%E8%AF%86-%E6%89%80%E6%89%BE%E5%87%BA%E6%9D%A5%E7%9A%84%E8%A7%84%E5%BE%8B%E5%B0%B1%E6%98%AF%E7%9F%A5%E8%AF%86">§</a></h4>\n<ul>\n<li>如果你没有办法描述你的知识，那你就没有真正学会它，因为学习就是在用知识压缩原本无限的信息</li>\n</ul>\n<h3 id="2%E6%8A%8A%E4%B9%A6%E8%AF%BB%E8%96%84">2.把书读薄<a class="anchor" href="#2%E6%8A%8A%E4%B9%A6%E8%AF%BB%E8%96%84">§</a></h3>\n<h4 id="%E5%AD%A6%E4%B9%A0%E7%9A%84%E7%AC%AC%E4%B8%80%E6%AD%A5-%E6%98%8E%E7%99%BD%E4%BB%80%E4%B9%88%E6%98%AF%E9%97%AE%E9%A2%98%E4%BB%80%E4%B9%88%E6%98%AF%E9%97%AE%E9%A2%98%E7%9A%84%E7%AD%94%E6%A1%88-%E6%9C%89%E4%BA%9B%E4%BA%BA%E5%8E%8B%E6%A0%B9%E4%B8%8D%E7%9F%A5%E9%81%93%E4%BB%80%E4%B9%88%E6%98%AF%E9%97%AE%E9%A2%98%E7%9A%84%E7%AD%94%E6%A1%88%E5%8F%AA%E8%AE%B0%E4%BD%8F%E4%BA%86%E7%9F%A5%E8%AF%86%E7%9A%84%E6%8F%8F%E8%BF%B0-%E7%84%B6%E8%80%8C%E7%9F%A5%E8%AF%86%E4%B8%8D%E6%98%AF%E4%BF%A1%E6%81%AF%E5%AD%A6%E4%B9%A0%E4%B8%8D%E6%98%AF%E8%AE%B0%E5%BF%86%E8%BF%99%E4%B9%9F%E6%98%AF%E4%BA%BA%E4%BB%AC%E5%9C%A8%E6%95%99%E4%B8%8E%E5%AD%A6%E7%9A%84%E8%BF%87%E7%A8%8B%E5%B8%B8%E9%81%87%E5%88%B0%E7%9A%84%E9%97%AE%E9%A2%98%E4%BB%A5%E4%B8%BA%E6%8A%8A%E7%9F%A5%E8%AF%86%E5%91%8A%E8%AF%89%E4%BA%86%E6%9F%90%E4%BA%BA%E5%AF%B9%E6%96%B9%E5%B0%B1%E5%B0%B1%E5%8F%AF%E4%BB%A5%E5%AD%A6%E4%BC%9A%E7%84%B6%E8%80%8C%E7%9F%A5%E8%AF%86%E7%9A%84%E6%8F%8F%E8%BF%B0%E5%8F%AA%E6%98%AF%E5%AF%B9%E5%AD%A6%E4%B9%A0%E8%B5%B7%E5%88%B0%E4%BA%86%E5%BC%95%E5%AF%BC%E7%9A%84%E4%BD%9C%E7%94%A8%E6%9C%80%E7%BB%88%E7%9A%84%E5%AD%A6%E4%B9%A0%E4%B8%80%E5%AE%9A%E8%A6%81%E9%80%9A%E8%BF%87%E4%BE%8B%E5%AD%90%E7%90%86%E6%B8%85%E9%97%AE%E9%A2%98%E5%92%8C%E7%AD%94%E6%A1%88%E7%9A%84%E5%85%B3%E7%B3%BB%E6%9D%A5%E9%87%8D%E5%A1%91%E5%A4%A7%E8%84%91%E9%93%BE%E6%8E%A5%E8%BF%99%E4%B9%9F%E6%98%AF%E4%B8%BA%E4%BB%80%E4%B9%88%E8%AE%A8%E8%AE%BA%E5%86%99%E6%96%87%E7%AB%A0%E4%BC%9A%E4%BC%B4%E9%9A%8F%E7%9D%80%E4%BE%8B%E5%AD%90%E8%80%8C%E4%B8%8D%E6%98%AF%E5%8D%95%E7%BA%AF%E7%9A%84%E5%AF%B9%E7%9F%A5%E8%AF%86%E8%BF%9B%E8%A1%8C%E6%8F%8F%E8%BF%B0%E7%94%B1%E4%BA%8E%E5%AD%A6%E4%B9%A0%E6%98%AF%E4%B8%BA%E4%BA%86%E8%A7%A3%E5%86%B3%E6%96%B0%E9%97%AE%E9%A2%98%E6%89%80%E4%BB%A5%E9%9C%80%E8%A6%81%E9%AA%8C%E8%AF%81%E7%8E%B0%E6%9C%89%E4%BE%8B%E5%AD%90%E6%89%80%E6%8F%90%E7%82%BC%E7%9A%84%E7%9F%A5%E8%AF%86%E6%98%AF%E5%90%A6%E8%83%BD%E6%8F%8F%E8%BF%B0%E9%97%AE%E9%A2%98%E5%92%8C%E7%AD%94%E6%A1%88%E4%B9%8B%E9%97%B4%E7%9A%84%E8%A7%84%E5%BE%8B%E8%80%8C%E4%B8%8D%E6%98%AF%E4%BB%85%E4%BB%85%E8%AE%B0%E4%BD%8F%E4%BA%86%E8%BF%99%E4%BA%9B%E7%8E%B0%E6%9C%89%E7%9A%84%E4%BE%8B%E5%AD%90">学习的第一步： 明白什么是问题，什么是问题的答案。 有些人压根不知道什么是问题的答案，只记住了知识的描述。 然而知识不是信息，学习不是记忆，这也是人们在教与学的过程常遇到的问题，以为把知识告诉了某人，对方就就可以学会，然而知识的描述只是对学习起到了引导的作用，最终的学习一定要通过例子理清问题和答案的关系来重塑大脑链接。这也是为什么讨论，写文章会伴随着例子，而不是单纯的对知识进行描述。由于学习是为了解决新问题，所以需要验证现有例子所提炼的知识，是否能描述问题和答案之间的规律，而不是仅仅记住了这些现有的例子<a class="anchor" href="#%E5%AD%A6%E4%B9%A0%E7%9A%84%E7%AC%AC%E4%B8%80%E6%AD%A5-%E6%98%8E%E7%99%BD%E4%BB%80%E4%B9%88%E6%98%AF%E9%97%AE%E9%A2%98%E4%BB%80%E4%B9%88%E6%98%AF%E9%97%AE%E9%A2%98%E7%9A%84%E7%AD%94%E6%A1%88-%E6%9C%89%E4%BA%9B%E4%BA%BA%E5%8E%8B%E6%A0%B9%E4%B8%8D%E7%9F%A5%E9%81%93%E4%BB%80%E4%B9%88%E6%98%AF%E9%97%AE%E9%A2%98%E7%9A%84%E7%AD%94%E6%A1%88%E5%8F%AA%E8%AE%B0%E4%BD%8F%E4%BA%86%E7%9F%A5%E8%AF%86%E7%9A%84%E6%8F%8F%E8%BF%B0-%E7%84%B6%E8%80%8C%E7%9F%A5%E8%AF%86%E4%B8%8D%E6%98%AF%E4%BF%A1%E6%81%AF%E5%AD%A6%E4%B9%A0%E4%B8%8D%E6%98%AF%E8%AE%B0%E5%BF%86%E8%BF%99%E4%B9%9F%E6%98%AF%E4%BA%BA%E4%BB%AC%E5%9C%A8%E6%95%99%E4%B8%8E%E5%AD%A6%E7%9A%84%E8%BF%87%E7%A8%8B%E5%B8%B8%E9%81%87%E5%88%B0%E7%9A%84%E9%97%AE%E9%A2%98%E4%BB%A5%E4%B8%BA%E6%8A%8A%E7%9F%A5%E8%AF%86%E5%91%8A%E8%AF%89%E4%BA%86%E6%9F%90%E4%BA%BA%E5%AF%B9%E6%96%B9%E5%B0%B1%E5%B0%B1%E5%8F%AF%E4%BB%A5%E5%AD%A6%E4%BC%9A%E7%84%B6%E8%80%8C%E7%9F%A5%E8%AF%86%E7%9A%84%E6%8F%8F%E8%BF%B0%E5%8F%AA%E6%98%AF%E5%AF%B9%E5%AD%A6%E4%B9%A0%E8%B5%B7%E5%88%B0%E4%BA%86%E5%BC%95%E5%AF%BC%E7%9A%84%E4%BD%9C%E7%94%A8%E6%9C%80%E7%BB%88%E7%9A%84%E5%AD%A6%E4%B9%A0%E4%B8%80%E5%AE%9A%E8%A6%81%E9%80%9A%E8%BF%87%E4%BE%8B%E5%AD%90%E7%90%86%E6%B8%85%E9%97%AE%E9%A2%98%E5%92%8C%E7%AD%94%E6%A1%88%E7%9A%84%E5%85%B3%E7%B3%BB%E6%9D%A5%E9%87%8D%E5%A1%91%E5%A4%A7%E8%84%91%E9%93%BE%E6%8E%A5%E8%BF%99%E4%B9%9F%E6%98%AF%E4%B8%BA%E4%BB%80%E4%B9%88%E8%AE%A8%E8%AE%BA%E5%86%99%E6%96%87%E7%AB%A0%E4%BC%9A%E4%BC%B4%E9%9A%8F%E7%9D%80%E4%BE%8B%E5%AD%90%E8%80%8C%E4%B8%8D%E6%98%AF%E5%8D%95%E7%BA%AF%E7%9A%84%E5%AF%B9%E7%9F%A5%E8%AF%86%E8%BF%9B%E8%A1%8C%E6%8F%8F%E8%BF%B0%E7%94%B1%E4%BA%8E%E5%AD%A6%E4%B9%A0%E6%98%AF%E4%B8%BA%E4%BA%86%E8%A7%A3%E5%86%B3%E6%96%B0%E9%97%AE%E9%A2%98%E6%89%80%E4%BB%A5%E9%9C%80%E8%A6%81%E9%AA%8C%E8%AF%81%E7%8E%B0%E6%9C%89%E4%BE%8B%E5%AD%90%E6%89%80%E6%8F%90%E7%82%BC%E7%9A%84%E7%9F%A5%E8%AF%86%E6%98%AF%E5%90%A6%E8%83%BD%E6%8F%8F%E8%BF%B0%E9%97%AE%E9%A2%98%E5%92%8C%E7%AD%94%E6%A1%88%E4%B9%8B%E9%97%B4%E7%9A%84%E8%A7%84%E5%BE%8B%E8%80%8C%E4%B8%8D%E6%98%AF%E4%BB%85%E4%BB%85%E8%AE%B0%E4%BD%8F%E4%BA%86%E8%BF%99%E4%BA%9B%E7%8E%B0%E6%9C%89%E7%9A%84%E4%BE%8B%E5%AD%90">§</a></h4>\n<h3 id="3%E8%8B%B1%E6%96%87%E5%A6%82%E4%BD%95%E5%AD%A6">3.英文如何学：<a class="anchor" href="#3%E8%8B%B1%E6%96%87%E5%A6%82%E4%BD%95%E5%AD%A6">§</a></h3>\n<p>学习最重要的两步明确问题，输入和答案输出，用例子构建知识学习方式分为两大类，运动类（语言，运动）和思考类（数学，逻辑）。\n区别在于是否依靠意识，因为意识是后进化出来的，擅长解决的是推断问题，但速度缓慢。学不会的原因都出在错误的输入、输出，错误的学习方式，用思考类方式来学习所有知识，比如看书学游泳，不通过例子仅记忆知识。\n以语言为例四项能力的正确输入、输出、类型分别是（听声音-说想法-读文字-写想法），应试英语的普遍误区是输入、输出变成了完形填空，阅读选择等。这类从一些文字到到另一些文字做思考类问题，用百词斩背单词还容易产生另一种偏差输入输出变成了图片到中文，英语学习中作为致命的是插入的中文思考这个中间输出不仅输出错误，而且非常缓慢会让很多种懂外语但未经训练的人同时翻译中文的话，他们会反应不过来就是因为他们的大脑在这个过程中其实并不思考中文，当出国后就会发现所学英语的输入和真实英语的输入是不同的，根本用不了。不通过例子仅记忆知识也是特别常见的错误由于语言的由于语言的输入从来就不是一个单词，而是一个句子.要想把握句子中某个单词的真正含义.需要通过体会大量不同的列句，但多数时候，学生仅仅是记住了单词的中文描述，很多英语名师也都犯一样的错误，不管他们总结的再好，若仅仅是把他的总结告诉学生，学生永远都是把他的总结当成信息记忆，而不是作为知识学习。学不会英语，是因为搞错了输入输出。造成学到的是完全不同的知识。</p>\n<h3 id="4%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%E5%8E%9F%E7%90%86%E4%BA%BA%E7%94%9F%E4%B8%8E%E9%AB%98%E6%89%8B%E4%B9%8B%E5%B7%AE">4.思维导图原理：人生与高手之差<a class="anchor" href="#4%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%E5%8E%9F%E7%90%86%E4%BA%BA%E7%94%9F%E4%B8%8E%E9%AB%98%E6%89%8B%E4%B9%8B%E5%B7%AE">§</a></h3>\n<h4 id="%E5%AD%A6%E4%B9%A0%E6%B5%81%E7%A8%8B">学习流程<a class="anchor" href="#%E5%AD%A6%E4%B9%A0%E6%B5%81%E7%A8%8B">§</a></h4>\n<p><img src="./%E5%AD%A6%E4%B9%A0%E6%B5%81%E7%A8%8B.png" alt="学习流程"></p>\n<h4 id="%E5%B8%B8%E8%A7%84%E5%AD%A6%E4%B9%A0">常规学习<a class="anchor" href="#%E5%B8%B8%E8%A7%84%E5%AD%A6%E4%B9%A0">§</a></h4>\n<p><img src="./%E5%B8%B8%E8%A7%84%E5%AD%A6%E4%B9%A0.png" alt="常规学习"></p>\n<h4 id="%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%E7%9A%84%E5%AD%A6%E4%B9%A0%E6%A8%A1%E5%BC%8F">思维导图的学习模式<a class="anchor" href="#%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%E7%9A%84%E5%AD%A6%E4%B9%A0%E6%A8%A1%E5%BC%8F">§</a></h4>\n<p><img src="./%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%E7%9A%84%E4%BD%9C%E7%94%A8.png" alt="思维导图"></p>\n<h3 id="5%E5%A6%82%E4%BD%95%E8%AE%BE%E8%AE%A1%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE">5.如何设计思维导图<a class="anchor" href="#5%E5%A6%82%E4%BD%95%E8%AE%BE%E8%AE%A1%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE">§</a></h3>\n<p><img src="./%E5%A6%82%E4%BD%95%E8%AE%BE%E8%AE%A1%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE.png" alt="如何设计思维导图"></p>\n<h3 id="6%E8%B4%B9%E6%9B%BC%E6%8A%80%E5%B7%A7">6.费曼技巧<a class="anchor" href="#6%E8%B4%B9%E6%9B%BC%E6%8A%80%E5%B7%A7">§</a></h3>\n<h4 id="1%E6%96%B9%E6%B3%95%E5%8F%AA%E4%B8%8D%E8%BF%87%E6%98%AF%E8%BE%BE%E6%88%90%E7%9B%AE%E7%9A%84%E7%9A%84%E6%89%8B%E6%AE%B5%E6%89%8B%E6%AE%B5%E5%8F%AF%E4%BB%A5%E9%80%89%E6%8B%A9%E7%9B%AE%E7%9A%84%E6%89%8D%E6%98%AF%E6%A0%B8%E5%BF%83%E8%B4%B9%E6%9B%BC%E6%8A%80%E5%B7%A7%E5%8F%AA%E6%9C%89%E4%B8%A4%E6%AD%A5%E4%B8%80%E6%98%AF%E5%AD%A6%E4%B9%A0%E4%BA%8C%E6%98%AF%E8%A7%A3%E9%87%8A-%E5%AD%A6%E4%B9%A0%E6%97%B6%E9%80%9A%E8%BF%87%E5%9B%9B%E6%AD%A5%E6%B3%95%E5%88%99">1.方法只不过是达成目的的手段，手段可以选择，目的才是核心，费曼技巧只有两步，一是学习，二是解释。 学习时通过四步法则：<a class="anchor" href="#1%E6%96%B9%E6%B3%95%E5%8F%AA%E4%B8%8D%E8%BF%87%E6%98%AF%E8%BE%BE%E6%88%90%E7%9B%AE%E7%9A%84%E7%9A%84%E6%89%8B%E6%AE%B5%E6%89%8B%E6%AE%B5%E5%8F%AF%E4%BB%A5%E9%80%89%E6%8B%A9%E7%9B%AE%E7%9A%84%E6%89%8D%E6%98%AF%E6%A0%B8%E5%BF%83%E8%B4%B9%E6%9B%BC%E6%8A%80%E5%B7%A7%E5%8F%AA%E6%9C%89%E4%B8%A4%E6%AD%A5%E4%B8%80%E6%98%AF%E5%AD%A6%E4%B9%A0%E4%BA%8C%E6%98%AF%E8%A7%A3%E9%87%8A-%E5%AD%A6%E4%B9%A0%E6%97%B6%E9%80%9A%E8%BF%87%E5%9B%9B%E6%AD%A5%E6%B3%95%E5%88%99">§</a></h4>\n<ul>\n<li>\n<ol>\n<li>将信息压缩成知识</li>\n</ol>\n</li>\n<li>\n<ol start="2">\n<li>明确输入输出的任务</li>\n</ol>\n</li>\n<li>\n<ol start="3">\n<li>例子重塑大脑链接</li>\n</ol>\n</li>\n<li>\n<ol start="4">\n<li>拆分知识理清关系</li>\n</ol>\n</li>\n</ul>\n<h4 id="2%E8%A7%A3%E9%87%8A%E9%9C%80%E8%A6%81%E4%BD%BF%E7%94%A8%E6%96%B0%E7%9A%84%E4%BE%8B%E5%AD%90%E6%9D%A5%E9%AA%8C%E8%AF%81">2.解释需要使用新的例子来验证<a class="anchor" href="#2%E8%A7%A3%E9%87%8A%E9%9C%80%E8%A6%81%E4%BD%BF%E7%94%A8%E6%96%B0%E7%9A%84%E4%BE%8B%E5%AD%90%E6%9D%A5%E9%AA%8C%E8%AF%81">§</a></h4>\n<p><img src="./%E8%B4%B9%E6%9B%BC%E6%8A%80%E5%B7%A7.png" alt="费曼技巧"></p>\n<h4 id="3%E5%AD%A6%E4%B9%A0%E6%98%AF%E7%94%A8%E6%9C%89%E9%99%90%E7%9A%84%E4%BE%8B%E5%AD%90%E6%9D%A5%E5%8E%8B%E7%BC%A9%E4%BF%A1%E6%81%AF%E6%89%80%E5%8E%8B%E7%BC%A9%E7%9A%84%E4%BF%A1%E6%81%AF%E5%8C%85%E6%8B%AC%E4%BB%8E%E6%9C%AA%E8%A7%81%E8%BF%87%E7%9A%84%E6%83%85%E5%86%B5%E5%9B%A0%E4%B8%BA%E6%88%91%E4%BB%AC%E6%AD%A3%E6%98%AF%E8%A6%81%E7%94%A8%E7%9F%A5%E8%AF%86%E8%A6%81%E8%A7%A3%E5%86%B3%E4%BB%8E%E6%9C%AA%E8%A7%81%E8%BF%87%E7%9A%84%E9%97%AE%E9%A2%98%E5%AF%B9%E4%BA%8E%E5%B7%B2%E8%A7%81%E8%BF%87%E7%9A%84%E9%97%AE%E9%A2%98%E7%9B%B4%E6%8E%A5%E4%B8%8A%E7%BD%91%E6%90%9C%E7%B4%A2%E5%8D%B3%E5%8F%AF%E7%84%B6%E8%80%8C%E8%AE%B0%E4%BD%8F%E6%9F%90%E4%BA%9B%E5%86%85%E5%AE%B9%E5%8F%AA%E8%83%BD%E9%87%8D%E8%BF%B0%E6%9F%90%E4%BA%9B%E5%86%85%E5%AE%B9%E4%BD%86%E5%8D%B4%E6%97%A0%E6%B3%95%E8%A7%A3%E9%87%8A%E6%96%B0%E6%83%85%E5%86%B5%E4%B8%8E%E5%AD%A6%E4%B9%A0%E6%97%B6%E4%B8%8D%E5%90%8C%E8%A7%A3%E9%87%8A%E6%97%B6%E6%89%80%E7%94%A8%E7%9A%84%E4%BE%8B%E5%AD%90%E4%B8%8D%E5%86%8D%E6%98%AF%E5%AD%A6%E4%B9%A0%E6%97%B6%E7%9A%84%E4%BE%8B%E5%AD%90%E8%80%8C%E6%98%AF%E5%AF%B9%E6%96%B9%E9%9D%A2%E5%AF%B9%E6%83%85%E5%86%B5%E7%9A%84%E8%BE%93%E5%85%A5%E8%BE%93%E5%87%BA%E8%A6%81%E5%B8%AE%E5%AF%B9%E6%96%B9%E6%9D%A5%E7%90%86%E6%B8%85%E5%85%B3%E7%B3%BB%E5%A6%82%E6%9E%9C%E5%AF%B9%E6%96%B9%E6%97%A0%E6%B3%95%E7%90%86%E8%A7%A3%E5%88%99%E9%9C%80%E8%A6%81%E4%B8%BE%E6%96%B0%E7%9A%84%E4%BE%8B%E5%AD%90%E8%8B%A5%E8%BF%98%E6%97%A0%E6%B3%95%E7%90%86%E8%A7%A3%E5%88%99%E9%9C%80%E8%A6%81%E6%8D%A2%E6%96%B0%E7%9A%84%E8%A7%86%E8%A7%92%E8%BF%99%E4%BA%9B%E9%83%BD%E6%98%AF%E4%BD%A0%E5%9C%A8%E5%BD%93%E5%88%9D%E5%AD%A6%E4%B9%A0%E6%97%B6%E4%BB%8E%E6%9C%AA%E9%81%87%E5%88%B0%E8%BF%87%E7%9A%84%E6%83%85%E5%86%B5%E8%80%8C%E5%BD%93%E4%BD%A0%E5%8F%AF%E4%BB%A5%E4%BA%A7%E7%94%9F%E5%B9%B6%E8%A7%A3%E9%87%8A%E8%BF%99%E4%BA%9B%E6%96%B0%E7%9A%84%E6%83%85%E5%86%B5%E6%97%B6-%E4%B9%9F%E5%B0%B1%E9%AA%8C%E8%AF%81%E4%BA%86%E4%BD%A0%E7%9A%84%E5%AD%A6%E4%B9%A0%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%E6%98%AF%E4%BB%A5%E8%BF%87%E7%A8%8B%E4%B8%BA%E4%B8%BB%E5%AF%BC%E7%9A%84%E5%AD%A6%E4%B9%A0%E6%96%B9%E6%B3%95%E8%80%8C%E6%A0%B8%E5%BF%83%E5%9C%A8%E4%BA%8E%E6%8B%86%E5%88%86%E7%9F%A5%E8%AF%86%E8%80%8C%E8%B4%B9%E6%9B%BC%E6%8A%80%E5%B7%A7%E6%98%AF%E4%BB%A5%E7%9B%AE%E7%9A%84%E4%B8%BA%E5%AF%BC%E5%90%91%E7%9A%84%E5%AD%A6%E4%B9%A0%E6%96%B9%E6%B3%95%E6%A0%B8%E5%BF%83%E5%9C%A8%E4%BA%8E%E9%AA%8C%E8%AF%81%E7%9F%A5%E8%AF%86%E4%BD%86%E8%B4%B9%E6%9B%BC%E6%8A%80%E5%B7%A7%E6%97%A9%E5%9C%A8%E4%B8%A4%E5%B9%B4%E5%89%8D%E5%B0%B1%E5%86%99%E5%9C%A8%E4%BA%86%E5%AD%94%E5%AD%90%E8%AE%BA%E8%AF%AD%E4%B8%AD%E6%B8%A9%E6%95%85%E8%80%8C%E7%9F%A5%E6%96%B0%E5%8F%AF%E4%BB%A5%E4%B8%BA%E5%B8%88%E7%9F%A3%E8%BF%99%E9%87%8C%E7%9A%84%E6%95%85%E5%B0%B1%E6%98%AF%E6%97%A7%E7%9A%84%E7%9F%A5%E8%AF%86%E6%96%B0%E5%B0%B1%E6%98%AF%E4%BB%8E%E6%9C%AA%E8%A7%81%E8%BF%87%E7%9A%84%E6%83%85%E5%86%B5%E5%BD%93%E5%8F%AF%E4%BB%A5%E4%BB%8E%E6%9C%89%E9%99%90%E7%9A%84%E4%BE%8B%E5%AD%90%E4%B8%AD%E6%8F%90%E5%8F%96%E7%9F%A5%E8%AF%86%E6%9D%A5%E8%A7%A3%E9%87%8A%E6%96%B0%E6%83%85%E5%86%B5%E6%97%B6%E5%B0%B1%E6%84%8F%E5%91%B3%E7%9D%80%E4%BD%A0%E7%9C%9F%E6%AD%A3%E7%9A%84%E5%AD%A6%E4%BC%9A%E4%BA%86%E5%AE%83%E4%BE%BF%E5%8F%AF%E5%B0%86%E7%9F%A5%E8%AF%86%E6%95%99%E6%8E%88%E7%BB%99%E5%88%AB%E4%BA%BA">3.学习是用有限的例子来压缩信息，所压缩的信息包括从未见过的情况，因为我们正是要用知识要解决从未见过的问题。对于已见过的问题，直接上网搜索即可，然而记住某些内容只能重述某些内容，但却无法解释新情况。与学习时不同，解释时所用的例子不再是学习时的例子，而是对方面对情况的输入输出，要帮对方来理清关系，如果对方无法理解，则需要举新的例子，若还无法理解，则需要换新的视角。这些都是你在当初学习时从未遇到过的情况，而当你可以产生并解释这些新的情况时 ，也就验证了你的学习。思维导图是以过程为主导的学习方法，而核心在于拆分知识，而费曼技巧是以目的为导向的学习方法，核心在于验证知识，但费曼技巧早在两年前就写在了孔子论语中：“温故而知新，可以为师矣”，这里的故就是旧的知识，新就是从未见过的情况，当可以从有限的例子中提取知识来解释新情况时，就意味着你真正的学会了它，便可将知识教授给别人。<a class="anchor" href="#3%E5%AD%A6%E4%B9%A0%E6%98%AF%E7%94%A8%E6%9C%89%E9%99%90%E7%9A%84%E4%BE%8B%E5%AD%90%E6%9D%A5%E5%8E%8B%E7%BC%A9%E4%BF%A1%E6%81%AF%E6%89%80%E5%8E%8B%E7%BC%A9%E7%9A%84%E4%BF%A1%E6%81%AF%E5%8C%85%E6%8B%AC%E4%BB%8E%E6%9C%AA%E8%A7%81%E8%BF%87%E7%9A%84%E6%83%85%E5%86%B5%E5%9B%A0%E4%B8%BA%E6%88%91%E4%BB%AC%E6%AD%A3%E6%98%AF%E8%A6%81%E7%94%A8%E7%9F%A5%E8%AF%86%E8%A6%81%E8%A7%A3%E5%86%B3%E4%BB%8E%E6%9C%AA%E8%A7%81%E8%BF%87%E7%9A%84%E9%97%AE%E9%A2%98%E5%AF%B9%E4%BA%8E%E5%B7%B2%E8%A7%81%E8%BF%87%E7%9A%84%E9%97%AE%E9%A2%98%E7%9B%B4%E6%8E%A5%E4%B8%8A%E7%BD%91%E6%90%9C%E7%B4%A2%E5%8D%B3%E5%8F%AF%E7%84%B6%E8%80%8C%E8%AE%B0%E4%BD%8F%E6%9F%90%E4%BA%9B%E5%86%85%E5%AE%B9%E5%8F%AA%E8%83%BD%E9%87%8D%E8%BF%B0%E6%9F%90%E4%BA%9B%E5%86%85%E5%AE%B9%E4%BD%86%E5%8D%B4%E6%97%A0%E6%B3%95%E8%A7%A3%E9%87%8A%E6%96%B0%E6%83%85%E5%86%B5%E4%B8%8E%E5%AD%A6%E4%B9%A0%E6%97%B6%E4%B8%8D%E5%90%8C%E8%A7%A3%E9%87%8A%E6%97%B6%E6%89%80%E7%94%A8%E7%9A%84%E4%BE%8B%E5%AD%90%E4%B8%8D%E5%86%8D%E6%98%AF%E5%AD%A6%E4%B9%A0%E6%97%B6%E7%9A%84%E4%BE%8B%E5%AD%90%E8%80%8C%E6%98%AF%E5%AF%B9%E6%96%B9%E9%9D%A2%E5%AF%B9%E6%83%85%E5%86%B5%E7%9A%84%E8%BE%93%E5%85%A5%E8%BE%93%E5%87%BA%E8%A6%81%E5%B8%AE%E5%AF%B9%E6%96%B9%E6%9D%A5%E7%90%86%E6%B8%85%E5%85%B3%E7%B3%BB%E5%A6%82%E6%9E%9C%E5%AF%B9%E6%96%B9%E6%97%A0%E6%B3%95%E7%90%86%E8%A7%A3%E5%88%99%E9%9C%80%E8%A6%81%E4%B8%BE%E6%96%B0%E7%9A%84%E4%BE%8B%E5%AD%90%E8%8B%A5%E8%BF%98%E6%97%A0%E6%B3%95%E7%90%86%E8%A7%A3%E5%88%99%E9%9C%80%E8%A6%81%E6%8D%A2%E6%96%B0%E7%9A%84%E8%A7%86%E8%A7%92%E8%BF%99%E4%BA%9B%E9%83%BD%E6%98%AF%E4%BD%A0%E5%9C%A8%E5%BD%93%E5%88%9D%E5%AD%A6%E4%B9%A0%E6%97%B6%E4%BB%8E%E6%9C%AA%E9%81%87%E5%88%B0%E8%BF%87%E7%9A%84%E6%83%85%E5%86%B5%E8%80%8C%E5%BD%93%E4%BD%A0%E5%8F%AF%E4%BB%A5%E4%BA%A7%E7%94%9F%E5%B9%B6%E8%A7%A3%E9%87%8A%E8%BF%99%E4%BA%9B%E6%96%B0%E7%9A%84%E6%83%85%E5%86%B5%E6%97%B6-%E4%B9%9F%E5%B0%B1%E9%AA%8C%E8%AF%81%E4%BA%86%E4%BD%A0%E7%9A%84%E5%AD%A6%E4%B9%A0%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%E6%98%AF%E4%BB%A5%E8%BF%87%E7%A8%8B%E4%B8%BA%E4%B8%BB%E5%AF%BC%E7%9A%84%E5%AD%A6%E4%B9%A0%E6%96%B9%E6%B3%95%E8%80%8C%E6%A0%B8%E5%BF%83%E5%9C%A8%E4%BA%8E%E6%8B%86%E5%88%86%E7%9F%A5%E8%AF%86%E8%80%8C%E8%B4%B9%E6%9B%BC%E6%8A%80%E5%B7%A7%E6%98%AF%E4%BB%A5%E7%9B%AE%E7%9A%84%E4%B8%BA%E5%AF%BC%E5%90%91%E7%9A%84%E5%AD%A6%E4%B9%A0%E6%96%B9%E6%B3%95%E6%A0%B8%E5%BF%83%E5%9C%A8%E4%BA%8E%E9%AA%8C%E8%AF%81%E7%9F%A5%E8%AF%86%E4%BD%86%E8%B4%B9%E6%9B%BC%E6%8A%80%E5%B7%A7%E6%97%A9%E5%9C%A8%E4%B8%A4%E5%B9%B4%E5%89%8D%E5%B0%B1%E5%86%99%E5%9C%A8%E4%BA%86%E5%AD%94%E5%AD%90%E8%AE%BA%E8%AF%AD%E4%B8%AD%E6%B8%A9%E6%95%85%E8%80%8C%E7%9F%A5%E6%96%B0%E5%8F%AF%E4%BB%A5%E4%B8%BA%E5%B8%88%E7%9F%A3%E8%BF%99%E9%87%8C%E7%9A%84%E6%95%85%E5%B0%B1%E6%98%AF%E6%97%A7%E7%9A%84%E7%9F%A5%E8%AF%86%E6%96%B0%E5%B0%B1%E6%98%AF%E4%BB%8E%E6%9C%AA%E8%A7%81%E8%BF%87%E7%9A%84%E6%83%85%E5%86%B5%E5%BD%93%E5%8F%AF%E4%BB%A5%E4%BB%8E%E6%9C%89%E9%99%90%E7%9A%84%E4%BE%8B%E5%AD%90%E4%B8%AD%E6%8F%90%E5%8F%96%E7%9F%A5%E8%AF%86%E6%9D%A5%E8%A7%A3%E9%87%8A%E6%96%B0%E6%83%85%E5%86%B5%E6%97%B6%E5%B0%B1%E6%84%8F%E5%91%B3%E7%9D%80%E4%BD%A0%E7%9C%9F%E6%AD%A3%E7%9A%84%E5%AD%A6%E4%BC%9A%E4%BA%86%E5%AE%83%E4%BE%BF%E5%8F%AF%E5%B0%86%E7%9F%A5%E8%AF%86%E6%95%99%E6%8E%88%E7%BB%99%E5%88%AB%E4%BA%BA">§</a></h4>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#1%E4%BB%80%E4%B9%88%E6%98%AF%E5%AD%A6%E4%B9%A0" }, "1.\u4EC0\u4E48\u662F\u5B66\u4E60"),
                React.createElement("ol", null)),
            React.createElement("li", null,
                React.createElement("a", { href: "#2%E6%8A%8A%E4%B9%A6%E8%AF%BB%E8%96%84" }, "2.\u628A\u4E66\u8BFB\u8584"),
                React.createElement("ol", null)),
            React.createElement("li", null,
                React.createElement("a", { href: "#3%E8%8B%B1%E6%96%87%E5%A6%82%E4%BD%95%E5%AD%A6" }, "3.\u82F1\u6587\u5982\u4F55\u5B66\uFF1A")),
            React.createElement("li", null,
                React.createElement("a", { href: "#4%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%E5%8E%9F%E7%90%86%E4%BA%BA%E7%94%9F%E4%B8%8E%E9%AB%98%E6%89%8B%E4%B9%8B%E5%B7%AE" }, "4.\u601D\u7EF4\u5BFC\u56FE\u539F\u7406\uFF1A\u4EBA\u751F\u4E0E\u9AD8\u624B\u4E4B\u5DEE"),
                React.createElement("ol", null)),
            React.createElement("li", null,
                React.createElement("a", { href: "#5%E5%A6%82%E4%BD%95%E8%AE%BE%E8%AE%A1%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE" }, "5.\u5982\u4F55\u8BBE\u8BA1\u601D\u7EF4\u5BFC\u56FE")),
            React.createElement("li", null,
                React.createElement("a", { href: "#6%E8%B4%B9%E6%9B%BC%E6%8A%80%E5%B7%A7" }, "6.\u8D39\u66FC\u6280\u5DE7"),
                React.createElement("ol", null)))),
    'author': "shaper",
    'contributors': [
        "shaper"
    ],
    'date': "2021-05-07T09:03:55.000Z",
    'updated': "2021-05-11T12:50:02.000Z",
    'excerpt': "1.什么是学习 学习： 在有限的例子中，找出问题和答案之间规律的过程 知识： 所找出来的规律就是知识。 - 如果你没有办法描述你的知识，那你就没有真正学会它，因为学习就是在用知识压缩原本无限的信息 2.把书读薄 学习的第一步...",
    'cover': "./学习流程.png",
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
