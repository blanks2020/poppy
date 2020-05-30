# poppy

## vscode 配置

```json
{
  "files.insertFinalNewline": true,
  "editor.fontSize": 16,
  "files.autoSave": "onFocusChange",
  "editor.tabSize": 2,
  "files.trimTrailingWhitespace": true,
  "editor.formatOnPaste": true,
  "editor.multiCursorModifier": "ctrlCmd",
  "editor.snippetSuggestions": "top",
  "workbench.colorTheme": "Seti Monokai",
  "editor.suggestSelection": "first",
  "vsintellicode.modify.editor.suggestSelection": "automaticallyOverrodeDefaultValue",
  "explorer.openEditors.visible": 0,
  "files.exclude": {
    ".vscode": true,
    "**/.classpath": true,
    "**/.factorypath": true,
    "**/.project": true,
    "**/.settings": true
  },
  "java.jdt.ls.vmargs": "-noverify -Xmx1G -XX:+UseG1GC -XX:+UseStringDeduplication -javaagent:\"/Users/x/.vscode-oss/extensions/gabrielbb.vscode-lombok-1.0.0/server/lombok.jar\"",
  "editor.minimap.enabled": false,
  "python.jediEnabled": false,
  "window.zoomLevel": 0,
  "explorer.confirmDelete": false,
  "emmet.showSuggestionsAsSnippets": true,
  "emmet.triggerExpansionOnTab": true,
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "wxml": "html"
  },
  "files.associations": {
    "*.js": "javascriptreact",
    "*.cjson": "jsonc",
    "*.wxss": "css",
    "*.wxs": "javascript"
  },
  "minapp-vscode.disableAutoConfig": true,
  "explorer.confirmDragAndDrop": false,
  "javascript.updateImportsOnFileMove.enabled": "never",
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "typescript.updateImportsOnFileMove.enabled": "always",
  "javascript.preferences.quoteStyle": "single",
  "typescript.preferences.quoteStyle": "single",
  "prettier.singleQuote": true,
  "prettier.packageManager": "yarn",
  "prettier.semi": false,
  "editor.formatOnSave": true,
  "prettier.trailingComma": "none",
  "[json]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "javascript.format.insertSpaceAfterConstructor": true,
  "javascript.format.insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces": true,
  "javascript.format.insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets": true,
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "typescript.format.insertSpaceAfterConstructor": true,
  "typescript.format.insertSpaceBeforeFunctionParenthesis": true,
  "vetur.validation.template": false,
  "workbench.editor.highlightModifiedTabs": true,
  "vetur.format.defaultFormatter.js": "vscode-typescript",
  "minapp-vscode.formatMaxLineCharacters": 200,
  "html.format.wrapLineLength": 240
}

```


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Run your end-to-end tests
```
yarn test:e2e
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
