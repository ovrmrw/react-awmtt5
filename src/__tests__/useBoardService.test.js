import { renderHook, act } from "@testing-library/react-hooks";
import { useBoardService } from "../Board";
import { useGameService } from "../Game";

describe("useBoardService", () => {
  let getProps;

  beforeEach(() => {
    const { result } = renderHook(() => useGameService());
    getProps = () => ({
      getCurrentSquares: result.current.getCurrentSquares,
      addHistory: result.current.addHistory
    });
  });

  test("初期値", () => {
    const { result, rerender } = renderHook(props => useBoardService(props), {
      initialProps: getProps()
    });

    const expected = [1, null, null, null, null, null, null, null, null];

    expect(result.current.squares).toEqual(expected);
  });

  test("ラインを揃えたプレイヤーは勝利して、相手プレイヤーはそれ以上マスをマークできない", () => {
    const { result, rerender } = renderHook(props => useBoardService(props), {
      initialProps: getProps()
    });

    const expected = ["A", "B", null, "A", "B", null, "A", null, null];

    act(() => result.current.mark(0));
    rerender(getProps());
    act(() => result.current.mark(1));
    rerender(getProps());
    act(() => result.current.mark(3));
    rerender(getProps());
    act(() => result.current.mark(4));
    rerender(getProps());
    act(() => result.current.mark(6));
    rerender(getProps());
    expect(result.current.squares).toEqual(expected);

    act(() => result.current.mark(7));
    rerender(getProps());
    expect(result.current.squares).toEqual(expected);
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
  });
});
