1. <Switch>重命名为<Routes>
该顶级组件将被重命名。但是，其功能大部分保持不变（嗨，瞎折腾）。

// v5
<Switch>
    <Route exact path="/"><Home /></Route>
    <Route path="/profile"><Profile /></Route>
</Switch>

// v6
<Routes>
    <Route path="/" element={<Home />} />
    <Route path="profile/*" element={<Profile />} />
</Routes>

2. <Route>的新特性变更
component/render被element替代

总而言之，简而言之。就是变得更好用了。

import Profile from './Profile';

// v5
<Route path=":userId" component={Profile} />
<Route
  path=":userId"
  render={routeProps => (
    <Profile routeProps={routeProps} animate={true} />
  )}
/>

// v6
<Route path=":userId" element={<Profile />} />
<Route path=":userId" element={<Profile animate={true} />} />

3. 嵌套路由变得更简单
具体变化有以下：

<Route children> 已更改为接受子路由。
比<Route exact>和<Route strict>更简单的匹配规则。
<Route path> 路径层次更清晰。
3.1 简化嵌套路由定义
v5中的嵌套路由必须非常明确定义，且要求在这些组件中包含许多字符串匹配逻辑

且看之前的处理：
// v5
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch
} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}

function Profile() {
  let { path, url } = useRouteMatch();

  return (
    <div>
      <nav>
        <Link to={`${url}/me`}>My Profile</Link>
      </nav>

      <Switch>
        <Route path={`${path}/me`}>
          <MyProfile />
        </Route>
        <Route path={`${path}/:id`}>
          <OthersProfile />
        </Route>
      </Switch>
    </div>
  );
}

而在v6中，你可以删除字符串匹配逻辑。不需要任何useRouteMatch()！

// v6
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet
} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile/*" element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  );
}

function Profile() {
  return (
    <div>
      <nav>
        <Link to="me">My Profile</Link>
      </nav>

      <Routes>
        <Route path="me" element={<MyProfile />} />
        <Route path=":id" element={<OthersProfile />} />
      </Routes>
    </div>
  );
}
当然，还有更酸爽的操作，直接在路由里定义<Route>的<Route>，然后用接下来的一个新API：Outlet

3.2 新API:Outlet
这玩意儿，像极了{this.props.children}，具体用法看以下例子：

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<Profile />}>
          <Route path=":id" element={<MyProfile />} />
          <Route path="me" element={<OthersProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Profile() {
  return (
    <div>
      <nav>
        <Link to="me">My Profile</Link>
      </nav>
        {/*
       将直接根据上面定义的不同路由参数，渲染<MyProfile />或<OthersProfile />
        */}
      <Outlet />
    </div>
  )
}
3.3 多个<Routes />
以前，我们只能 在React App中使用一个 Routes。但是现在我们可以在React App中使用多个路由，这将帮助我们基于不同的路由管理多个应用程序逻辑。

import React from 'react';
import { Routes, Route } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <p>Look, more routes!</p>
      <Routes>
        <Route path="/" element={<DashboardGraphs />} />
        <Route path="invoices" element={<InvoiceList />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="dashboard/*" element={<Dashboard />} />
    </Routes>
  );
}
4. 用useNavigate代替useHistory
从一目了然改到双目失明。。。

总感觉React Router团队有点儿戏。。。

// v5
import { useHistory } from 'react-router-dom';

function MyButton() {
  let history = useHistory();
  function handleClick() {
    history.push('/home');
  };
  return <button onClick={handleClick}>Submit</button>;
};
现在，history.push()将替换为navigation()：

// v6
import { useNavigate } from 'react-router-dom';

function MyButton() {
  let navigate = useNavigate();
  function handleClick() {
    navigate('/home');
  };
  return <button onClick={handleClick}>Submit</button>;
};
history的用法也将被替换成：

// v5
history.push('/home');
history.replace('/home');

// v6
navigate('/home');
navigate('/home', {replace: true});


5. 新钩子useRoutes代替react-router-config。
感觉又是一波强行hooks，但还是相对于之前简洁了一些。。。

function App() {
  let element = useRoutes([
    { path: '/', element: <Home /> },
    { path: 'dashboard', element: <Dashboard /> },
    { path: 'invoices',
      element: <Invoices />,
      children: [
        { path: ':id', element: <Invoice /> },
        { path: 'sent', element: <SentInvoices /> }
      ]
    },
    // 重定向
    { path: 'home', redirectTo: '/' },
    // 404找不到
    { path: '*', element: <NotFound /> }
  ]);
  return element;
}
6. 大小减少：从20kb到8kb
React Router v6给我们带来方便的同时，还把包减少了一半以上的体积。。。
7. 迁移及其它重要修复…
官方的迁移指南在这里：[React Router v6迁移指南](https://github.com/remix-run/react-router/blob/dev/docs/advanced-guides/migrating-5-to-6.md)

其实上面所列的新特性，基本就是迁移的全部内容了。

基础的起手式就是更新包：

$ npm install react-router@6 react-router-dom@6
# or, for a React Native app
$ npm install react-router@6 react-router-native@6

其中我觉得特别需要注意的一点是：React Router v6使用简化的路径格，仅支持2种占位符：动态:id样式参数和*通配符

以下都是v6中的有效路由路径：

/groups
/groups/admin
/users/:id
/users/:id/messages
/files/*
/files/:id/*
/files-*

使用RegExp正则匹配的路径将无效：

/users/:id?
/tweets/:id(\d+)
/files/*/cat.jpg

v6中的所有路径匹配都将忽略URL上的尾部"/"。实际上，<Route strict>已被删除并且在v6中无效。这并不意味着您不需要使用斜杠。

在v5版本之前的路径，存在路由歧义

当前路径:"/users"，则<Link to="me">将跳转<a href="/me">。
当前路径:"/users/"，则<Link to="me">将跳转<a href="/users/me">。
React Router v6修复了这种歧义，取消了尾部"/"：

当前路径:"/users"，则<Link to="me">将跳转<a href="/users/me">。
当前路径:"/users"，则<Link to="../me">将跳转<a href="/me">。
其形式更像命令行cd的用法：

// 当前路径为 /app/dashboard 

<Link to="stats">               // <a href="/app/dashboard/stats">
<Link to="../stats">            // <a href="/app/stats">
<Link to="../../stats">         // <a href="/stats">
<Link to="../../../stats">      // <a href="/stats">

// 命令行当前路径为 /app/dashboard
cd stats                        // pwd is /app/dashboard/stats
cd ../stats                     // pwd is /app/stats
cd ../../stats                  // pwd is /stats
cd ../../../stats               // pwd is /stats
