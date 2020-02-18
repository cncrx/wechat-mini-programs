Component({

  properties: {
    content: {
      type: String,
      value: ''
    },
    tags: {
      type: Array,
      value: []
    },
    extra: {
      type: String,
      value: ''
    },
    finished: {
      type: Boolean,
      value: false
    },
    action: {
      type: String,
      value: ''
    }
  },

  data: {
    collapsed: true
  },

  attached: function () {
    console.log('component attached!');
  },

  detached: function () {
    console.log('component dettached!');
  },

  methods: {
    removeHist: function () {
      this.triggerEvent('itemremove');
    }
  }
})
