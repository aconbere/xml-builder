xml = function(tag, attrs, closure){
    var node = xml.build(tag, attrs);

    if(closure) {
        var scope = {
                  xml: function(tag, attrs, closure) { node.appendChild(xml(tag, attrs, closure));},
                  text: function(t) { node.appendChild(xml.text(t)); }
                 };

        closure.apply(scope);
    }

    return node;
};

xml.escape = function(t) {
    t = t.replace(/\&/g, "&amp;");
    t = t.replace(/</g,  "&lt;");
    t = t.replace(/>/g,  "&gt;");
    return t;    
};

xml.build = function(tag, attrs){
    var node = null
    if (window.ActiveXObject) {
        node = new ActiveXObject("Microsoft.xmlDOM").createElement(tag);
    } else {
        node = document.createElement(tag);
    }

    for(var k in attrs) {
        node.setAttribute(k, attrs[k])
    }
    return node;
};

xml.text = function(t) {
    t = xml.escape(t);
    if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.xmlDOM").createTextNode(t);
    } else {
        return document.createTextNode(t);
    }
};
