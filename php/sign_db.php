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
		switch($action)
		{

		case 'select_words_from_sign':   
		 
			$signid=$_GET['sign_id'];
            $sql_activities="SELECT * FROM sign_words WHERE sign_id='$signid'";
		    $words_results = $conn->query($sql_activities);
			$words=array();    
			
		    if ($words_results->num_rows > 0) 
			{
			    // output data of each row
			    while($row = $words_results->fetch_assoc()) 
				{
                    $word=array($row["signX"], $row["signY"], $row["signW"], $row["signH"], $row["textX"], $row["textY"], $row["textW"], $row["textH"], $row["sign_word_id"], $row["sign_text_id"]);                
			        $words[]=$word;          
		        }               
                echo json_encode($words);               
		    } else {
			    echo "Δεν υπάρχoυν λέξεις!";
			}	
			
		    break;
        }
    $conn->close();
?>
