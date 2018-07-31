# aips文档

jwt: {
	uid: 'userid'
}

### 1. get https://aips.vbig.org/api/taskes-waiting

```
headers: {
	x-token: 'jwt'
}

result:
{
	success: true,
	data: {
		queueing: 0 // 等待任务数
	}
}
```

### 2. get https://aips.vbig.org/api/taskes-done

```
headers: {
	x-token: 'jwt'
}

result:
{
	success: true,
	data: {
		done: 1000 // 完成任务数
	}
}
```

### 3. post https://aips.vbig.org/api/task


```
headers: {
	x-token: 'jwt'
}

params:
{
	taskType: '', ['FastStyle', 'DeepPaint']
	styleImage: '[base64]',
	contentImage: '[base64]',
	quality: 80, //[0, 100]
	keepSeconds: 文件保留秒数 long
	demandVisitTimes: 100， //访问次数
	vip: 0, // vip 等级 [0, 100]
	channel: '' //渠道编码
	guideCode: '' //推荐编码
}

result: {
	success: true,
	data: {
		queueing: 100, // 前面有任务
		waiting: 100000, // 秒
		queryCode: 'xxx' // 查询号，随机唯一号
	}
}
```


### 4. get https://aips.vbig.org/api/query-task/{queryCode}


```
headers: {
	x-token: 'jwt'
}


result: {
	success: true,
	data: {
		queueing: 100, // 前面有任务
		waiting: 100000, // 秒
		queryCode: '{queryCode}', // 可以返回原来的查询号，或者重新生成查询号
		proccessing: 0.2, // [0, 1] 进度
		done: false, // [true, false]
		completedTime: datetime// long
		quality: 60, //[0, 100]
		result: 'url',
		retention: datetime //long 保留最后期限，
		overdue: false // 是否过期， 如果过期，只回传 retention， overdue
	}
}
```

### 4. get https://aips.vbig.org/api/task-result/{queryCode}
```
headers: {
	x-token: 'jwt'
}

用流返回图片，每访问一次，记录一次
```


### table

TaskTable 

```
id:
taskType: 
taskNo: 任务号码，递增，整数
vip: 0, // vip 等级 [0, 100]
processNo: 处理号码，递增，整数, 拿VIP等级和taskNo算出一个处理号，执行以处理号为主
createdAt: //任务建立时间
startAt: // 任务开始执行时间
doneAt: // 任务完成时间
queryCode: //
retention: datetime //long 保留最后期限，
keepSeconds: 文件保留秒数,

styleImagePath: '',
contentImagePath: '',
styleImageMD5: '',
contentImageMD5: ''
quality: 60, //[0, 100]
resultUrl: '',
userId: '',
proccessing: 0.2, // [0, 1] 进度
timeBudget : //时间消耗估算, 秒数
estimateStartAt: datetime //long 预估开始时间
channel: '' //渠道编码
guideCode: '' //推荐编码
xToken: '[jwt]',
host: '', 从哪来，从request获取
agent: '', 代理，浏览器， 手机，
demandVisitTimes: 100， //访问次数
visitTimes: 次数 // 下载，查看次数

```



