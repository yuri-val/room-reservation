<template id="">
  <a-modal title="Editing event..." v-model="showModal" @ok="ok" @cancel="cancel" v-if="editing">
    <a-form :form="currentEvent">
      <a-form-item  label="ФИО:" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
        <a-input v-model="currentEvent.text" />
      </a-form-item>
      <a-form-item  label="Заезд:" :label-col="{ span: 5 }" :wrapper-col="{ span: 14 }">
        <a-date-picker v-model="currentEvent.start" :format="dateFormat" :locale="locale" />
      </a-form-item>
      <a-form-item  label="Выезд:" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-date-picker v-model="currentEvent.end" :format="dateFormat" :locale="locale" />
      </a-form-item>
      <a-form-item  label="Статус:" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-radio-group v-model="currentEvent.status">
          <a-radio-button value="Бронь" :checked="currentEvent.status === 'Бронь'">Бронь</a-radio-button>
          <a-radio-button value="Отменен" :checked="currentEvent.status === 'Отменен'">Отменен</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item  label="Оплата:" :label-col="{ span: 5 }" :wrapper-col="{ span: 5 }">
        <a-input addonAfter="%" defaultValue="100" v-model="currentEvent.complete" />
      </a-form-item>
      

    </a-form>
  </a-modal>
</template>

<script type="text/javascript">

  export default {
    props: ['currentEvent', 'editing', 'ok', 'cancel'],
    data: function() {
      return {
        showModal: true,
        dateFormat: "DD.MM.YYYY",
        locale: this.$moment.locale('ru')
      }
    },
    mthods: {
    }
  }

</script>
