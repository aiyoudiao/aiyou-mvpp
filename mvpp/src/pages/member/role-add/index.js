layui.use (['element', 'form', 'tree', 'okLayer', 'okUtils'], function () {
  const form = layui.form;
  const tree = layui.tree;
  const okLayer = layui.okLayer;
  const okUtils = layui.okUtils;
  okLoading.close ();
  const data = [
    {
      title: '根目录',
      spread: true,
      children: [
        {
          title: '会员管理',
          spread: true,
          children: [
            {
              title: '用户管理',
              spread: true,
              children: [{ title: '添加用户' }, { title: '编辑用户' }, { title: '删除用户' }]
            },
            {
              title: '角色管理',
              spread: true,
              children: [{ title: '添加角色' }, { title: '编辑角色' }, { title: '删除角色' }]
            },
            {
              title: '权限管理',
              spread: true,
              children: [{ title: '添加权限' }, { title: '编辑权限' }, { title: '删除权限' }]
            }
          ]
        }
      ]
    }
  ];

  tree.render ({
    elem: '#permissionTree',
    // data: okUtils.mockApi.permission.list,
    data: data,
    showCheckbox: true
  });

  form.on ('submit(add)', function (data) {
    // TODO 权限节点校验

    // 请求后台
    okUtils
      .ajax ('/role/addRole', 'post', data.field, true)
      .done (function (response) {
        console.log (response);
        okLayer.greenTickMsg ('添加成功', function () {
          parent.layer.close (parent.layer.getFrameIndex (window.name));
        });
      })
      .fail (function (error) {
        console.log (error);
      });
    return false;
  });
});