window.dom = {
    // 1.1、【增】创建一个节点
    create(string){
        // 'template'标签可以容纳任意标签
        const container = document.createElement('template')
        container.innerHTML = string.trim();
        return container.content.firstChild;
        /* 操作template里面的dom，不能直接用template，要用template.content
        * */
    },
    // 1.2、【增】新增一个弟弟
    after(node,node2){
        // console.log(node.nextSibling); 打印出下一个节点
        node.parentNode.insertBefore(node2,node.nextSibling);
        /* node.nextSibling：下一个节点为：文本节点、null都可以运行
        * */
    },
    // 1.3、【增】新增一个哥哥
    before(node,node2) {
        node.parentNode.insertBefore(node2,node);
    },
    // 1.4、【增】增加一个儿子
    append(parent,node){
        parent.appendChild(node);
    },
    // 1.5、【增】新增一个爸爸
    wrap(node,parent){
        dom.before(node,parent); // 增加一个兄弟（1、parent做哥哥）
        dom.append(parent,node); // 再追加到node后（2、parent做爸爸）
    },
    // 2.1、【删】移除
    remove(node){
        // node.remove();该接口比较新,老些的浏览器不怎么支持
        node.parentNode.removeChild(node);
        return node;
    },
    // 2.2、【删】清空
    empty(node) {
        // node.innerHTML = ''; 就没有节点的引用了
        const {childNodes} = node; // const childNodes = node.childNodes;
        const array = [];
        let x = node.firstChild;
        while (x){
            array.push(dom.remove(node.firstChild));
            x = node.firstChild;
        }
        /*
        * 移除childNodes的节点时，length是动态变化的，所以采用while来遍历了！！！
        * */
        return array;
    },
    // 3.1、【改】读写
    /*
     * 实现重载功能
     */
    attr(node,name,value){
        // 重载3个参数、2个参数
        if (arguments.length === 3){
            // 当参数长度
            node.setAttribute(name,value);
        }else if (arguments.length ===2){
            return node.getAttribute(name);
        }

    },
    // 3.2、【改】写文本，具体情况具体分析
    text(node,string) { // 适配、兼容
        if (arguments.length === 2){
            if ('innerText' in node) {
                node.innerHTML = string; // ie
            } else {
                node.textContent = string; // firefox,Chrome
            }
        }else if (arguments.length===1){
            if ('innerText' in node) {
                return node.innerHTML;
            } else {
                return node.textContent;
            }
        }
    },
    html(node,string){
        if (arguments.length===2){
            node.innerHTML = string;
        }else if (arguments.length===1){
            return node.innerHTML;
        }
    },
    // 3.3、【改】改样式
    style(node,name,value){
        if (arguments.length === 3){
            // dom.style(test,'border','1px solid black');
            node.style[name] = value;
        }else if (arguments.length === 2){
            if (typeof name === 'string'){
                // dom.style(test,'border')
                return node.style[name]
            }else if (name instanceof Object){
                const object =name; // 设置别名
                for (let key in object){
                    // dom.style(test,{border:'1px solid red',color:'blue'});
                    // key:border/color
                    // node.style.border = ...
                    // node.style.color = ...
                    node.style[key] = object[key];
                }
            }
        }
    },
    // 3.4、【改】改样式
    class:{
        add(node,className){
            node.classList.add(className);
        },
        remove(node,className){
            node.classList.remove(className);
        },
        has(node,className){
            return node.classList.contains(className);
        }
    },
    // 3.5、【改】改事件
    on(node,evenName,fn){
        node.addEventListener(evenName,fn)
    },
    off(node,evenName,fn){
        node.removeEventListener(evenName,fn)
    },

    // 4.1、【查】
    find(selector,scope){
        // 返回一个数组,有范围就用scope，没有就从document中找
        return (scope || document).querySelectorAll(selector)
    },
    parent(node){
        return node.parentNode;
    },
    children(node){
        return node.children;
    },
    siblings(node){
        // 兄弟姐妹伪数组，再通过Array.from转换为数组
        return Array.from(node.parentNode.children)
            .filter(n=>n !== node);
    },
    next(node){
        // 下一个节点
        let x = node.nextSibling
        while (x&& x.nodeType === 3){
            x = x.nextSibling
        }
        return x;
    },
    previous(node){
        // 下一个节点
        let x = node.previousSibling
        while (x&& x.nodeType === 3){
            x = x.previousSibling
        }
        return x;
    },
    each(nodeList,fn){
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null,nodeList[i]);
        }
    },
    index(node){
        const list = dom.children(node.parentNode)
        let i;
        for (i = 0; i < list.length; i++) {
            if (list[i]===node){
                    break;
            }
        }
        return i;
    }

};
