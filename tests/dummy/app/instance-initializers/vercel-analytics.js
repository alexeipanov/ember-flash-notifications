import { inject } from '@vercel/analytics';

export function initialize() {
  inject();
}

export default {
  initialize,
};
