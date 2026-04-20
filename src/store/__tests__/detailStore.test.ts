import { describe, it, expect } from 'vitest';
import { useDetailStore } from '@/store/detailStore';

describe('detailStore', () => {
  beforeEach(() => {
    useDetailStore.setState({ pageTitle: '' });
  });

  it('starts with empty pageTitle', () => {
    expect(useDetailStore.getState().pageTitle).toBe('');
  });

  it('setPageTitle updates title', () => {
    useDetailStore.getState().setPageTitle('Samsung Galaxy S24');
    expect(useDetailStore.getState().pageTitle).toBe('Samsung Galaxy S24');
  });

  it('setPageTitle can clear the title', () => {
    useDetailStore.getState().setPageTitle('Test');
    useDetailStore.getState().setPageTitle('');
    expect(useDetailStore.getState().pageTitle).toBe('');
  });
});
