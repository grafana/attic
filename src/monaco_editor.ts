import angular from 'angular';
import './lib/bridge.js';
import './lib/monaco.min.js';

let editorTemplate = `<div id="content" tabindex="0" style="width: 100%; height: 250px"></div>`;

function link(scope, elem, attrs) {
  const containerDiv = elem.find('#content')[0];
  let codeEditor: monaco.editor.IStandaloneCodeEditor;
  setTimeout(() => {
    codeEditor = initMonaco(containerDiv);
  }, 1);

  containerDiv.onblur = () => {
    scope.onChange();
  };

  function initMonaco(containerDiv) {
    const codeEditor = monaco.editor.create(containerDiv, {
      value: scope.content || 'Write your query here',
      language: 'kusto',
      selectionHighlight: false,
      theme: 'kusto-light',
      folding: true,
      lineNumbers: 'off',
      lineHeight: 16,
      suggestFontSize: 13,
      dragAndDrop: false,
      occurrencesHighlight: false,
      minimap: {
          enabled: false
      },
      renderIndentGuides: false,
      wordWrap: 'on',
    });
    codeEditor.layout();

    monaco.languages['kusto'].kustoDefaults.setLanguageSettings({
      includeControlCommands: true,
      newlineAfterPipe: true,
      useIntellisenseV2: false,
    });

    scope.getSchema().then(schema => {
      monaco.languages['kusto'].getKustoWorker().then(workerAccessor => {
        const model = codeEditor.getModel();
        workerAccessor(model.uri).then(worker => {
          worker.setSchemaFromShowSchema(schema, 'https://help.kusto.windows.net', 'LogManagement');
        });
      });
    });

    // Sync with outer scope - update editor content if model has been changed from outside of directive.
    scope.$watch('content', (newValue, oldValue) => {
      let editorValue = codeEditor.getValue();
      if (newValue !== editorValue && newValue !== oldValue) {
        scope.$$postDigest(function() {
          setEditorContent(newValue);
        });
      }
    });

    codeEditor.onDidChangeModelContent(() => {
      scope.$apply(() => {
        let newValue = codeEditor.getValue();
        scope.content = newValue;
      });
    });

    scope.$on('$destroy', () => {
      if (codeEditor) {
        try {
          codeEditor.dispose();
        } catch (e) {
          console.error('Failed to dispose the editor component.', e);
        }
      }
    });

    return codeEditor;
  }

  function setEditorContent(value) {
    codeEditor.setValue(value);
  }
}

export function monacoEditorDirective() {
  return {
    restrict: 'E',
    template: editorTemplate,
    scope: {
      content: '=',
      datasource: '=',
      onChange: '&',
      getSchema: '&',
    },
    link: link,
  };
}

angular.module('grafana.controllers').directive('monacoEditor', monacoEditorDirective);
