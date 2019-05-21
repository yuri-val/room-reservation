import { DayPilot } from 'daypilot-pro-vue'

export default {
  locale: "ru-ru",
  timeHeaders: [{"groupBy":"Month"},{"groupBy":"Day","format":"d"}],
  scale: "Day",
  days: DayPilot.Date.today().daysInYear(),
  startDate: DayPilot.Date.today().firstDayOfYear(),
  dataSource: DayPilot.Date.today(),
  timeRangeSelectedHandling: "Enabled",
  eventMoveHandling: "Update",
  onEventMoved: function (args) {
    this.message("Event moved: " + args.e.text());
  },
  eventResizeHandling: "Update",
  onEventResized: function (args) {
    this.message("Event resized: " + args.e.text());
  },
  eventHoverHandling: "Bubble",
  treeEnabled: true,
}
