layui.use (['code', 'okMd5'], function () {
  const code = layui.code;
  const okMd5 = layui.okMd5;

  code ({
    elem: 'pre',
    title: '代码示例'
  });

  // 计算给定字符串值的（十六进制编码的）MD5哈希值
  const hash = okMd5 ('hello');
  console.log (hash);

  // 计算给定字符串值和key的（十六进制编码的）HMAC-MD5哈希值
  const hash2 = okMd5 ('hello', 'word');
  console.log (hash2);

  // 计算给定字符串值的原始MD5哈希值
  const hash3 = okMd5 ('hello', null, true);
  console.log (hash3);

  // 计算给定字符串值和key的原始HMAC-MD5哈希值
  const hash4 = okMd5 ('hello', 'word', true);
  console.log (hash4);
});