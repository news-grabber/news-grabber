# Install

```bash
npm install -g news-grabber
```

# Config

Create a file in current directory called `news-grabberc.json`
to contain the configurations, for example:

```json
{
	"timing": "00 00 07 * * *",
	"timezone": "Asia/Shanghai",
	"pages": [{
		"title": "A Financial Report",
		"url": "http://example.com",
		"selector": "section table.financial-list",
		"mail": {
			"receivers": ["me@gmail.com"]
		}
	}],
	"nodemailer": {
		"service": "126",
		"from": "news_grabber@126.com",
		"auth": {
			"user": "news_grabber@126.com",
			"pass": "your password"
		}
	}
}
```

# Usage

Plain:

```bash
news-grabber
```

Use pm2:

```bash
pm2 start `which news-grabber` --name 'news-grabber' --log-date-format 'DD-MM HH:mm:ss.SSS'
```

# API

* `timing`: Cron syntax, see: https://github.com/kelektiv/node-cron
* `timezone`: The timezone config for [node-cron][node-cron]
* `pages.title`: The title of your page, used by email title
* `pages.url`: The url of the webpage to be watched
* `selector`: The DOM selector conforming to `document.querySelectorAll()`
* `mail.receivers`: The mail receivers to send mail to once update found
* `nodemailer`: The config for [nodemailer][nodemailer]

[node-cron]: https://github.com/kelektiv/node-cron
[nodemailer]: https://nodemailer.com
