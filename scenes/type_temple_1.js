function StartTypeB()
{
    DebugLog('StartTypeB');
    TypeBPrepareVariables();
    TypeBLoadPieces();
    TypeBMakeGridPositions();
    typeDragZone = _this.add.zone(704, 619, 1102, 636).setDropZone();
    allPiecesForCurrentTempleType = 7;
    typeTimeToShowTemplePreview = 5000;
}


function TypeBPrepareVariables()
{
    templeLoadKeyName = 'temple_1';
    templeFolderName = "pieces_1/";

    piecesNames = ['wall_1','wall_2', 'wall_3', 'kolona' ];
    piecesShadowNames = ['wall_1_skia', 'wall_2_skia', 'wall_3_skia', 'kolona_skia'];
    posPiecesStaticX = [1629, 1700, 1600, 1460];
    posPiecesStaticY = [788, 240,  550,  411];
    posTempleBase = {x:153, y:301};

    grid_wall_3 = [];
    grid_wall_2 = [];
    grid_wall_1 = [];
    grid_column = [];
    allGrids = [grid_wall_1, grid_wall_2, grid_wall_3, grid_column];
    thesi = { x: 0, y: 0 };
}

function TypeBLoadPieces() {

    _this.load.once('complete', TypeBCreatePieces, this);

    //temple completed preview
    _this.load.image(templeLoadKeyName + 'preview', getSceneImagesFolder() + templeFolderName+'temple_1.png');

    //base
    _this.load.image(templeLoadKeyName+'base_1', getSceneImagesFolder() + templeFolderName+'base_1.png');

    //pieces
    _this.load.image(templeLoadKeyName+piecesNames[0], getSceneImagesFolder() + templeFolderName + '1.png');
    _this.load.image(templeLoadKeyName+piecesShadowNames[0], getSceneImagesFolder() + templeFolderName + '1_shadow.png');
    _this.load.image(templeLoadKeyName+piecesNames[1], getSceneImagesFolder() + templeFolderName + '2.png');
    _this.load.image(templeLoadKeyName+piecesShadowNames[1], getSceneImagesFolder() + templeFolderName + '2_shadow.png');
    _this.load.image(templeLoadKeyName+piecesNames[2], getSceneImagesFolder() + templeFolderName + '3.png');
    _this.load.image(templeLoadKeyName+piecesShadowNames[2], getSceneImagesFolder() + templeFolderName + '3_shadow.png');
    _this.load.image(templeLoadKeyName+piecesNames[3], getSceneImagesFolder() + templeFolderName + '4.png');
    _this.load.image(templeLoadKeyName+piecesShadowNames[3], getSceneImagesFolder() + templeFolderName + '4_shadow.png');

    _this.load.start();

}

function TypeBMakeGridPositions() {

    //#region wall small grid positions
    var nX = posTempleBase.x + 142;
    var nY = posTempleBase.y + 239;

    for (var p = 0; p < 18; p++) {
        grid_wall_3.push({ x: nX, y: nY });
        nX += 41;
        nY -= 11;
    }

    nX = posTempleBase.x + 190;
    nY = posTempleBase.y + 322;

    for (var p = 0; p < 18; p++) {
        grid_wall_3.push({ x: nX, y: nY });
        nX += 41;
        nY -= 11;
    }

    nX = posTempleBase.x + 238;
    nY = posTempleBase.y + 405;

    for (var p = 0; p < 18; p++) {
        grid_wall_3.push({ x: nX, y: nY });
        nX += 41;
        nY -= 11;
    }

    //#endregion

    //#region wall medium grid positions

    nX = posTempleBase.x + 921;
    nY = posTempleBase.y + 128;

    grid_wall_2.push({ x: nX, y: nY });

    for (var p = 0; p < 20; p++) {
        nX -= 38;
        nY += 10;
        grid_wall_2.push({ x: nX, y: nY });
    }

    //#endregion

    //#region wall big grid positions

    nX = posTempleBase.x + 612;
    nY = posTempleBase.y + 367;

    grid_wall_1.push({ x: nX, y: nY });

    for (var p = 0; p < 9; p++) {
        nX -= 18;
        nY -= 30;
        grid_wall_1.push({ x: nX, y: nY });

    }

    //#endregion

     //#region kolones grid positions

   //1st row

    nX = posTempleBase.x + 109;
    nY = posTempleBase.y + 184;

    grid_column.push({ x: nX, y: nY });

    for (var p = 0; p < 8; p++) {
        nX += 98;
        nY -= 25;
        grid_column.push({ x: nX, y: nY });
    }

    //2nd row

    nX = posTempleBase.x + 160;
    nY = posTempleBase.y + 274;

    grid_column.push({ x: nX, y: nY });

    for (var p = 0; p < 8; p++) {
        nX += 98;
        nY -= 25;
        grid_column.push({ x: nX, y: nY });
    }

    //3nd row

    nX = posTempleBase.x + 209;
    nY = posTempleBase.y + 367;

    grid_column.push({ x: nX, y: nY });

    for (var p = 0; p < 8; p++) {
        nX += 98;
        nY -= 25;
        grid_column.push({ x: nX, y: nY });
    }

    //4th row

    nX = posTempleBase.x + 265;
    nY = posTempleBase.y + 459;

    grid_column.push({ x: nX, y: nY });

    for (var p = 0; p < 8; p++) {
        nX += 98;
        nY -= 25;
        grid_column.push({ x: nX, y: nY });
    }

    //#endregion
}

function TypeBCreatePieces() {

    //vasi
    var vasi = _this.add.image(posTempleBase.x, posTempleBase.y, templeLoadKeyName+'base_1');
    vasi.setOrigin(0, 0);
    vasi.setInteractive();
    vasi.input.dropZone = true;

    templePreview = _this.add.image(posTempleBase.x, posTempleBase.y + 635, templeLoadKeyName + 'preview').setOrigin(0, 1);
    //naos_1.setAlpha(0.5);

    templePreview.visible = true;

    //#region create pieces

    //for each part
    for (var i = 0; i < 4; i++) {

        var posX = posPiecesStaticX[i];
        var posY = posPiecesStaticY[i];

        //var image;

        //create 24 pieces for each part
        for (var x = 0; x < 25; x++) {

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

function checkSolutionTypeB() {
    
    DebugLog('checking if solution');

    count = 0;
    //βρες αν το κάθε κομμάτι είναι στη σωστή θέση
    for (var i = 0; i < piecesOnBoard.length; i++) {
        var onoma = piecesOnBoard[i].name;
        var pos = { x: piecesOnBoard[i].x, y: piecesOnBoard[i].y };

        piecesOnBoard[i].setAlpha(0.5);
        piecesOnBoard[i].setTint(0xff8080);

        if (onoma === 0) {
            if (allGrids[0][0].x === pos.x && allGrids[0][0].y === pos.y) {
                count++;
                piecesOnBoard[i].setAlpha(1);
                piecesOnBoard[i].clearTint();
            }
            else
                if (allGrids[0][9].x === pos.x || allGrids[0][9].y === pos.y) {
                    count++;
                    piecesOnBoard[i].setAlpha(1);
                    piecesOnBoard[i].clearTint();
                }
        } else
            if (onoma === 1) {
                if (allGrids[1][0].x === pos.x && allGrids[1][0].y === pos.y) {
                    count++;
                    piecesOnBoard[i].setAlpha(1);
                    piecesOnBoard[i].clearTint();
                }
            }
            else
                if (onoma === 2) {
                    if (allGrids[2][5].x === pos.x && allGrids[2][5].y === pos.y) {
                        count++;
                        piecesOnBoard[i].setAlpha(1);
                        piecesOnBoard[i].clearTint();
                    }
                    else
                        if (allGrids[2][41].x === pos.x && allGrids[2][41].y === pos.y) {
                            count++;
                            piecesOnBoard[i].setAlpha(1);
                            piecesOnBoard[i].clearTint();
                        }
                }
                else //kolones
                    if (onoma === 3) {
                        if (allGrids[3][9].x === pos.x && allGrids[3][9].y === pos.y) {
                            count++;
                            piecesOnBoard[i].setAlpha(1);
                            piecesOnBoard[i].clearTint();
                        }
                        else
                            if (allGrids[3][18].x === pos.x && allGrids[3][18].y === pos.y) {
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
        // youWin.visible = true;
        // youWin.depth = 5000;

        winTypeGame();
    }

    //}

}