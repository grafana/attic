import angular from 'angular';
import './lib/monaco.min.js';

let editorTemplate = `<div id="content" tabindex="0" style="width: 100%; height: 250px"></div>`;

function link(scope, elem, attrs) {
  const containerDiv = elem.find('#content')[0];
  let codeEditor: monaco.editor.IStandaloneCodeEditor;
  setTimeout(() => { codeEditor = initMonaco(containerDiv); }, 1);

  containerDiv.onblur = () => {
    scope.onChange();
  };

  function initMonaco(containerDiv) {
    const codeEditor = monaco.editor.create(containerDiv, {
      value: scope.content || 'Write your query here',
      language: 'plaintext'
    });
    codeEditor.layout();

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
    },
    link: link,
  };
}

angular.module('grafana.controllers').directive('monacoEditor', monacoEditorDirective);
