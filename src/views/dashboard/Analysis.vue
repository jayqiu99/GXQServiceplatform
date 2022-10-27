<template>
  <div>
    <hr-chart1></hr-chart1>
  </div>
</template>

<script>
  // import IndexChart from './IndexChart'
  // import IndexTask from "./IndexTask"
  // import IndexBdc from './IndexBdc'

  import HrChart1 from './HrChart1'

  export default {
    name: "Analysis",
    components: {
      HrChart1,
      // IndexChart,
      // IndexTask,
      // IndexBdc
    },
    data() {
      return {
        indexStyle: 1
      }
    },
    created() {

    },
    methods: {}
  }
</script>