<template>
  <div id="app">
<header class="header">
  <h1>Игра Память</h1>
  <div class="timer">{{timer}}</div>
</header>
    <main class="main">
      <div class="table">
        <div class="cell"
             :class="{opened: cell.hide === false, closed: cell.hide === true}"
             v-for="(cell, index) of cellArray"
             :key="index"
             @click="openCell(cell.value, index)">
          {{cell.hide ? '' : cell.value}}
        </div>
      </div>
    </main>
    <footer class="footer">
      <button @click="startGame">Старт</button>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data: () => ({
    resetCellTimer: null,
    intervalId: null,
    interval: null,
    countSeconds: 5,
    cellArray: [],
    temporaryOpenedCells: [],
    firstCell: null,
    secondCell: null,
  }),
  computed: {
    timer() {
      // return this.interval ? `${this.interval.getHours()}:${this.interval.getMinutes()}:${this.interval.getSeconds()}` : '00:00:00'
      return this.interval ? this.interval.toLocaleTimeString('en-UK',
          {timeZone: 'UTC', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '00:00:00'
    }
  },
  created() {
    this.setNewRandomArray()
  },
  methods: {
    startGame() {
      this.interval = new Date(0)
      console.log({startGame: this.interval})
      this.intervalId = setInterval(() => this.interval = new Date(this.interval.getTime() + 1000), 1000)
    },
    openCell(cellValue, cellIndex) {
      if (this.firstCell === null) {
        this.firstCell = {value: cellValue, index: cellIndex}
        this.cellArray[cellIndex].hide = false
        this.setTimer()
      } else if (this.secondCell === null) {
        this.cellArray[cellIndex].hide = false
        this.secondCell = {value: cellValue, index: cellIndex}
        let compare = this.firstCell.value === cellValue
        if (compare) {
          setTimeout(() => {
            this.cellArray[cellIndex].hide = false
            this.firstCell = null
            this.secondCell = null
            clearTimeout(this.resetCellTimer);
          }, 1000)

        } else {
          setTimeout(()=> {
            this.cellArray[cellIndex].hide = true
            this.cellArray[this.firstCell.index].hide = true
            this.firstCell = null
            this.secondCell = null
            clearTimeout(this.resetCellTimer);
          }, 1000)
        }
      }
    },
    setTimer() {
      this.resetCellTimer = setTimeout(() => {
        this.cellArray[this.firstCell.index].hide = true
        this.firstCell = null
        this.secondCell = null
        this.resetCellTimer = null
      }, 5000)
    },
    setNewRandomArray() {
      this.cellArray = this.calcRandomArray()
    },
    calcRandomArray() {
      let initArray = Array.from({ length: 18 }, (value, key) => {
        return {value: ++key, hide: true}
      });
      return [...initArray, ...JSON.parse(JSON.stringify(initArray))]
          .sort(() => Math.round(Math.random() * 100) - 50)
    }
  },
}
</script>

<style lang="scss">
.table {
  display: flex;
  width: 17rem;
  flex-flow: row wrap;
  .cell {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border: 1px solid;
    margin: 0 5px 5px 0;
    cursor: pointer;
    transform: rotateY(180deg);
    color: #285731;
    background-color: #285731;
  }
  .opened {
    color: black;
    background-color: white;
    animation: flip-vertical-right 0.4s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;
  }
  .closed {
    color: #285731;
    background-color: #285731;
    animation: flip-vertical-left 0.4s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;
  }
  @keyframes flip-vertical-right {
    0% {
      transform: rotateY(180deg);
    }
    100% {
      transform: rotateY(0);
    }
  }
  @keyframes flip-vertical-left {
    0% {
      transform: rotateY(0);
    }
    100% {
      transform: rotateY(180deg);
    }
  }
}
</style>
