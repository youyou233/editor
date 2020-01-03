export default class DataManager {
    static _instance: DataManager = null

    static get instance() {
        if (this._instance == null) {
            this._instance = new DataManager()
        }
        return this._instance
    }
}