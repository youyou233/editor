
import ChooseItem from "./chooseItem"
import { EventType, ActionType } from "./enum"
import SelectUIManager from "./selectUIManager"
import { saveAs } from "./fileSave";
import config from "./config";

const { ccclass, property } = cc._decorator
interface Plot {
  I: number | string;//当前剧情ID
  P: number | string;//人物id
  A: ActionType;
  L: string;//文字内容
  C: PlotChoose[];//选项们
}
interface PlotChoose {//单个选项
  L: string;
  T: EventType;
  E: string | number;
}
@ccclass
export default class EditorUIManager extends cc.Component {
  static instance: EditorUIManager = null

  @property(cc.Button)
  btn_char: cc.Button = null

  @property(cc.Button)
  btn_action: cc.Button = null

  @property(cc.Button)
  btn_loadList: cc.Button = null

  //选项数量
  @property(cc.Button)
  btn_initItem: cc.Button = null

  @property(cc.Button)
  btn_saveItem: cc.Button = null

  //下载按钮
  @property(cc.Button)
  btn_download: cc.Button = null


  //对话ID
  @property(cc.EditBox)
  input_ID: cc.EditBox = null
  @property(cc.EditBox)
  input_content: cc.EditBox = null
  //预设人物id或者名字
  @property(cc.EditBox)
  input_charID: cc.EditBox = null
  @property(cc.EditBox)
  input_chooseNum: cc.EditBox = null

  @property(cc.Node)
  chooseListContainer: cc.Node = null

  @property(cc.Prefab)
  item_prefab: cc.Prefab = null

  actionType: ActionType = null


  @property(cc.JsonAsset)
  dataJson: cc.JsonAsset = null
  plotData: any[] = []

  onLoad() {
    EditorUIManager.instance = this
    //this.setBG()
    this.bindEvent()
    this.init()
    this.plotData = this.dataJson.json
  }
  itemPool: cc.NodePool = new cc.NodePool()
  bindEvent() {
    for (let i = 0; i < 5; i++) {
      let node = cc.instantiate(this.item_prefab)
      this.itemPool.put(node)
    }
    this.btn_char.node.on('click', () => {
      SelectUIManager.instance.showUI([{ id: 1, name: '主角' }, { id: 2, name: '村民' }], (data) => {
        console.log('玩家选择角色', data)
        this.btn_char.node.getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string = data.id
      }, 'name')
    }, this)
    this.btn_action.node.on('click', () => {
      SelectUIManager.instance.showUI(
        config.actionHandle.map((item, index) => {
          return {
            id: index + 1,
            name: item
          }
        })
        , (data) => {
          this.btn_action.node.getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string = data.id
        }, 'name')
    }, this)
    this.btn_loadList.node.on('click', () => {
      SelectUIManager.instance.showUI(this.plotData.map(item => {
        return {
          id: item.I,
          name: item.L
        }
      }), (data) => {
        //this.btn_loadList.node.getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string = data.id
        console.log('加载成功', this.findPlot(data.id))
        this.init(this.plotData[this.findPlot(data.id)])
      }, 'name')
    }, this)

    this.btn_initItem.node.on('click', () => {
      this.initItems()
    }, this)

    this.btn_saveItem.node.on('click', () => {
      this.saveData()
    }, this)
    this.btn_download.node.on('click', () => {
      this.downLoadAllData()
    }, this)

  }
  init(data?: Plot) {
    if (data) {
      this.input_charID.string = data.P + ''
      this.actionType = data.A
      this.input_content.string = data.L
      this.input_chooseNum.string = data.C.length + ''
      this.input_ID.string = data.I + ''
      this.initItems(data.C)
    } else {
      this.input_charID.string = ''
      this.input_content.string = ''
      this.actionType = 0
      this.input_chooseNum.string = 1 + ''
      this.input_ID.string = ''
      this.initItems()
    }
  }
  initItems(data?: PlotChoose[]) {
    if (+this.input_chooseNum.string < 1 || +this.input_chooseNum.string > 5) {
      console.log('错误的选项数量', this.input_chooseNum.string)
      return
    }
    let child = this.chooseListContainer.children
    for (let i = child.length - 1; i >= 0; i--) {
      this.itemPool.put(child[i])
    }
    let length = data ? data.length : +this.input_chooseNum.string
    for (let j = 0; j < length; j++) {
      let node = this.itemPool.get()
      node.parent = this.chooseListContainer
      node.getComponent(ChooseItem).init(data ? data[j] : null)
    }
  }
  saveData() {
    //保存当前数据
    let plot: Plot = {
      I: this.input_ID.string,
      P: this.input_charID.string,
      A: +this.btn_action.node.getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string,
      L: this.input_content.string,
      C: []
    }
    for (let item in plot) {
      if (!plot[item]) {
        console.log('事件有数据为空', item)
        return
      }
    }
    let child = this.chooseListContainer.children
    for (let i = 0; i < child.length; i++) {
      let plotChoose = child[i].getComponent(ChooseItem).getData()
      if (!plotChoose['T']) {
        console.log('选项事件不能为空')
        return
      }
      plot.C.push(plotChoose)
    }
    let index = this.findPlot(this.input_ID.string)
    if (index >= 0) {
      this.plotData[index] = plot
      console.log('覆盖成功', this.plotData)
    } else {
      this.plotData.push(plot)
      console.log('保存成功', this.plotData)
    }
    this.init()
  }
  downLoadAllData() {
    let json = JSON.stringify(this.plotData)
    let blob = new Blob([json], { type: "text/plain;charset=utf-8" })
    saveAs(blob, "hello world.json");
  }
  findPlot(id) {
    if (!this.plotData) {
      this.plotData = []
    }
    for (let i = 0; i < this.plotData.length; i++) {
      if (this.plotData[i].I == id) {
        return i
      }
    }
    return -1
  }
}
