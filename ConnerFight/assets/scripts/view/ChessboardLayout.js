// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        spacing: 2,
        brickPrefab: cc.Prefab,
    },



    init(gameCtrl, chessboard) {
        console.log('adasdad');
        this.gameCtrl = gameCtrl;
        this.cellsPool = new cc.NodePool();
        this.colorList = [cc.Color.WHITE, cc.Color.RED, cc.Color.BLUE];
        this.updateChessboard(chessboard);
    },

    updateChessboard(chessboard) {
        for (var i = 0; i < chessboard.length; i++)
            for (var j = 0; j < chessboard[0].length; j++) {
                var cell = null;
                if (this.cellsPool.size() > 0) {
                    cell = this.cellsPool.get();
                }
                else {
                    cell = cc.instantiate(this.brickPrefab)
                }
                cell.x = j * (cell.width + this.spacing) + cell.width / 2;
                cell.y = -i * (cell.width + this.spacing) - cell.width / 2;
                cell.color = this.colorList[chessboard[i][j]];
                cell.parent = this.node;
            }
    },

    clearChessboardLayout() {
        var cellList = this.node.children;

        while (cellList.length) {
            this.cellsPool.put(cellList[0]);
        }
    }
});


