
const { ccclass, property } = cc._decorator
@ccclass
export default class DataManager extends cc.Component {
    static _instance: DataManager = null

    //剧情
    @property(cc.JsonAsset)
    plotJson: cc.JsonAsset = null
    plotData: JSON = null
    //人物数据
    @property(cc.JsonAsset)
    charJson: cc.JsonAsset = null
    charData: JSON = null
    static get instance() {
        if (this._instance == null) {
            this._instance = new DataManager()
        }
        return this._instance
    }
}