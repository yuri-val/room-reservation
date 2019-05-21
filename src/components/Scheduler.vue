<template>
  <div class="layout">
    <DayPilotScheduler id="dp" :config="config" ref="scheduler" />
    <modal-edit :current-event="currentEvent" :editing="editing" :ok="handleConfirm" :cancel="handleCancel" v-if="editing" />
  </div>
</template>

<script>
import {DayPilot, DayPilotScheduler} from 'daypilot-pro-vue'
import Vue from 'vue'
import ModalEdit from './ModalEdit'
import config from '../utils/config';
import EventService from '../utils/eventService';
import { resources, events } from '../mock'
import { debuglog } from 'util';


export default {
  name: 'Scheduler',
  data: function() {
    return {
      config: {
        ...config,
        onTimeRangeSelected: (args) => this.editEvent(args, true),
        onEventClick: (args) => this.editEvent(args.e),
        onBeforeEventRender: args => {
          args.data.html = this.renderEvent(args.data, args.e);
        },
        contextMenu: new DayPilot.Menu({
          items: [
            { text: "Редактировать", onClick: (args) => this.editEvent(args.source) },
            { text: "Отмена", onClick: (args) => this.cancelEvent(args.source) },
            
          ]
        }),
        eventHeight: 50
      },
      editing: false,
      currentEvent: {},
      eventService: null
    }
  },
  props: {
  },
  components: {
    DayPilotScheduler,
    ModalEdit,
    Event
  },
  computed: {
    // DayPilot.Scheduler object - https://api.daypilot.org/daypilot-scheduler-class/
    scheduler: function () {
      return this.$refs.scheduler.control;
    }
  },
  methods: {
    loadEvents() {
      Vue.set(this.config, "events", events);
    },
    loadResources() {
      Vue.set(this.config, "resources", resources);
    },
    handleConfirm () {
      if (!this.currentEvent.create){
        this.eventService.updateEvent(this.currentEvent);
      } else {
        this.eventService.createEvent(this.currentEvent);
      }
      this.editing = false;
    },
    handleCancel () {
      this.currentEvent = {};
      this.editing = false;
    },
    editEvent (_data, create = false ) {
      let event = _data
      if (create) event = { id: DayPilot.guid(), data: _data, create }
      this.currentEvent = this.mapEventToForm(event);
      this.editing = true;
    },
    cancelEvent (event) {
      event.data.status = 'Отменен';
      this.scheduler.events.update(event);
    },
    mapEventToForm (event) {
      return {
        ...event.data,
        id: event.id,
        start: this.$moment(event.data.start.value),
        end: this.$moment(event.data.end.value),
        create: event.create
      }
    },
    renderEvent (event, e) {
      let html = `<h3>${event.text}<h5>(${event.start.toString("dd.MM.yyyy")} - ${event.end.toString("dd.MM.yyyy")})</h5></h3>`

      let paidColor = "#aaaaaa";
      let paid = event.complete;
      e.areas = [
          { top: 2, right: 4, html: `<p class="status">${event.status || ''}</p>`, v: "Visible"},
          { bottom: 5, right: 4, html: "<div style='color:" + paidColor + "; font-size: 8pt;'>Оплачено: " + paid + "%</div>", v: "Visible"},
          { left: 4, bottom: 5, right: 4, height: 2, html: "<div style='background-color:" + paidColor + "; height: 100%; width:" + paid + "%'></div>", v: "Visible" }
      ];
      e.bubbleHtml = html + e.areas.map( area => area.html).join('');
      e.barColor = event.status === 'Отменен' ? 'red' : 'green';
      return html;
    }
  },
  mounted: function() {
    this.loadResources();
    this.loadEvents();
    this.eventService = new EventService(this.scheduler);
    this.scheduler.scrollTo(DayPilot.Date.today());
    this.scheduler.message("Welcome!");
  }
}
</script>

<style>
.scheduler_default_rowheader_inner
  {
      border-right: 1px solid #ccc;
  }
  .scheduler_default_rowheader.scheduler_default_rowheadercol2
  {
      background: #fff;
  }
  .scheduler_default_rowheadercol2 .scheduler_default_rowheader_inner
  {
      top: 2px;
      bottom: 2px;
      left: 2px;
      background-color: transparent;
      border-left: 5px solid #1a9d13; /* green */
      border-right: 0px none;
  }
  .status_dirty.scheduler_default_rowheadercol2 .scheduler_default_rowheader_inner
  {
      border-left: 5px solid #ea3624; /* red */
  }
  .status_cleanup.scheduler_default_rowheadercol2 .scheduler_default_rowheader_inner
  {
      border-left: 5px solid #f9ba25; /* orange */
  }
</style>
