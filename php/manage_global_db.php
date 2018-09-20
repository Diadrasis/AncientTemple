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
     
    case 'select':
		$gameuser=$_GET['user'];
		$gamepsw=$_GET['psw'];

		$sql="SELECT playerpsw FROM players WHERE playername='$gameuser' LIMIT 1";
		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
			// output data of each row
			while($row = $result->fetch_assoc()) {
				if ($gamepsw===$row["playerpsw"]){
					echo "welcome ". $gameuser . "!";
				} else {
					echo "password is wrong...";
				}
			}
		} else {
			echo "user not exists";
		}	
		break;

	case 'GetPlayerID':
		$gameuser=$_GET['user'];
		$gamepsw=$_GET['psw'];

		$sql="SELECT playerid FROM players WHERE playername='$gameuser' AND playerpsw='$gamepsw'";
		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				// output data of each row
				echo $row["playerid"];
			}
		} else {
			echo "Δεν υπάρχει χρήστης με το όνομα ".$gameuser." kai psw ".$gamepsw;
		}	
		break; 
	case 'insert':
        
		$gameuser=$_GET['user'];
		$gamepsw=$_GET['psw'];

		$sqlSelect="SELECT playerid FROM players WHERE playername='$gameuser'"; 
		$result=$conn->query($sqlSelect);

		if ($result->num_rows=== 0){
			$sql="INSERT INTO players (playername, playerpsw) VALUES ('$gameuser','$gamepsw')";
			if ($conn->query($sql) === TRUE) {
                //read new player id				
                $sqlSelect2="SELECT playerid FROM players WHERE playername='$gameuser'";
                $result2=$conn->query($sqlSelect2);                
                if ($result2->num_rows>0){                    
                    while($row = $result2->fetch_assoc()) {			
                        $newPlayerId=$row["playerid"];				        
			        }
                    echo "newuser:" . $newPlayerId;
                }
			} else {
				echo "Error inserting record: " . $conn->error;
			}			
		} else {
			echo "userexists";			
		}
		break;
	case 'delete':
		$gameuser=$_GET['user'];	
		$sql="DELETE FROM players WHERE playername='$gameuser'";
		if ($conn->query($sql) === TRUE) {
			echo "Record deleted successfully" ;
		} else {
			echo "Error deleting record: " . $conn->error;
		}
		break;
	case 'update':
		$gameuser=$_GET['user'];
		$gamepsw=$_GET['psw'];
		$sql="UPDATE players SET playerpsw='$gamepsw' WHERE playername='$gameuser'";
		if ($conn->query($sql) === TRUE) {
			echo "Record updated successfully";
		} else {
			echo "Error updating record: " . $conn->error;
		}
		break;
    case 'SetPlayerHomeImage':
        $player_id=$_GET['player_id'];
        $player_house_file=$_GET['player_house_file'];
        $sqlupdate="UPDATE ancienttempledb.players SET player_house_file='" . $player_house_file . "' WHERE playerid=$player_id";
        if ($conn->query($sqlupdate) === TRUE) {
			echo "To νέο σπίτι αποθηκεύτηκε" ;
		} else {
			echo "Error updating record: " . $conn->error;
		}
        break;
        //echo json_encode($score_points);		
	 case 'GetBestScores':
        $best_scores=array();                    
        $sql="SELECT (scores.playerid) as id , (players.playername) as username, SUM(scores.scorepoints) AS totalpoints, COUNT(scores.gameid) AS wingames 
            FROM ancienttempledb.scores as scores 
            LEFT JOIN ancienttempledb.players as players ON scores.playerid=players.playerid 
            GROUP BY scores.playerid, players.playername
            ORDER BY totalpoints DESC
            LIMIT 10";          
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {               
                $best_score=array($row["username"],$row["totalpoints"], $row["wingames"]);
                $best_scores[]=$best_score;             			
			}
            echo json_encode($best_scores) ;           
		} else {
            echo "Δεν υπάρχoυν βαθμολογίες!!!";
        }        
		break;
    case 'GetGameScores':
		$player_id=$_GET['player_id'];
		$game_scores=array();
		$sql="SELECT gameid, scorepoints FROM ancienttempledb.scores WHERE playerid=$player_id";
		$result = $conn->query($sql);
		if ($result->num_rows > 0) { 
			while($row = $result->fetch_assoc()) {			
                $game_score=array($row["gameid"],$row["scorepoints"]);
				$game_scores[]=$game_score;
			}            
		} 
		echo json_encode($game_scores);			
		break;	
	case 'GetGameScore':
        $player_id=$_GET['player_id'];
        $game_id=$_GET['game_id'];        
        $sql="SELECT scorepoints FROM ancienttempledb.scores WHERE playerid=$player_id and gameid=$game_id";
        $score_points=0;
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {               
                $score_points=$row["scorepoints"];              			
			}            
		} 
        echo json_encode($score_points);
		break;
     case 'SetGameScore':
        $player_id=$_GET['player_id'];
        $game_id=$_GET['game_id']; 
        $score_points=$_GET['score_points'];        
        $sql="SELECT scoreid, scorepoints FROM ancienttempledb.scores WHERE playerid=$player_id and gameid=$game_id LIMIT 1";
        $current_points=0;
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
                $score_id= $row["scoreid"];              
                $current_points=$row["scorepoints"];                              			
            }
            echo "Η νεά βαθμολογία σου είναι " . $score_points;
            echo "Η palia βαθμολογία σου είναι " . $current_points;
            if ($score_points>$current_points){
                //echo json_encode($score_id);
                $sqlupdate="UPDATE ancienttempledb.scores SET scorepoints=$score_points WHERE scoreid=$score_id";
                if ($conn->query($sqlupdate) === TRUE) {
			        echo "Η νεά βαθμολογία σου είναι " . $score_points;
		        } else {
			        echo "Error updating record: " . $conn->error;
		        }
                break;
            } else {
                echo "Διατηρείς τη παλιά σου βαθμολογία " . $current_points;
                break;
            }           
		} else {
             $sqlinsert="INSERT INTO ancienttempledb.scores (playerid, gameid, scorepoints) VALUES ($player_id, $game_id,$score_points)";
             if ($conn->query($sqlinsert) === TRUE) {
				echo "Προστέθηκε η βαθμολογία σου " . $score_points ;
			} else {
				echo "Error inserting record: " . $conn->error;
			}
        }
        //echo json_encode($score_points);
		break;

     case 'GetTotalScore':
        $player_id=$_GET['player_id'];               
        $sql="SELECT SUM(scorepoints) AS totalpoints FROM ancienttempledb.scores WHERE playerid=$player_id";
        $total_points=0;
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {               
                $total_points=$row["totalpoints"];              			
			}            
		} 
        echo json_encode($total_points);
		break;
	
	case 'GetGameIntroTexts':
        $lang=$_GET['lang'];
		$game_id=$_GET['game_id'];        
        $sql="SELECT gametitle_" . $lang . ", gameintro_" . $lang . ", gamecharintro_" . $lang . " FROM ancienttempledb.games WHERE gameid=$game_id";
        $intro_texts=array(); 
		$result = $conn->query($sql);
		if ($result->num_rows > 0) {           
			// output data of each row
			while($row = $result->fetch_assoc()) {               
                $intro_texts=array($row["gametitle_" . $lang],$row["gameintro_" . $lang],$row["gamecharintro_" . $lang]);              			
			}
            echo json_encode($intro_texts);
		} else {
			echo "Δεν υπάρχoυν εισαγωγές με αυτό το όνομα";
		}	
		break;

    case 'GetGameDidYouKnow':
        $lang=$_GET['lang'];
		$game_id=$_GET['game_id'];        
        $sql="SELECT questiontext_" . $lang . ", answertext_" . $lang . " ,imagefile FROM ancienttempledb.didyouknow WHERE gameid=$game_id";
        $didYouKnow=array(); 
		$result = $conn->query($sql);
		if ($result->num_rows > 0) {           
			// output data of each row
			while($row = $result->fetch_assoc()) {
                $didYouKnowItem= array($row["questiontext_" . $lang],$row["answertext_" . $lang], $row["imagefile"]);                
                $didYouKnow[]=$didYouKnowItem;              			
			}
            echo json_encode($didYouKnow);
		} else {
			echo "Δεν υπάρχoυν εγγραφές 'ήξερες ότι'";
		}	
		break;

    case 'GetPlayerAvatar':
        $player_id=$_GET['player_id'];               
        $sql="SELECT avatar_person, avatar_haircolor, avatar_clothcolor FROM ancienttempledb.players WHERE playerid=$player_id";
        $avatar=array();
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {               
                $avatar[]=array($row["avatar_person"],$row["avatar_haircolor"],$row["avatar_clothcolor"] );              			
			}
            echo json_encode($avatar);            
		}        
        break;
        
     case 'SetPlayerAvatar':
        $player_id=$_GET['player_id'];
        $person=$_GET['person'];
        $haircolor=$_GET['haircolor'];
        $clothcolor=$_GET['clothcolor'];
               
        $sql="SELECT playerid FROM ancienttempledb.players WHERE playerid=$player_id";
        //$avatar=array();
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
			$sqlupdate="UPDATE ancienttempledb.players SET avatar_person='$person', avatar_haircolor='$haircolor', avatar_clothcolor='$clothcolor' WHERE playerid=$player_id";
                if ($conn->query($sqlupdate) === TRUE) {
			        echo "To avatar είναι έτοιμο! " . $player;
		        } else {
			        echo "Error updating record: " . $conn->error;
		        }          
		} else {
            echo "Δεν βρέθηκε ο παίκτης!";
        }        
		break;
    }

    $conn->close();
?>