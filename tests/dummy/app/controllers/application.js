import Prism from 'prismjs';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service notifications;
  @tracked currentComponent = null;

  minTabs = [
    { key: 'hbs', title: 'Template' },
    { key: 'js', title: 'JS' },
    { key: 'css', title: 'CSS' },
  ];

  onChange(tab) {
    this.selected = tab;
  }

  @action
  showMinimalExample() {
    this.currentComponent = 'flash-minimal';
    this.notifications.error('Something is going wrong!');
  }

  @action
  showTypeExample(type) {
    this.currentComponent = 'flash-types';
  }

  @action
  addNotification(type) {
    if (type === 'error') {
      this.notifications.error('Something is going wrong!', { duration: 10000 });
    }

    if (type === 'warning') {
      this.notifications.warning('Doubtful but OK', { duration: 0 });
    }

    if (type === 'success') {
      this.notifications.success('Working as expected');
    }

    if (type === 'info') {
      this.notifications.info('Just would to print some info on multiple lines');
    }

    if (type === 'custom') {
      this.notifications.custom(htmlSafe('DNA sequence <b>mutation</b> error'), {
        duration: 100000,
        title: 'Your DNA Sequence was broken',
        error:
          'MDSKGSSQKGSRLLLLLVVSNLLLCQGVVSTPVCPNGPGNCQVSLRDLFDRAVMVSHYIHDLSS\nEMFNEFDKRYAQGKGFITMALNSCHTSSLPTPEDKEQAQQTHHEVLMSLILGLLRSWNDPLYHL\nVTEVRGMKGAPDAILSRAIEIEEENKRLLEGMEMIFGQVIPGAKETEPYPVWSGLPSLQTKDED\nARYSAFYNLLHCLRRDSSKIDTYLKLLNCRIIYNNNC*',
      });
    }
  }

  @action
  clearNotifications() {
    this.notifications.clear();
  }
}
