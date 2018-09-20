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
	    case 'select_activities':    
		    $lang=$_GET['lang'];
            $sql_activities="SELECT * FROM construction_activities";
		    $activities_result = $conn->query($sql_activities);
            $activities=array();    
		    if ($activities_result->num_rows > 0) {
			    // output data of each row
			    while($row = $activities_result->fetch_assoc()) {
                    $activity=array($row["stage_id"], $row["activity_no"], $row["activity_desc_" . $lang], $row["activity_image"]);                
			        $activities[]=$activity;          
		        }               
                echo json_encode($activities);               
		    } else {
			    echo "Δεν υπάρχoυν δραστηριότητες!";
		    }	
		    break;
        }
    $conn->close();
?>