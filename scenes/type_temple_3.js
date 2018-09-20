function StartTypeD()
{
    DebugLog('StartTypeD');
    TypeDPrepareVariables();
    TypeDLoadPieces();
    typeDragZone = _this.add.zone(708, 532, 1203, 730).setDropZone();
    allPiecesForCurrentTempleType = 59;
    typeTimeToShowTemplePreview = 7000;
}


function TypeDPrepareVariables()
{
    templeLoadKeyName = 'temple_3';
    templeFolderName = "pieces_3/";

    piecesNames = ['column_1', 'column_2', 'wall_3', 'wall_4', 'wall_5', 'wall_6' ];
    piecesShadowNames = ['column_1_shadow', 'column_2_shadow', 'wall_3_shadow', 'wall_4_shadow', 'wall_5_shadow', 'wall_6_shadow' ];
    posPiecesStaticX = [1568, 1702, 1518, 1688, 1596, 1656];
    posPiecesStaticY = [183, 181, 483, 423, 671, 830];
    posTempleBase = {x:119, y:272};

    grid_wall_1 = [];//file 3.png
    grid_wall_2 = [];//file 4.png
    grid_wall_3 = [];//file 5.png
    grid_wall_4 = [];//file 6.png
    grid_column = [];//file 1.png
    grid_column_2 = [];//file 2.png
    allGrids = [grid_column, grid_column_2, grid_wall_1, grid_wall_2, grid_wall_3, grid_wall_4 ];
    thesi = { x: 0, y: 0 };
}

function TypeDLoadPieces() {

    _this.load.once('complete', TypeDCreatePieces, this);

    //temple completed preview
    _this.load.image(templeLoadKeyName + 'preview', getSceneImagesFolder() + templeFolderName+'temple_3.png');

    //base
     _this.load.image(templeLoadKeyName+'base_3', getSceneImagesFolder() + templeFolderName+'base_3.png');
    

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
    _this.load.image(templeLoadKeyName+piecesNames[5], getSceneImagesFolder() + templeFolderName + '6.png');
    _this.load.image(templeLoadKeyName+piecesShadowNames[5], getSceneImagesFolder() + templeFolderName + '6_shadow.png');

    _this.load.start();

}

function TypeDMakeGridPositions() {

    //#region column 1.png grid positions

   //1st row

   nX = posTempleBase.x + 58;
   nY = posTempleBase.y + 218;

   grid_column.push({ x: nX, y: nY });

   for (var p = 0; p < 12; p++) {
       nX += 76;
       nY -= 19.5;
       grid_column.push({ x: nX, y: nY });
   }

   //2nd row

   nX = posTempleBase.x + 87;
   nY = posTempleBase.y + 270;

   grid_column.push({ x: nX, y: nY });

   for (var p = 0; p < 12; p++) {
       nX += 76;
       nY -= 19.5;
       grid_column.push({ x: nX, y: nY });
   }

   //3nd row

   nX = posTempleBase.x + 116;
   nY = posTempleBase.y + 324;

   grid_column.push({ x: nX, y: nY });

   for (var p = 0; p < 12; p++) {
       nX += 76;
       nY -= 19.5;
       grid_column.push({ x: nX, y: nY });
   }

   //4th row

   nX = posTempleBase.x + 147;
   nY = posTempleBase.y + 375;

   grid_column.push({ x: nX, y: nY });

   for (var p = 0; p < 12; p++) {
       nX += 76;
       nY -= 19.5;
       grid_column.push({ x: nX, y: nY });
   }

   //5th row

   nX = posTempleBase.x + 175;
   nY = posTempleBase.y + 429;

   grid_column.push({ x: nX, y: nY });

   for (var p = 0; p < 12; p++) {
       nX += 76;
       nY -= 19.5;
       grid_column.push({ x: nX, y: nY });
   }

   //6th row

   nX = posTempleBase.x + 205;
   nY = posTempleBase.y + 479;

   grid_column.push({ x: nX, y: nY });

   for (var p = 0; p < 12; p++) {
       nX += 76;
       nY -= 19.5;
       grid_column.push({ x: nX, y: nY });
   }

   //visual test
//    for(var i=0; i<grid_column.length; i++){
//     _this.add.image(grid_column[i].x , grid_column[i].y , templeLoadKeyName+piecesShadowNames[0]).setOrigin(0.5, 0.5).depth = 10;
//    }

   //#endregion

    //#region column 2.png grid positions

   //1st row

   nX = posTempleBase.x + 456;
   nY = posTempleBase.y + 207;

   grid_column_2.push({ x: nX, y: nY });

   for (var p = 1; p <= 6; p++) {
       nX += 45;
       nY -= 12;
       grid_column_2.push({ x: nX, y: nY });
   }

   nX = posTempleBase.x + 512;
   nY = posTempleBase.y + 307;

   grid_column_2.push({ x: nX, y: nY });

   for (var p = 7; p <= 12; p++) {
       nX += 45;
       nY -= 12;
       grid_column_2.push({ x: nX, y: nY });
   }

   nX = posTempleBase.x + 767;
   nY = posTempleBase.y + 205;

   grid_column_2.push({ x: nX, y: nY });

   nX = posTempleBase.x + 749;
   nY = posTempleBase.y + 169;

   grid_column_2.push({ x: nX, y: nY });

   //more wrong positions

    nX = posTempleBase.x + 456;
    nY = posTempleBase.y + 207;

    for (var p = 0; p < 8; p++) {
        nX -= 45;
        nY += 12;
        grid_column_2.push({ x: nX, y: nY });
    }

    nX = posTempleBase.x + 512;
    nY = posTempleBase.y + 307;

    for (var p = 0; p < 8; p++) {
        nX -= 45;
        nY += 12;
        grid_column_2.push({ x: nX, y: nY });
    }

    nX = posTempleBase.x + 767;
    nY = posTempleBase.y + 205;

    for (var p = 0; p < 14; p++) {
        nX -= 45;
        nY += 12;
        grid_column_2.push({ x: nX, y: nY });
    }

    nX = posTempleBase.x + 749;
    nY = posTempleBase.y + 169;

    for (var p = 0; p < 14; p++) {
        nX -= 45;
        nY += 12;
        grid_column_2.push({ x: nX, y: nY });
    }

    //visual test
//    for(var i=0; i<grid_column_2.length; i++){
//     _this.add.image(grid_column_2[i].x , grid_column_2[i].y , templeLoadKeyName+piecesShadowNames[1]).setOrigin(0.5, 0.5).depth = 10;
//    }

//#endregion

    //#region wall 3.png

    nX = posTempleBase.x + 403;
    nY = posTempleBase.y + 226;

    grid_wall_1.push({ x: nX, y: nY });

    nX = posTempleBase.x + 455;
    nY = posTempleBase.y + 318;

    grid_wall_1.push({ x: nX, y: nY });

    //wrong positions

    nX = posTempleBase.x + 403;
    nY = posTempleBase.y + 226;

    for (var p = 1; p <= 15; p++) {
        nX += 41;
        nY -= 11;
        grid_wall_1.push({ x: nX, y: nY });
    }

    nX = posTempleBase.x + 403;
    nY = posTempleBase.y + 226;

    for (var p = 1; p <= 7; p++) {
        nX -= 41;
        nY += 11;
        grid_wall_1.push({ x: nX, y: nY });
    }

    nX = posTempleBase.x + 455;
    nY = posTempleBase.y + 318;

    for (var p = 1; p <= 15; p++) {
        nX += 41;
        nY -= 11;
        grid_wall_1.push({ x: nX, y: nY });
    }

    nX = posTempleBase.x + 455;
    nY = posTempleBase.y + 318;

    for (var p = 1; p <= 7; p++) {
        nX -= 41;
        nY += 11;
        grid_wall_1.push({ x: nX, y: nY });
    }

    nX = posTempleBase.x + 428;
    nY = posTempleBase.y + 272;
    grid_wall_1.push({ x: nX, y: nY });

    for (var p = 1; p <= 15; p++) {
        nX += 41;
        nY -= 11;
        grid_wall_1.push({ x: nX, y: nY });
    }

    nX = posTempleBase.x + 428;
    nY = posTempleBase.y + 272;

    for (var p = 1; p <= 7; p++) {
        nX -= 41;
        nY += 11;
        grid_wall_1.push({ x: nX, y: nY });
    }

    nX = posTempleBase.x + 485;
    nY = posTempleBase.y + 371;
    grid_wall_1.push({ x: nX, y: nY });

    for (var p = 1; p <= 15; p++) {
        nX += 41;
        nY -= 11;
        grid_wall_1.push({ x: nX, y: nY });
    }

    nX = posTempleBase.x + 485;
    nY = posTempleBase.y + 371;

    for (var p = 1; p <= 7; p++) {
        nX -= 41;
        nY += 11;
        grid_wall_1.push({ x: nX, y: nY });
    }

    nX = posTempleBase.x + 374;
    nY = posTempleBase.y + 177;
    grid_wall_1.push({ x: nX, y: nY });

    for (var p = 1; p <= 15; p++) {
        nX += 41;
        nY -= 11;
        grid_wall_1.push({ x: nX, y: nY });
    }

    nX = posTempleBase.x + 374;
    nY = posTempleBase.y + 177;

    for (var p = 1; p <= 7; p++) {
        nX -= 41;
        nY += 11;
        grid_wall_1.push({ x: nX, y: nY });
    }

    //visual test
    // for (var i = 0; i < grid_wall_1.length; i++) {
    //     _this.add.image(grid_wall_1[i].x, grid_wall_1[i].y, templeLoadKeyName + piecesShadowNames[2]).setOrigin(0.5, 0.5).depth = grid_wall_1[i].y;
    // }
    //#endregion

    //#region wall 4.png

    nX = posTempleBase.x + 817;
    nY = posTempleBase.y + 167;

    grid_wall_2.push({ x: nX, y: nY });

    //wrong positions
    nX = posTempleBase.x + 817;
    nY = posTempleBase.y + 167;

    for (var p = 0; p < 7; p++) {
        nX += 31;
        nY -= 8;
        grid_wall_2.push({ x: nX, y: nY });
    }

    nX = posTempleBase.x + 817;
    nY = posTempleBase.y + 167;

    for (var p = 0; p < 22; p++) {
        nX -= 31;
        nY += 8;
        grid_wall_2.push({ x: nX, y: nY });
    }

    //visual test
    // for (var i = 0; i < grid_wall_2.length; i++) {
    //     _this.add.image(grid_wall_2[i].x, grid_wall_2[i].y, templeLoadKeyName + piecesShadowNames[3]).setOrigin(0.5, 0.5).depth = grid_wall_2[i].y;
    // }

    //#endregion

    //#region wall 5.png

    nX = posTempleBase.x + 563;
    nY = posTempleBase.y + 152;

    grid_wall_3.push({ x: nX, y: nY });

    //wrong positions
    nX = posTempleBase.x + 563;
    nY = posTempleBase.y + 152;

    for (var p = 0; p < 1; p++) {
        nX -= 15;
        nY -= 24;
        grid_wall_3.push({ x: nX, y: nY });
    }

    nX = posTempleBase.x + 563;
    nY = posTempleBase.y + 152;

    for (var p = 0; p < 8; p++) {
        nX += 15;
        nY += 24;
        grid_wall_3.push({ x: nX, y: nY });
    }

    //visual test
    // for (var i = 0; i < grid_wall_3.length; i++) {
    //     _this.add.image(grid_wall_3[i].x, grid_wall_3[i].y, templeLoadKeyName + piecesShadowNames[4]).setOrigin(0.5, 0.5).depth = grid_wall_3[i].y;
    // }

    //#endregion

    //#region wall 6.png

   nX = posTempleBase.x + 646;
   nY = posTempleBase.y + 301;

   grid_wall_4.push({ x: nX, y: nY });

   //wrong positions
   nX = posTempleBase.x + 646;
   nY = posTempleBase.y + 301;

   for (var p = 0; p < 7; p++) {
       nX -= 16;
       nY -= 25;
       grid_wall_4.push({ x: nX, y: nY });
   }

   nX = posTempleBase.x + 646;
   nY = posTempleBase.y + 301;

   for (var p = 0; p < 2; p++) {
       nX += 16;
       nY += 25;
       grid_wall_4.push({ x: nX, y: nY });
   }

   //visual test
//    for (var i = 0; i < grid_wall_4.length; i++) {
//        _this.add.image(grid_wall_4[i].x, grid_wall_4[i].y, templeLoadKeyName + piecesShadowNames[5]).setOrigin(0.5, 0.5).depth = grid_wall_4[i].y;
//    }

   //#endregion
  
}

function TypeDCreatePieces() {

    TypeDMakeGridPositions();

    //base
    var vasi = _this.add.image(posTempleBase.x, posTempleBase.y, templeLoadKeyName+'base_3');
    vasi.setOrigin(0, 0);
    vasi.setInteractive();
    vasi.input.dropZone = true;

    //preview
    templePreview = _this.add.image(posTempleBase.x + 592, posTempleBase.y + 262, templeLoadKeyName + 'preview').setOrigin(0.5, 0.5);

    templePreview.visible = true;

    //#region create pieces

    //for each part
    for (var i = 0; i < posPiecesStaticX.length; i++) {

        var posX = posPiecesStaticX[i];
        var posY = posPiecesStaticY[i];

        var totalPieces = 0;

        if(i==0){
            totalPieces = 72;
        }else
        if(i==1){
            totalPieces = 72;
        }else
        if(i==2){
            totalPieces = 25;
        }else
        if(i==3){
            totalPieces = 25;
        }else
        if(i==4){
            totalPieces = 17;
        }else
        if(i==5){
            totalPieces = 17;
        }

        //create 24 pieces for each part
        for (var x = 0; x < totalPieces; x++) {

            var image = _this.add.image(posX, posY, templeLoadKeyName+piecesShadowNames[i]).setName(i).setInteractive({ cursor: 'pointer' });

            if (x === 0) {
                image.setAlpha(1);
            } else {
                image.setAlpha(0.1);
            }
            
            if (image.width > 650) {
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

function checkSolutionTypeD() 
{
    DebugLog('checking if solution');

    count = 0;
    //βρες αν το κάθε κομμάτι είναι στη σωστή θέση
    for (var i = 0; i < piecesOnBoard.length; i++) {
        var onoma = piecesOnBoard[i].name;                                     
        var pos = { x: piecesOnBoard[i].x, y: piecesOnBoard[i].y };

        piecesOnBoard[i].setAlpha(0.5);
        piecesOnBoard[i].setTint(0xff8080);

        if (onoma === 0) {//piece 1.png (38 pieces)
            //row 1
            for (var a = 0; a < 13; a++) {
                if (allGrids[0][a].x === pos.x && allGrids[0][a].y === pos.y) {
                    count++;
                    piecesOnBoard[i].setAlpha(1);
                    piecesOnBoard[i].clearTint();
                    piecesOnBoard[i].depth = 10;
                    a = 13;
                }
            }
            //row 2
            if (allGrids[0][13].x === pos.x && allGrids[0][13].y === pos.y) {
                count++;
                piecesOnBoard[i].setAlpha(1);
                piecesOnBoard[i].clearTint();
                continue;
            }

            if (allGrids[0][25].x === pos.x && allGrids[0][25].y === pos.y) {
                count++;
                piecesOnBoard[i].setAlpha(1);
                piecesOnBoard[i].clearTint();
                continue;
            }
            //row 3
            if (allGrids[0][26].x === pos.x && allGrids[0][26].y === pos.y) {
                count++;
                piecesOnBoard[i].setAlpha(1);
                piecesOnBoard[i].clearTint();
                continue;
            }

            if (allGrids[0][28].x === pos.x && allGrids[0][28].y === pos.y) {
                count++;
                piecesOnBoard[i].setAlpha(1);
                piecesOnBoard[i].clearTint();
                continue;
            }

            if (allGrids[0][36].x === pos.x && allGrids[0][36].y === pos.y) {
                count++;
                piecesOnBoard[i].setAlpha(1);
                piecesOnBoard[i].clearTint();
                continue;
            }else

            if (allGrids[0][38].x === pos.x && allGrids[0][38].y === pos.y) {
                count++;
                piecesOnBoard[i].setAlpha(1);
                piecesOnBoard[i].clearTint();
                continue;
            }else
             //row 4
            if (allGrids[0][39].x === pos.x && allGrids[0][39].y === pos.y) {
                count++;
                piecesOnBoard[i].setAlpha(1);
                piecesOnBoard[i].clearTint();
                continue;
            }else

            if (allGrids[0][41].x === pos.x && allGrids[0][41].y === pos.y) {
                count++;
                piecesOnBoard[i].setAlpha(1);
                piecesOnBoard[i].clearTint();
                continue;
            }else

            if (allGrids[0][49].x === pos.x && allGrids[0][49].y === pos.y) {
                count++;
                piecesOnBoard[i].setAlpha(1);
                piecesOnBoard[i].clearTint();
                continue;
            }else

            if (allGrids[0][51].x === pos.x && allGrids[0][51].y === pos.y) {
                count++;
                piecesOnBoard[i].setAlpha(1);
                piecesOnBoard[i].clearTint();
                continue;
            }else
            //row 5
            if (allGrids[0][52].x === pos.x && allGrids[0][52].y === pos.y) {
                count++;
                piecesOnBoard[i].setAlpha(1);
                piecesOnBoard[i].clearTint();
                continue;
            }else
            if (allGrids[0][64].x === pos.x && allGrids[0][64].y === pos.y) {
                count++;
                piecesOnBoard[i].setAlpha(1);
                piecesOnBoard[i].clearTint();
                continue;
            } else {
                //row 6
                for (var b = 65; b < 78; b++) { 
                    if (allGrids[0][b].x === pos.x && allGrids[0][b].y === pos.y) {
                        count++;
                        piecesOnBoard[i].setAlpha(1);
                        piecesOnBoard[i].clearTint();
                        piecesOnBoard[i].depth = 1000;
                        b=78;
                    }
                }
            }

           // return;
        }else
        if (onoma === 1) {//piece 2.png (16 pieces)
            //row 1
            for (var a = 0; a < 16; a++) {
                if (allGrids[1][a].x === pos.x && allGrids[1][a].y === pos.y) {
                    count++;
                    piecesOnBoard[i].setAlpha(1);
                    piecesOnBoard[i].clearTint();
                    a = 15;
                }
            }
        }else
        if (onoma === 2) {//piece 3.png (2 pieces)
            //row 1
            for (var a = 0; a < 2; a++) {
                if (allGrids[2][a].x === pos.x && allGrids[2][a].y === pos.y) {
                    count++;
                    piecesOnBoard[i].setAlpha(1);
                    piecesOnBoard[i].clearTint();
                    a = 2;
                }
            }
        }else
        if (onoma === 3) {//piece 4.png (1 piece)
            if (allGrids[3][0].x === pos.x && allGrids[3][0].y === pos.y) {
                count++;
                piecesOnBoard[i].setAlpha(1);
                piecesOnBoard[i].clearTint();
            }
        }else
        if (onoma === 4) {//piece 4.png (1 piece)
            if (allGrids[4][0].x === pos.x && allGrids[4][0].y === pos.y) {
                count++;
                piecesOnBoard[i].setAlpha(1);
                piecesOnBoard[i].clearTint();
                piecesOnBoard[i].depth = 20;
            }
        }else
        if (onoma === 5) {//piece 5.png (1 piece)
            if (allGrids[5][0].x === pos.x && allGrids[5][0].y === pos.y) {
                count++;
                piecesOnBoard[i].setAlpha(1);
                piecesOnBoard[i].clearTint();
                piecesOnBoard[i].depth = 650;
            }
        }       
        
    }

    DebugLog('correct are ' + count + ' and we need ' + allPiecesForCurrentTempleType);
    DebugLog('correct on board are ' + count + ' / ' + piecesOnBoard.length);

    if (count === allPiecesForCurrentTempleType && piecesOnBoard.length === allPiecesForCurrentTempleType) {
        DebugLog('YOU WIN !!!!!');

        winTypeGame();
    }
}
