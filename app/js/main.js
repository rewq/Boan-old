
console.log("=== main.js loaded ===");  // Loaded message

/* GLOBALS */

var PROBLEMS = {};

var pages = [];

var already_searched = [];

var treeview = $("#tree");

var main_target = {};

var scan_running = false;




$(function() { // BEGIN DOCUMENT READY


$('#scan').on('submit', function(e) {
    e.preventDefault(); // Stop the form from submitting  

    var target = $('input[name="target"]').val();

    setup(target); // set global vars

    scan_running = true;
	crawl(main_target.source);

});


$('input[name="stop_scan"]').on('click', function(e) {
    e.preventDefault();  
});


}); // END



function setup(t) {

 main_target = parseURL(t);

}

// http://demo.testfire.net/bank/login.aspx  casusing problems
function crawl(target){

    //console.log("scan_running",scan_running);

    if (scan_running == false) {return;}

	if ($.inArray(target, already_searched) > -1) {return;} // skip already crawled urls

    log("Crawling "+target);

	already_searched.push(target);


    $.getJSON( "php/crawl.php", {url: target}).done(function( data ) {

        console.log(data);

		var indx = pages.push(data) -1; // returns index of item pushed to array
		treeviewadd(indx,data.page);

        if (!scan_running) {return;}

		for (var i = data.links.length - 1; i >= 0; i--) {

			if ((data.links[i].host != undefined) && (data.links[i].host != main_target.host)) {continue;} // skip outside scope urls

			var new_target = main_target.source+data.links[i].path+data.links[i].query;
			crawl(new_target);
		}
	}); 

	return;
};

function treeviewadd (id, page) {
	 var path_parts = page.path.split("/");

	 for (var n = path_parts.length - 1; n >= 0; n--) {if (!path_parts[n]) {path_parts[n]="/"}}

	
	 insert(path_parts,treeview,id);
	 //treeview.append('<li data-id='+id+'>'+page.source+'</li>'); // defualt
}


function insert(p,t,idx) {

    part = p.shift();

    if (!part) {return;}

    var found = false;
    $.each($(t).children('li'), function() {
        
        if ($(this).data("p") == part) {
            t = $(this);
            if (!p.length) {t.addClass("ispage");} 
            found = true;
        }
    });

    if (!found) {
        if (t.is("li")){
            if (t.has('ul').length) {
                t = $(t.children("ul")[0]);
                p.unshift(part);
            } else {
                t.append("<ul><li data-p='"+part+"' data-idx='"+idx+"'>"+part+"</li></ul>");
                p.unshift(part);
            }
        } else {             
            t.append("<li data-p='"+part+"' data-idx='"+idx+"'>"+part+"</li>");
            p.unshift(part);
        }
    }

    insert(p,t,idx);
}


// UTILITY FUNCTIONS //

/*
	Console logs to status bar
*/
function log(t) {
	var sbar = $("#statusbar ul");
	sbar.append('<li>'+t+'</li>');
	$("#statusbar").scrollTop($("#statusbar")[0].scrollHeight);
	return true;
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

$('input[name="stop_scan"]').click(function(e){
    e.stopPropagation();
    console.log("scan stopped by button press");
    scan_running = false;
});


/* collapsable tree */
$(document).on('click', 'li', function(){
    $(this).children('ul').toggle();
    return false;  
});


/*$('#tree ul').hide();

$('#tree li').click(function(e){
    e.stopPropagation();
    if(this.getElementsByTagName("ul")[0].style.display =="block")
        $(this).find("ul").slideUp();
    else
        $(this).children(":first").slideDown();
});*/