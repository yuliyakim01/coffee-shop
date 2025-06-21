import { subscriptionManager } from '@/api/product/SubscriptionManager';

describe('SubscriptionManager', () => {
  beforeEach(() => {
    subscriptionManager['subscribers'] = new Set();
  });

  it('adds a subscriber via subscribe()', () => {
    const callback = jest.fn();
    subscriptionManager.subscribe(callback);

    // Simulate notification
    subscriptionManager.notify();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('does not call unsubscribed callback', () => {
    const callback = jest.fn();

    subscriptionManager.subscribe(callback);
    subscriptionManager.unsubscribe(callback);
    subscriptionManager.notify();

    expect(callback).not.toHaveBeenCalled();
  });

  it('can notify multiple subscribers', () => {
    const cb1 = jest.fn();
    const cb2 = jest.fn();

    subscriptionManager.subscribe(cb1);
    subscriptionManager.subscribe(cb2);
    subscriptionManager.notify();

    expect(cb1).toHaveBeenCalled();
    expect(cb2).toHaveBeenCalled();
  });

  it('is resilient to duplicate subscriptions', () => {
    const callback = jest.fn();
    subscriptionManager.subscribe(callback);
    subscriptionManager.subscribe(callback);
    subscriptionManager.notify();

    // Should only call once, since it's a Set
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
