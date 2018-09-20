function StartTypeA()
{
    DebugLog('StartTypeA');
    TypeAPrepareVariables();
    TypeALoadPieces();
    TypeAMakeGridPositions();
    typeDragZone = _this.add.zone(704, 619, 1102, 636).setDropZone();
    allPiecesForCurrentTempleType = 9;
    typeTimeToShowTemplePreview = 5000;

   // showTypeDebugGraphics();
}

function showTypeDebugGraphics(){
       //  Just a visual display of the drop zone
    var graphicsA = _this.add.graphics();


    DebugLog(grid_wall_3.length);

    for (var f = 0; f < grid_wall_3.length; f++) {
        //DebugLog(f+ ' = ' +wallArray[f].x);
        var point = new Phaser.Geom.Rectangle(grid_wall_3[f].x, grid_wall_3[f].y, 8, 8);
        graphicsA.fillRect(point.x - 4, point.y - 4, point.width, point.height);
    }

    for (var f = 0; f < grid_wall_2.length; f++) {
        //DebugLog(f+ ' = ' +wallArray[f].x);
        var point = new Phaser.Geom.Rectangle(grid_wall_2[f].x, grid_wall_2[f].y, 8, 8);
        graphicsA.fillRect(point.x - 4, point.y - 4, point.width, point.height);
    }

    for (var f = 0; f < grid_wall_1.length; f++) {
        //DebugLog(f+ ' = ' +wallArray[f].x);
        var point = new Phaser.Geom.Rectangle(grid_wall_1[f].x, grid_wall_1[f].y, 8, 8);
        graphicsA.fillRect(point.x - 4, point.y - 4, point.width, point.height);
    }
   
}

function TypeAPrepareVariables()
{
    templeLoadKeyName = 'temple_0';
    templeFolderName = "pieces_0/";

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

function TypeALoadPieces() {

    _this.load.once('complete', TypeACreatePieces, this);

    //temple completed preview
    _this.load.image(templeLoadKeyName + 'preview', getSceneImagesFolder() + templeFolderName+'temple_0.png');

    //base
    _this.load.image(templeLoadKeyName+'base_0', getSceneImagesFolder() + templeFolderName+'base_0.png');

    //pieces
    _this.load.image(templeLoadKeyName+piecesNames[0], getSceneImagesFolder() + templeFolderName + '01.png');
    _this.load.image(templeLoadKeyName+piecesShadowNames[0], getSceneImagesFolder() + templeFolderName + '01_shadow.png');
    _this.load.image(templeLoadKeyName+piecesNames[1], getSceneImagesFolder() + templeFolderName + '02.png');
    _this.load.image(templeLoadKeyName+piecesShadowNames[1], getSceneImagesFolder() + templeFolderName + '02_shadow.png');
    _this.load.image(templeLoadKeyName+piecesNames[2], getSceneImagesFolder() + templeFolderName + '03.png');
    _this.load.image(templeLoadKeyName+piecesShadowNames[2], getSceneImagesFolder() + templeFolderName + '03_shadow.png');
    _this.load.image(templeLoadKeyName+piecesNames[3], getSceneImagesFolder() + templeFolderName + '04.png');
    _this.load.image(templeLoadKeyName+piecesShadowNames[3], getSceneImagesFolder() + templeFolderName + '04_shadow.png');

    _this.load.start();

}

function TypeAMakeGridPositions() {

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

    nX = posTempleBase.x + 662;
    nY = posTempleBase.y + 352;

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

    nX = posTempleBase.x + 163;
    nY = posTempleBase.y + 276;

    grid_column.push({ x: nX, y: nY });

    for (var p = 0; p < 8; p++) {
        nX += 98;
        nY -= 25;
        grid_column.push({ x: nX, y: nY });
    }

    //3nd row

    nX = posTempleBase.x + 213;
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

function TypeACreatePieces() {

    //vasi
    var vasi = _this.add.image(posTempleBase.x, posTempleBase.y, templeLoadKeyName+'base_0');
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

            image.setScale(0.8);

            //image.setOrigin(0.5, 1);

            _this.input.setDraggable(image);

            image.on('pointerover', function () {
                this.setTint(0x00ff00);
            });

            image.on('pointerout', function () {
                this.clearTint();
            });
        }
    }

    //#endregion

}

function checkSolutionTypeA()
{
    DebugLog('all pieces on base are '+ piecesOnBoard.length);

    //αν υπάρχουν πάνω στη βάση μόνο όσα κομμάτια χρειάζονται
    //if(piecesOnBoard.length === allPieces_naos_1)
    //{

      DebugLog('checking if solution');

      count = 0;
      //βρες αν το κάθε κομμάτι είναι στη σωστή θέση
      for(var i=0; i<piecesOnBoard.length; i++)
      {
        var onoma = piecesOnBoard[i].name;
        var pos = {x:piecesOnBoard[i].x, y: piecesOnBoard[i].y};

       // DebugLog(onoma + ' pos = '+ pos.x + ' , ' + pos.y);

        //if onoma = 0 sosti thesi [0] [9]
        //if onoma = 1 sosti thesi [0] 
        //if onoma = 2 sosti thesi [5] [41]
        //if onoma = 3 sosti thesi [0] [9] [18] [27]

        piecesOnBoard[i].setAlpha(0.5);

        if(onoma === 0)
        {
          if(allGrids[0][0].x === pos.x && allGrids[0][0].y === pos.y)
          {
            count++;
            piecesOnBoard[i].setAlpha(1);
          }
          else
          if(allGrids[0][9].x === pos.x || allGrids[0][9].y === pos.y)
          {
            count++;
            piecesOnBoard[i].setAlpha(1);
          }
        }
        else
        if(onoma === 1)
        {
          if(allGrids[1][0].x === pos.x && allGrids[1][0].y === pos.y)
          {
            count++;
            piecesOnBoard[i].setAlpha(1);
          }
        }
        else
        if(onoma === 2)
        {
          if(allGrids[2][5].x === pos.x && allGrids[2][5].y === pos.y)
          {
            count++;
            piecesOnBoard[i].setAlpha(1);
          }
          else
          if(allGrids[2][41].x === pos.x && allGrids[2][41].y === pos.y)
          {
            count++;
            piecesOnBoard[i].setAlpha(1);
          }
        }
        else
        if(onoma === 3)
        {
          if(allGrids[3][0].x === pos.x && allGrids[3][0].y === pos.y)
          {
            count++;
            piecesOnBoard[i].setAlpha(1);
          }
          else
          if(allGrids[3][9].x === pos.x && allGrids[3][9].y === pos.y)
          {
            count++;
            piecesOnBoard[i].setAlpha(1);
          }
          else
          if(allGrids[3][18].x === pos.x && allGrids[3][18].y === pos.y)
          {
            count++;
            piecesOnBoard[i].setAlpha(1);
          }
          else
          if(allGrids[3][27].x === pos.x && allGrids[3][27].y === pos.y )
          {
            count++;
            piecesOnBoard[i].setAlpha(1);
          }
        }
        
      }

      DebugLog('correct are '+ count + ' and we need '+allPiecesForCurrentTempleType);

      if(count === allPiecesForCurrentTempleType && piecesOnBoard.length === allPiecesForCurrentTempleType)
      {
        DebugLog('YOU WIN !!!!!');
        // youWin.visible = true;
        // youWin.depth = 5000;

        winTypeGame();
      }
        
    //}

}