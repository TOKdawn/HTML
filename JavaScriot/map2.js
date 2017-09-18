function mapUnit(num) {
    this.x = (num % MAPW) * 18;
    this.y = Math.floor(num / MAPW) * 18;
    this.parent = null;
    this.root = num;
    this.show = function() {
        context.fillStyle = "#757575";
        context.fillRect(this.x, this.y, 18, 18); //绘制
        context.clearRect(this.x + 3, this.y + 3, 12, 12); //擦除路径对应的位置
    }
    this.clearwall = function(border) {
        switch (border) {
            case BORDERUP:
                context.clearRect(this.x + 3, this.y + 0, 12, 3);
                break;
            case BORDERLEFT:
                context.clearRect(this.x + 0, this.y + 3, 3, 12);
                break;
            case BORDERBOTTEM:
                context.clearRect(this.x + 3, this.y + 15, 12, 3);
                break;
            case BORDERRIGHT:
                context.clearRect(this.x + 15, this.y + 3, 3, 12);
                break;
        }
    }
};

function addchild(father, child) {
    console.log(father.root);
    child.root = father.root;

}

function findroot(node) {

    return node.root;

}