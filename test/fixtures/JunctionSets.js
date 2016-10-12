const { JunctionSet, Junction, Branch, Param } = require('../../lib/junctions')
const Junctions = require('./Junctions')
const Serializers = require('./Serializers')


module.exports = {
  get invoiceScreen() {
    return JunctionSet({
      content: Junction({
        details: Branch(),
        attachments: Branch(),
      }, 'details')
    }, 'content')
  },

  get invoiceListScreen() {
    return JunctionSet({
      content: Junction({
        list: Branch({
          path: '/list',
          params: {
            page: Param({ default: 1, serializer: Serializers.number }),
            pageSize: Param({ default: 20, serializer: Serializers.number }),
          }
        }),
        invoice: Branch({
          data: {
            component: 'invoiceScreen',
          },
          params: {
            id: Param({ required: true }),
          },
          children: module.exports.invoiceScreen,
        }),
      }, 'list'),
      addModal: Junction({
        open: Branch(),
      }),
    }, 'content')
  },

  get appScreen() {
    return JunctionSet({
      content: Junction({
        dashboard: Branch(),
        invoices: Branch({
          params: {
            admin: Param({ serializer: Serializers.flag }),
          },
          children: module.exports.invoiceListScreen,
        }),
      }, 'invoices')
    }, 'content')
  }
}
