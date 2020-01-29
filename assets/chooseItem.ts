import { EventType } from "./enum"
import SelectUIManager from "./selectUIManager";
import config from "./config";

const { ccclass, property } = cc._decorator
interface PlotChoose {//单个选项
  L: string;
  T: EventType;
  E: string | number;
}
@ccclass
export default class ChooseItem extends cc.Component {
  //文字
  @property(cc.EditBox)
  content: cc.EditBox = null

  //事件类型
  @property(cc.Button)
  chooseEvent: cc.Button = null

  //事件类型携带参数
  @property(cc.EditBox)
  input: cc.EditBox = null

  EventType: any
  onLoad() {
    this.chooseEvent.node.on('click', this.showChooseEvent, this)
  }
  showChooseEvent() {
    //调用selectUI
    SelectUIManager.instance.showUI(
      config.eventHandle.map((item, index) => {
        return {
          id: index + 1,
          name: item
        }
      }), (data) => {
        this.chooseEvent.node.getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string = data.id
      }, 'name')
  }
  init(data?: PlotChoose) {
    if (data) {
      this.content.string = data.L
      this.input.string = data.E + ''
      this.chooseEvent.node.getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string = data.T + ''
    } else {
      this.content.string = ''
      this.input.string = ''
      this.chooseEvent.node.getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string = '选择事件'
    }
  }
  getData() {
    let choose: PlotChoose = { L: null, T: null, E: null }
    choose.L = this.content.string
    choose.T = +this.chooseEvent.node.getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string
    choose.E = this.input.string
    return choose
  }
}
