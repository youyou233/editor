import ChooseCharUIManager from "./chooseCharUIManager"

const { ccclass, property } = cc._decorator

@ccclass
export default class UIManager extends cc.Component {
    static instance: UIManager = null

    @property(cc.Button)
    btn_char: cc.Button = null

    onLoad() {
        UIManager.instance = this
        //this.setBG()
        this.bindEvent()
    }
    bindEvent() {
        this.btn_char.node.on('click', () => {
            ChooseCharUIManager.instance.showUI()
        }, this)
    }
}
