import { act, renderHook } from '@testing-library/react';
import { useIncrementalList } from './useIncrementalList';

type ObserverCallback = (entries: Pick<IntersectionObserverEntry, 'isIntersecting'>[]) => void;

let triggerIntersection: ObserverCallback = () => {};

class MockIntersectionObserver {
  constructor(callback: ObserverCallback) {
    triggerIntersection = callback;
  }
  observe() {}
  disconnect() {}
}

const ITEMS = Array.from({ length: 25 }, (_, index) => index);

function renderWithSentinel() {
  const hook = renderHook(() => useIncrementalList(ITEMS, 10));
  act(() => hook.result.current.sentinelRef(document.createElement('div')));
  return hook;
}

describe('useIncrementalList', () => {
  beforeEach(() => vi.stubGlobal('IntersectionObserver', MockIntersectionObserver));
  afterEach(() => vi.unstubAllGlobals());

  it('renders the first page and appends a page each time the sentinel comes into view', () => {
    const { result } = renderWithSentinel();
    expect(result.current.visibleItems).toHaveLength(10);

    act(() => triggerIntersection([{ isIntersecting: true }]));
    expect(result.current.visibleItems).toHaveLength(20);

    act(() => triggerIntersection([{ isIntersecting: true }]));
    expect(result.current.visibleItems).toHaveLength(25);
    expect(result.current.hasMore).toBe(false);
  });

  it('does not load more while the sentinel is out of view', () => {
    const { result } = renderWithSentinel();

    act(() => triggerIntersection([{ isIntersecting: false }]));
    expect(result.current.visibleItems).toHaveLength(10);
    expect(result.current.hasMore).toBe(true);
  });
});
