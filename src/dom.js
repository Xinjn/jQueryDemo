window.dom = {
    create(string){
         //template标签为包裹任意标签
        const container = document.createElement("template") 
         //通过trim去除两边空格，否则获取空文本节点
        container.innerHTML = string.trim()
         //通过Element.content.firstChild返回节点
        return container.content.firstChild
    },
    before(node,node2){
      //找到当前节点的父元素，调用父元素方法插入子节点
     node.parentNode.insertBefore(node2,node)
    }
}

