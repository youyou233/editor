

const { ccclass, property } = cc._decorator

@ccclass
export default class UIManager extends cc.Component {
    static instance: UIManager = null
    @property(cc.Button)
    editorButton: cc.Button = null
    @property(cc.Button)
    plotButton: cc.Button = null
    @property(cc.Node)
    editorNode: cc.Node = null
    @property(cc.Node)
    plotNode: cc.Node = null

    onLoad() {
        UIManager.instance = this
        //this.setBG()
        this.bindEvent()
        this.editorButton.node.active = true
        this.plotButton.node.active = true
        this.editorNode.active = false
        this.plotNode.active = false
    }
    bindEvent() {
        this.editorButton.node.on('click', () => {
            this.editorButton.node.active = false
            this.plotButton.node.active = false
            this.editorNode.active = true
            this.plotNode.active = false
        }, this)
        this.plotButton.node.on('click', () => {
            this.editorButton.node.active = false
            this.plotButton.node.active = false
            this.editorNode.active = false
            this.plotNode.active = true
        }, this)
    }
}