//通用弹框
//传入data 和需要展示的数据handle 以及callback callBack中可以获得玩家选择的id
const { ccclass, property } = cc._decorator

@ccclass
export default class SelectUIManager extends cc.Component {
    static instance: SelectUIManager = null
    @property(cc.Node)
    content: cc.Node = null

    @property(cc.Prefab)
    selectPrefab: cc.Prefab = null

    selectPool: cc.NodePool = new cc.NodePool()
    callback: any
    onLoad() {
        SelectUIManager.instance = this
        this.content.active = false

        for (let i = 0; i < 10; i++) {
            let node = cc.instantiate(this.selectPrefab)
            this.selectPool.put(node)
        }
    }
    showUI(data: any[], callback: any, handle: string, handleNames?: string[]) {
        this.content.active = true
        this.callback = callback
        for (let i = 0; i < data.length; i++) {
            let node = null
            if (this.selectPool.size() > 0) {
                node = this.selectPool.get()
            } else {
                node = cc.instantiate(this.selectPrefab)
            }
            let string = handleNames ? handleNames[data[i][handle]] : data[i][handle]
            node.getComponent(Selection).init(data, string)
        }

    }
    hideUI() {
        this.content.active = false
    }
}