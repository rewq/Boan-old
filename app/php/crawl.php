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

$tmpfname = 'cookie.txt';
curl_setopt($ch, CURLOPT_COOKIEJAR, realpath($tmpfname));
curl_setopt($ch, CURLOPT_COOKIEFILE, $tmpfname);

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
	$p['source'] = $url->getAttribute("href");

	/* problem currently cant handle relative urls */ 
	$p['path'] = str_replace("../", "", $p['path']);
	$p['source'] = str_replace("../", "", $p['source']);

	if (isset($p['query'] )) {
		$p['query'] = "?".$p['query'];
	} else {
		$p['query'] = " "; // so that it is always defined
	}

	// filter out same domain so we dont have to in js?
	$links[] = $p; 
}


$tp =  parse_url($target);
if (isset($tp['query'] )) {
	$tp['query'] = "?".$tp['query'];
} else {
	$tp['query'] = ""; // so that it is always defined
}
$tp['source'] = $target;
// Render
$output = array(
	'page' => $tp,
	'links' => $links, 
	//'request' => $req, 
	//'response' => htmlentities($resp), 
);

echo json_encode($output);
?>