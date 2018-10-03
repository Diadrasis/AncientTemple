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
	    case 'select_sculptures':    
		    $lang=$_GET['lang'];
            $sql_sculptures="SELECT * FROM ancienttempledb.sculptures";
		    $sculptures_result = $conn->query($sql_sculptures);
            $sculptures=array();           
		    if ($sculptures_result->num_rows > 0) {
			    // output data of each row
			    while($row = $sculptures_result->fetch_assoc()) {
                    $sculpture=array($row["sculpture_id"], $row["sculpture_temple_part_id"], $row["sculpture_file"], $row["architect_member_id"] , $row["sculpture_feedback_" . $lang], $row["sculpture_feedback_file"]);                
			        $sculptures[]=$sculpture;          
		        }               
                echo json_encode($sculptures);               
		    } else {
			    echo "NoSculptures";
		    }           	
		    break;        
        case 'select_temple_parts':    
		    $lang=$_GET['lang'];
            $sql_temple_parts="SELECT * FROM ancienttempledb.sculpture_temples_parts";
		    $temple_parts_result = $conn->query($sql_temple_parts);
            $temple_parts=array();           
		    if ($temple_parts_result->num_rows > 0) {
			    // output data of each row
			    while($row = $temple_parts_result->fetch_assoc()) {
                    $temple_part=array($row["temples_part_id"], $row["architect_member_id"], $row["temples_part_name_" . $lang] , $row["temples_part_X"], $row["temples_part_Y"], $row["temples_part_W"], $row["temples_part_H"]);                
			        $temple_parts[]=$temple_part;          
		        }               
                echo json_encode($temple_parts);               
		    } else {
			    echo "NoTemple";
		    }           	
		    break;
        }
    $conn->close();
?>
