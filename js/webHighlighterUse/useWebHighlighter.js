// import Highlighter from '../web-highlighter/web-highlighter.min.js';
// import LocalStore from './local.store';

const mystore = new LocalStore();

// 不高亮 pre&code 元素
const highlighter = new Highlighter({
    exceptSelectors: ['pre', 'code']
});

// 添加一些交互监听
highlighter
    .on('selection:hover', ({id}) => {
        // 通过添加 class，实现类似 hover 效果
        highlighter.addClass('highlight-wrap-hover', id);
    })
    .on('selection:hover-out', ({id}) => {
        // 鼠标离开时清除悬停样式
        highlighter.removeClass('highlight-wrap-hover', id);
    })
    .on('selection:create', ({sources}) => {
        sources = sources.map(hs => ({hs}));
        // 存储
        mystore.save(sources);
    });

// 获取数据存储，将高亮区域还原展示在网页上
setTimeout(() => {
    mystore.getAll().forEach(
        ({hs}) => highlighter.fromStore(hs.startMeta, hs.endMeta, hs.text, hs.id)
    );
}, 1000);

highlighter.run()