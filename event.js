(function(window) {
    var EventCore = function() {};
    EventCore.prototype = {
        on: function(types, listener) {
            types = getTypeArray(types);
            for (var i = 0, ty; ty = types[i++];) {
                getList(this, ty).push(listener);
            }
        },
        off: function(types, listener) {
            var list, i = 0, k, l, ty, c, tmp = [];
            types = getTypeArray(types);
            while (ty = types[i++]) {
                list = getList(this, ty);
                tmp = [];
                for (k = 0, l = list.length; c = list[k++];) {
                    if (c !== listener) {
                        tmp[tmp.length] = c;
                    }
                }
                setList(this, ty, tmp);
            }
        },
        trigger: function(types, data) {
            var list, i = 0,
                k = 0,
                len, ty;
            types = getTypeArray(types);
            while (ty = types[i++]) {
                list = getList(this, ty);
                for (len = list.length; k < len; k++) {
                	list[k].apply(this, data);
                }
            }
        }
    };

    function getTypeArray(types) {
        return types.split(/\s+/);
    }

    function getList(obj, type) {
        var controller = obj.__controller;
        controller = controller || (obj.__controller = {});
		controller[type] = controller[type] || [];     
        return controller[type];
    }

    function setList(obj, type, list) {
        obj.__controller[type] = list;
    }

    // EXPOSE
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return EventCore;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = EventCore;
    } else {
        window.EventCore = EventCore;
    }
})(window);
