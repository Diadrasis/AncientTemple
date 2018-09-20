function StartTypeC()
{
    DebugLog('StartTypeC');
    TypeCPrepareVariables();
    TypeCLoadPieces();
    typeDragZone = _this.add.zone(701, 549, 1177, 818).setDropZone();
    allPiecesForCurrentTempleType = 13;
    typeTimeToShowTemplePreview = 5000;
}


function TypeCPrepareVariables()
{
    templeLoadKeyName = 'temple_2';
    templeFolderName = "pieces_2/";

    piecesNames = ['wall_1', 'kolona_1', 'kolona_2', 'wall_2', 'wall_3' ];
    piecesShadowNames = ['wall_1_skia',  'kolona_1_skia', 'kolona_2_skia', 'wall_2_skia', 'wall_3_skia'];
    posPiecesStaticX = [1713, 1561, 1421, 1616, 1632 ];
    posPiecesStaticY = [227, 313, 353, 617, 847];
    posTempleBase = {x:151, y:263};

    grid_wall_1 = [];//file 1.png
    grid_wall_2 = [];//file 4.png
    grid_wall_3 = [];//file 5.png
    grid_column = [];//file 2.png
    grid_column_2 = [];//file 3.png
    allGrids = [grid_wall_1, grid_column, grid_column_2, grid_wall_2, grid_wall_3 ];
    thesi = { x: 0, y: 0 };
}

function TypeCLoadPieces() {

    _this.load.once('complete', TypeCCreatePieces, this);

    //temple completed preview
    _this.load.image(templeLoadKeyName + 'preview', getSceneImagesFolder() + templeFolderName+'temple_2.png');

    //base
    _this.load.image(templeLoadKeyName+'base_2', getSceneImagesFolder() + templeFolderName+'base_2.png');

    //pieces
    _this.load.image(templeLoadKeyName+piecesNames[0], getSceneImagesFolder() + templeFolderName + '1.png');
    _this.load.image(templeLoadKeyName+piecesShadowNames[0], getSceneImagesFolder() + templeFolderName + '1_shadow.png');
    _this.load.image(templeLoadKeyName+piecesNames[1], getSceneImagesFolder() + templeFolderName + '2.png');
    _this.load.image(templeLoadKeyName+piecesShadowNames[1], getSceneImagesFolder() + templeFolderName + '2_shadow.png');
    _this.load.image(templeLoadKeyName+piecesNames[2], getSceneImagesFolder() + templeFolderName + '3.png');
    _this.load.image(templeLoadKeyName+piecesShadowNames[2], getSceneImagesFolder() + templeFolderName + '3_shadow.png');
    _this.load.image(templeLoadKeyName+piecesNames[3], getSceneImagesFolder() + templeFolderName + '4.png');
    _this.load.image(templeLoadKeyName+piecesShadowNames[3], getSceneImagesFolder() + templeFolderName + '4_shadow.png');
    _this.load.image(templeLoadKeyName+piecesNames[4], getSceneImagesFolder() + templeFolderName + '5.png');
    _this.load.image(templeLoadKeyName+piecesShadowNames[4], getSceneImagesFolder() + templeFolderName + '5_shadow.png');

    _this.load.start();

}

function TypeCMakeGridPositions() {

    //#region wall 1.png grid positions

    nX = posTempleBase.x + 733;// 889;
    nY = posTempleBase.y + 177;// 133;

    grid_wall_1.push({ x: nX, y: nY });

    for (var p = 0; p < 3; p++) {
        nX += 43;
        nY -= 14;
        grid_wall_1.push({ x: nX, y: nY });
    }

    nX = posTempleBase.x + 733;// 889;
    nY = posTempleBase.y + 177;// 133;

    for (var p = 0; p < 14; p++) {
        nX -= 43;
        nY += 14;
        grid_wall_1.push({ x: nX, y: nY });
    }

    //#endregion

    //#region wall 5.png grid positions

    nX = posTempleBase.x + 637;
    nY = posTempleBase.y + 370;

    grid_wall_3.push({ x: nX, y: nY });

    for (var p = 0; p < 7; p++) {
        nX -= 24;
        nY -= 41;
        grid_wall_3.push({ x: nX, y: nY });
    }

    //#endregion

    //#region wall 4.png grid positions

    nX = posTempleBase.x + 468;
    nY = posTempleBase.y + 96;

    grid_wall_2.push({ x: nX, y: nY });

    for (var p = 0; p < 7; p++) {
        nX += 21;
        nY += 35;
        grid_wall_2.push({ x: nX, y: nY });
    }


    //#endregion

   //#region column 2.png grid positions

   //1st row

   nX = posTempleBase.x + 138;
   nY = posTempleBase.y + 196;

   grid_column.push({ x: nX, y: nY });

   for (var p = 0; p < 8; p++) {
       nX += 82.75;
       nY -= 25.125;
       grid_column.push({ x: nX, y: nY });
   }

   //2nd row

   nX = posTempleBase.x + 195;
   nY = posTempleBase.y + 288;

   grid_column.push({ x: nX, y: nY });

   for (var p = 0; p < 8; p++) {
       nX += 82.625;
       nY -= 24.875;
       grid_column.push({ x: nX, y: nY });
   }

   //3nd row

   nX = posTempleBase.x + 253;
   nY = posTempleBase.y + 380;

   grid_column.push({ x: nX, y: nY });

   for (var p = 0; p < 8; p++) {
       nX += 82.625;
       nY -= 25;
       grid_column.push({ x: nX, y: nY });
   }

   //4th row

   nX = posTempleBase.x + 312;
   nY = posTempleBase.y + 471;

   grid_column.push({ x: nX, y: nY });

   for (var p = 0; p < 8; p++) {
       nX += 82.85;
       nY -= 25.125;
       grid_column.push({ x: nX, y: nY });
   }

   //#endregion

   //#region column 3.png grid positions

   //row diff => x=63 y=100

   nX = posTempleBase.x + 332;
   nY = posTempleBase.y + 242;

   grid_column_2.push({ x: nX, y: nY });

   nX = posTempleBase.x + 395;
   nY = posTempleBase.y + 342;

   grid_column_2.push({ x: nX, y: nY });

   //1st row
   nX = posTempleBase.x + 332;
   nY = posTempleBase.y + 242;

   for (var p = 0; p < 3; p++) {
       nX -= 45;
       nY += 13;
       grid_column_2.push({ x: nX, y: nY });
   }

   nX = posTempleBase.x + 332;
   nY = posTempleBase.y + 242;

   for (var p = 0; p < 12; p++) {
       nX += 45;
       nY -= 13;
       grid_column_2.push({ x: nX, y: nY });
   }

   //2nd row
   nX = posTempleBase.x + 395;
   nY = posTempleBase.y + 342;

   for (var p = 0; p < 3; p++) {
       nX -= 45;
       nY += 13;
       grid_column_2.push({ x: nX, y: nY });
   }

   nX = posTempleBase.x + 395;
   nY = posTempleBase.y + 342;

   for (var p = 0; p < 12; p++) {
       nX += 45;
       nY -= 13;
       grid_column_2.push({ x: nX, y: nY });
   }

   //3nd row
   nX = posTempleBase.x + 458;
   nY = posTempleBase.y + 442;

   for (var p = 0; p < 3; p++) {
       nX -= 45;
       nY += 13;
       grid_column_2.push({ x: nX, y: nY });
   }

   nX = posTempleBase.x + 458;
   nY = posTempleBase.y + 442;

   for (var p = 0; p < 12; p++) {
       nX += 45;
       nY -= 13;
       grid_column_2.push({ x: nX, y: nY });
   }

   //4nd row
   nX = posTempleBase.x + 269;
   nY = posTempleBase.y + 142;

   for (var p = 0; p < 3; p++) {
       nX -= 45;
       nY += 13;
       grid_column_2.push({ x: nX, y: nY });
   }

   nX = posTempleBase.x + 269;
   nY = posTempleBase.y + 142;

   for (var p = 0; p < 12; p++) {
       nX += 45;
       nY -= 13;
       grid_column_2.push({ x: nX, y: nY });
   }


   //#endregion
   
}


function TypeCCreatePieces() {

    TypeCMakeGridPositions();

    //base
    var vasi = _this.add.image(posTempleBase.x, posTempleBase.y, templeLoadKeyName+'base_2');
    vasi.setOrigin(0, 0);
    vasi.setInteractive();
    vasi.input.dropZone = true;
    
    //preview
    templePreview = _this.add.image(posTempleBase.x + 558, posTempleBase.y + 300, templeLoadKeyName + 'preview').setOrigin(0.5, 0.5);

    templePreview.visible = true;

    //#region create pieces

    //for each part
    for (var i = 0; i < 5; i++) {

        var posX = posPiecesStaticX[i];
        var posY = posPiecesStaticY[i];

        //var image;

        //create 24 pieces for each part
        for (var x = 0; x < 15; x++) {

            var image = _this.add.image(posX, posY, templeLoadKeyName+piecesShadowNames[i]).setName(i).setInteractive({ cursor: 'pointer' });

            if (x === 0) {
                image.setAlpha(1);
            } else {
                image.setAlpha(0.1);
            }
            
            if (image.width > 700) {
                image.setScale(0.7);
            } else {
                image.setScale(0.8);
            }

            //image.setOrigin(0.5, 1);

            _this.input.setDraggable(image);

            // image.on('pointerover', function () {
            //     this.setTint(0x00ff00);
            // });

            // image.on('pointerout', function () {
            //     this.clearTint();
            // });
        }
    }

    //#endregion

}

function checkSolutionTypeC() {
    
    DebugLog('checking if solution');

    count = 0;
    //βρες αν το κάθε κομμάτι είναι στη σωστή θέση
    for (var i = 0; i < piecesOnBoard.length; i++) {
        var onoma = piecesOnBoard[i].name;                                      DebugLog(onoma);
        var pos = { x: piecesOnBoard[i].x, y: piecesOnBoard[i].y };

        // DebugLog(onoma + ' pos = '+ pos.x + ' , ' + pos.y);

        piecesOnBoard[i].setAlpha(0.5);
        piecesOnBoard[i].setTint(0xff8080);

        if (onoma === 0) {//piece 1.png
            if (allGrids[0][0].x === pos.x && allGrids[0][0].y === pos.y) {
                count++;
                piecesOnBoard[i].setAlpha(1);
                piecesOnBoard[i].clearTint();
            }
        }else
        if (onoma === 4) {//piece 5.png
            if (allGrids[4][0].x === pos.x && allGrids[4][0].y === pos.y) {
                count++;
                piecesOnBoard[i].setAlpha(1);
                piecesOnBoard[i].clearTint();
            }
        }else
        if (onoma === 3) {//piece 4.png wall
            if (allGrids[3][0].x === pos.x && allGrids[3][0].y === pos.y) {
                count++;
                piecesOnBoard[i].setAlpha(1);
                piecesOnBoard[i].clearTint();
            }
        }else
        if (onoma === 1) {//piece 2.png column
            if (allGrids[1][0].x === pos.x && allGrids[1][0].y === pos.y) {
                count++;
                piecesOnBoard[i].setAlpha(1);
                piecesOnBoard[i].clearTint();
            }else
            if (allGrids[1][8].x === pos.x && allGrids[1][8].y === pos.y) {
                count++;
                piecesOnBoard[i].setAlpha(1);
                piecesOnBoard[i].clearTint();
            }else
            if (allGrids[1][9].x === pos.x && allGrids[1][9].y === pos.y) {
                count++;
                piecesOnBoard[i].setAlpha(1);
                piecesOnBoard[i].clearTint();
            }else
            if (allGrids[1][17].x === pos.x && allGrids[1][17].y === pos.y) {
                count++;
                piecesOnBoard[i].setAlpha(1);
                piecesOnBoard[i].clearTint();
            }else
            if (allGrids[1][18].x === pos.x && allGrids[1][18].y === pos.y) {
                count++;
                piecesOnBoard[i].setAlpha(1);
                piecesOnBoard[i].clearTint();
            }else
            if (allGrids[1][26].x === pos.x && allGrids[1][26].y === pos.y) {
                count++;
                piecesOnBoard[i].setAlpha(1);
                piecesOnBoard[i].clearTint();
            }else
            if (allGrids[1][27].x === pos.x && allGrids[1][27].y === pos.y) {
                count++;
                piecesOnBoard[i].setAlpha(1);
                piecesOnBoard[i].clearTint();
            }else
            if (allGrids[1][35].x === pos.x && allGrids[1][35].y === pos.y) {
                count++;
                piecesOnBoard[i].setAlpha(1);
                piecesOnBoard[i].clearTint();
            }
        }else
        if (onoma === 2) {//piece 3.png wall
            if (allGrids[2][0].x === pos.x && allGrids[2][0].y === pos.y) {
                count++;
                piecesOnBoard[i].setAlpha(1);
                piecesOnBoard[i].clearTint();
            }else
            if (allGrids[2][1].x === pos.x && allGrids[2][1].y === pos.y) {
                count++;
                piecesOnBoard[i].setAlpha(1);
                piecesOnBoard[i].clearTint();
            }
        }

    }

    DebugLog('correct are ' + count + ' and we need ' + allPiecesForCurrentTempleType);
    DebugLog('correct on board are ' + count + ' / ' + piecesOnBoard.length);

    if (count === allPiecesForCurrentTempleType && piecesOnBoard.length === allPiecesForCurrentTempleType) {
        DebugLog('YOU WIN !!!!!');

        winTypeGame();
    }

    //}

}