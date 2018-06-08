<template>
  <div class="full-calendar-body">
    <div class="weeks">
      <strong class="week" v-for="week in weekNames">{{week}}</strong>
    </div>
    <div class="dates" ref="dates">
      <div class="dates-bg">
        <div class="week-row" v-for="week in currentDates">
          <div class="day-cell" v-for="day in week"
            :class="{'today' : day.isToday,
              'not-cur-month' : !day.isCurMonth}">
            <p class="day-number">{{day.monthDay}}</p>
          </div>
        </div>
      </div>
      <!-- absolute so we can make dynamic td -->
      <div class="dates-events" >
        <div class="events-week" v-for="week in currentDates">
          <div class="events-day" v-for="day in week" track-by="$index"
            :class="{'today' : day.isToday,
              'not-cur-month' : !day.isCurMonth}"
               @click.stop="dayClick(day, $event)"
               >
            <p class="day-number">{{day.monthDay}}
            </p>
                <div v-if="day.events.length">
                   <p v-if="(day.events[0]).YOUR_DATA.bespeak_over_time >= mytime" class="day-infor"> 可预约</p>
                   <p v-else  class="day-false-infor"> 已结束</p>
                </div>
            <div class="event-box" >
              <p class="event-item"  v-for="event in day.events" v-show="event.cellIndex <= eventLimit"
                 :class="[classNames(event.cssClass), {
                  'is-start'   : isStart(event.start, day.date),
                  'is-end'     : isEnd(event.end,day.date),
                  'is-opacity' : !event.isShow,
                  'eventchoose': (event.YOUR_DATA.active_time_id == chooseflag),
                 'eventnotshow': (event.YOUR_DATA.bespeak_over_time <= mytime)
                  }]" 
                @click="eventClick(event,$event)">
                {{isBegin(event, day.date, day.weekDay)}}
                </br>
                开始:{{event.YOUR_DATA.start_time.slice(10)}}
                 </br>
                结束:{{event.YOUR_DATA.over_time.slice(10)}}
              </p>
              <p v-if="day.events.length > 1"
                class="more-link" @click.stop="selectThisDay(day, $event)">
                + {{day.events[day.events.length -1].cellIndex - eventLimit}} more
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- full events when click show more -->
      <div class="more-events" v-show="showMore"
        :style="{left: morePos.left + 'px', top: morePos.top + 'px'}">
        <div class="more-header">
          <span class="title">{{moreTitle(selectDay.date)}}</span>
          <span class="close" @click.stop="showMore = false">x</span>
        </div>
        <div class="more-body">
          <ul class="body-list">
            <li v-for="event in selectDay.events"
              v-show="event.isShow" class="body-item"
              @click="eventClick(event,$event)">
              {{event.title}}
            </li>
          </ul>
        </div>
      </div>

      <slot name="body-card">
        {{chooseflag}}
      </slot>
    </div>
  </div>
</template>
<script type="text/babel">
  import dateFunc from './dateFunc'

  export default {
    props : {
      currentDate : {},
      events      : {},
      weekNames   : {
        type : Array,
        default : []
      },
      monthNames  : {},
      firstDay    : {},
    },
    created () {
      this.events.forEach((item, index) => {
        item._id = item.id || index
        item.end = item.end || item.start
      })
      var date = new Date();
      var year = date.getFullYear(); 
      var month =(date.getMonth() + 1).toString(); 
      var day = (date.getDate()).toString();  
      if (month.length == 1) { 
          month = "0" + month; 
      } 
      if (day.length == 1) { 
          day = "0" + day; 
      }
      var dateTime = year + "-" + month + "-" + day;
          this.mytime=dateTime;
          // console.log(this.mytime);
          // this.events = events
        },
    data () {
      return {
        // weekNames : DAY_NAMES,
        weekMask : [1,2,3,4,5,6,7],
        // events : [],
        isLismit : true,
        eventLimit : 3,
        showMore : false,
        morePos : {
          top: 0,
          left : 0
        },
        selectDay : {},
        day_infor: '可预约',
        mytime: '',
        chooseflag: '',
      }
    },
    watch : {
      weekNames (val) {
        // console.log('watch weekNames', val)
      }
    },
    computed : {
      currentDates () {
        return this.getCalendar()
      }
    },
    methods : {
      isBegin (event, date, index) {
        let st = new Date(event.start)

        if (index == 0 || st.toDateString() == date.toDateString()) {
          return event.title
        }
        return '　'
      },
      moreTitle (date) {
        let dt = new Date(date)
        return this.weekNames[dt.getDay()] + ', ' + this.monthNames[dt.getMonth()] + dt.getDate()
      },
      classNames (cssClass) {
        if(!cssClass) return ''
        // string  
        if (typeof cssClass == 'string') return cssClass
        // Array
        if (Array.isArray(cssClass)) return cssClass.join(' ')
        // else
        return ''
      },
      getCalendar () {
        // calculate 2d-array of each month
        // first day of this month
        let now = new Date() // today
        let current = new Date(this.currentDate)
        let startDate = dateFunc.getStartDate(current) // 1st day of this month
        let curWeekDay = startDate.getDay()
        // begin date of this table may be some day of last month
        let diff = parseInt(this.firstDay) - curWeekDay
        diff = diff > 0 ? (diff - 7) : diff
        startDate.setDate(startDate.getDate() + diff)
        let calendar = []

        for(let perWeek = 0 ; perWeek < 6 ; perWeek++) {

          let week = []

          for(let perDay = 0 ; perDay < 7 ; perDay++) {
            week.push({
              monthDay : startDate.getDate(),
              isToday : now.toDateString() == startDate.toDateString(),
              isCurMonth : startDate.getMonth() == current.getMonth(),
              weekDay : perDay,
              date : new Date(startDate),
              events : this.slotEvents(startDate)
            })

            startDate.setDate(startDate.getDate() + 1)
            // if (startDate.toDateString() == endDate.toDateString()) {
            //   isFinal = true
            //   break
            // }
          }
          calendar.push(week)
          // if (isFinal) break
        }
        return calendar
      },
      slotEvents (date) {

        // find all events start from this date
        let cellIndexArr = []
        let thisDayEvents = this.events.filter(day => {
          let dt = new Date(day.start)
          let st = new Date(dt.getFullYear(),dt.getMonth(),dt.getDate())
          let ed = day.end ? new Date(day.end) : st
          // console.log('slotEvt', st, ed, date)
          return date>=st && date<=ed
        })

        // sort by duration
        thisDayEvents.sort((a,b)=>{
          if(!a.cellIndex) return 1
          if (!b.cellIndex) return -1
          return a.cellIndex - b.cellIndex
        })

        // mark cellIndex and place holder
        for (let i = 0;i<thisDayEvents.length;i++) {
          thisDayEvents[i].cellIndex = thisDayEvents[i].cellIndex || (i + 1)
          thisDayEvents[i].isShow = true
          if (thisDayEvents[i].cellIndex == i+1 || i>2) continue
          thisDayEvents.splice(i,0,{
            title : 'holder',
            cellIndex : i+1,
            start : dateFunc.format(date,'yyyy-MM-dd'),
            end : dateFunc.format(date,'yyyy-MM-dd'),
            isShow : false
          })
        }

        return thisDayEvents
      },
      isStart (eventDate, date) {
        let st = new Date(eventDate)
        return st.toDateString() == date.toDateString()
      },
      isEnd (eventDate,date) {
        let ed = new Date(eventDate)
        return ed.toDateString() == date.toDateString()
      },
      selectThisDay (day, jsEvent) {
        this.selectDay = day
        this.showMore = true
        this.morePos = this.computePos(event.target)
        this.morePos.top -= 100
        let events = day.events.filter(item =>{
          return item.isShow == true
        })
        this.$emit('moreclick', day.date, events, jsEvent)
      },
      computePos (target) {
        let eventRect = target.getBoundingClientRect()
        let pageRect = this.$refs.dates.getBoundingClientRect()
        return {
          left : eventRect.left - pageRect.left,
          top  : eventRect.top + eventRect.height - pageRect.top
        }
      },
      dayClick(day, jsEvent) {
     
        this.$emit('dayclick', day, jsEvent)
      },
      eventClick(event, jsEvent) {
        // console.log('body:',event);
        if(event.YOUR_DATA.active_time_id == this.chooseflag || event.YOUR_DATA.bespeak_over_time <= this.mytime){
           this.chooseflag = '';
             console.log( "取消",this.chooseflag )
             this.$emit('eventclick', null )
                     
        }else{
          this.chooseflag = event.YOUR_DATA.active_time_id ;
          // console.log( "设置",this.chooseflag )
               if (!event.isShow) {
          return
        }
        // jsEvent.stopPropagation()
        // let pos = this.computePos(jsEvent.target)

           this.$emit('eventclick', event.YOUR_DATA.active_time_id)
        }
       
   
      }
    }
  }
</script>
<style lang="scss">
$--red: rgba(250, 80, 54, 0.9);
$--bodyheight: 80px;
$--grey: #898989;
$--text-align: left;

.full-calendar-body{
  .eventchoose::before{
    content: '';
    position: absolute;
    border: 2px solid $--red;
   width: 105px;
   height: 88px;
  margin-left: -9px;
   margin-top: -30px;
  }
 .eventnotshow{
   background-color: #e4d9d9 !important;
   cursor: not-allowed !important;
   color: #898989 !important;
 }
  .weeks{
    display: flex;
    border-top:1px solid #e0e0e0;
    border-bottom:1px solid #e0e0e0;
   
    background-color:#d3d3d3;
    .week{
      flex:1;
      text-align: center;
      font-size: 14px;
      font-weight: 300;
      color: #fff;
      
    }
     .week:nth-child(1){
    background-color: $--red;

  }
    .week:nth-child(7){
    background-color: $--red;

   }
  }
  
  .dates {
    position:relative;
    .week-row{
      // width: 100%;
      // position:absolute;
      border-left:1px solid #e0e0e0;
      display: flex;
      .day-cell{
        flex:1;
        min-height: $--bodyheight;
        padding:4px;
        border-right:1px solid #e0e0e0;
        border-bottom:1px solid #e0e0e0;
      
        .day-number{
          text-align: $--text-align;
        }
        &.today{
          background-color:#fcf8e3;

        }
        &.not-cur-month{
           background-color: rgb(236, 231, 231);
            z-index: 20;
          //不可见
          .day-number{
          color: transparent;
         
          }
        
        }
      }
    }
    .dates-events{
      position:absolute;
      top:0;
      left:0;
      z-index:1;
      width: 100%;
      .events-week{
        display: flex;
          .events-day:nth-child(1){
            .day-number{
            color: $--red;
            }
          }
          .events-day:nth-child(7){
            .day-number{
            color: $--red;
            }
          }
        .events-day{
       
          flex:1;
          min-height: $--bodyheight+9;
          overflow: hidden;
          text-overflow: ellipsis;
          height:$--bodyheight+9 ;
          .day-infor{
            float: right;
            margin-top: -25px;
            margin-right: 5px;
            color: #62c413;
          }
          .day-false-infor{
           float: right;
            margin-top: -25px;
            margin-right: 5px;
            color: #b42810;
          }
          .day-number{
            text-align: left;
            padding:4px 5px 4px 4px;
            opacity: 1;
            font-size: 18px;
            font-weight: bold;
            color: $--grey;
          }
          &.not-cur-month{
            .day-number{
                 
            }
          }
          .event-box{
            .event-item{
              cursor: pointer;
              font-size:12px;
              background-color:#ffcc80;
              margin-bottom:2px;
              color: rgba(0,0,0,.87);
              padding:0 0 0 4px;
              height: $--bodyheight - 22;
              line-height: 18px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              &.is-start{
                margin-left: 4px;
                // border-top-left-radius:4px;
                // border-bottom-left-radius:4px;
              }
              &.is-end{
                margin-right: 4px;
                // border-top-right-radius:4px;
                // border-bottom-right-radius:4px;
              }
              &.is-opacity{
                opacity: 0;
              }
            }
            .more-link{
              cursor: pointer;
              text-align: right;
              padding-left: 8px;
              padding-right: 2px;
              color: rgba(0,0,0,.38);
              font-size: 14px;
            }
          }
        }
        .events-day:hover{

        }
      }
    }
    .more-events{
      position:absolute;
      width: 150px;
      z-index: 2;
      border:1px solid #eee;
      box-shadow: 0 2px 6px rgba(0,0,0,.15);
      .more-header{
        background-color:#eee;
        padding:5px;
        display: flex;
        align-items : center;
        font-size: 14px;
        .title{
          flex:1;
        }
        .close{
          margin-right: 2px;
          cursor: pointer;
          font-size: 16px;
        }
      }
      .more-body{
        height: 140px;
        overflow: hidden;
        .body-list{
          height: 120px;
          padding:5px;
          overflow: auto;
          background-color:#fff;
          .body-item{
            cursor: pointer;
            font-size:12px;
            background-color:#ffcc80;
            margin-bottom:2px;
            color: rgba(0,0,0,.87);
            padding:0 0 0 4px;
            height: 18px;
            line-height: 18px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>
