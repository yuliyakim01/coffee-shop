import { isErrorFree } from '@/utils/formUtils';
import type { FormRefItem } from '@/data/interfaces';

describe('isErrorFree', () => {
  const createMockRef = (error: string): FormRefItem => ({
    current: {
      getValue: () => '',
      getError: () => error,
      setValueExternally: () => {},
      triggerValidation: () => {},
      initialValue: null,
      setErrorExternally: () => {},
    },
  });

  it('should return true when all refs have no error', () => {
    const refs: FormRefItem[] = [createMockRef(''), createMockRef(''), createMockRef('')];

    expect(isErrorFree(...refs)).toBe(true);
  });

  it('should return false if at least one ref has an error', () => {
    const refs: FormRefItem[] = [createMockRef(''), createMockRef('This field is required')];

    expect(isErrorFree(...refs)).toBe(false);
  });

  it('should return true for empty list of refs', () => {
    expect(isErrorFree()).toBe(true);
  });
});
