import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class TabsContainer extends Component {
  @tracked activeTab = this.args.tabs[0];

  @action
  toggleTab(tab) {
    this.activeTab = tab;
  }
}
