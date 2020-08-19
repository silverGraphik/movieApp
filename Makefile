# Environment
PROJECT = movieapp-cae2d
APP_ID = 1:643650469494:web:11e46acc3d64ad90d86957
FIREBASE_TOKEN_FILE = firebase_token.asc
FIREBASE_CONFIG_JS = src/utils/firebase-config.js
TMP_FIREBASE_CONFIG_FILE = tmp_config.js

# App management
app-config:
	@echo "Retrieve config for "$(PROJECT)""
ifndef PROJECT_ID
	@firebase use $(PROJECT)
	@firebase apps:sdkconfig WEB $(APP_ID) > $(TMP_FIREBASE_CONFIG_FILE)
else
	@firebase use $(PROJECT) --token $(shell cat $(FIREBASE_TOKEN_FILE))
	@firebase apps:sdkconfig WEB $(APP_ID) --token $(shell cat $(FIREBASE_TOKEN_FILE)) > $(TMP_FIREBASE_CONFIG_FILE)
endif
	@bash -c 'cat <(echo "import * as firebase from \"firebase/app\";") tmp_config.js > $(FIREBASE_CONFIG_JS)'
	@rm -f $(TMP_FIREBASE_CONFIG_FILE)
