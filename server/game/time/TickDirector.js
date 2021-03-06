const World = require('../../models/world')

const tickSeconds = 3
const numTicksToSave = 4

class TickDirector {
  static start() {
    console.log('[TickDirector] Started')
    this.worldDatetime = null
    this.loadDatetime()
  }

  static loadDatetime() {
    console.log('[TickDirector] Loading datetime...')
    World.findOne({ _id: '5aff9d96cb7f3b7fb0be54d0' }).then(world => {
      this.worldDatetime = world.datetime
      this.startDatetimeUpdate()
    })
  }

  static startDatetimeUpdate() {
    console.log('[TickDirector] Starting datetime update')
    setInterval(this.updateDatetime.bind(this), tickSeconds * 1000)
    setInterval(this.saveDatetime.bind(this), tickSeconds * 1000 * numTicksToSave)
  }

  static updateDatetime() {
    const dt = this.worldDatetime
    dt.minute += 1
    if (dt.minute > 59) {
      dt.minute = 0
      dt.hour += 1
    } else if (dt.hour > 23) {
      dt.hour = 0
      dt.day += 1
    } else if (dt.day > 32) {
      dt.day = 1
      dt.month += 1
    } else if (dt.month > 12) {
      dt.month = 1
      dt.year += 1
    }
    console.log('[TickDirector] Datetime updated: ', dt)
  }

  static saveDatetime() {
    console.log('[TickDirector] Saving datetime...')
    World.findByIdAndUpdate({ _id:'5aff9d96cb7f3b7fb0be54d0' }, { datetime: this.worldDatetime })
      .then(() => {
        console.log('[TickDirector] Datetime saved')
      })
  }
}

module.exports = TickDirector
