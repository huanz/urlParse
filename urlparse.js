;(function(window){
	function urlParse(url){
		var urlReg = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/,
            qsReg = /([^=&]+)(=([^&]*))?/g,
            fields = urlReg.exec(url),
            qs = fields[9],
            decode = decodeURIComponent,
            match = null,
            query = {};
        if(qs){
            while (match = qsReg.exec(qs)){
                var key = decode(match[1].replace(/\+/g,' ')),
                    value = match[3] ? urlParse.decode(match[3]) : '';
                if (query[key]){
                	if(!isArray(query[key])) query[key] = [query[key]];
                    query[key].push(value);  
                }else{
                    query[key]= value;
                }
            } 
        }
    	return {
    		url: decode(fields[0]),
    		protocol: fields[2] || 'http',
    		host: fields[6],
    		port: fields[7] || 80,
    		user: fields[4],
    		password: fields[5],
    		path: decode(fields[8]),
    		query: query,
    		hash: fields[10],
    		queryString: decode(fields[9])
    	}
	}
	urlParse.decode = function(s){
		s = s.replace(/\+/g,' ');
    	s = s.replace(/%([EF][0-9A-F])%([89AB][0-9A-F])%([89AB][0-9A-F])/gi, function(code,hex1,hex2,hex3){
            var n1 = parseInt(hex1,16)-0xE0,
            	n2 = parseInt(hex2,16)-0x80;
            if (n1 == 0 && n2 < 32) return code;
            var n3 = parseInt(hex3,16)-0x80,
            	n = (n1<<12) + (n2<<6) + n3;
            if (n > 0xFFFF) return code;
            return String.fromCharCode(n);
        });

    	s = s.replace(/%([CD][0-9A-F])%([89AB][0-9A-F])/gi, function(code,hex1,hex2){
            var n1 = parseInt(hex1,16)-0xC0;
            if (n1 < 2) return code;
            var n2 = parseInt(hex2,16)-0x80;
            return String.fromCharCode((n1<<6)+n2);
        });

    	s = s.replace(/%([0-7][0-9A-F])/gi, function(code,hex){
            return String.fromCharCode(parseInt(hex,16));
        });

    	return s;
	}

    function isArray(obj){
        var toString = Object.prototype.toString;
        return (Array.isArray || function(obj) {
            return toString.call(obj) === '[object Array]';
        })(obj);
    }
    
	window.urlParse = urlParse;
})(window);