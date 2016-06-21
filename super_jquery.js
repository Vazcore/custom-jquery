'use strict';
window.jq = function (selector) {
    
    let elements = document.querySelectorAll(selector);        
    
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
                jq_object.append.apply(this, [child]);
            });
            return this;
        }
    };
    
    for (let i = 0; i < elements.length; i++) {        
        elements[i] = Object.assign(elements[i], jq_object);
    }
    
    elements = Object.assign(elements, jq_objects);
    
    
    //return jq_object;
    return elements;
};