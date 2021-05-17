
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '', component: () => import('pages/Index.vue') 
      },
      { 
        path: '/pengaduan', component: () => import('pages/Pengaduan.vue') 
      },
      { 
        path: '/profile', component: () => import('pages/Profile.vue') 
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/login',
    component: () => import('pages/Login.vue')
  },
  {
    path: '/register',
    component: () => import('pages/Register.vue')
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
