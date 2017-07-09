//配置文件的运行环境是node
const gulp = require('gulp');

gulp.task('default', function () {//在gulp里面任务名称为 default 的会被默认执行
    let txt = `======= this code is from gulp ========`;
    console.log(txt)
});

gulp.task('coco', function () {//执行指定 task 的语法命令是 gulp <taskName>
    let txt = `======= this code is from gulp coco========`;
    console.log(txt)
});

