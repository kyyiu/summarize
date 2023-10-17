const B = {
  path: "/b",
  component: () => import("@/views/b/index.vue"),
  redirect: "/b/b1",
  children: [{
    path: "b1",
    component: () => import("@/views/b/b1.vue"),
    meta: {
      withoutBack: true
    }
  }, {
    path: "b2",
    component: () => import("@/views/b/b2/index.vue"),
    redirect: "/b/b2/sub",
    children: [{
      path: "sub",
      component: () => import("@/views/b/b2/sub.vue"),
      meta: {
        withoutBack: true
      }
    }, {
      path: "sub2",
      component: () => import("@/views/b/b2/sub2.vue")
    }]
  }, {
    path: "b3",
    component: () => import("@/views/b/b3/index.vue"),
    redirect: "/b/b3/sub",
    children: [{
      path: "sub",
      component: () => import("@/views/b/b3/sub.vue"),
      meta: {
        withoutBack: true
      }
    }, {
      path: "sub2",
      component: () => import("@/views/b/b3/sub2.vue")
    }]
  }]
};
export default B;
