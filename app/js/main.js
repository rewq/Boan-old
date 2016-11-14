/* GLOBALS */

var pages = [];

var already_searched = [];

var treeview = $("#treeview ul");

var main_target = {};




$(function() { // BEGIN DOCUMENT READY

console.log("=== main.js loaded ===");  // Loaded message



$('#scan').on('submit', function(e) {
    e.preventDefault();  

    var target = $('input[name="target"]').val();

    setup(target); // set some global vars

    console.log(main_target.source);

	crawl(main_target.source)

});


$('input[name="stop_scan"]').on('click', function(e) {
    e.preventDefault();  

    log("Scanner stopped");
});


}); // END



/* UTILITY FUNCTIONS */
function setup(t) {

 main_target = parseURL(t);

}

function log(t) {
/*
	Console logs to status bar
*/
	var sbar = $("#statusbar ul");
	sbar.append('<li>'+t+'</li>');
	$("#statusbar").scrollTop($("#statusbar")[0].scrollHeight);
	return true;
}

function crawl(target){
    
    log("Crawling "+target);

    $.getJSON( "php/crawl.php", {url: target}).done(function( data ) {
		
		var indx = pages.push(data) -1; // returns index of item pushed to array
		treeviewadd(indx,data.page);

		already_searched.push(data.page.path+data.page.query);

		for (var i = data.links.length - 1; i >= 0; i--) {

			//console.log("php obj",data.links[i])

			console.log(main_target.path+data.links[i].path+data.links[i].query);

			if ($.inArray(main_target.path+data.links[i].path+data.links[i].query, already_searched ) > -1) {
				continue;
			}
			crawl(main_target.source+data.links[i].path+data.links[i].query);
		}
	}); 

	return;
};

function treeviewadd (id, page) {
	treeview.append('<li data-id='+id+'>'+page.path+'</li>');
}

function parseURL(url) {
    var parser = document.createElement('a'),
        searchObject = {},
        queries, split, i;
    // Let the browser do the work
    parser.href = url;
 
    return {
    	source: parser.protocol+"//"+parser.host+parser.pathname+parser.search,
        protocol: parser.protocol,
        host: parser.host,
        hostname: parser.hostname,
        port: parser.port,
        path: parser.pathname,
        query: "?"+parser.search,
        hash: parser.hash
    };
}

function parseUri (str) {
/*
	Parses url into parts
	Source: http://blog.stevenlevithan.com/archives/parseuri
*/
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
};

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};
