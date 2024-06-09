import { action } from '@ember/object';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class FlashCustomComponent extends Component {
  @service notifications;

  @action
  addNotification() {
    this.notifications.custom('Error in DNA sequence:', {
      duration: 10_000,
      title: 'Custom notification message',
      error:
        'MDSKGSSQKGSRLLLLLVVSNLLLCQGVVSTPVCPNGPGNCQVSLRDLFDRAVMVSHYIHDLSS\nEMFNEFDKRYAQGKGFITMALNSCHTSSLPTPEDKEQAQQTHHEVLMSLILGLLRSWNDPLYHL\nVTEVRGMKGAPDAILSRAIEIEEENKRLLEGMEMIFGQVIPGAKETEPYPVWSGLPSLQTKDED\nARYSAFYNLLHCLRRDSSKIDTYLKLLNCRIIYNNNC*',
    });
  }
}
