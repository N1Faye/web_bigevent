$(function () {
  const form = layui.form;
  const layer = layui.layer;

  //   密码验证规则
  form.verify({
    //   密码验证
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 新旧密码
    samePwd: (val) => {
      if (val === $('[name = oldPwd]').val()) return '新旧密码不能相同！';
    },
    // 确认密码和新密码
    rePwd: (val) => {
      if (val !== $('[name=newPwd]').val()) return '两次密码不一致！';
    }
  });

  // 监听修改密码
  $('.layui-form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: (res) => {
          console.log(res);
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg('修改密码成功！');
        localStorage.removeItem('token');
        window.parent.location.href='/login.html'
      }
    });
  });
});
