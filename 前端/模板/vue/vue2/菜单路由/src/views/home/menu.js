// 反回所有的菜单
let getDefaultMenu = () => {
  let menu = [
    {
      title: "首页",
      src: "/",
      icon: "iconicon_home_page"
    },
    {
      title: "A",
      src: "/a",
      icon: "iconicon_all_huodong"
    },
    // {
    //   title: "活动评审",
    //   src: "/review",
    //   icon: "iconicon_pingshen",
    //   role: ["PBXT_PW"]
    // },
    // {
    //   title: "电子证书",
    //   src: "/certificate",
    //   role: ["PBXT_ADMIN"],
    //   icon: "iconicon_zhengshu"
    // },
    // {
    //   title: "优秀资源库",
    //   src: "/excellent",
    //   icon: "iconicon_ku"
    // },
    {
      title: "B",
      src: "/b",
      icon: "iconicon_geren",
      children: [
        {
          title: "b1",
          src: "/b1"
        },
        {
          title: "b2",
          src: "/b2"
        },
        {
          title: "b3",
          src: "/b3"
        }
      ]
    },
    // {
    //   title: "权限设置",
    //   src: "/privilege",
    //   icon: "iconicon_geren",
    //   role: ["PBXT_ADMIN", "PBXT_XXGLY"]
    // }
  ];
  return menu;
};

export default getDefaultMenu;
