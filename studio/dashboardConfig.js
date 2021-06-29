export default {
  widgets: [
    // {
    //   name: 'google-analytics',
    //   layout: {
    //     width: 'medium'
    //   },
    //   options: {
    //     title: 'Last 30 days',
    //     gaConfig: {
    //       reportType: 'ga',
    //       query: {
    //         dimensions: 'ga:date',
    //         metrics: 'ga:users, ga:sessions, ga:newUsers',
    //         'start-date': '30daysAgo',
    //         'end-date': 'yesterday'
    //       },
    //       chart: {
    //         type: 'LINE',
    //         options: {
    //           width: '100%',
    //         }
    //       }
    //     }
    //   }
    // },
    // {
    //   name: 'google-analytics',
    //   layout: {
    //     width: 'medium'
    //   },
    //   options: {
    //     title: 'World map',
    //     gaConfig: {
    //       reportType: 'ga',
    //       query: {
    //         dimensions: 'ga:country',
    //         metrics: 'ga:users',
    //         'start-date': '30daysAgo',
    //         'end-date': 'yesterday'
    //       },
    //       chart: {
    //         type: 'GEO',
    //         width: '100%'
    //       }
    //     }
    //   }
    // },
    {
      name: 'document-list',
      options: {
        title: 'Recently edited',
        order: '_updatedAt desc',
        limit: 10,
        types: ['homePage', 'page']
      },
      layout: { width: 'medium' }
    },
    {
      name: 'project-users'
    },
    {
      name: 'project-info'
    }
  ]
}
