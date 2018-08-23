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

        //临时添加
        allowCopy: true,
        redCount: 0,
        blueCount: 0,
    },

    onLoad: function () {
        this.initX = this.node.x;
        this.initY = this.node.y;
        var self = this;

        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            this.isDrag = false;
        }, this.node);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            //this.opacity = 255;
            var delta = event.touch.getDelta();
            if (!this.isDrag && (delta.x != 0 && delta.y != 0)) {
                this.isDrag = true;
                this.y += this.height;
            }

            this.x += delta.x;
            this.y += delta.y;
        }, this.node);


        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            //临时添加
            if (self.allowCopy) {
                var node = cc.instantiate(self.node);
                node.parent = self.node.parent;
                node.setPosition(self.node.x, self.node.y);
                node.getComponent('BricksLayout').allowCopy = false;
                self.gameCtrl.gcList.push(node);
                self.gameCtrl.redCount += self.redCount;
                self.gameCtrl.blueCount += self.blueCount;
                self.gameCtrl.red.string = "r:"+self.gameCtrl.redCount.toString();
                self.gameCtrl.blue.string = "b:"+self.gameCtrl.blueCount.toString();
                self.redCount = 0;
                self.blueCount = 0;


                this.x = self.initX;
                this.y = self.initY;
                this.rotation = 0;
                self.gameCtrl.getNewBricks();
            }



        }, this.node);

        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            //if(!this.isDrag){
            this.rotation = (this.rotation + 90) % 360;
            //}

        }, this.node);
    },

    init(gameCtrl) {
        this.gameCtrl = gameCtrl;
        this.bricksPool = new cc.NodePool();
    },

    setBrickNode(brickNode, x, y, player) {
        brickNode.parent = this.node;
        brickNode.x = x;
        brickNode.y = y;
        if (player) {
            brickNode.color = cc.Color.RED;
            //临时添加
            this.redCount += 1;
        }
        else {
            brickNode.color = cc.Color.BLUE;
            //临时添加
            this.blueCount += 1
        }
    },

    initBricksLayout(row, bricks, player) {
        var len = bricks.length;
        // var random = Math.floor(Math.random() * len);
        for(var random=0;random<len;random++){
        for (var i = 0; i < row; i++)
            for (var j = 0; j < row; j++) {
                 if (bricks[random][i * row + j] == 0)
                     continue;
                 else {
                    var brickNode = null;
                    if (this.bricksPool.size() > 0) {
                        brickNode = this.bricksPool.get();
                    } else {
                        brickNode = cc.instantiate(this.brickPrefab);
                    }
                    if (row == 1) {
                        this.setBrickNode(brickNode, 0, 0, player);
                    } else if (row == 3) {
                        this.setBrickNode(brickNode, (j - 1) * (brickNode.width + this.spacing), + (1 - i) * (brickNode.width + this.spacing), player)
                    } else if (row == 4) {
                        this.setBrickNode(brickNode, (j - 1.5) * (brickNode.width + this.spacing), + (1.5 - i) * (brickNode.width + this.spacing), player)
                    }
            }
                    //this.setBrickNode(brickNode, 0, 0, 0);
                // }
            }


    },

    clearBricksLayout() {
        var brickList = this.node.children;

        while (brickList.length) {
            this.bricksPool.put(brickList[0]);
        }
    },
});


