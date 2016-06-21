'use strict';

(function () {
    
    Node.prototype.addClass = function (classname) {
        this.classList.add(classname);
        return this;
    };
    
    Node.prototype.append = function (child) {
        let span = document.createElement('span');
        if (child.innerHTML !== undefined) {
            span.innerHTML = child.innerHTML;
        } else {
            span.innerHTML = child;   
        }            
        this.appendChild(span);
        return this;
    };
    
    Node.prototype.html = function (html) {
        if (!html) {
            return this.innerHTML;
        } else {
            this.innerHTML = html;
        }

        return this;
    };
    
    Node.prototype.css = function (css_obj) {            
        for (let prop in css_obj) {
            this.style[prop] = css_obj[prop];
        }            
        return this;
    };
    
    Node.prototype.attr = function (attr, val) {
        if (!val) {
            return this.getAttribute(attr);
        } else {
            this.setAttribute(attr, val);
        }
        return this;
    };
    
    NodeList.prototype.each = function (func) {
        for (let i = 0; i < this.length; i++) {
            (function(element, index) {                    
                func.apply(element, [index]);
            })(this[i], i)                
        }
        return this;
    };
    
    NodeList.prototype.addClass = function (classname) {
        this.each(function () {
            this.classList.add(classname);
        });
        return this;
    };
    
    NodeList.prototype.append = function (child) {            
        this.each(function () {
            if (child[0] !== undefined) {
                for (let i = 0; i < child.length; i++) {
                    (function(element, i) {
                        element.append(child[i]);
                    })(this, i);
                }                    
            } else {
                this.append(child);
            }                
        });
        return this;
    };
    
    NodeList.prototype.html = function (html) {
        this.each(function () {
            this.html(html);
        });
    };
    
    NodeList.prototype.css = function (css_object) {
        this.each(function () {
            this.css(css_object);
        });
        return this;
    };
    
    NodeList.prototype.attr = function (attr, val) {
        if (this[0] !== undefined) {
            this[0].attr(attr, val);
        } else {
            this.attr(attr, val);
        }
    };   
    
    
})();

window.jq = function (selector) {
    let elements;
    if (selector.innerHTML !== undefined)
        elements = selector;
    else
        elements = document.querySelectorAll(selector);        
     
    return elements;
};