import { renderHook, act } from "@testing-library/react-hooks";
import { useBoardService } from "../Board";
import { useGameService } from "../Game";

describe("useBoardService", () => {
  let getProps;

  beforeEach(() => {
    const { result } = renderHook(() => useGameService());
    getProps = () => ({
      result: result.current.state.result,
      getCurrentHistory: result.current.getCurrentHistory,
      addHistory: result.current.addHistory
    });
  });

  test("ラインを揃えると勝利する", () => {
    const { result, rerender } = renderHook(props => useBoardService(props), {
      initialProps: getProps()
    });

    expect(getProps().result).toBe(null);

    act(() => result.current.mark(0));
    rerender(getProps());
    act(() => result.current.mark(1));
    rerender(getProps());
    act(() => result.current.mark(3));
    rerender(getProps());
    act(() => result.current.mark(4));
    rerender(getProps());
    expect(getProps().result).toBe(null);

    act(() => result.current.mark(6));
    rerender(getProps());
    expect(result.current.squares).toEqual([
      "A",
      "B",
      null,
      "A",
      "B",
      null,
      "A",
      null,
      null
    ]);
    expect(getProps().result).toEqual({ winner: "A" });
  });

  test("マーク済みのマスはマークできない", () => {
    const { result, rerender } = renderHook(props => useBoardService(props), {
      initialProps: getProps()
    });

    act(() => result.current.mark(0));
    rerender(getProps());
    expect(result.current.squares).toEqual([
      "A",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ]);

    act(() => result.current.mark(1));
    rerender(getProps());
    expect(result.current.squares).toEqual([
      "A",
      "B",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ]);

    act(() => result.current.mark(1));
    rerender(getProps());
    expect(result.current.squares).toEqual([
      "A",
      "B",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ]);

    act(() => result.current.mark(2));
    rerender(getProps());
    expect(result.current.squares).toEqual([
      "A",
      "B",
      "A",
      null,
      null,
      null,
      null,
      null,
      null
    ]);
  });
});
