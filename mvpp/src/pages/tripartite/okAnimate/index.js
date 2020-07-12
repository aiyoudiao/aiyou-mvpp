layui.use (['code'], function () {
  const code = layui.code;
  const $ = layui.jquery;

  code ({
    elem: 'pre',
    title: '代码示例',
    encode: true
  });

  $ ('#try').click (function () {
    $ (this).addClass ('ok-anim shake');
  });
});