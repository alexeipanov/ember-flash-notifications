# ember-flash-notifications

The addon is designed to display flash notifications within Ember.js applications.
Powered by Popover API.

## Compatibility

* Ember.js v4.8 or above
* Ember CLI v4.8 or above
* Node.js v18 or above


## Installation

```
ember install ember-flash-notifications
```


## Usage

Add FlashNotifications invocation to a template:

```
<FlashNotifications as |notification|>
  <FlashNotification @notification={{notification}}>
    <div class={{notification.type}}>{{notification.message}}</div>
  </FlashNotification>
</FlashNotifications>
```

Add minimal required styles for a notification element (TailwindCSS is not a dependency, and you are able to use plain CSS as well):

```

[popover] {
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
}
```

... and make notification invocation:


```
mport { action } from '@ember/object';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class FlashComponent extends Component {
  @service notifications;

  @action
  addNotification() {
    this.notifications.error('Something is going wrong!');
  }
}
```

See detailed examples, API documetation and live examples [here](https://ember-flash-notifications.vercel.app)


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
