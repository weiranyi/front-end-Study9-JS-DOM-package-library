// 创建节点
const div = dom.create('<td>12</td>');
console.log(div);

// 添加弟弟节点
dom.after(test,div);

//
const div3 = dom.create('<div id="parent"></div>')
dom.wrap(test,div3);

// 删除节点
const nodes = dom.empty(window.empty);
console.log(nodes);

// 实现写操作
dom.attr(test,'title',"hi,I'm weiranyi");
// 实现读操作
const title = dom.attr(test,'title');
// 输出到控制台
console.log(`title:${title}`);
// 写文本操作
dom.text(test,'您好，这是新的内容');
// 读取文本操作
dom.text(test);

// 改样式
dom.style(test,{border:'1px solid red',color:'blue'});
console.log(dom.style(test,'border')); // 读取border的值
dom.style(test,'border','1px solid black');

//修改样式
dom.class.add(test,'red');
dom.class.add(test,'blue');
dom.class.remove(test,'blue');
console.log(dom.class.has(test,'blue'))

// 事件
const fn = ()=>{
    console.log('点击了');
}
dom.on(test,'click',fn)
dom.off(test,'click',fn)

const testDiv = dom.find('#test')[0]
console.log(testDiv)
const testDiv2 = dom.find('#test2')[0]
console.log(dom.find('.red',testDiv2)[0])
console.log(dom.parent(test))
console.log(dom.siblings(dom.find('#s2')[0]));
console.log(dom.next(dom.find('#s2')[0]));
console.log(dom.previous(dom.find('#s2')[0]));

const t = dom.find('#travel')[0]
dom.each(dom.children(t),(n)=>dom.style(n,'color','red'))
console.log(dom.index(dom.find('#s2')[0]))