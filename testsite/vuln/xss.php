<?php
session_start();



echo "hey";
?>

<form>
	<input type="text" name="userinput">
	<input type="submit" name="SUBMIT">
</form>

<?php

if (isset($_GET['userinput'])) {
	echo $_GET['userinput'];
} else {
	echo "no input";
}
?>