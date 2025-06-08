import { ROUTES, LABELS, footerNavList } from '@/data/routes';

describe('ROUTES object', () => {
  test('should contain expected paths', () => {
    expect(ROUTES.main).toBe('/');
    expect(ROUTES.products).toBe('/products');
    expect(ROUTES.about).toBe('/about');
    expect(ROUTES.notFound).toBe('*');
  });

  test('should have login and register routes', () => {
    expect(ROUTES.login).toBe('/login');
    expect(ROUTES.register).toBe('/register');
  });

  test('should have cart and profile routes', () => {
    expect(ROUTES.cart).toBe('/cart');
    expect(ROUTES.profile).toBe('/profile');
  });
});

describe('LABELS object', () => {
  test('should contain expected labels', () => {
    expect(LABELS.home).toBe('Home');
    expect(LABELS.about).toBe('About');
    expect(LABELS.products).toBe('Products');
    expect(LABELS.logout).toBe('Log Out');
  });

  test('should have contact label in uppercase', () => {
    expect(LABELS.contact).toBe('CONTACT');
  });
});

describe('footerNavList array', () => {
  test('should contain expected navigation items', () => {
    expect(footerNavList).toContainEqual({ route: ROUTES.main, label: LABELS.home });
    expect(footerNavList).toContainEqual({ route: ROUTES.about, label: LABELS.about });
    expect(footerNavList).toContainEqual({ route: ROUTES.menu, label: LABELS.menu });
    expect(footerNavList).toContainEqual({ route: ROUTES.products, label: LABELS.products });
    expect(footerNavList).toContainEqual({ route: ROUTES.locations, label: LABELS.locations });
  });

  test('footerNavList should have the correct length', () => {
    expect(footerNavList.length).toBe(5);
  });
});
