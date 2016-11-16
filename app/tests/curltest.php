<?php
/*
// cURL
$ch = curl_init();

curl_setopt_array($ch, array(
    CURLOPT_RETURNTRANSFER => 1,
	CURLINFO_HEADER_OUT => true,
	CURLOPT_HEADER => true,
	CURLOPT_SSL_VERIFYPEER => false, // source: http://unitstep.net/blog/2009/05/05/using-curl-in-php-to-access-https-ssltls-protected-sites/
    CURLOPT_URL => "www.google.com"
));

$tmpfname = 'cookie.txt';
curl_setopt($ch, CURLOPT_COOKIEJAR, realpath($tmpfname));
curl_setopt($ch, CURLOPT_COOKIEFILE, $tmpfname);

// Get the Response
$resp = curl_exec($ch);

// Remember the Request
$req = curl_getinfo($ch);
*/
        // create curl resource 
        $ch = curl_init(); 

        // set url 
        curl_setopt($ch, CURLOPT_URL, "http://www.example.com/"); 

        //return the transfer as a string 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 

        // $output contains the output string 
        $output = curl_exec($ch); 
		if ($output === false) $output = curl_error($ch);
        // close curl resource to free up system resources 
        curl_close($ch); 

print $output;



?>