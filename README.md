# urlparse.js
a javascript tool to parse url

# Usage

	urlParse('http://w3cboy.com/post/2015/03/%E6%8A%93%E5%8C%85%E7%A5%9E%E5%99%A8Fiddler/index.html?key=123&key=456&q=w3cboy&keyword=%E6%8A%93%E5%8C%85%E7%A5%9E%E5%99%A8#index')
	
	//return
	{
		hash: "index",
		host: "w3cboy.com",
		password: undefined,
		path: "/post/2015/03/抓包神器Fiddler/index.html",
		port: 80,
		protocol: "http",
		query: {
			key: ['123', '456'],
			keyword: "抓包神器",
			q: 'w3cboy'
		},
		queryString: "key=123&key=456&q=w3cboy&keyword=抓包神器",
		url: "http://w3cboy.com/post/2015/03/抓包神器Fiddler/index.html?key=123&key=456&q=w3cboy&keyword=抓包神器#index",
		user: undefined
	}
	





