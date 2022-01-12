/* 1、【增】相关的操作 */
// 1.1、【增】创建一个节点
const div = dom.create("<div>newDiv</div>");
console.log(div)
// 1.2、【增】新增一个弟弟
dom.after(test,div);
// 1.3、【增】新增一个哥哥(这里会将上一步的div移到test前)
dom.before(test,div);
// 1.4、【增】增加一个儿子(这里会将上一步的div移到test中，被test包裹)
dom.append(test,div);
// 1.5、【增】新增一个爸爸(这里会将上一步的div移到test之外，包裹test)
dom.wrap(test,div);

/* 2、【删】删除的相关 */
// 2.1~2.2、【删】清空子节点
const nodes = dom.empty(window.empty);
console.log(nodes)

/* 3、【改】改操作的相关 */
// 3.1、【改】实现写属性操作
dom.attr(test,'title',"hi,I'm weiranyi");
// 实现读操作
const title = dom.attr(test,'title');
console.log(`title:${title}`);
// 3.2、【改】写文本
dom.text(test,'您好，这是新的内容');
// 读取文本操作
dom.text(test);
// 3.3、【改】改样式
dom.style(test,{border:'1px solid red',color:'blue'});
console.log(dom.style(test,'border')); // 读取border的值
dom.style(test,'border','1px solid black');
// 3.4、class属性设置
dom.class.add(test,'red');
dom.class.add(test,'blue');
dom.class.remove(test,'blue');
console.log(dom.class.has(test,'blue')); //false
// 3.5、【改】改事件
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
console.log(dom.index(dom.find('#t2')[0]))