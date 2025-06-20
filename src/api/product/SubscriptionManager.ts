import type { Subscriber } from '@/data/interfaces';

class SubscriptionManager {
  private subscribers: Set<Subscriber> = new Set();

  subscribe(callback: Subscriber) {
    this.subscribers.add(callback);
  }

  unsubscribe(callback: Subscriber) {
    this.subscribers.delete(callback);
  }

  notify() {
    this.subscribers.forEach((callback) => callback());
  }
}

export const subscriptionManager = new SubscriptionManager();
