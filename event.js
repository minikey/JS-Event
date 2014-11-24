(function (window) {
	var EventCore = function () {};
	EventCore.prototype = {
		on: function(types, listener) {
			types = types.split(/\s+/);
			for (var i=0, ty; ty = types[i++];) {
				getList(this, ty).push(listener);
			}
		},

		off: function(types, listener) {
			types = types.split(/\s+/);
			var list, k, l, tmp = [];
			for (var i=0, ty; ty = types[i++];) {
				list = getController(this, ty);
				tmp = [];
				for (k = 0, l = list.length, c; c = list[k++];) {
					if(c !== listener) {
						tmp[tmp.length] = c;
					}
				}
				
			}
		}
	};

	function getList (obj, type) {
		var controller = obj.__controller;
		controller = controller || (obj.__controller = {});

		return controller[type] || (controller[type] = []);
	}

	// EXPOSE
	if (typeof define === 'function' && define.amd) {
		define(function() {return EventCore;});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = EventCore;
	} else {
		window.EventCore = EventCore;
	}
})(window);
