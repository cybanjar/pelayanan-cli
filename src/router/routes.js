
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
      { 
        path: '/kontak', component: () => import('pages/Kontak.vue') 
      },
      { 
        path: '/camat', component: () => import('pages/Camat.vue') 
      },
      { 
        path: '/admin', component: () => import('pages/Admin.vue') 
      },
      { 
        path: '/account-setting', name: 'AccountSettingPage', component: () => import('pages/AccountSetting.vue') 
      },
      { 
        path: '/detail-report', name: 'DetailReportPage', component: () => import('pages/DetailReport.vue') 
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
    path: '/forgot-password',
    component: () => import('src/pages/ForgotPassword.vue')
  },
  {
    path: '/reset-password',
    component: () => import('src/pages/ResetPassword.vue')
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
