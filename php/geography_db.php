<?php
	
	$servername = "5.172.201.61:3306";
	$username = "templeuser";
	$password = "!temple$1";
	$dbname = "ancienttempledb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$action=$_GET['action'];
	switch($action){
	case 'selecttemples':    
		$lang=$_GET['lang'];
    $sqltemples="SELECT * FROM geography_temples";
		$templesresult = $conn->query($sqltemples);
    $temples=array();
    
		if ($templesresult->num_rows > 0) {
			// output data of each row
			while($row = $templesresult->fetch_assoc()) {
          $mapPos=array($row["templeiconx"], $row["templeicony"]);
          $temple=array($row["templeid"],$row["templeimg"],$row["templename_" . $lang],$mapPos);
					$temples[]=$temple;          
			}
      echo json_encode($temples);
		} else {
			echo "Δεν υπάρχoυν ναοί!";
		}	
		break;
  
	case 'selectquestions':
		$lang=$_GET['lang'];
		$sqlquestions="SELECT * FROM geography_questions";
		$questionsresult = $conn->query($sqlquestions);
    $questions=array();

		if ($questionsresult->num_rows > 0) {
			// output data of each row
			while($row = $questionsresult->fetch_assoc()) {				
					$question=array($row["templeid"],$row["questtext_" . $lang],$row["feedbacktext_" . $lang]);
          $questions[]=$question;          				
			}
      echo json_encode($questions);     
		} else {
			echo "Δεν υπάρχoυν ερωτήσεις!";
		}	
		break;
}

$conn->close();
?>