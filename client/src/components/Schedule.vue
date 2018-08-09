<template>
  <div style="background-color: #EFEFEF; padding: 10px;">
     <Card shadow class="main-card" v-for="trip in trips" :key="trip.id">
      <div slot="title">
        <Row>
          <Col span="10" style="text-align: start;">
            <div>
              <h1 >{{trip.id}}</h1>
              <span class="header">{{trip.driverName}}</span>
            </div>
          </Col>
          <Col span="8">
            <skycon :condition="trip.weather" :width="35" :height="35"/>
          </Col>
          <Col span="6">
            <Tag :color="colorMap[trip.status]"> {{trip.status}} </Tag>
          </Col>
        </Row>
      </div>
      <Row>
        <Col span="6">
          <Row class="header">
            Time  
          </Row>
          <Row>
            {{trip.time}}
          </Row>
        </Col>
        <Col span="6">
          <Row class="header">
            ETA  
          </Row>
          <Row>
            {{trip.eta}}
          </Row>
        </Col>
        <Col span="6">
          <Row class="header">
            Load
          </Row>
          <Row>
            {{trip.load}}
          </Row>
        </Col>
        <Col span="6">
          <Row class="header">
            Traffic
          </Row>
          <Row>
            {{trip.traffic}}
          </Row>
        </Col>
      </Row>
     </Card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      source: '',
      destination: '',
      loading: true,
      trips: [],
        // {
        //   id: '#2170984',
        //   driverName: 'Mahmoud Husni',
        //   status: 'Departed',
        //   time: '05:05 PM',
        //   eta: '45 minutes',
        //   demand: 4,
        //   load: 5,
        //   weather: 'clear-day',
        //   traffic: 'Heavey traffic'
        // },
        // {
        //   id: '#542940',
        //   driverName: 'Abu Melhim',
        //   status: 'Boarding',
        //   time: '05:10 PM',
        //   eta: '45 minutes',
        //   demand: 37,
        //   load: 7,
        //   weather: 'partly-cloudy-night',
        //   traffic: 'Heavey traffic'
        // },
        // {
        //   id: '#8923984',
        //   driverName: 'Abu Mohammad',
        //   status: 'Available',
        //   time: '05:30 PM',
        //   eta: '45 minutes',
        //   demand: 106,
        //   load: 0,
        //   weather: 'rain',
        //   traffic: 'Heavey traffic'
        // },
        // {
        //   id: '#2343490',
        //   driverName: 'Ameer Bamieh',
        //   status: 'Available',
        //   time: '06:05 PM',
        //   eta: '30 minutes',
        //   demand: 99,
        //   load: 0,
        //   weather: 'fog',
        //   traffic: 'Slight traffic'
        // },
        // {
        //   id: '#9734932',
        //   driverName: 'Abd Al-Hadi',
        //   status: 'Arriving',
        //   time: '07:30 PM',
        //   eta: '66 minutes',
        //   demand: 87,
        //   load: 0,
        //   weather: 'snow',
        //   traffic: 'Heavey traffic'
        // }
      // ],
      colorMap: {
        'Departed': 'default',
        'Boarding': 'primary',
        'Available': 'success',
        'Arriving': 'warning'
      }
    }
  },
  methods: {
    getSchedule () {
      this.$Loading.start()
      // this.loading = true
      // this.axios.get('http://www.mocky.io/v2/5b6ca8693300007800a36ad5?mocky-delay=1500ms')
      this.axios.get('http://demo7048081.mockable.io/trips', {
        params: {
          source: this.source,
          destination: this.destination
        }
      })
      .then((response) => {
        this.$Loading.finish()
        // console.log(response.data)
        this.trips = response.data
        // this.loading = false
        // setTimeout(this.getSchedule, 5000)
      })
      .catch(err => {
        console.log(err)
        this.$Loading.error()
        this.$Message.error('Something went wrong')
        // this.loading = false
        // setTimeout(this.getSchedule, 5000)
      })
    }
  },
  mounted () {
    this.source = this.$route.query.source
    this.destination = this.$route.query.dest
    this.getSchedule()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-card {
  margin-top: 5px;
  margin-bottom: 15px;
}
.header {
  color: #ABABAB;
}
</style>