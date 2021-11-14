window.dom = {
    // 1.1、【增】创建一个节点
    create(string){
        // 'template'标签可以容纳任意标签
        const container = document.createElement('template')
        container.innerHTML = string.trim();
        return container.content.firstChild;
    },
    // 1.2、【增】新增一个弟弟
    after(node,node2){
        // console.log(node.nextSibling); 打印出下一个节点
        node.parentNode.insertBefore(node2,node.nextSibling);
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
        dom.before(node,parent); // 增加一个兄弟
        dom.append(parent,node); // 再追加到node后
    },
    // 2.1、【删】移除
    remove(node){
        // node.remove();该接口比较新,老些的浏览器不怎么支持
        node.parentNode.removeChild(node);
        return node;
    },
    // 2.2、【删】清空
    empty(node) {
        // node.innerHTML = '';
        const {childNodes} = node; // const childNodes = node.childNodes;
        const array = [];
        let x = node.firstChild;
        while (x){
            array.push(dom.remove(node.firstChild));
            x = node.firstChild;
        }
        return array;
    },
    // 3.1、【改】读写
    /*
     * 实现重载功能
     */
    attr(node,name,value){
        if (arguments.length === 3){
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
            return node.innerHTML = string;
        }
    },
    // 3.3、【改】改样式
    style(node,name,value){
        if (arguments.length === 3){
            // dom.style(div,'color','red')
            node.style[name] = value;
        }else if (arguments.length === 2){
            if (typeof name === 'string'){
                // dom.style(div,'color')
                return node.style[name]
            }else if (name instanceof Object){
                const object =name;
                for (let key in object){
                    // dom.style(div,{color:'red'})
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
    }
};
