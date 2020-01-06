import SelectUIManager from "./selectUIManager"

const { ccclass, property } = cc._decorator

@ccclass
export default class SelectItem extends cc.Component {
    //文字
    @property(cc.Button)
    bg: cc.Button = null
    @property(cc.Label)
    label: cc.Label = null
    data: any
    onLoad() {
        this.bg.node.on('click', () => {
            SelectUIManager.instance.callback(this.data)
            SelectUIManager.instance.hideUI()
        }, this)
    }
    init(data, label) {
        this.data = data
        this.label.string = label
    }

}
