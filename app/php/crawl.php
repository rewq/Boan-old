<?php
/*
	crawl.php
*/

if (!isset($_GET['url'])) {
	echo json_encode(array('err' => "no url"));
	exit();
}

$target = $_GET['url'];

// cURL
$ch = curl_init();
curl_setopt_array($ch, array(
    CURLOPT_RETURNTRANSFER => 1,
	CURLINFO_HEADER_OUT => true,
	CURLOPT_HEADER => true,
	CURLOPT_SSL_VERIFYPEER => false, // source: http://unitstep.net/blog/2009/05/05/using-curl-in-php-to-access-https-ssltls-protected-sites/
    CURLOPT_URL => $target
));

// Get the Response
$resp = curl_exec($ch);

// Remember the Request
$req = curl_getinfo($ch);

curl_close($ch);

// Find Links in Response
$links = array();
$dom = new DOMDocument;
$dom->loadHTML($resp);

$urls = $dom->getElementsByTagName('a');
foreach ($urls as $url){
	$p = parse_url($url->getAttribute("href"));

	if (isset($p['query'] )) {
		$p['query'] = "?"+$p['query'];
	} else {
		$p['query'] = "".$p['query']; // so that it is always defined
	}


	// filter ones that arent same domain



	$links[] = $p; 

}


$tp =  parse_url($target);
if (isset($tp['query'] )) {
	$tp['query'] = "?"+$tp['query'];
} else {
	$tp['query'] = "".$tp['query']; // so that it is always defined
}

// Render
$output = array(
	'page' => $tp,
	'request' => $req, 
	'response' => htmlentities($resp), 
	'links' => $links, 
);

echo json_encode($output);
?>