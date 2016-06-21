'use strict';
window.jq = function (selector) {
    let elements;
    if (selector.innerHTML !== undefined)
        elements = [selector];
    else
        elements = document.querySelectorAll(selector);        
    
    let jq_object = {        
        addClass: function (classname) {
            this.classList.add(classname);
            return this;
        },
        append: function (child) {
            let span = document.createElement('span');
            if (child.innerHTML !== undefined) {
                span.innerHTML = child.innerHTML;
            } else {
                span.innerHTML = child;   
            }            
            this.appendChild(span);
            return this;
        },
        html: function (html) {
            if (!html) {
                return this.innerHTML;
            } else {
                this.innerHTML = html;
            }
            
            return this;
        },
        css: function (css_obj) {            
            for (let prop in css_obj) {
                this.style[prop] = css_obj[prop];
            }            
            return this;
        }
    }; 
    
    let jq_objects = {
        each: function(func) {            
            for (let i = 0; i < elements.length; i++) {
                (function(element, index) {                    
                    func.apply(element, [index]);
                })(elements[i], i)                
            }
            return this;
        },
        addClass: function (classname) {
            this.each(function () {
                this.classList.add(classname);
            });
            return this;
        },
        append: function (child) {            
            this.each(function () {
                if (child[0] !== undefined) {
                    for (let i = 0; i < child.length; i++) {
                        (function(element, i) {
                            jq_object.append.apply(element, [child[i]]);
                        })(this, i);
                        
                    }                    
                } else {
                    jq_object.append.apply(this, [child]);   
                }                
            });
            return this;
        },
        html: function (html) {
            this.each(function () {
                jq_object.html.apply(this, [html]);
            });
        },
        css: function (css_object) {
            this.each(function () {
                jq_object.css.apply(this, [css_object]);
            });
        }
    };
    
    for (let i = 0; i < elements.length; i++) {        
        elements[i] = Object.assign(elements[i], jq_object);
    }
    
    elements = Object.assign(elements, jq_objects);
    
    
    //return jq_object;
    return elements;
};