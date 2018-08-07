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

    },

    // use this for initialization
    onLoad: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
           this.isDrag = false;
        }, this.node);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            //this.opacity = 255;
            var delta = event.touch.getDelta();
            if (!this.isDrag&&(delta.x!=0&&delta.y!=0)){
                this.isDrag = true;
                this.y +=this.height;
            }

            this.x += delta.x;
            this.y += delta.y;
        }, this.node);

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
           this.node
        
            
        }, this.node);
        this.node.on(cc.Node.EventType.MOUSE_UP, function (event) {
            //if(!this.isDrag){
            this.rotation = (this.rotation+90)%360;
            //}
            
        }, this.node);
    },

    // called every frame
    update: function (dt) {

    },
});
