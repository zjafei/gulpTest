//配置文件的运行环境是node
const gulp = require('gulp');
const minify = require('gulp-minify');

gulp.task('array', function () {
    console.log('===array===');
});
gulp.task('of', function () {
    console.log('===of===');
});
gulp.task('task', function () {
    console.log('===task===');
});
gulp.task('names', function () {
    console.log('===names===');
});

gulp.task(// 就是去做一些事情
    'default',//string 任务名称
    ['array', 'of', 'task', 'names'],//array 一个包含任务列表的数组，这些任务会在你当前任务运行之前完成
    function () {//要执行的动作 一般形式为 gulp.src('',options).pipe(somePlugin()); 就是文件怎么处理
        gulp.src(// src 是输入文件 匹配 'client/js/xxx/xxx.js'
            'app/js/**/*.js',//string 或者 array   匹配文件正则
            {//额外设置
                buffer: true,//boolean 默认true true=> buffer false=> stream
                read: true,//boolean 默认true true=> 读取文件 false=> 返回 null
                base: 'app'//string 默认值： 将会加在 glob 之前
                // 如果不设置 base 那么根据src的第一个参数 就是app/js 这样输出的url 为 build/xxx/xxx.js
                // 但是如果设置为 app 那么 base 就是 app 这样输出的url 为 build/js/xxx/xxx.js
            })
            .pipe(
                gulp.dest(//dest 是根据src的第一个参数和src第二参数的base输出文件 到build下面的某些目录中
                    'build',// string 或者 function 输出的地址
                    {//额外设置
                        cwd: process.cwd(),//String   指定项目输出的目录 默认值就是 gulp执行的gulpfile.js的地址 即进程地址
                        mode: '',//string 默认值 0777 文件夹权限
                    }));
    });

/**
 * task 是接受异步操作的 但是要满足以下几个条件
 * */

//有回调函数
const exec = require('child_process').exec;
gulp.task('callback', function (callback) {
    exec('jekyll build', function (error) {
        if (err) {
            return callback(error); // 返回 error
        }
        callback(); // 完成 task
    });
});

//返回一个 stream
gulp.task('stream', function () {//gulp src 输出的是一个 stream
    return gulp.src('client/**/*.js')
        .pipe(minify())
        .pipe(gulp.dest('build'));
});

//返回一个 promise
const Q = require('q');//q模块可以输出解决回调地狱的promise

gulp.task('promise', function () {
    const deferred = Q.defer();

    // 执行异步的操作
    setTimeout(function () {
        deferred.resolve();
    }, 1);

    return deferred.promise;
});


// 返回一个 callback，因此系统可以知道它什么时候完成
gulp.task('one', function (cb) {
    /**
     * cb是task fn 自带的参数 作用就是给调用的task一个结束的判别
     */
        // 做一些事 -- 异步的或者其他的
    const err = null;
    if (err) {
        cb(err);
    }
    cb(); // 如果 err 不是 null 或 undefined，则会停止执行，且注意，这样代表执行失败了 所以cb 接受的是异步方法的error
});

// 定义一个所依赖的 task 必须在这个 task 执行之前完成
gulp.task('two', ['one'], function () {
    return gulp.src('app/**/*.js')
        .pipe(minify())
        .pipe(gulp.dest('build'));
});

gulp.task('three', ['two'], function () {
    const deferred = Q.defer();

    // 执行异步的操作
    setTimeout(function () {
        deferred.resolve();
    }, 1);

    return deferred.promise;
});

gulp.task('four', ['three'], function () {

});

gulp.task('step', ['four']);

gulp.task('watcherTask', function() {
    gulp.watch('build/**/*.js', function(event) {
        console.log('watcherTask：File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
    const watcher = gulp.watch('app/**/*.js', ['default']);
    watcher.on('change', function(event) {
        console.log('watcherCallback：File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('watcherCallback', function() {
    gulp.watch('build/**/*.js', function(event) {
        console.log('watcherCallback：File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});



