.PHONY: app

APP=neuapp

meta: app

neuapp/package-lock.json:
	git clone https://github.com/ADGEfficiency/course-starter-python $(APP)
	cd $(APP); npm install -g gatsby-cli

app: neuapp/package-lock.json
	cd $(APP); npm run dev
