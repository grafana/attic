import _ from 'lodash';
export interface SuggestionController {
  _model: any;
}

export default class KustoCodeEditor {
  splitWithNewLineRegex = /[^\n]+\n?|\n/g;
  newLineRegex = /\r?\n/;
  startsWithKustoPipeRegex = /^\|\s*/g;
  kustoPipeRegexStrict = /^\|\s*$/g;

  constructor(private codeEditor: monaco.editor.ICodeEditor) {}

  toSuggestionController(srv: monaco.editor.IEditorContribution): SuggestionController {
    return <any>srv;
  }

  setEditorContent(value) {
    this.codeEditor.setValue(value);
  }

  getCompletionItems(model, position) {
    const timeFilterDocs =
      '##### Macro that uses the selected timerange in Grafana to filter the query.\n\n' +
      '- `$__timeFilter()` -> Uses the TimeGenerated column\n\n' +
      '- `$__timeFilter(datetimeColumn)` ->  Uses the specified datetime column to build the query.';

    var textUntilPosition = model.getValueInRange({
      startLineNumber: 1,
      startColumn: 1,
      endLineNumber: position.lineNumber,
      endColumn: position.column,
    });

    if (!_.includes(textUntilPosition, 'where')) {
      return [
        {
          label: 'where $__timeFilter(timeColumn)',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: {
            value: `where \\$__timeFilter($0)`,
          },
          documentation: {
            value: timeFilterDocs,
          },
        },
      ];
    }

    if (_.includes(model.getLineContent(position.lineNumber).toLowerCase(), 'where')) {
      return [
        {
          label: '$__timeFilter(timeColumn)',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: {
            value: `\\$__timeFilter($0)`,
          },
          documentation: {
            value: timeFilterDocs,
          },
        },
        {
          label: '$__from',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: {
            value: `\\$__from`,
          },
          documentation: {
            value:
              'Built-in variable that returns the from value of the selected timerange in Grafana.\n\n' +
              'Example: `where TimeGenerated > $__from` ',
          },
        },
        {
          label: '$__to',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: {
            value: `\\$__to`,
          },
          documentation: {
            value:
              'Built-in variable that returns the to value of the selected timerange in Grafana.\n\n' +
              'Example: `where TimeGenerated < $__to` ',
          },
        },
        {
          label: '$__interval',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: {
            value: `\\$__interval`,
          },
          documentation: {
            value:
              '##### Built-in variable that returns an automatic time grain suitable for the current timerange.\n\n' +
              'Used with the bin() function - `bin(TimeGenerated, $__interval)` \n\n' +
              '[Grafana docs](http://docs.grafana.org/reference/templating/#the-interval-variable)',
          },
        },
      ];
    }

    return [];
  }

  onDidChangeCursorSelection(event) {
    if (event.source !== 'modelChange' || event.reason !== monaco.editor.CursorChangeReason.RecoverFromMarkers) {
      return;
    }
    const lastChar = this.getCharAt(event.selection.positionLineNumber, event.selection.positionColumn - 1);

    if (lastChar !== ' ') {
      return;
    }

    this.triggerSuggestions();
  }

  triggerSuggestions() {
    const suggestController = this.codeEditor.getContribution('editor.contrib.suggestController');
    if (!suggestController) {
      return;
    }

    const convertedController = this.toSuggestionController(suggestController);

    convertedController._model.cancel();
    setTimeout(function() {
      convertedController._model.trigger(true);
    }, 10);
  }

  getCharAt(lineNumber: number, column: number) {
    const model = this.codeEditor.getModel();
    if (model.getLineCount() === 0 || model.getLineCount() < lineNumber) {
      return '';
    }
    const line = model.getLineContent(lineNumber);
    if (line.length < column || column < 1) {
      return '';
    }
    return line[column - 1];
  }
}
