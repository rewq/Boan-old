<!doctype html>
<html>
    <head>
        <title>Boan 보안</title>

        <link rel="stylesheet" type="text/css" href="css/style.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

    </head>
    <body>
        <div id="menuBar">
            <!-- <h1>Boan</h1> -->

    		<form id="scan">
    			<label>URL: </label>
    			<input type="text" name="target" value="http://66726f737479.xyz/testsite/">
    			<input type="submit" name="start_scan" value="Scan">
                <input type="button" name="stop_scan" value="Stop">
    		</form>
        </div>

        <div id="treeview">
            <ul id="tree">
                
            </ul>
        </div>


		<div id="statusbar">
			<ul></ul>
		</div>

        
    </body>

    <script src="js/main.js"></script>
</html>
