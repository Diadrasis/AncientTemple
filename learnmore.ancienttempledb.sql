-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: localhost    Database: ancienttempledb
-- ------------------------------------------------------
-- Server version	5.7.12-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `construction_activities`
--

DROP TABLE IF EXISTS `construction_activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `construction_activities` (
  `activity_id` int(11) NOT NULL AUTO_INCREMENT,
  `stage_id` int(11) DEFAULT NULL,
  `activity_no` int(11) DEFAULT NULL,
  `activity_desc_gr` mediumtext,
  `activity_desc_en` mediumtext,
  `activity_image` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`activity_id`),
  UNIQUE KEY `activity_id_UNIQUE` (`activity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `construction_activities`
--

LOCK TABLES `construction_activities` WRITE;
/*!40000 ALTER TABLE `construction_activities` DISABLE KEYS */;
INSERT INTO `construction_activities` VALUES (1,1,2,'Η πρώτη και πολύ σημαντική δουλειά που γινόταν στο λατομείο ήταν ο εντοπισμός και η επιλογή των όγκων που μπορούσαν να λατομηθούν. ','','p1.jpg'),(2,1,4,'Στο λατομείο ο όγκος αποσχίζεται από το μητρικό πέτρωμα με τη βοήθεια σιδερένιων σφηνών και μοχλών. Το συντονισμένο χτύπημα των σφηνών και η παράλληλη πίεση των μοχλών βοηθούν στην αποκόλλησή του. ','','p2.jpg'),(3,2,6,'Οι λατόμοι επεξεργάζονται τον όγκο μέχρι να αποκτήσει μία γεωμετρική μορφή όσο το δυνατόν πιο κοντά στην τελική.','','p4.jpg'),(4,1,8,'Στο λατομείο αφού ο όγκος ξεκολλήσει από το μητρικό πέτρωμα αρχίζουν να του αφαιρούν τα κομμάτια που δεν τους χρειάζονται. (Αυτά προσπαθούσαν να είναι όσο το δυνατόν μεγαλύτερα, ώστε να μπορούν να χρησιμοποιηθούν για μικρότερα αρχιτεκτονικά μέρη του κτηρίου). ',NULL,'p3.jpg'),(8,4,10,'Στο εργοτάξιο συνεχίζεται η κατεργασία του αρχιτεκτονικού μέλους δίπλα στο ναό πριν από την τοποθέτησή του στην τελική του θέση.',NULL,'p11.jpg'),(9,5,12,'Οι λίθοι τοποθετούνται στην τελική τους θέση επάνω στον ναό. Αυτό γίνεται με τη βοήθεια κυλίνδρων και μοχλών.',NULL,'p14.jpg'),(10,5,14,'Η επαφή και η σύνδεση των λίθων δεν γινόταν με υγρά συνδετικά υλικά, όπως γίνεται σήμερα, αλλά «εν ξηρώ», δηλαδή με την τέλεια επαφή των λίθων, την κατάλληλη διάταξή τους και τη σύνδεσή τους με ειδικούς συνδέσμους. Ανάμεσα από τους λίθους δεν περνούσε ούτε αέρας.',NULL,'p15.jpg'),(11,2,16,'Το αρχιτεκτονικό μέλος, αφού έχει πάρει κάποια μορφή, φορτώνεται στο ξύλινο έλκηθρο που θα το μεταφέρει στο εργοτάξιο.',NULL,'p5.jpg'),(12,2,18,'Ο μαρμάρινος όγκος έχει φορτωθεί πάνω στο έλκηθρο και είναι έτοιμος για την άνοδό του από το λατομείο. Για τη δύσκολη αυτή δουλειά χρησιμοποιούσαν γερά σκοινιά, μακριά ξύλα και βαρούλκα, ειδικές μηχανές για την έλξη μεγάλου βάρους. ',NULL,'p6.jpg'),(13,3,20,'Το έλκηθρο οδηγείται με τη βοήθεια ξύλινων μοχλών μέχρι το σταθμό φόρτωσης μέσα από έναν στενό αλλά ίσιας και πολύ κατηφορικό δρόμο. Για να διατηρηθεί σταθερή η ταχύτητά του και να ελεγχθεί η ορμή τουτο έδεναν με σχοινιά και τις άκρες τους σε πασσάλους δεξιά και αριστερά του δρόμου.',NULL,'p7.jpg'),(14,3,22,'Το αρχιτεκτονικό μέλος φορτώνεται σε μια μεγάλη άμαξα που σέρνουν πολλά ζεύγη ζώων και για να κινηθεί χρειάζεται πολύ γερό οδόστρωμα.',NULL,'p8.jpg'),(15,3,24,'Η μεταφορά του μέλους από το λατομείο μέχρι το εργοτάξιο γίνεται κυρίως τους καλοκαιρινούς μήνες επειδή οι δρόμοι είναι στεγνοί, η διάρκεια της μέρας μεγαλύτερη και η αντιμετώπιση απρόβλεπτων εμποδίων ευκολότερη. ',NULL,'p9.jpg'),(16,3,26,'Το βαρύ φορτίο μεταφέρεται επάνω σε ύψωμα με το σύστημα των αντίσταθμων αμαξών. Για να γίνει αυτό χρησιμοποιούνται ισχυρές τροχαλίες, και πολύ γερά σχοινιά. Η μία άκρη των σχοινιών που περνάει από την τροχαλία είναι δεμένη στο βαρύ φορτίο που ανεβαίνει και η άλλη σε μια άδεια άμαξα που τα ζώα κατεβάζουν προς τα κάτω. ',NULL,'p10.jpg'),(17,4,28,'Στο εργοτάξιο συνεχίζεται η κατεργασία του αρχιτεκτονικού μέλους δίπλα στο ναό πριν από την τοποθέτησή του στην τελική του θέση.	',NULL,'p12b.jpg'),(18,4,30,'Στο εργοτάξιο οι τεχνίτες κάνουν συνεχώς μετρήσεις καθώς προχωράει η κατασκευή.',NULL,'p13.jpg'),(20,6,32,'Κάποια τελευταία αρχιτεκτονικά μέλη ανυψώνονται με τη βοήθεια γερανού  επάνω στον μισοτελειωμένο ναό. ',NULL,'p15.jpg'),(21,6,34,'Ο ναός πλησιάζει στην ολοκλήρωσή του.',NULL,'p16.jpg');
/*!40000 ALTER TABLE `construction_activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `construction_stages`
--

DROP TABLE IF EXISTS `construction_stages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `construction_stages` (
  `stage_id` int(10) NOT NULL AUTO_INCREMENT,
  `stage_name_gr` varchar(500) DEFAULT NULL,
  `stage_name_en` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`stage_id`),
  UNIQUE KEY `stage_id_UNIQUE` (`stage_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `construction_stages`
--

LOCK TABLES `construction_stages` WRITE;
/*!40000 ALTER TABLE `construction_stages` DISABLE KEYS */;
INSERT INTO `construction_stages` VALUES (1,'ΛΑΤΟΜΕΙΟ-ΕΞΟΡΥΞΗ ΠΕΤΡΩΜΑΤΟΣ',NULL),(2,'ΑΝΟΔΟΣ ΜΙΣΟΤΕΛΕΙΩΜΕΝΟΥ ΑΡΧΙΤΕΚΤΟΝΙΚΟΥ ΜΕΛΟΥΣ ΑΠΟ ΤΟ ΛΑΤΟΜΕΙΟ',NULL),(3,'ΜΕΤΑΦΟΡΑ ΑΡΧΙΤΕΚΤΟΝΙΚΟΥ ΜΕΛΟΥΣ ΑΠΌ ΤΟ ΛΑΤΟΜΕΙΟ ΣΤΟ ΕΡΓΟΤΑΞΙΟ',NULL),(4,'ΕΡΓΟΤΑΞΙΟ (ΠΡΙΝ ΤΟΠΟΘΕΤΗΘΕΙ ΣΤΟ ΝΑΟ)',NULL),(5,'ΕΡΓΟΤΑΞΙΟ (ΑΦΟΥ ΤΟΠΟΘΕΤΗΘΕΙ ΣΤΟ ΝΑΟ)',NULL),(6,'ΝΑΟΣ ΣΧΕΔΟΝ ΟΛΟΚΛΗΡΩΜΕΝΟΣ',NULL);
/*!40000 ALTER TABLE `construction_stages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `didyouknow`
--

DROP TABLE IF EXISTS `didyouknow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `didyouknow` (
  `dykid` int(11) NOT NULL AUTO_INCREMENT,
  `gameid` int(11) DEFAULT NULL,
  `questiontext_gr` varchar(500) DEFAULT NULL,
  `questiontext_en` varchar(500) DEFAULT NULL,
  `answertext_gr` varchar(500) DEFAULT NULL,
  `answertext_en` varchar(500) DEFAULT NULL,
  `imagefile` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`dykid`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `didyouknow`
--

LOCK TABLES `didyouknow` WRITE;
/*!40000 ALTER TABLE `didyouknow` DISABLE KEYS */;
INSERT INTO `didyouknow` VALUES (7,1,'ότι οι ναοί ήταν κτήρια διακοσμημένα κυρίως εξωτερικά;','that the temples were buildings mostly decorated externally?','Οι ναοί ήταν κτήρια διακοσμημένα κυρίως εξωτερικά και όχι εσωτερικά. Ίσως επειδή η λατρεία γινόταν στον υπαίθριο χώρο μπροστά από το ναό και όχι μέσα σε αυτόν.','The temples were buildings mainly decorated externally and not internally. This is probably because the worship took place outdoors, in front of the temple, and not in it.',NULL),(8,1,'ότι το εσωτερικό των ναών ήταν σκοτεινό;','that the interior of the temples was dark?','Το εσωτερικό του σηκού ήταν σκοτεινό και το φως έμπαινε μόνον από την κυρία είσοδο, όταν η πόρτα ήταν ανοικτή. Γνωστές εξαιρέσεις αποτελούν ο Παρθενώνας και το Eρέχθειο στην Aκρόπολη της Αθήνας που είχαν παράθυρα δεξιά και αριστερά από την είσοδο.','The inside of the cella was dark and the only light came from the main entrance when the doors were open. Famous exceptions are the Parthenon and the Erechtheion on the Acropolis of Athens where windows exist on the right and left of the entrance.',NULL),(9,1,'ότι οι Αθηναίοι διοργάνωναν πολλές γιορτές στη διάρκεια του χρόνου;','that the Athenians organized many festivals during the year?','Στην Αθήνα διοργανώνονταν πολύ περισσότερες γιορτές από τις άλλες πόλεις, ειδικά τον 5ο αι και 4ο αι. π.Χ. Οι γιορτές με τις θυσίες και τους αγώνες που περιλάμβαναν, έδιναν μία ευκαιρία για συναγωνισμό, διασκέδαση και ανάπαυση από τις καθημερινές εργασίες, αλλά και για την κατανάλωσης κρέατος από τους Αθηναίους.','Far more festivals were held in Athens than in any other city, especially in the 5th and 4th centuries B.C. The celebrations included sacrifices and games, thus giving an opportunity for competition, fun and rest from everyday work, but also for the consumption of meat by the Athenians.',NULL),(10,1,'ποιο ήταν το πιο ιερό τμήμα του ναού;','which was the most sacred part of the temple?','O βωμός ήταν πολύ ιερός και αποτελούσε απαραβίαστο άσυλο και καταφύγιο. Η παραβίασή του είχε ολέθριες συνέπειες. Χαρακτηριστικό παράδειγμα είναι το «Κυλώνειο Άγος», η συμφορά που έπεσε στην πόλη της Αθήνας όταν οι Αθηναίοι φονεύσαν τους οπαδούς του Κύλωνα οι οποίοι είχαν καταφύγει ως ικέτες στον βωμό της Αθηνάς στην Ακρόπολη.','The altar was very sacred and served as inviolable asylum and shelter. Its violation had devastating consequences. A typical example is the \"Cylonio Agos\", the curse that fell on the city of Athens when the Athenians killed the supporters of Cylon who had resorted to begging for mercy in the altar.',NULL),(11,1,'ότι οι σύγχρονοι Ολυμπιακοί Αγώνες ξεκινούν από την αρχαία Ολυμπία;','that the modern Olympic Games began in ancient Olympia?','Η τελετή αφής της φλόγας των Ολυμπιακών Αγώνων γίνεται σήμερα στο βωμό του Ναού της Ήρας στην Ολυμπία. ','The ceremony of the ignition of the Olympic flame is still taking place at the altar of the Temple of Hera in Olympia.',NULL),(13,1,'ότι οι πόλεμοι σταματούσαν όταν διοργανώνονταν  πανελλήνιοι αγώνες στα μεγάλα ιερά ;','that any wars were halted when panhellenic events were held in great sacred places?','Πρόκειται για την ιερή εκεχειρία. Οι πόλεμοι σταματούσαν πριν την έναρξη, κατά τη διάρκεια και μετά το τέλος των αγώνων. Αυτό εξασφάλιζε την ομαλή διεξαγωγή των αγώνων και την άνετη διακίνηση των πιστών.','It was the sacred truce. Wars were stopped before the start, during and after the event, thus ensuring the smooth conduct of sports and the convenient movement of people.',NULL),(14,1,'ότι σε κάποιους ναούς υπήρχαν χρυσελεφάντινα αγάλματα;','that there were chryselephantine statues in some temples?','Εκτός από το χρυσελεφάντινο άγαλμα της Αθηνάς Παρθένου μέσα στον Παρθενώνα, υπήρχαν χρυσελεφάντινα αγάλματα και σε άλλους ναούς. Ένα από αυτά ήταν το άγαλμα του Δία στην Ολυμπία, που συμπεριλαμβάνεται στα επτά θαύματα του αρχαίου κόσμου! Άλλο ένα ήταν το χρυσελεφάντινο του Απόλλωνα στους Δελφούς.','In addition to the chryselephantine statue of Athena Parthenos in the Parthenon, there were also chryselephantine statues in other temples as well. One of them was the statue of Zeus in Olympia, which is included in the seven wonders of the ancient world! Another was the one of Apollo in Delphi.',NULL),(22,3,'γνωρίζουμε ονόματα αρχαίων αρχιτεκτόνων;','Did you know that we know names of ancient architects?','Γνωρίζουμε σήμερα πολύ περισσότερα από 100 ονόματα αρχαίων Ελλήνων αρχιτεκτόνων. Μερικά από αυτά είναι: Ροίκος, Καλλικράτης, Ικτίνος, Δεινοκράτης, Θεόδωρος, Καρπίων, Κόροιβος, Πολύκλειτος ο νεότερος.','Till now we know a lot more than 100 names of ancient Greek architects. Some of them are: Roico, Kallikratis, Iktinos, Dinokratis, Theodoros, Karpion, Koroivos, Polyklitos the younger.',NULL),(23,3,'ότι ο αρχτέκτονας μπορούσε να αντικατασταθεί;','that the architect could be replaced?','Ο αρχιτέκτονας ενός έργου μπορούσε να αντικατασταθεί δεδομένου ότι η ανέγερση ενός ναού ήταν δυνατόν να διαρκέσει πολύ. Ο μισθός του ήταν ίσως 1-2 δραχμές την ημέρα.','The architect of a project could be replaced as the construction of a temple could take a long time. His salary was probably 1-2 drachmas a day.',NULL),(24,3,'ότι ο αρχιτέκτονας δεν ήταν αρχιμάστορας;','that the architect was not a master builder?','Στην αρχαία Ελλάδα ο αρχιτέκτονας δεν ήταν ένας αρχιμάστορας αλλά ένας καλλιτέχνης και παράλληλα ένας διανοούμενος, μια αναγνωρισμένη προσωπικότητα. Ήταν ένας ειδικός με πολύπλευρη μόρφωση, έμπειρος σε όλους τους κλάδους της πρακτικής αρχιτεκτονικής, συγχρόνως όμως και με γνώσεις σε άλλους τομείς, όπως μαθηματικά, μουσική, φυσική ακόμη και φιλοσοφία.','In ancient Greece, the architect was not just a master builder but an artist and at the same time an intellectual, a recognized personality. He was a multifaceted scholar, experienced in all branches of practical architecture, but also with knowledge in other fields, such as mathematics, music, physics and even philosophy.',NULL),(39,3,'ότι το Eρέχθειο ήταν ένας ιδιαίτερος τύπος ναού; ','that the Erechtheion was a particular type of temple?','Κάθε πλευρά του ήταν διαφορετική. Αυτό οφειλόταν κυρίως στην ανάγκη να στεγαστούν παλαιότερες και νεότερες λατρείες θεών και ηρώων αλλά και στην υψομετρική διαφορά του εδάφους. ','Each side was different. This was mainly due to the need to house older and newer gods and heroes, as well as to the altitude difference.',NULL),(40,3,'ότι υπήρχαν και κυκλικά κτήρια;','that there were also circular buildings;','Υπήρχαν και κυκλικά κτήρια, οι Θόλοι. Γνωστές είναι η Θόλος της Επιδαύρου, η Θόλος του Φιλιππείου της Ολυμπίας, η Θόλος των Δελφών. Δε γνωρίζουμε όμως ακριβώς τη λειτουργία τους...','There were also circular buildings, the Tholos. Known are the Dome of Epidaurus, the Tholos of the Philippi of Olympia, the Tholos of Delphi. But we do not know exactly how they function ...',NULL),(41,3,'ότι ο Παρθενώνας παρουσιάζει τις περισσότερες ιδιομορφίες σε σχέση με άλλους αρχαίους ναούς ως προς τον τύπο του; ','that the Parthenon presents most peculiarities in relation to other ancient temples in its type?','Μερικές μόνο απ’ αυτές είναι η οκτάστυλη αντί για εξάστυλη πρόσοψη, το μάρμαρο ως οικοδομικό υλικό αντί για πωρόλιθο ή άλλο λίθο και ο οπισθόδομος, δηλ. η ξεχωριστή αίθουσα που είχε δημιουργηθεί στη δυτική πλευρά του ναού μεταξύ του σηκού και του οπισθονάου και είχε δική της είσοδο.  ','Only a few of these are the octapestyl instead of the hexagonal facade, the marble as a building material instead of the poros or other stone and the opisthodomos, ie the separate room that was created on the west side of the temple between the cella and the posterior and had its own its entrance.',NULL),(42,3,'ότι μερικοί πολύ μεγάλοι ναοί είχαν προβληματική στέγαση;','that some very large temples had problematic roofs?','Για να λύσουν το πρόβλημα, οι αρχιτέκτονες έφτιαξαν τον σηκό υπαίθριο, σαν μεγάλη εσωτερική αυλή. Ένας τέτοιος ναός ήταν αυτός του Διδυμαίου Aπόλλωνος, κοντά στην Mίλητο.','In order to solve the problem, the architects made the outdoors as a large courtyard. One such temple was that of Didymus Apollo, near Miletus.',NULL),(43,3,'Τι σχέση είχε ο αριθμός των κιόνων των πλευρών του ναού;','What was the relation of the number of columns on the sides of the temple?','Ο αριθμός των κιόνων στις μακρές πλευρές των περίπτερων ναών συνήθως ήταν διπλάσιος από αυτόν της στενής πλευράς συν ένας ακόμα κίονας, αν και υπήρχε πλήθος εξαιρέσεων.','The number of columns on the long sides of the temples was usually double that of the narrow side plus one column, although there were plenty of exceptions.',NULL),(44,5,'Σε κάποιους δωρικούς ναούς έχουν χρησιμοποιηθεί και στοιχεία από τον ιωνικό ρυθμό;','on some of the Dorian rhytmh temples have used elements from the Ionic rhythm?','Ένα τέτοιο στοιχείο είναι η συνεχής ζωφόρος που χρησιμοποιήθηκε στον Παρθενώνα, στο ναό του Eπικουρείου Aπόλλωνος στις Bάσσες στην Πελοπόννησο και στο λεγόμενο Θησείο στην Αθήνα.','One such element is the continuous frieze used in the Parthenon, in the Temple of Epicureus Apollon in Basses in the Peloponnese and in the so-called Thissio in Athens.',NULL),(45,5,'Ποιά ήταν η έμπνευση για το κορινθιακό κιονόκρανο;','What was the inspiration for the Corinthian capital?','Έμπνευση για το κορινθιακό κιονόκρανο λέγεται ότι ήταν ένα καλάθι που βρισκόταν πάνω σ’ έναν τάφο στην  Κόρινθο; Το καλάθι σκεπαζόταν από μία τετράγωνη πλάκα και γύρω από το καλάθι είχαν φυτρώσει  άκανθοι ακολουθώντας το σχήμα του. ','Inspiration for the Corinthian capital is said to be a basket that was on a grave in Corinth. The basket was covered by a square plate and sprouts were sprouting around the basket, following its shape.',NULL),(46,5,'Από πόσα κομμάτια αποτελούνται οι κίονες;','How many pieces do the columns consist of?','Κάποιοι κίονες είναι μονολιθικοί, δηλ. αποτελούνται από ένα μόνο κομμάτι λίθου, όπως είναι οι κίονες του Ναού της Αθηνάς Νίκης αλλά τις περισσότερες φορές, και ιδίως στο δωρικό ρυθμό, αποτελούνται από μικρότερα κομμάτια, τους σπονδύλους;','Some columns are monolithic, ie they consist of a single piece of stone, such as the columns of the Temple of Athena Nike, but most of the time, and especially in the Dorian rhythm, consist of smaller pieces, the vertebrae',NULL),(47,5,'Oι κορμοί των κιόνων δεν έμεναν λείοι αλλά είχαν ραβδώσεις; ','The body of the columns was not smooth, but it had ribbons?','Oι κορμοί των κιόνων δεν έμεναν λείοι αλλά είχαν ραβδώσεις; Οι ηλιακές ακτίνες φωτοσκίαζαν διαδοχικά αυτές τις ραβδώσεις με αποτέλεσμα να τονίζεται η αίσθηση των τριών διαστάσεων του κίονα και να δημιουργείται εξαιρετική ποικιλία στην όψη του κτηρίου.','The body of the columns waw not smooth, but they had ribbons. The sun rays shaded these streaks successively, emphasizing the sense of the three dimensions of the column and creating an extraordinary diversity on the face of the building.',NULL),(48,5,'Στους αρχαίους ελληνικούς ναούς και ιδιαίτερα στον Παρθενώνα δεν υπάρχουν ευθείες γραμμές;',' that there are no straight lines in the ancient Greek temples and especially in the Parthenon?',' Ελαφριές καμπυλώσεις όλων των οριζόντιων αλλά και των κατακόρυφων γραμμών του ναού δίνουν στα άψυχα κτήρια έναν παλμό ζωής.','Light curves of all the horizontal and vertical lines of the temple give the lifeless buildings a pulse of life.',NULL),(49,5,'Οι κίονες στους αρχαίους ναούς παρουσιάζουν μικρή κλίση προς τον σηκό και οι κορμοί τους έχουν «μείωση» κι «ένταση»;','that the columns in the ancient temples are tilted slightly towards the vault and their logs are \"reduced\" and \"tense\"?',' Η διάμετρός δηλαδή του κορμού τους μειώνεται αισθητά προς τα πάνω ενώ παράλληλα παρατηρείται μία ελαφριά κύρτωσή τους στα 2/5 του ύψους τους. ','Η διάμετρός του κορμού τους μειώνεται αισθητά προς τα πάνω ενώ παράλληλα παρατηρείται μία ελαφριά κύρτωσή τους στα 2/5 του ύψους τους. ',NULL),(50,5,'Οι κίονες του Παρθενώνα δεν έχουν το ίδιο πάχος','the Parthenon columns did not have the same thickness','Oι ακραίοι κίονες κάθε πλευράς στον Παρθενώνα είναι ελάχιστα παχύτεροι από τους υπόλοιπους και οι αποστάσεις τους από τους γειτονικούς τους λίγο μικρότερες από τις άλλες','The corner columns of each side in the Parthenon are slightly thicker than the rest and their distances from their neighbors are slightly smaller than the others',NULL),(51,1,'ότι η αρχαία ελληνική αρχιτεκτονική βρισκόταν σε συνεχή εξέλιξη;','that the ancient Greek architecture was constantly evolving?','Όπως η ίδια η πόλη και οι θεσμοί της, έτσι και η αρχιτεκτονική βρισκόταν σε συνεχή εξέλιξη ενώ υπήρχαν και τοπικές διαφοροποιήσεις. Αποτέλεσμα ήταν να υπάρχει μια μεγάλη ποικιλία στην ενιαία βασικά ναοδομία των αρχαίων Ελλήνων.','Like the city itself and its institutions, architecture was constantly evolving, even with some local variations showing up. As a result, there was a great diversity in the basic temple layout of the ancient Greeks.',NULL),(52,1,'πώς επιλεγόταν ο χώρος για να κτιστεί ένας ναός;','how the location to build a temple was chosen?','Μέσα στις ελληνικές πόλεις κτίζονταν σημαντικοί για την αρχιτεκτονική τους ναοί, συνήθως σε ελεύθερο γύρω χώρο συνοδευόμενοι πάντα από βωμό.Τα ιερά εκτός πόλεων δημιουργούνταν συχνά σε μέρη όπου πιστευόταν ότι κάποτε είχε κάνει εκεί την εμφάνισή του κάποιος θεός. Πολύ γνωστά τέτοια παραδείγματα αποτελούν το Ιερό των Δελφών και της Δήλου. Φαίνεται όμως ότι μεγαλύτερη σημασία στην επιλογή του τόπου είχε το φυσικό περιβάλλον, όπως στο Σούνιο και στις Βάσσες της Αρκαδίας.','Μέσα στις ελληνικές πόλεις κτίζονταν σημαντικοί για την αρχιτεκτονική τους ναοί, συνήθως σε ελεύθερο γύρω χώρο συνοδευόμενοι πάντα από βωμό. Τα ιερά εκτός πόλεων δημιουργούνταν συχνά σε μέρη όπου πιστευόταν ότι κάποτε είχε κάνει εκεί την εμφάνισή του κάποιος θεός. Πολύ γνωστά τέτοια παραδείγματα αποτελούν το Ιερό των Δελφών και της Δήλου. Φαίνεται όμως ότι μεγαλύτερη σημασία στην επιλογή του τόπου είχε το φυσικό περιβάλλον, όπως στο Σούνιο και στις Βάσσες της Αρκαδίας.',NULL),(53,4,'Τι ονομάζουμε «αρμονία» στην αρχαία αρχιτεκτονική;','What do we call \"harmony\" in ancient architecture?','\"Αρμονία\" στην αρχαία αρχιτεκτονική ονομάζουμε την τέλεια επαφή των λίθων. Στον Παρθενώνα, οι λίθοι έχουν τόσο τέλεια εφαρμογή μεταξύ τους ώστε όταν σε κάποιο λίθο αναπτύσσεται ένα ρήγμα, αυτό συνεχίζεται και στους γειτονικούς σαν να μην υπήρχε ανάμεσά τους κανένα κενό.','\"Harmony\" in the ancient architecture we call the perfect contact of the stones. In the Parthenon, the stones are so perfectly fitting together that when a rupture develops in a stone, it continues to the neighbors as if there were no voids among them.',NULL),(54,4,'ότι δινόταν ιδιαίτερη προσοχή στην καλή συντήρηση των δρόμων όσο διαρκούσε το έργο;','that particular attention was paid to good road maintenance as long as the project lasted?','Ιδιαίτερη προσοχή δινόταν στην καλή συντήρηση των δρόμων επάνω στους οποίους γινόταν η μεταφορά. Ο μεγάλος αριθμός των λίθων του Παρθενώνα και ο σύντομος χρόνος κατασκευής του ναού οδηγεί στο συμπέρασμα ότι κατά τους θερινούς μήνες, τουλάχιστον δεκαπέντε διαφορετικές άμαξες διέσχιζαν  την απόσταση από την Πεντέλη ως την Αθήνα και άλλες τόσες ανηφόριζαν άδειες προς το λατομείο. Εννοείται ότι προτιμούσαν τις θαλάσσιες μεταφορές, όπου αυτό ήταν δυνατόν.','Particular attention was paid to the proper maintenance of the roads on which the transport was carried out. The large number of the Parthenon stones and the short construction time of the temple lead to the conclusion that during the summer months, at least fifteen different wagons traveled the distance from Penteli to Athens and so many crests ascended to the quarry. Of course they preferred shipping, wherever possible.',NULL),(55,4,'με ποιον τρόπο κατόρθωναν οι λατόμοι να αποσπάσουν τόσο μεγάλα κομμάτια μαρμάρου;','how the quarries managed to squeeze such large pieces of marble?','Οι λατόμοι κατόρθωναν να αποσπάσουν τόσο μεγάλα κομμάτια μαρμάρου με την τοποθέτηση σιδερένιων σφηνών και τη χρήση βαρύτατων σιδερένιων μοχλών. Με αυτούς η ανθρώπινη δύναμη πολλαπλασιαζόταν μέχρι και 30 φορές!','The quarries managed to extract such large pieces of marble by placing iron wedges and using heavy iron levers. With them the human power was multiplied up to 30 times!',NULL),(56,4,'ότι τα υλικά για την οικοδόμηση ενός ναού μπορούσαν να προέρχονται από διάφορα μέρη της Ελλάδας;','that the materials for the construction of a temple could come from different parts of Greece?','Τα υλικά για την οικοδόμηση ενός ναού και κυρίως ο λίθος μπορούσαν να προέρχονται από διάφορα μέρη της Ελλάδας. Για παράδειγμα, για την κατασκευή του ναού του Ασκληπιού στην Επίδαυρο χρησιμοποιήθηκε μάρμαρο από τέσσερα λατομεία.','The materials for the construction of a temple and especially the stone could come from different parts of Greece. For example, the construction of the temple of Asclepius in Epidaurus used marble from four quarries.',NULL),(57,4,'πόσες διαφορετικές ειδικότητες ανθρώπων εργάστηκαν για την κατασκευή των ναών της Ακρόπολης;','how many different specialities of people have worked for the construction of the Acropolis temples?','Πολλές ειδικότητες ανθρώπων συνεργάστηκαν για να δημιουργηθούν οι ναοί της Ακρόπολης: Ξυλουργοί, γλύπτες, χαλκουργοί, μαρμαροτεχνίτες, βαφείς, χρυσοχόοι, τεχνίτες ελεφαντοστού, ζωγράφοι, διακοσμητές, έμποροι, ναύτες και πλοίαρχοι για τη μεταφορά των υλικών από τη θάλασσα και από την ξηρά, αμαξουργοί, οδηγοί άμαξας, εργάτες δέρματος, οδοποιοί, μεταλλωρύχοι… και ένα πλήθος εργατών και βοηθών.','Many specialties of people collaborated to create the Acropolis temples: Carpenters, sculptors, bronze, marble technicians, painters, goldsmiths, ivory technicians, painters, decorators, merchants, sailors and masters for the transport of materials from the sea and land , wagon drivers, leather workers, roadmakers, miners ... and a multitude of workers and assistants.',NULL),(58,4,'ότι κάποια αρχιτεκτονικά μέλη απαιτούσαν λίθους καλύτερης ποιότητας;','that some architectural parts required stones of better quality?','Ορισμένα αρχιτεκτονικά μέλη, όπως οι μετόπες, η ζωφόρος, τα κυμάτια, επειδή περιείχαν γλυπτικές λεπτομέρειες απαιτούσαν λίθους καλύτερης ποιότητας, συνήθως λευκά μάρμαρα.','Some architectural members, such as the metopes, the frieze, the trunks, because they contained sculptural details, required stones of better quality, usually white marble.',NULL),(59,4,' ότι στο λατομείο δεν πραγματοποιούνταν απλώς μια σκληρή και βαρειά εργασία;','that the quarry was not just a hard and heavy job?','Στο λατομείο δεν πραγματοποιούνταν απλώς μια σκληρή και βαρειά εργασία, αλλά μία περίπλοκη διανοητική εργασία σχεδιασμού της πορείας παραγωγής των οικοδομικών στοιχείων σε μία πρώτη ημίεργη μορφή.','The quarry was not just a hard and heavy work, but a complex mental work designing the production process of the building elements in a first semi-active form.',NULL),(62,6,'Ότι γλυπτά υπήρχαν και στις οροφές των ναών;',' that there were sculptures on the roofs of the temples?','Γλυπτική διακόσμηση είχαν επίσης τα φατνώματα των μαρμάρινων οροφών με ολόγλυφα άνθη ή ανθέμια ορειχάλκινα ή μαρμάρινα.','Sculptural decoration also had the panels of marble ceilings with holly or bronze flowers or marble ornaments.',NULL),(63,6,'Ότι τα ακρωτήρια των ναών είχαν διάφορες μορφές;',' that the \"akrotiria\" of the temples were of different forms?','Στα άκρα των αετωμάτων υψώνονταν ακρωτήρια με γεωμετρικά σχήματα, με μορφές φυτών αργότερα και  με μορφές αγαλμάτων, κυρίως γυναικείων, κατά την κλασική περίοδο.','At the edges of the pediments there were the capes with geometric shapes, with later forms of plants and statues of statues, mostly female, during the classical period.',NULL),(64,6,'Ότι και σε άλλα σημεία του ιερού υπήρχε γλυπτική διακόσμηση;','that there was sculptural decoration in other parts of the sanctuary?','Οι βωμοί, οι βάσεις των λατρευτικών αγαλμάτων και άλλα στοιχεία, όπως το στηθαίο γύρω από το ναό της Αθηνάς Νίκης στην Ακρόπολη, μπορούσαν επίσης να κοσμούνται με ανάγλυφα. ','The altars, the bases of the worship statues and other elements, such as the parapet around the Temple of Athena Nike on the Acropolis, could also be embellished with reliefs.',NULL),(65,6,'Ότι υπήρχαν και διακοσμητικά στοιχεία στους ναούς που ονομάζονταν κυμάτια;','Did you know that there were decorative elements in the temples that were called beads,  \"kimatia\"?','Τα κυμάτια ήταν γραμμικά, ανάγλυφα, οριζόντια συνήθως στοιχεία που είχαν σκοπό να διαρθρώνουν τις επιφάνειες των προσόψεων. Aνάλογα με τη διακόσμησή τους διακρίνονται σε τρία είδη: δωρικά, ιωνικά και λέσβια. ','The blobs were linear, embossed, usually horizontally shaped elements designed to structure the facade surfaces. Depending on their decoration, they can be divided into three types: Doric, Ionian and Lesvos.',NULL),(66,6,'Ότι  τα γλυπτά του ναού ήταν τέλεια σε μορφή και κατασκευή ακόμα και σε μέρη που ήταν αθέατα;','That the sculptures of the temple were perfect in form and construction even in places that were invisible?','Τα γλυπτά  που διακοσμούσαν τον ναό ήταν τέλεια σε μορφή και κατασκευή ακόμα και σε μέρη που ήταν αθέατα γιατί ο ναός ως αφιέρωμα στο θεό έπρεπε να είναι τέλειος.\r\nΠολύ γνωστό παράδειγμα αποτελούν τα υπερφυσικά σε μέγεθος αγάλματα των αετωμάτων του Παρθενώνα, η πίσω πλευρά των οποίων χαρακτηρίζεται από ανυπέρβλητη ομορφιά.\r\n','Τα γλυπτά  που διακοσμούσαν τον ναό ήταν τέλεια σε μορφή και κατασκευή ακόμα και σε μέρη που ήταν αθέατα γιατί ο ναός ως αφιέρωμα στο θεό έπρεπε να είναι τέλειος.',NULL),(67,6,'Ότι οι ναοί στην αρχαιότητα δεν ήταν ολόλευκοι αλλά είχαν χρώματα;','Ότι οι ναοί στην αρχαιότητα δεν ήταν ολόλευκοι αλλά είχαν χρώματα;','Tα μαρμάρινα οικοδομήματα όταν ακόμη κτίζονταν παρουσίαζαν μια πολύ διαφορετική εμφάνιση επειδή το φρεσκοκομμένο μάρμαρο θα ακτινοβολούσε εκτυφλωτικά. Αμέσως μετά γινόταν η κάλυψη των λευκών επιφανειών με διάφορα πλούσια χρώματα. Δεν είναι όμως γνωστό ποια ακριβώς χρώματα χρησιμοποιούσαν σε κάθε τμήμα του ναού.','The marble edifices when they were still being built showed a very different appearance because the freshly cut marble would glow radiantly. Immediately afterwards the white surfaces were covered with various rich colors. However, it is not known exactly what colors they used in each part of the temple.',NULL),(68,2,'ότι και στην αρχαιότητα κατά τη διάρκεια μιας κατασκευής χρησιμοποιούνταν μακέτες και πρότυπα;','that in antiquity during a construction, mock-ups and patterns were used?','Οι αρχιτέκτονες κατασκεύαζαν σχέδια και μακέτες των κτηρίων, τα ινδάλματα, καθώς και πρότυπα αρχιτεκτονικά μέλη, τα οποία στη συνέχεια αντέγραφαν οι τεχνίτες; Πολλές φορές ως «σχεδιαστήρια» χρησίμευαν και οι επιμελώς λειασμένες επιφάνειες των τοίχων.','The architects built building designs and models, idols, as well as standard architectural members, which were then copied by the craftsmen? Many times as \"planners\" were also used the carefully polished surfaces of the walls.',NULL),(69,2,'πόσο κόστιζε η λάξευση των ραβδώσεων ενός κίονα;','did you know how much the carving of a column was cost?','Το συνολικό κόστος για τη λάξευση των ραβδώσεων σε κάθε κίονα του Ερεχθείου έφθανε τις 350 δραχμές, όσο και ο μισθός ενός εργάτη για όλο τον χρόνο;','The total cost of carving each column of the Erechtheum was 350 drachmas equal to the salary of a worker for the whole year?',NULL),(70,2,'πόσο αμείβονταν οι ειδικευμένοι εργάτες την ημέρα; ','how much did the skilled workers pay for the day?','Οι ειδικευμένοι εργάτες είχαν αμοιβή 1 δραχμή την ημέρα. Όταν αμείβονταν με το κομμάτι, η αμοιβή έφθανε και τις 5 δραχμές ημερησίως (συνήθης πληρωμή για τη χάραξη των ραβδώσεων των κιόνων).','The skilled workers had a drachma fee per day. When paid by the piece, the fee was up to 5 drachmas a day (routine payment for the rows of the columns).',NULL),(71,2,'πώς ονομαζόταν η τεχνική περιγραφή του έργου;','how was the technical description of the project called?','Η λεπτομερής τεχνική περιγραφή βάσει της οποίας θα εκτελούνταν το έργο ονομαζόταν συγγραφή. Την συνέτασσε ο αρχιτέκτονας, περιλαμβάνοντας όλες τις απαραίτητες εργασίες με υπολογισμούς, σκίτσα και με ενδείξεις των διαστάσεων και των υλικών που έπρεπε να χρησιμοποιηθούν, χωρίς όμως προϋπολογισμό.','The detailed technical description on the basis of which the project was to be performed was called writing. The architect wrote it, including all the necessary work with calculations, sketches and with indications of the dimensions and materials to be used, but without budget.',NULL),(72,2,'ότι τα μέλη του ανθρώπινου σώματος αποτελούσαν μετρικές μονάδες στην αρχαιότητα;','that members of the human body were metric units in antiquity?','Οι αρχαίοι Έλληνες χρησιμοποιούσαν τα μέλη του ανθρώπινου σώματος, το χέρι πήχυς (0,487 μ.), το πόδι πους (0,301 μ.)., το σώμα, το άνοιγμα των χεριών οργιά (1,944 μ.), ως μετρικές μονάδες; Οι επιγραφές μας πληροφορούν ότι κρατικοί υπάλληλοι, οι αγορανόμοι, αναρτούσαν υποδείγματα για τα επίσημα μέτρα στις αρχαίες αγορές.','The ancient Greeks used the members of the human body, the hand of the forearm (0,487 m), the foot (0,301 m), the body, the opening of the hands of the rage (1,944 m), as metric units? Our inscriptions inform us that government officials, shopkeepers, were laying patterns for official measures in ancient markets.',NULL),(73,3,'ότι ο αρχιτέκτονας ασχολούνταν και με συμπληρωματικές εργασίες της κατασκευής;','ότι ο αρχιτέκτονας ασχολούνταν και με συμπληρωματικές εργασίες της κατασκευής;','Ο αρχιτέκτονας μαζί με τους βοηθούς του και κάποιες φορές και με άλλα μέλη της οικοδομικής επιτροπής έκαναν και άλλες συμπληρωματικές εργασίες; Κάποιες απ’ αυτές ήταν η  επίβλεψη του εργοταξίου, η παραλαβή των υλικών και ο έλεγχος περαιτέρω επεξεργασίας ή τοποθέτησής τους, ο έλεγχος των προθεσμιών και η πληρωμή των συμφωνημένων δόσεων στους τεχνίτες.','The architect, along with his assistants and sometimes with other members of the building committee, did other additional work. Some of them were the supervision of the site, the receipt of the materials and the control of their further processing or placement, the checking of the deadlines and the payment of the agreed installments to the craftsmen.',NULL);
/*!40000 ALTER TABLE `didyouknow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `games` (
  `gameid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `gamecodename` varchar(45) DEFAULT NULL,
  `gamename_gr` varchar(45) DEFAULT NULL,
  `gamename_en` varchar(45) DEFAULT NULL,
  `gametitle_gr` varchar(45) DEFAULT NULL,
  `gametitle_en` varchar(45) DEFAULT NULL,
  `gameicon` varchar(45) DEFAULT NULL,
  `gameintro_gr` longtext,
  `gameintro_en` longtext,
  `gamechar` varchar(45) DEFAULT NULL,
  `gamecharname_gr` varchar(45) DEFAULT NULL,
  `gamecharname_en` varchar(45) DEFAULT NULL,
  `gamecharintro_gr` longtext,
  `gamecharintro_en` longtext,
  PRIMARY KEY (`gameid`),
  UNIQUE KEY `gameid_UNIQUE` (`gameid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (1,'geography','Γεωγραφία','Geography','Ένας ιερός χώρος','A Sacred Place','gameicon','Ο αρχαίος ελληνικός ναός ήταν ο «οίκος», το σπίτι του θεού. Στέγαζε το λατρευτικό άγαλμα του θεού και πολλά συνήθως πολύτιμα αφιερώματα. Άλλωστε και ο ίδιος ο ναός ήταν ένα αφιέρωμα της πόλης στους θεούς. H είσοδος του ναού ήταν στην ανατολική πλευρά. Η λατρεία γινόταν μπροστά από τον ναό, στο βωμό*. Υπήρχαν αρκετά ιερά χωρίς ναό, κανένα όμως χωρίς βωμό!','An ancient Greek temple was the home of a god. It housed a holy statue of the god as well as many valuable and precious dedications. Besides, the temple itself was a tribute to the gods by the city. The entrance of the building was on the eastern side and the worship was done in front of the temple, on the altar *. There were enough sacred places without a temple, but an altar was always to be found! ','gamechar','Ιέρεια ','Priestess','Είμαι ιέρεια και κρατώ το κλειδί του ναού. Στις επίσημες κρατικές γιορτές έχω την ευθύνη της οργάνωσης της τελετουργίας, την επίβλεψη της δημόσιας θυσίας και την εκφώνηση της προσευχής. Καθημερινά μαζί με τους βοηθoύς μου φροντίζουμε τόσο το ναό όσο και τον χώρο του Ιερού.','I am a Priestess and I hold the key for the temple. During official state celebrations I have the responsibility of organizing rituals, overseeing sacrifices as well as the prayers of the people. Every day, with the help of my assistants, I take care of both the temple and the sanctuary.'),(2,'sign','Επιγραφή','Inscriptions','Ο σχεδιασμός ξεκινά','The planning begins','gameicon','Ο προγραμματισμός της κατασκευής ενός ναού ακολουθούσε συνήθως κάποια συγκεκριμένη διαδικασία. Πληροφορίες σχετικά με το σχεδιασμό του ναού, τον τρόπο εργασίας, το κόστος αλλά και την κατασκευή του μας δίνουν κυρίως οι οικοδομικές επιγραφές*, που ήταν τοποθετημένες σε δημόσιους χώρους. Τα απαραίτητα χρήματα για την κατασκευή του ναού προέρχονταν από τα έσοδα της πόλης, από τα λάφυρα πολέμων αλλά κι από πλούσιους δωρητές.','Planning the building of a temple usually followed a certain process. Information about the design of the temple, the way of work, the cost and the construction of the temple are given mainly by inscriptions *, that were placed in public spaces. Necessary funds for the construction came from the city\'s revenue, spoils of war and even provided by wealthy donors.','gamechar','Ναοποιός','Temple Builder','Είμαι ένας από τους 5 Αθηναίους πολίτες που συμμετέχουμε στην επιτροπή των ναοποιών. Μας έχει ορίσει η Εκκλησία του Δήμου για έναν χρόνο. Μαζί με τον αρχιτέκτονα έχουμε την ευθύνη της οικοδόμησης του ναού. Επιβλέπουμε το έργο, αναθέτουμε τμήματά του σε εργολάβους ή σε μεμονωμένους τεχνίτες, ελέγχουμε την ποιότητα των υλικών και της κατασκευής κι εγκρίνουμε τις πληρωμές στους εργολάβους, στους τεχνίτες και στους εργάτες.\r\n\r\n','I am one of the 5 Athenians participating in the commitee of temple-builders. The Assembly of Citizens has designated us for a year. In cooperation with the architect, we are responsible for the construction of the temple. We oversee the project, assign different parts to contractors or individual craftsmen, check the quality of the materials used and finally approve payments for everyone involved.\r\n\r\n'),(3,'type','Τύπος','Type','Ο ναός σχεδιάζεται','The temple is designed','gameicon','Οι ναοί ως κτήρια ήταν απλές κατασκευές. Ο απλούστερος τύπος ήταν αυτός που είχε μία μακρόστενη αίθουσα, τον σηκό* και κίονες μόνο στην πρόσοψη*. Λίγο πλουσιότερος ήταν αυτός που είχε κίονες και στην πίσω στενή πλευρά. Ο πιο περίτεχνος τύπος είχε κίονες και στις τέσσερις πλευρές του ναού, μερικές φορές και σε διπλές σειρές. Η ομορφιά και η αρμονία του βασίζονταν σε δύο πολύ σημαντικές αρχές: τη συμμετρία και την αναλογία.','Temples were in general really simple constructions. The plainest type of temple consisted of a long narrow closed hall, the cella* and columns only on the facade *. A bit more elaborate was the one with columns on the back as well. The most elaborate type had columns on all four sides of the building, sometimes even in two rows. Its beauty and harmony originated from two very important principles: symmetry and analogy.','gamechar','Αρχιτέκτονας','Architect','Είμαι ένας από τους πιο περιζήτητους αρχιτέκτονες. Έχω εκτελέσει πολλά σπουδαία έργα και έχω μεγάλη πρακτική εμπειρία αλλά και θεωρητικές γνώσεις. Δική μου δουλειά είναι να συντάξω τη «συγγραφή», την περιγραφή δηλαδή του κτηρίου που πρόκειται να οικοδομηθεί, να επιβλέψω την κατασκευή του και φυσικά να πραγματοποιήσω κάθε απαραίτητο έλεγχο μέχρι το τέλος που γίνεται η απογραφή και η παραλαβή του.','I am one of the most famous architects. I have executed many great projects and I have both great practical experience and theoretical knowledge. My job includes composing a description of the temple to be built, overseeing its construction and, of course carrying out any necessary inspections until it is finished and handed over.'),(4,'construction','Κατασκευή','Construction','Η κατασκευή αρχίζει','The construction begins','gameicon','Οι εργασίες κατασκευής ενός αρχαίου ναού ξεκινούσαν από την επιλογή του πετρώματος στο λατομείο. Ακολουθούσε η μεταφορά των λίθων που ήταν πολύ δύσκολη και δαπανηρή εργασία και γι’ αυτό φρόντιζαν να μεταφέρουν μόνο το απολύτως απαραίτητο βάρος. Στο εργοτάξιο γινόταν η λάξευση της επιφανείας κάθε λίθου ανάλογα με τη θέση του, η ανάρτηση και η τοποθέτησή του και τέλος η πλοκή και η σύνδεση των λίθων μεταξύ τους.\r\n','The construction of an ancient temple began with choosing the right rock in the quarry. The transportation of the stones followed, which was a very difficult and costly job, thus only the absolutely necessary weight was carried to the construction site. There, each stone was carved accordingly and then elevated and placed.','gamechar','Λατόμος','Quarry man','Είμαι λατόμος και η δουλειά μου είναι δύσκολη και σκληρή. Αρχικά συμμετέχω στον εντοπισμό και στην επιλογή των όγκων της πέτρας που μπορούν να λατομηθούν και στη συνέχεια δουλεύω για την απόσπασή τους από το πέτρωμα του βουνού. Ακολουθεί η μεταφορά τους στο εργοτάξιο και η τοποθέτησή τους στο ναό από ειδικευμένους τεχνίτες κι εργάτες.','I\'m a quarry man and my job is hard and tough. Initially, I assist in the identification and selection of the rocks that can be quarried and then work to detach them from the mountain. Then they are transferred to the site and placed in the temple by skilled craftsmen and builders.'),(5,'form','Μορφή','Form','Η μορφή δημιουργείται ','The form is created','gameicon','Όλοι οι ναοί της αρχαίας Ελλάδας αποτελούνταν από τρία βασικά μέρη από κάτω προς τα επάνω: τη βάση (κρηπίδα), τον κορμό (κίονες και τοίχοι) και την επίστεψη (θριγκός*, αετώματα* και στέγη). Οι εξωτερικοί κίονες και ο θριγκός δήλωναν τον ρυθμό του ναού. Οι τρεις ρυθμοί ήταν ο δωρικός*, ο ιωνικός* και ο κορινθιακός*.','All ancient Greek temples consisted of three basic parts from bottom to the top: the base ($the crepis$), the body (columns and walls) and the crowning ($entablature$ *, pediments * and roof). The outer columns and the $entablature$ express the order of the temple. The three orders were Doric *, Ionic * and Corinthian *.','gamechar','Λιθοξόος','Stonemason','Είμαι λιθοξόoς. Δουλειά μου είναι να σμιλεύω το μάρμαρο και να του δίνω μορφή μόλις φτάσει από το λατομείο στο εργοτάξιο. Σκαλίζω τα περίτεχνα κιονόκρανα και τις ραβδώσεις των κιόνων και βοηθάω στην κατεργασία των λίθων που τοποθετούνται στο ναό. Η εργασία μου απαιτεί προσοχή, δύναμη κι ακρίβεια.\r\n\r\n','I\'m a stonemason. My job is to chisel and give shape to the marble as soon as it reaches the construction site. I carve the elaborate capitals and flutes of the columns. Additionally, I help in the processing of the stones placed in the temple. My work requires attention, strength and precision.'),(6,'sculpture','Γλυπτική','Sculpture','Τα γλυπτά ετοιμάζονται!','$The sculptures are prepared$','gameicon','Ο αρχαίος ελληνικός ναός ως αφιέρωμα στο θεό έπρεπε να είναι τέλειος στη μορφή και στολισμένος με εξαιρετικά έργα τέχνης. Έτσι οι ναοί ήταν διακοσμημένοι εξωτερικά με αγάλματα κι ανάγλυφα, κυρίως από μάρμαρο. Τα αγάλματα ήταν τοποθετημένα στα αετώματα* και τα ανάγλυφα στόλιζαν τη ζωφόρο, τόσο τη δωρική* όσο και την ιωνική*. Διακοσμητικά ακρωτήρια* του ναού, γλυπτά στα φατνώματα* των οροφών και φυσικά το λατρευτικό άγαλμα του θεού ολοκλήρωναν την γλυπτική διακόσμηση.','An ancient Greek temple, as a tribute to the gods had to be perfect in its form and adorned with exceptional works of art. Thus the temples were decorated externally with statues and reliefs, usually made of marble. The statues were placed on the pediments * and the reliefs decorated the frieze on both the Doric * and the Ionic * orders. Decorative akroteria *, sculptures on the $cofferings$ * of the ceiling and of course the great statue of the god came to complete the allure of the temple.','gamechar','Γλύπτης','Sculptor','Εγώ είμαι γλύπτης! Είμαι καλλιτέχνης και δουλειά μου είναι να στολίσω τον ναό με όμορφα γλυπτά ώστε να γίνει ένα τέλειο αφιέρωμα για τον θεό.  Τα θέματα που εξιστορώ προέρχονται από τη ζωή των θεών αλλά και των ηρώων.\r\n\r\n','I am a sculptor! I am an artist and my job is to decorate the temple with beautiful sculptures in order to transform it to the perfect tribute to the gods. The stories I recount come from the adventures of both gods and mortal heroes.'),(7,'neoclassic','Νεοκλασσικό','Neoclassic','Νεοκλασσικό','Neoclassic','gameicon','Κείμενο εισαγωγής νεοκλασσικού','Neoclassin intoduction text','gamechar','Αριστοκράτης','Nobleμαν','Κείμενο εισαγωγής χαρακτήρα','Κείμενο εισαγωγής χαρακτήρα');
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `geography_questions`
--

DROP TABLE IF EXISTS `geography_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `geography_questions` (
  `questid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `questtext_gr` varchar(500) DEFAULT NULL,
  `questtext_en` varchar(500) DEFAULT NULL,
  `templeid` int(11) DEFAULT NULL,
  `feedbacktext_gr` varchar(500) DEFAULT NULL,
  `feedbacktext_en` varchar(500) DEFAULT NULL,
  `feedback_img` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`questid`),
  UNIQUE KEY `geodataid_UNIQUE` (`questid`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `geography_questions`
--

LOCK TABLES `geography_questions` WRITE;
/*!40000 ALTER TABLE `geography_questions` DISABLE KEYS */;
INSERT INTO `geography_questions` VALUES (1,'Μικρός ιωνικός μαρμάρινος ναός στην άκρη ενός πολύ γνωστού βράχου!  Η θεά  στην οποία ήταν αφιερωμένος έδινε νίκες στους πολέμους της πόλης.','',18,'Ο βωμός του ναού βρισκόταν στα ανατολικά, μπροστά από την είσοδο, ώστε να είναι ορατός από το άγαλμα του θεού που βρισκόταν μέσα στο ναό.    ','','athena nike1.jpg'),(2,'Ιωνικός μαρμάρινος ναός,  αφιερωμένος σε δύο θεούς, την Αθηνά και τον Ποσειδώνα. Πολύ γνωστός για τις Καρυάτιδες, τα 6 περίφημα αγάλματα που αντικαθιστούν τους κίονες σε ένα μικρό τμήμα του ναού.',NULL,25,'Εδώ κατέληγε η πομπή προς τιμή της θεάς Αθηνάς, κατά τη γιορτή των Παναθηναίων. Τα Παναθήναια ήταν μία πολυήμερη γιορτή των Αθηναίων, που περιλάμβανε καλλιτεχνικούς κι αθλητικούς αγώνες.','feedback test',NULL),(3,'Σήμερα μπορείς να δεις μόνο πέντε κίονες από αυτόν το δωρικό ναό, που έχει θέα στη θάλασσα. Ήταν ένα ιερό αφιερωμένο στους «Μεγάλους Θεούς», την ταυτότητα των οποίων δεν γνωρίζουμε με ακρίβεια.',NULL,16,'Ο ναός αυτός  λειτουργούσε ως «Τελεστήριο». Εδώ γίνονταν τελετές που  εξασφάλιζαν σε όσους συμμετείχαν προστασία στη θάλασσα αλλά και τη δυνατότητα να γίνουν πιο ευσεβείς και δίκαιοι. ','feedback test',NULL),(4,'Nαός κτισμένος στη μέση μιας κοιλάδας. Σήμερα έχουν αναστηλωθεί εννέα κίονες στη μία γωνία του ναού. Ο θεός στον οποίο ήταν αφιερωμένος προστάτευε τους βοσκούς και τους κτηνοτρόφους που κατοικούσαν στην κοιλάδα. Δεν ήταν όμως ο Ερμής! Είχε το χαρακτηριστικό επίθετο Νέμειος.','',32,'Εδώ, στο Στάδιο που βρίσκεται κοντά στο ναό, διοργανώνονταν τα Νέμεα. Ήταν γιορτές πανελλήνιου χαρακτήρα με αθλητικούς αγώνες. Είχαν ως πρότυπο τα Ολύμπια αλλά βέβαια δεν τα έφταναν σε αίγλη. Βραβείο στους αγώνες ήταν ένα στεφάνι από σέλινο! Σήμερα αναβιώνει η αρχαία γιορτή καθώς διοργανώνονται τα σύγχρονα Νέμεα κάθε τέσσερα χρόνια!','',NULL),(5,'Ήταν ένα γιγαντιαίος ναός με 155 κίονες, θαύμα της ιωνικής αρχιτεκτονικής! Χαρακτηρίστηκε από τον Ηρόδοτο ως ο μεγαλύτερος της Ελλάδας. Σήμερα σώζεται μόνο ένας κίονας όρθιος περίπου στο μισό από το αρχικό του ύψος και μερικές ψηλές βάσεις κιόνων. \r\n\r\n',NULL,28,'Στο ναό αυτό βρέθηκαν πολλά απλά αλλά και πολύτιμα αφιερώματα. Ο κάθε πιστός, ανάλογα με την κοινωνική και την οικονομική του θέση αφιέρωνε κάτι στη θεά. Ένα τέτοιο αφιέρωμα είναι και αυτός ο γιγαντιαίος Κούρος, άγρυπνος φρουρός του Ιερού.',NULL,NULL),(6,'Ένας ναός χτισμένος από μάρμαρο στην άκρη μιας εύφορης κοιλάδας του νησιού. Είχε πέντε δωρικούς κίονες στην πρόσοψη. Σήμερα μπορείς να δεις δύο από αυτούς ολόκληρους και τους τρεις μέχρι κάποιο ύψος. Επίσης, σώζεται και μία από τις δύο πόρτες του ναού.',NULL,19,'Ο ναός αυτός ήταν ένα «Τελεστήριο», δηλαδή εδώ γίνονταν τελετές σχετικές με την ανανέωση της φύσης και τη λατρεία της θεάς Δήμητρας.\r\n',NULL,NULL),(7,'Είναι ο μεγαλύτερος ναός της Πελοποννήσου, δωρικού ρυθμού. Κτίστηκε στο κέντρο του ιερού άλσους  «Άλτις», που ήταν χώρος λατρείας, θρησκευτικών εορτών και ποικίλων αφιερωμάτων. Σήμερα σώζεται ένας μόνο ολόκληρος  κίονας στην άκρη του ναού και ένας δεύτερος σε μικρότερο ύψος.',NULL,33,'Στο μεγάλο Ιερό της Ολυμπίας γίνονταν κάθε τέσσερα χρόνια πανελλήνιοι αθλητικοί αγώνες, τα Ολύμπια. Ήταν οι πιο φημισμένοι και είχαν τις περισσότερες εκδηλώσεις!',NULL,NULL),(8,'Nαός δωρικού ρυθμού κτισμένος μέσα στο ιερό άλσος «Άλτις», που ήταν γεμάτο από αγριελιές, πεύκα, πλατάνια, λεύκες και βελανιδιές. Σήμερα βλέπει κανείς τέσσερεις ολόκληρους κίονες ενώ οι υπόλοιποι είναι όρθιοι ως τη μέση.',NULL,27,'Στα Ρωμαϊκά χρόνια το Ηραίο ήταν ένα είδος μουσείου, το οποίο στέγαζε πολύτιμα αφιερώματα. Ανάμεσα σε αυτά ήταν και ο περίφημος Ερμής του Πραξιτέλους.',NULL,NULL),(9,'Πολύ επιμήκης ναός  δωρικού ρυθμού. Βρίσκεται σε περίοπτη θέση στο κέντρο του ιερού, ανάμεσα σε δύο θεόρατους βράχους. Ο ναός αυτός λειτουργούσε ως  ένα από τα σημαντικότερα μαντεία της αρχαιότητας.\r\n',NULL,21,'Η μαντεία ήταν μία από τις τελετουργίες λατρείας. Η Πυθία, η Ιέρεια του θεού, έδινε τους χρησμούς στους πιστούς ενώ οι ιερείς του Απόλλωνα ερμήνευαν τους χρησμούς. ',NULL,NULL),(10,'Χτισμένος δίπλα στη θάλασσα, στο πιο ψηλό σημείο ενός βράχου δεσπόζει αυτός ο μεγάλος δωρικός ναός. Το λευκό του μάρμαρο ακτινοβολεί! Σήμερα μπορείς να δεις πολλούς από τους κίονές του.',NULL,29,'Από το σημείο αυτό λέγεται ότι έπεσε στη θάλασσα ο βασιλιάς της Αθήνας Αιγέας όταν είδε το πλοίο του Θησέα να επιστρέφει από την Κρήτη με μαύρα πανιά και νόμισε ότι ο γιος του χάθηκε. Γι’ αυτό το λόγο η θάλασσα αυτή ονομάστηκε Αιγαίο Πέλαγος.',NULL,NULL),(11,'Σε ένα γυμνό και βραχώδες τοπίο βρίσκεται ένας από τους επιβλητικότερους ναούς της αρχαιότητας. Εδώ λατρευόταν ο θεός ως «επικούρειος», δηλαδή βοηθός  και προστάτης. Στην εικόνα μπορείς να δεις τους 15 κίονες  στις μακρές και τους 6 κίονες στις στενές πλευρές του. Σήμερα ο ναός αυτός βρίσκεται κάτω από ένα τεράστιο στέγαστρο για να προστατευτεί από τα καιρικά φαινόμενα! ',NULL,17,'Στο βάθος του κυρίως ναού σχηματιζόταν ένα «άδυτον», δηλαδή ένας εσωτερικός χώρος στον οποίο δεν επιτρεπόταν η πρόσβαση παρά μόνο σε ορισμένα ίσως μέλη του ιερατείου. Μία πλάγια πόρτα φώτιζε τον ιερό αυτό χώρο καθώς εκεί πιστεύεται ότι φυλασσόταν το λατρευτικό άγαλμα του θεού.',NULL,NULL),(12,'Βρίσκεται στην κορυφή ενός υψώματος του νησιού. Δωρικός ναός που ξεχωρίζει για την καλή διατήρησή του. Παρατήρησε τους μονολιθικούς κίονες του ναού, φτιαγμένους δηλαδή από ένα κομμάτι λίθου ο καθένας καθώς και το κεκλιμένο επίπεδο που οδηγούσε στην είσοδο του ναού.',NULL,20,'Εδώ λατρευόταν μία τοπική θεότητα, η Αφαία, που αργότερα ταυτίστηκε με τη θεά Αθηνά. Δες πως είχαν απεικονίσει την Αθηνά στο κέντρο του αετώματος του ναού.',NULL,NULL),(13,'Χτισμένος στο πλάτωμα ενός λόφου, ένας δωρικός  ναός από μονολιθικούς κίονες, φτιαγμένους δηλαδή από ένα κομμάτι λίθου ο καθένας. Σήμερα σώζονται οι επτά κίονες.',NULL,22,'Ο κυρίως ναός χωριζόταν σε δύο χώρους που επικοινωνούσαν μεταξύ τους ίσως με κάποιο άνοιγμα ενδιάμεσα. ',NULL,NULL),(14,'Ο μεγαλύτερος ναός για τον Δία κατά την αρχαιότητα. Κατασκευασμένος σε Κορινθιακό ρυθμό. Αρχικά είχε 104 κίονες. Σήμερα στέκονται όρθιοι μόνο οι 16.',NULL,23,'Στα ρωμαϊκά χρόνια ο σηκός στέγαζε δύο υπερμεγέθη χρυσελεφάντινα αγάλματα του Δία και του αυτοκράτορα Αδριανού, ενώ πλήθος αγαλμάτων και αναθημάτων στόλιζαν τον περίβολο.',NULL,NULL),(15,'Ο μεγαλύτερος και λαμπρότερος ναός της αθηναϊκής  Ακρόπολης αφιερωμένος στην Αθηνά Παρθένο. Είναι κατασκευασμένος από Πεντελικό μάρμαρο, ναός δωρικός με πολλά ιωνικά στοιχεία. Θεωρείται έργο αξεπέραστο για την αρχιτεκτονική, τη γλυπτική του, τις αναλογίες και την κατασκευαστική του τελειότητα!',NULL,31,'Στο εσωτερικό του ναού δέσποζε ένα πελώριο, χρυσελεφάντινο άγαλμα της θεάς Αθηνάς, ύψους σχεδόν 13 μέτρων, έργο του γλύπτη Φειδία. Η θεά όρθια φορούσε μακρύ πέπλο και αιγίδα, είχε περίτεχνο κράνος, κρατούσε στο δεξί της χέρι ένα άγαλμα της θεάς Νίκης ενώ στο αριστερό την ασπίδα της και το δόρυ στηριγμένο στον ώμο της.',NULL,NULL),(16,'Χτισμένος σε ύψωμα στην Αρχαία Αγορά της Αθήνας, ένας από τους καλύτερα διατηρημένους ναούς της αρχαιότητας, γνωστός και ως Θησείο!',NULL,26,'Ήταν αφιερωμένος σε δύο θεούς που προστάτευαν τους τεχνίτες: την Αθηνά Εργάνη και τον Ήφαιστο. Περίφημα ήταν τα χάλκινα λατρευτικά τους αγάλματα στο εσωτερικό του ναού, έργα του γλύπτη Αλκαμένη.',NULL,NULL),(17,'Ναός  χτισμένος κάτω από το βράχο της Ακρόπολης στον αρχαίο Περίπατο, τον δρόμο που περιέβαλλε τον Ιερό Βράχο. Σήμερα σώζονται κυρίως τα κατάλοιπα από τις δύο στοές που υπήρχαν στο Ιερό. Σε μία από αυτές, οι επισκέπτες του ιερού μπορούσαν να διανυκτερεύσουν!',NULL,35,'Ιερό προς τιμήν του Ασκληπιού, θεού της ιατρικής και της υγείας. Ήταν ένα από τα πρώτα «θεραπευτήρια» της Αθήνας. Ο θεός εμφανιζόταν στον ύπνο των ασθενών και είτε τους θεράπευε είτε τους υποδείκνυε τη μέθοδο θεραπείας που έπρεπε να ακολουθήσουν για να γίνουν καλά.',NULL,NULL),(18,'Κυκλικό κτήριο, αρχικά με 20 δωρικούς κίονες, από τους οποίους σήμερα μπορείς να δεις μόνο τους τρεις.',NULL,36,'Δε γνωρίζουμε αρκετά για τη χρήση τέτοιων κυκλικών ναών…',NULL,NULL);
/*!40000 ALTER TABLE `geography_questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `geography_temples`
--

DROP TABLE IF EXISTS `geography_temples`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `geography_temples` (
  `templeid` int(11) NOT NULL AUTO_INCREMENT,
  `templename_gr` varchar(50) DEFAULT NULL,
  `templename_en` varchar(50) DEFAULT NULL,
  `templeimg` varchar(45) DEFAULT NULL,
  `templeiconx` int(11) DEFAULT NULL,
  `templeicony` int(11) DEFAULT NULL,
  PRIMARY KEY (`templeid`),
  UNIQUE KEY `templeid_UNIQUE` (`templeid`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `geography_temples`
--

LOCK TABLES `geography_temples` WRITE;
/*!40000 ALTER TABLE `geography_temples` DISABLE KEYS */;
INSERT INTO `geography_temples` VALUES (16,'Το ιερό των μεγάλων θεών στη Σαμοθράκη','The Temple of the Great God at Samothraki','iero_megalon_theon_samothraki.jpg',1070,326),(17,'Nαός Απόλλωνα στις Βάσσες Αρκαδίας',NULL,'apolon_arkadia.jpg',775,662),(18,'Ο ναός της Αθηνάς Νίκης στην Ακρόπολη των Αθηνών',NULL,'nike - Αντίγραφο 3.jpg',976,598),(19,'Ο ναός της Δήμητρας στο Σαγκρί της Νάξου',NULL,'dimitra_naxos.jpg',1048,724),(20,'Ναός Αφαίας στην Αίγινα',NULL,'Aphaea _2.jpg',872,649),(21,'Nαός Απόλλωνα στους Δελφούς',NULL,'apollonas_delfoi.jpg',805,575),(22,'Nαός Απόλλωνα στην Κόρινθο',NULL,'apollonas_korinthos.jpg',831,625),(23,'Ναός Ολυμπίου Διός στην Αθήνα',NULL,'dias_olubios_athina.jpg',976,596),(24,'Ναός Ολυμπίου Διός στην Αθήνα',NULL,'dias_olubios_athina.jpg',975,596),(25,'Ερέχθειο στην Ακρόπολη της Αθήνας',NULL,'ND opsi 2.jpg',975,595),(26,'Ναός Ηφαίστου στην Αθήνα',NULL,'ifaistos_athina.jpg',976,598),(27,'Ναός Ήρας στην Ολυμπία',NULL,'ira_olubia.jpg',719,672),(28,'Ναός Ήρας στη Σάμο',NULL,'ira_samo.jpg',1162,649),(29,'Nαός Ποσειδώνα στο Σούνιο',NULL,'poseidonas_sounio.jpg',898,615),(31,'Παρθενώνας στην Ακρόπολη',NULL,'parthenonas.jpg',898,615),(32,'Ναός του Δία στη Νεμέα',NULL,'nemea.jpg',719,692),(33,'Ναός του Δία στην Ολυμπία',NULL,'dios olympia 3.jpg',719,672),(35,'Ναός Ασκληπιού στη Νότια Κλιτύ της Ακρόπολης',NULL,'asklepieio4.jpg',898,615),(36,'Θόλος στους Δελφούς',NULL,'tholos_delfoi.jpg',818,566);
/*!40000 ALTER TABLE `geography_temples` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `players` (
  `playerid` int(11) NOT NULL AUTO_INCREMENT,
  `playername` varchar(145) NOT NULL,
  `playerpsw` varchar(45) NOT NULL,
  `avatar_person` varchar(45) DEFAULT NULL,
  `avatar_haircolor` varchar(45) DEFAULT NULL,
  `avatar_clothcolor` varchar(45) DEFAULT NULL,
  `player_house_file` longtext,
  PRIMARY KEY (`playerid`)
) ENGINE=InnoDB AUTO_INCREMENT=152 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
INSERT INTO `players` VALUES (38,'aa','aa','true','yellow','navy','aaaaaa'),(70,'stavrina','ysma12','true','black','navy',NULL),(71,'mariaT','ishtar','true','black','navy',NULL),(74,'stathis','111111','true','black','navy',NULL),(75,'eirini','eirini','true','black','navy',NULL),(87,'margo89','margo89','true','black','navy',NULL),(92,'stathis2','stathis2','true','black','navy',NULL),(95,'stavriani','wecare','true','black','navy',NULL),(96,'asimina','asimina','true','black','navy',NULL),(97,'ΤΕΡΨΙΘΕΑ','123456','true','black','navy',NULL),(98,'stavrin','lakki1234','true','black','navy',NULL),(102,'ioannaath','ioanna2002','false','black','navy',NULL),(111,'','','false','yellow','navy',NULL),(122,'mina12','mina12','true','black','red',NULL),(123,'test22','test22','true','black','purple',NULL),(124,'telemach','telemach','true','black','red',NULL),(126,'asasas','asasas','true','black','purple',NULL),(127,'shrhfff','fgnsrtsa','false','yellow','purple',NULL),(128,'asimi1','asimi1','true','black','red',NULL),(129,'maria12','maria12','true','black','red',NULL),(130,'stavrinapi','tokio1','false','yellow','green',NULL),(131,'stathis22','111111','true','black','purple',NULL),(133,'stavrinapip','tokio1','false','yellow','navy',NULL),(134,'sylvia','sylvia','true','black','red',NULL),(135,'mairy123','osaka123','false','brown','blue',NULL),(136,'ysma','ysma','false','black','blue',NULL),(137,'aaaaaaa','aaaaaaaa','false','black','navy',NULL),(138,'ysma21','ysma21','true','black','red',NULL),(139,'dfgdfae','sdfgertg','false','brown','purple',NULL),(140,'rhfghrt','srthrt5rfgt','true','black','red',NULL),(141,'aaaaaa','aaaaaa','true','brown','purple',NULL),(142,'fhfrth4ssw','dfhraswsef','true','black','red',NULL),(143,'dsfgregegdf','dfgergewe','true','black','red',NULL),(144,'kkkkkkkk','kkkkkk','true','black','purple',NULL),(145,'ooooooo','ooooooo','true','yellow','navy',NULL),(146,'syliap','sylaki63','false','brown','green',NULL),(147,'test','test','false','brown','green',NULL),(148,'oooooo','oooooo','false','yellow','blue',NULL),(149,'katerina15','katerina15','false','brown','navy',NULL),(150,'dfger2sdf','sfgwersas','true','black','red',NULL),(151,'fbhdhrxfc','wsrgxddvx','true','black','red',NULL);
/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scores`
--

DROP TABLE IF EXISTS `scores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scores` (
  `scoreid` int(11) NOT NULL AUTO_INCREMENT,
  `playerid` int(11) DEFAULT NULL,
  `gameid` int(11) DEFAULT NULL,
  `scorepoints` int(11) DEFAULT NULL,
  PRIMARY KEY (`scoreid`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scores`
--

LOCK TABLES `scores` WRITE;
/*!40000 ALTER TABLE `scores` DISABLE KEYS */;
INSERT INTO `scores` VALUES (1,111,1,81),(2,111,2,1149),(3,111,3,452),(4,111,4,269),(5,111,5,1066),(6,111,6,1050),(7,111,7,111),(10,38,2,535),(12,75,1,99),(13,75,3,438),(14,123,2,118),(15,123,1,53),(16,87,5,98),(17,128,4,70),(18,130,1,19),(19,38,3,394),(20,38,4,114),(21,131,2,498),(22,71,1,22),(23,71,3,260),(24,71,5,7),(25,133,1,45),(26,134,1,58),(27,133,2,842),(28,133,3,452),(29,133,4,89),(30,133,6,4),(31,133,5,29),(32,136,1,116),(33,136,5,567),(34,136,4,243),(35,87,3,234),(36,87,6,1086),(37,137,1,64),(38,136,2,575),(39,136,6,1178),(40,139,5,1054),(41,138,1,8),(42,136,3,225),(43,146,1,53),(44,38,6,580),(45,148,1,77),(46,150,6,564),(47,151,6,1160);
/*!40000 ALTER TABLE `scores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sculpture_temples_parts`
--

DROP TABLE IF EXISTS `sculpture_temples_parts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sculpture_temples_parts` (
  `sculpture_temples_part_id` int(11) NOT NULL,
  `sculpture_temples_part_name_gr` varchar(100) DEFAULT NULL,
  `sculpture_temples_part_name_em` varchar(100) DEFAULT NULL,
  `sculpture_temples_X` int(11) DEFAULT NULL,
  `sculpture_temples_Y` int(11) DEFAULT NULL,
  `sculpture_temples_W` int(11) DEFAULT NULL,
  `sculpture_temples_H` int(11) DEFAULT NULL,
  PRIMARY KEY (`sculpture_temples_part_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sculpture_temples_parts`
--

LOCK TABLES `sculpture_temples_parts` WRITE;
/*!40000 ALTER TABLE `sculpture_temples_parts` DISABLE KEYS */;
/*!40000 ALTER TABLE `sculpture_temples_parts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sculptures`
--

DROP TABLE IF EXISTS `sculptures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sculptures` (
  `sculpture_id` int(11) NOT NULL AUTO_INCREMENT,
  `sculpture_temple_part_id` int(11) DEFAULT NULL,
  `sculpture_file` varchar(45) DEFAULT NULL,
  `sculpture_feedback_gr` mediumtext,
  `sculpture_feedback_en` mediumtext,
  `sculpture_feedback_file` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`sculpture_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sculptures`
--

LOCK TABLES `sculptures` WRITE;
/*!40000 ALTER TABLE `sculptures` DISABLE KEYS */;
/*!40000 ALTER TABLE `sculptures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sign_signs`
--

DROP TABLE IF EXISTS `sign_signs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sign_signs` (
  `sign_id` int(11) NOT NULL AUTO_INCREMENT,
  `sign_name_gr` varchar(120) DEFAULT NULL,
  `sign_name_en` varchar(120) DEFAULT NULL,
  `sign_file` varchar(120) DEFAULT NULL,
  `sign_feedback_gr` mediumtext,
  `sign_feedback_en` mediumtext,
  PRIMARY KEY (`sign_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sign_signs`
--

LOCK TABLES `sign_signs` WRITE;
/*!40000 ALTER TABLE `sign_signs` DISABLE KEYS */;
/*!40000 ALTER TABLE `sign_signs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sign_texts`
--

DROP TABLE IF EXISTS `sign_texts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sign_texts` (
  `sign_text_id` int(11) NOT NULL AUTO_INCREMENT,
  `sign_text_name_gr` varchar(120) DEFAULT NULL,
  `sign_text_name_en` varchar(120) DEFAULT NULL,
  `sign_file` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`sign_text_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sign_texts`
--

LOCK TABLES `sign_texts` WRITE;
/*!40000 ALTER TABLE `sign_texts` DISABLE KEYS */;
/*!40000 ALTER TABLE `sign_texts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sign_words`
--

DROP TABLE IF EXISTS `sign_words`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sign_words` (
  `sign_word_id` int(11) NOT NULL AUTO_INCREMENT,
  `sign_id` int(11) DEFAULT NULL,
  `sign_text_id` int(11) DEFAULT NULL,
  `word_gr` varchar(45) DEFAULT NULL,
  `word_en` varchar(45) DEFAULT NULL,
  `signX` int(11) DEFAULT NULL,
  `signY` int(11) DEFAULT NULL,
  `signW` int(11) DEFAULT NULL,
  `signH` int(11) DEFAULT NULL,
  `textX` int(11) DEFAULT NULL,
  `textY` int(11) DEFAULT NULL,
  `textW` int(11) DEFAULT NULL,
  `textH` int(11) DEFAULT NULL,
  PRIMARY KEY (`sign_word_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sign_words`
--

LOCK TABLES `sign_words` WRITE;
/*!40000 ALTER TABLE `sign_words` DISABLE KEYS */;
/*!40000 ALTER TABLE `sign_words` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'ancienttempledb'
--

--
-- Dumping routines for database 'ancienttempledb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-18 20:57:29
