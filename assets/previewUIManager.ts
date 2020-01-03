
const { ccclass, property } = cc._decorator

@ccclass
export default class PreviewUIManager extends cc.Component {
    static instance: PreviewUIManager = null

    @property(cc.Node)
    content: cc.Node = null
    onLoad() {
        PreviewUIManager.instance = this
        this.content.active = false
    }
    showUI() {
        this.content.active = true
    }
}
