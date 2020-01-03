
const { ccclass, property } = cc._decorator

@ccclass
export default class ChooseCharUIManager extends cc.Component {
    static instance: ChooseCharUIManager = null
    @property(cc.Node)
    content: cc.Node = null
    onLoad() {
        ChooseCharUIManager.instance = this
        this.content.active = false
    }
    showUI() {
        this.content.active = true
    }
}
