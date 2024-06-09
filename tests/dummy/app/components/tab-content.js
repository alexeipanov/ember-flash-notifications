import Component from '@glimmer/component';

export default class TabContentComponent extends Component {
  get isActive() {
    return this.args.activeTab?.key === this.args.key;
  }
}
