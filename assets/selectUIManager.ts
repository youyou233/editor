import SelectItem from "./selectItem";

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

  @property(cc.Node)
  container: cc.Node = null

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
    this.clearContainer()
    for (let i = 0; i < data.length; i++) {
      let node = null
      if (this.selectPool.size() > 0) {
        node = this.selectPool.get()
      } else {
        node = cc.instantiate(this.selectPrefab)
      }
      node.parent = this.container
      let string = handleNames ? handleNames[data[i][handle]] : data[i][handle]
      node.getComponent(SelectItem).init(data[i], string)
    }

  }
  clearContainer() {
    let children = this.container.children
    for (let i = children.length - 1; i >= 0; i--) {
      this.selectPool.put(children[i])
    }
  }
  hideUI() {
    this.content.active = false
  }
}