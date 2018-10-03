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
	    case 'select_types_feedback':    
		    $lang=$_GET['lang'];
            $sql="SELECT * FROM ancienttempledb.type_feedbacks;";
		    $result = $conn->query($sql);
            $types=array();           
		    if ($result->num_rows > 0) {
			    // output data of each row
			    while($row = $result->fetch_assoc()) {
                    $type=array($row["type_temple_id"], $row["type_temple_name_" . $lang], $row["type_temple_text_" . $lang], $row["type_temple_img"]);                
			        $types[]=$type;          
		        }               
                echo json_encode($types);               
		    } else {
			    echo "NoTypes";
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
                    $temple_part=array($row["temples_part_id"], $row["sculpture_temple_part_id"], $row["temples_part_name_" . $lang] , $row["temples_part_X"], $row["temples_part_Y"], $row["temples_part_Y"], $row["temples_part_Z"]);                
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
