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

  flashMiniTemplate = `<FlashNotifications as |notification|>
  <FlashNotification @notification={{notification}}>
    <div class="error">{{notification.message}}</div>
  </FlashNotification>
</FlashNotifications>`;

  flashMiniCode = `import { action } from '@ember/object';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class FlashComponent extends Component {
  @service notifications;

  @action
  addNotification() {
    this.notifications.error('Something is going wrong!');
  }
}`;

  flashMiniStyle = `[popover] {
  @apply my-0 mr-0;
}

.flash {
  @apply w-80 border transition-opacity block opacity-0;
}

.flash:popover-open {
  @apply opacity-100;
}

.flash .error {
  @apply bg-rose-500 text-white p-2 rounded-sm;
}

@starting-style {
  .flash:popover-open {
    @apply opacity-0;
  }
}`;

  flashTypesTemplate = `<FlashNotifications as |notification|>
  <FlashNotification @notification={{notification}}>
    <div class={{notification.type}}>{{notification.message}}</div>
  </FlashNotification>
</FlashNotifications>`;

  flashTypesCode = `import { action } from '@ember/object';
import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import { inject as service } from '@ember/service';

export default class FlashComponent extends Component {
  @service notifications;

  @action
  errorNotification() {
    this.notifications.error('Something is going wrong!');
  }

  @action
  warningNotification() {
    this.notifications.warning('Doubtful but OK');
  }

  @action
  successNotification() {
    this.notifications.success('Working as expected');
  }

  @action
  infoNotification() {
    this.notifications.info(htmlSafe('Some useful info splitted<br>to multiple lines'));
  }
}
`;

  flashTypesStyle = `[popover] {
  @apply my-0 mr-0;
}

.flash {
  @apply w-80 border transition-opacity block opacity-0;
}

.flash:popover-open {
  @apply opacity-100;
}

.flash div {
  @apply text-white p-2 rounded-sm;
}

.flash div.error {
  @apply bg-rose-500;
}

.flash div.warning {
  @apply bg-orange-500;
}

.flash div.success {
  @apply bg-lime-500;
}

.flash div.info {
  @apply bg-sky-500;
}

@starting-style {
  .flash:popover-open {
    @apply opacity-0;
  }
}`;

  durationInitializer = `export function initialize(owner) {
  let notifications = owner.lookup('service:notifications');
  notifications.setOptions({
    duration: 3_000,
  });
}

export default {
  initialize,
};`;

  flashDurationCode = `import { action } from '@ember/object';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class FlashComponent extends Component {
  @service notifications;

  @action
  errorNotification() {
    this.notifications.error('This notification will be visible until you close it', { duration: 0 });
  }

  @action
  warningNotification() {
    this.notifications.warning('Disappeared in 10 seconds', { duration: 10_000 });
  }
}`;

  flashCloseTemplate = `<FlashNotifications as |notification|>
  <FlashNotification @notification={{notification}}>
    <div class="relative info">
      {{notification.message}}
      <div class="absolute top-1 right-1 flex-shrink-0 flex">
        <div role="button" name="close" class="flash-close">
          <span class="sr-only">Close</span>
          <Icons::FasTimes role="presentation" class="h-4 w-4" />
        </div>
      </div>
    </div>
  </FlashNotification>
</FlashNotifications>`;

  flashClearCode = `import { action } from '@ember/object';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class FlashComponent extends Component {
  @service notifications;

  @action
  clearNotifications() {
    this.notifications.clear();
  }
}`;

  flashOnCloseTemplate = `<FlashNotifications as |notification|>
  <FlashNotification @notification={{notification}} @onClose={{this.onClose}}>
    <div class="relative info">
      {{notification.message}}
      <div class="absolute top-1 right-1 flex-shrink-0 flex">
        <div role="button" name="close" class="flash-close">
          <span class="sr-only">Close</span>
          <Icons::FasTimes role="presentation" class="h-4 w-4" />
        </div>
      </div>
    </div>
  </FlashNotification>
</FlashNotifications>`;

  flashOnCloseCode = `import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class FlashCloseComponent extends Component {
  @service notifications;

  onClose(notification) {
    window.alert('Notification  was closed');
  }
}`;

  customInitializerCode = `export function initialize(owner) {
  let notifications = owner.lookup('service:notifications');

  notifications.registerShorthand('custom');
}

export default {
  initialize,
};`;

  flashCustomTemplate = `<FlashNotifications as |notification|>
  <FlashNotification class={{notification.type}} @notification={{notification}}>
    <div class="p-1 bg-transparent">
      <div class="flash-content">
        {{#if notification.isCustom}}
          <div class="text-sm font-bold text-slate-500 mr-4">{{notification.options.title}}</div>
        {{/if}}
        <div class="flex gap-4">
          <div class="flash-type">
            <img class="w-16 h-16" src="biohazard.svg" alt="Notification type icon" />
          </div>
          <div>
            <div class="flex flex-col grow">
              <span class="text-xs">{{notification.message}}</span>
              <code class="text-xs text-slate-400">{{notification.options.error}}</code>
            </div>
          </div>
        </div>

        <div class="absolute top-1 right-1 flex-shrink-0 flex">
          <div role="button" name="close" class="flash-close text-gray-400">
            <span class="sr-only">Close</span>
            <Icons::FasTimes role="presentation" class="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  </FlashNotification>
</FlashNotifications>`;

  flashCustomCode = `import { action } from '@ember/object';
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
}`;

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
