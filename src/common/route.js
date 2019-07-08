import HelloWorld from '@/components/HelloWorld'
import IndexView from '@/views/index'
import BaseIndex from '@/views/base/index'
import LoginIn from '@/views/base/login'


let routes = [{
    path: '/login',
    name: 'LoginIn',
    component: LoginIn
  },
  {
    path: "/",
    component: BaseIndex,
    redirect: "/",
    children: [{
        path: '/',
        name: 'Dashboard',
        component: IndexView
      },
      {
        path: '/hello',
        name: 'Dashboard',
        component: HelloWorld
      }
    ]
  }
]

export default routes
