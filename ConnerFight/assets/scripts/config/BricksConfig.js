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

    init() {
        this.bricks1 = [[1]];
        this.bricks3 = [[
            0, 0, 0,
            1, 1, 1,
            0, 0, 0,
        ],
        [
            0, 0, 0,
            0, 1, 1,
            0, 1, 0,
        ],
        [
            0, 0, 1,
            0, 1, 0,
            1, 0, 0,
        ]
        ];
        this.bricks4 = [[
            0, 0, 0, 0,
            0, 1, 1, 1,
            0, 0, 1, 0,
            0, 0, 0, 0
        ],
        [
            0, 0, 0, 0,
            0, 1, 1, 0,
            0, 1, 1, 0,
            0, 0, 0, 0
        ],
        [
            0, 0, 0, 0,
            1, 1, 1, 1,
            0, 0, 0, 0,
            0, 0, 0, 0
        ],
        [
            0, 0, 0, 0,
            0, 1, 1, 1,
            0, 1, 0, 0,
            0, 0, 0, 0
        ],
        [
            0, 0, 1, 0,
            0, 1, 1, 0,
            0, 1, 0, 0,
            0, 0, 0, 0
        ]];
        this.bricksList = [this.bricks1, this.bricks3, this.bricks4];

        var arr= new Array(15);
        arr.fill(0);

        this.chessboard = new Array(20);
        for (var i = 0; i < this.chessboard.length; i++) {
            
            this.chessboard[i] = arr;    
        }

    },
});
