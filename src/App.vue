<template>
  <div id="app">
    <header class="header">
      <h1>Игра Память</h1>
      <span class="timer">{{ timer }}</span>
    </header>
    <main class="main">
      <div class="field">
        <div class="cell"
             :class="{opened: cell.hide === false, closed: cell.hide === true}"
             v-for="(cell, index) of cellArray"
             :key="index"
             @click="openCell(index)">
          {{ cell.hide ? '' : cell.value }}
        </div>
      </div>
      <section class="action-panel">
        <label class="label">Введи свое имя</label>
        <input class="input" type="text" v-model="playerName" autofocus>
        <button class="btn" @click="startGame">{{ isStartedGame ? 'Стоп' : 'Старт' }}</button>
      </section>
      <table class="table" v-if="allCellsOpened">
        <caption>Result Table</caption>
        <thead class="thead">
        <tr>
          <th>Name</th>
          <th>Time</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(user, index) of resultArray" :key="`user-${index}`">
          <td>{{ user.name }}</td>
          <td>{{ user.time }}</td>
        </tr>
        </tbody>
      </table>
    </main>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: 'App',
  components: {},
  data: () => ({
    playerName: '',
    resetCellTimer: null,
    intervalId: null,
    interval: null,
    countSeconds: 5,
    cellArray: [],
    firstCell: null,
    secondCell: null,
  }),
  computed: {
    timer() {
      return this.interval ? this.interval.toLocaleTimeString('en-UK',
          {timeZone: 'UTC', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'}) : '00:00:00'
    },
    allCellsOpened() {
      return this.cellArray.findIndex(cell => cell.hide) === -1
    },
    ...mapState(['isStartedGame', 'resultArray'])
  },
  created() {
    this.setNewRandomArray()
  },
  watch: {
    allCellsOpened: function (value) {
      if (value) {
        clearInterval(this.intervalId)
        this.$store.dispatch('setFinishGame', {name: this.playerName ? this.playerName : 'ноунейм', time: this.timer})
      }
    }
  },
  methods: {
    startGame() {
      if (this.isStartedGame) {
        this.resetGame()
      } else {
        this.setNewRandomArray()
        this.interval = new Date(0)
        this.intervalId = setInterval(() => this.interval = new Date(this.interval.getTime() + 1000), 1000)
        this.$store.dispatch('setStartedGame')
      }
    },
    async openCell(cellIndex) {
      if (!this.isStartedGame || this.secondCell || this.allCellsOpened) {
        return false;
      }
      if (this.firstCell === null) {
        this.firstCell = cellIndex
        this.cellArray[cellIndex].hide = false
        this.setTimer(cellIndex)
      } else if (this.secondCell === null) {
        clearTimeout(this.resetCellTimer)
        this.secondCell = cellIndex
        this.cellArray[cellIndex].hide = false
        this.checkCells(this.firstCell, cellIndex)
      } else {
        return false
      }

    },
    checkCells(firstIndex, secondIndex) {
      const resultCompare = this.cellArray[firstIndex].value === this.cellArray[secondIndex].value
      if (resultCompare) {
        clearTimeout(this.resetCellTimer)
        this.cellArray[secondIndex].hide = false
        this.firstCell = null
        this.secondCell = null
      } else {
        setTimeout(() => {
          this.cellArray[firstIndex].hide = true
          this.cellArray[secondIndex].hide = true
          this.firstCell = null
          this.secondCell = null
          clearTimeout(this.resetCellTimer)
        }, 1000)
      }
    },
    setTimer(cellIndex) {
      this.resetCellTimer = setTimeout(() => {
        this.cellArray[cellIndex].hide = true
        this.firstCell = null
        this.secondCell = null
        this.resetCellTimer = null
      }, this.countSeconds * 1000)
    },
    setNewRandomArray() {
      this.cellArray = this.calcRandomArray()
    },
    calcRandomArray() {
      let initArray = Array.from({length: 18}, (value, key) => {
        return {value: ++key, hide: true}
      });
      return [...initArray, ...JSON.parse(JSON.stringify(initArray))]
          .sort(() => Math.round(Math.random() * 100) - 50)
    },
    resetGame() {
      clearInterval(this.intervalId)
      this.firstCell = null
      this.interval = null
      this.intervalId = null
      this.secondCell = null
      this.setNewRandomArray()
      this.$store.commit('setStoppedGame')
    }
  },
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

html {
  width: 100%;
  height: 100%;
  font-family: Roboto;
  font-size: 15px;
}

body {
  display: flex;
  justify-content: center;
}

#app {
  width: 15rem;
}

.header {
  margin-bottom: 1rem;
  text-align: center;
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
}

.action-panel {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 5px 2rem 0;

  .label, .input {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .input {
    padding: 0.5rem;
  }

  .btn {
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius: 0.3rem;
    border: 0;
    background-color: darkcyan;
    cursor: pointer;
  }
}

.field {
  display: flex;
  margin-bottom: 2rem;
  flex-flow: row wrap;
  justify-content: space-between;

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

.table {
  width: 100%;
  text-align: center;
  border-collapse: collapse;

  .thead {
    th {
      padding: 0.3rem;
    }
  }

  tr {
    border-bottom: 1px solid black;

    td {
      padding: 0.3rem;
    }
  }
}
</style>
