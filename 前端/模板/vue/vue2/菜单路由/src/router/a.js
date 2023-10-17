const A = {
  path: "/a",
  component: () => import("@/views/a/index.vue"),
  redirect: "/a/list",
  children: [
    {
      path: "list",
      component: () => import("@/views/a/list.vue"),
      meta: {
        withoutBack: true
      }
    },
    {
      path: "suba",
      component: () => import("@/views/a/suba.vue")
    }
  ]
};
export default A;
