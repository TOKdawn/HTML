<template>
  <div class="comp-full-calendar">
    <!-- header pick month -->
    <fcheader :current-date="currentDate" 
      :title-format="titleFormat"
      :first-day="firstDay"
      :month-names="monthNames"
      @change="emitChangeMonth">
      <div slot="header-left">
        <slot name="fc-header-left">
        </slot>
      </div>

      <div slot="header-right">
        <slot name="fc-header-right">
        </slot>
      </div>
    </fcheader>
    <!-- body display date day and events -->
    <fcbody :current-date="currentDate" :events="events" :month-names="monthNames" 
      :week-names="weekNames" :first-day="firstDay"
      @eventclick="emitEventClick" @dayclick="emitDayClick"
      @moreclick="emitMoreClick">
      <div slot="body-card">
        <slot name="fc-body-card">
         

        </slot>
      </div>
    </fcbody>
  </div>
</template>
<script type="text/babel">
  import langSets from './dataMap/langSets'
  import fcbody from './components/body.vue'
    import fcheader from './components/header.vue'
  export default {
    props : {
      events : { // events will be displayed on calendar
        type : Array,
        default : []
      },
      lang : {
        type : String,
        default : 'zh'
      },
      firstDay : {
        type : Number | String,
        validator (val) {
          let res = parseInt(val)
          return res >= 0 && res <= 6
        },
        default : 0
      },
      titleFormat : {
        type : String,
        default () {
          return langSets[this.lang].titleFormat
        }
      },
      monthNames : {
        type : Array,
        default () {
          return langSets[this.lang].monthNames
        } 
      },
      weekNames : {
        type : Array,
        default () {
          let arr = langSets[this.lang].weekNames
          return arr.slice(this.firstDay).concat(arr.slice(0, this.firstDay))
        }
      }
    },
    data () {
      return {
        currentDate : new Date()
      }
    },
    methods : {
      emitChangeMonth (start, end, currentStart, current) {
        // console.log('currentDate 2', this.currentDate)
        this.currentDate = current
        // console.log('currentDate 3', this.currentDate)
        this.$emit('changeMonth', this.currentDate)
      },
      emitEventClick (event, jsEvent, pos) {
        // console.log('fullCalender', event)
        this.$emit('eventClick', event, jsEvent, pos)
      },
      emitDayClick (day, jsEvent) {

        this.$emit('dayClick', day, jsEvent)
      },
      emitMoreClick (day, events, jsEvent) {
        this.$emit('moreClick', day, event, jsEvent)
      }
    },
    components : {
      fcbody,
      fcheader 
    }
  }
  
</script>
<style lang="scss">
  .comp-full-calendar{

    border-radius: 10px 10px 0 0;
    font-family: 'Courier New', Courier, monospace;
    background: #fff;
    max-width: 960px;
    margin:0 auto;
    ul,p{
      margin:0;
      padding:0;
      font-size: 14px;
      color: transparent;
    }
  }
</style>