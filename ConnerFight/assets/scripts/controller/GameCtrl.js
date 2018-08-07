// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
const gameConfig = require('BricksConfig');
cc.Class({
    extends: cc.Component,

    properties: {
        bricksLayout: require('BricksLayout'),
        chessboardLayout: require('ChessboardLayout'),
        brickPrefab: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.gameConfig = new gameConfig();
        this.gameConfig.init();
        this.bricksLayout.init(this);
        this.chessboardLayout.init(this,this.gameConfig.chessboard);
        this.player = true;
        this.random = 1;
        this.row = [1, 3, 4]
        this.init();
    },

    init(){
        this.getNewBricks();
    },
    getNewBricks() {
        this.bricksLayout.clearBricksLayout();
        this.player = !this.player;
        if (this.player)
            this.random = Math.floor(Math.random() * 3);
        this.bricksLayout.initBricksLayout(this.row[this.random], this.gameConfig.bricksList[this.random], this.player)

    },

    buttonRotate(){
        this.bricksLayout.node.rotation +=90;
        console.log(this.bricksLayout.node.rotation)
    }



    // update (dt) {},
});
