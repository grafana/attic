import angular from 'angular';
import './lib/monaco.min.js';

let editorTemplate = `<div id="content" style="width: 944px; height: 400px;"></div>`;

function link(scope, elem, attrs) {
  const containerDiv = elem.find('#content')[0];

  if (monaco) {
    monaco.editor.create(containerDiv, {
      value: [scope.content || 'Write your query here'
      ].join('\n'),
      language: 'plaintext'
    });
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
