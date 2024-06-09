import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service notifications;
  @tracked currentComponent = null;

  codeTabs = [
    { key: 'hbs', title: 'Template' },
    { key: 'js', title: 'Code' },
    { key: 'css', title: 'Styles' },
  ];

  onChange(tab) {
    this.selected = tab;
  }

  @action
  showMinimalExample() {
    if (this.currentComponent !== 'flash-minimal') {
      this.notifications.clear();
    }

    this.currentComponent = 'flash-minimal';
    this.notifications.error('Something is going wrong!');
  }

  @action
  showTypeExample(type) {
    if (this.currentComponent !== 'flash-types') {
      this.notifications.clear();
    }

    this.currentComponent = 'flash-types';
    if (type === 'error') {
      this.notifications.error('Something is going wrong!');
    }

    if (type === 'warning') {
      this.notifications.warning('Doubtful but OK');
    }

    if (type === 'success') {
      this.notifications.success('Working as expected');
    }

    if (type === 'info') {
      this.notifications.info(htmlSafe('Some useful info splitted<br>to multiple lines'));
    }
  }

  @action
  showDurationExample(type) {
    if (this.currentComponent !== 'flash-duration') {
      this.notifications.clear();
    }

    this.currentComponent = 'flash-duration';

    if (type === 'error') {
      this.notifications.error('This notification will be visible until you close it', { duration: 0 });
    }

    if (type === 'warning') {
      this.notifications.warning('Disappeared in 10 seconds', { duration: 10_000 });
    }
  }

  @action
  showCloseExample() {
    if (this.currentComponent !== 'flash-close') {
      this.notifications.clear();
    }

    this.currentComponent = 'flash-close';
    this.notifications.info(htmlSafe('Some useful info splitted<br>to multiple lines'), { duration: 20_000 });
  }

  @action
  showOnCloseExample() {
    if (this.currentComponent !== 'flash-on-close') {
      this.notifications.clear();
    }

    this.currentComponent = 'flash-on-close';
    this.notifications.info('Just would to print some info on multiple lines');
  }

  @action
  showCustomExample() {
    if (this.currentComponent !== 'flash-custom') {
      this.notifications.clear();
    }

    this.currentComponent = 'flash-custom';
    this.notifications.custom('Error in DNA sequence:', {
      duration: 10_000,
      title: 'Custom notification message',
      error:
        'MDSKGSSQKGSRLLLLLVVSNLLLCQGVVSTPVCPNGPGNCQVSLRDLFDRAVMVSHYIHDLSS\nEMFNEFDKRYAQGKGFITMALNSCHTSSLPTPEDKEQAQQTHHEVLMSLILGLLRSWNDPLYHL\nVTEVRGMKGAPDAILSRAIEIEEENKRLLEGMEMIFGQVIPGAKETEPYPVWSGLPSLQTKDED\nARYSAFYNLLHCLRRDSSKIDTYLKLLNCRIIYNNNC*',
    });
  }
}
