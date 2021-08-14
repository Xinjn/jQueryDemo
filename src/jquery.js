window.$ = window.jQuery = function(selectorOrArrayOrTemplate){
    let elements
    if(typeof selectorOrArrayOrTemplate === 'string'){
    if (selectorOrArrayOrTemplate[0] === "<") {
        // 创建 div
        elements = [createElement(selectorOrArrayOrTemplate)];
        
    } else {
        // 查找 div
        elements = document.querySelectorAll(selectorOrArrayOrTemplate);
    }
    }else if(selectorOrArrayOrTemplate instanceof Array){ 
        elements = selectorOrArrayOrTemplate

    }


    function createElement(string) {
        const container = document.createElement("template")
        container.innerHTML = string.trim()
        return container.content.firstChild
    }

    //原理：让api.__proto__原型指向jQuery.prototype：解决相同属性使用同一原型链，避免开辟多余原型链
    const api = Object.create(jQuery.prototype) //添加原型链方法：创建一个对象，这个对象的__proto__为括号里面的东西
    //等价于const api = {__proto__:jQuery.prototype}

    api.oldApi = selectorOrArrayOrTemplate.oldApi//旧的api
    api.elements = elements//为了让jQuery.prototype中的方法访问到elements参数,jQuery.prototype中elements方式添加this调用，负责无法调用
    return api
}


// 实例.__protp__ ==== 构造函数.prototype
//api.__proto__ === jQuery.prototype

jQuery.fn = jQuery.prototype = { //把公用属性全部放到jQuery.prototype上//
    constructor:jQuery,//prototype.constructor仅仅可以用于识别对象是由哪个构造函数初始化的，仅此而已
    //通用
    each(fn){
        for(let i=0;i<this.elements.length;i++){
        fn.call(null,this.elements[i],i)
        }
        return this
    },
    print(){
        console.log(this.elements)
        return this
    },
    //查
    find(selector){
        let array = []
        for(let i= 0;i<this.elements.length;i++){
            const elements2 = Array.from(this.elements[i].querySelectorAll(selector))
            array = array.concat(elements2)
        }
        array.oldApi = this //this为省略对象名api：把api身上的方法复制到array.oldApi变量中为旧api
        return jQuery(array) //把旧api方法添加到jQuery中的oldApi属性中（this.oldApi）

    },
    end() {
        //console.log(this);//链式调用新api链
        //console.log(this.oldApi);//返回旧api链
        return this.oldApi  // this 现在是新的 api2，从新的api2返回到旧的api1
    },
    parent(){
        const array = []
        this.each((node)=>{
            if(array.indexOf(node.parentNode) === -1){ //去除重复数据
                array.push(node.parentNode)
            }
        })
        return jQuery(array)
    },
    //查
    children() {
        const array = [];
        this.each(node => {
                array.push(...node.children);
        });
        return jQuery(array);
    },
    siblings() {
        const array = [];
        this.each(node => {
            array.push(...Array.from(node.parentNode.children).filter(n =>
                n !== node
            ))
        });
        return jQuery(array);
    },
    index() {
        let array = [];
        this.each(node => {
            array.push(...Array.from(node.parentNode.children))
        });
        for (let i = 0; i < array.length; i++){
            if (array[i] === this.elements[0]) {
                console.log(i);
            }
        }
        return this;
    },
    next() {
        let array = []
        let x = this.elements[0].nextSibling
        while (x && x.nodeType === 3) {
            x = x.nextSibling
        }
        array.push(x)
        return jQuery(array);
    },
    prev() {
        let array = []
        let x = this.elements[0].previousSibling
        while (x && x.nodeType === 3) {
            x = x.previousSibling
        }
        array.push(x)
        return jQuery(array);
    },
    //增
    addClass(className) {
        for(let i=0;i<this.elements.length;i++){
                this.elements[i].classList.add(className)
        }
        return this
    },
    appendTo(node) {//插入到当前节点
        if (node instanceof Element) {
            this.each(el => {
                node.appendChild(el)
            })
        }
        return this
    },
    //删
    remove(childrenSelector) {
        const selector = document.querySelectorAll(childrenSelector)

        this.elements[0].removeChild(selector[0])
        return this
    },
    empty() {
        this.elements[0].parentNode.removeChild(this.elements[0])
        return this
    },
    //改
    text(string) {
        if (arguments.length === 0) {//读取
            console.log(this.elements[0].innerText);
        } else if (arguments.length === 1) {//写入
            this.elements[0].innerText = string
        }
        return this
    },
    html(string) {
        if (arguments.length === 0) {//读取
            console.log(this.elements[0].innerHTML);
        } else if (arguments.length === 1) {//写入
            this.elements[0].innerText = string
        }
        return this
    },
    arrt(name, value) {
        let array = []
        if (arguments.length === 1) {//读取
            array.push(this.elements[0].getAttribute(name))
            console.log(this.elements[0].getAttribute(name)); 
        } else if (arguments.length === 2) {//写入
            this.elements[0].setAttribute(name,value)
        }
        return jQuery(array);
    },
    css(name, value) {
        let array = []
        //写入：dom.style(div,'color','red')
        if (arguments.length === 2) {
            this.elements[0].style[name] = value
        
        } else if (arguments.length === 1) {

            //读取：dom.style(div,'color')
            if (typeof name === 'string') {
                array.push(name)

            //写入：dom.style(test,{border:"1px solid red",color:"blue"})  
            } else if(name instanceof Object){
                let object = name
                
                for (let key in object) {
                    this.elements[0].style[key] = object[key]
                }
            }
        }
        return jQuery(array);
    },
    on(eventName,fn) {
        this.elements[0].addEventListener(eventName,fn)
    },
    off(eventName,fn) {
        this.elements[0].removeEventListener(eventName,fn)
    }

}