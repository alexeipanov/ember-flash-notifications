import Prism from 'prismjs';
import Component from '@glimmer/component';

export default class CodePreviewComponent extends Component {
  get highlight() {
    return Prism.highlight(this.args.code, Prism.languages.javascript, 'javascript');
  }
}
