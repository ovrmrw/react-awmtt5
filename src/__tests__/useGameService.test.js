import { renderHook, act } from "@testing-library/react-hooks";
import { useGameService } from "../Game";

describe("useGameService", () => {
  test("初期値", () => {
    const { result, rerender } = renderHook(() => useGameService());

    const s1 = [null, null, null, null, null, null, null, null, null];

    expect(result.current.state).toEqual({
      history: [{ squares: s1 }],
      status: "Aのターン",
      result: null
    });
  });

  test("addHistory()", () => {
    const { result, rerender } = renderHook(() => useGameService());

    const s1 = [null, null, null, null, null, null, null, null, null];
    const s2 = ["A", null, null, null, null, null, null, null, null];

    act(() => result.current.addHistory(0));
    expect(result.current.state).toEqual({
      history: [{ squares: s1 }, { squares: s2 }],
      status: "Bのターン",
      result: null
    });
  });

  test("getCurrentSquares()", () => {
    const { result, rerender } = renderHook(() => useGameService());

    const s2 = ["A", null, null, null, null, null, null, null, null];
    const s6 = ["A", "B", null, "A", "B", null, "A", null, null];

    act(() => result.current.addHistory(0));
    expect(result.current.getCurrentSquares()).toEqual(s2);

    act(() => result.current.addHistory(1));
    act(() => result.current.addHistory(3));
    act(() => result.current.addHistory(4));
    expect(result.current.state.result).toBe(null);

    act(() => result.current.addHistory(6));
    expect(result.current.state.result).toEqual({
      winner: "A",
      squares: s6
    });

    act(() => result.current.addHistory(7));
    expect(result.current.getCurrentSquares()).toEqual(s6);
  });

  test("initState()", () => {
    const { result, rerender } = renderHook(() => useGameService());

    const s1 = [null, null, null, null, null, null, null, null, null];
    const s2 = ["A", null, null, null, null, null, null, null, null];

    act(() => result.current.addHistory(0));
    expect(result.current.getCurrentSquares()).toEqual(s2);

    act(() => result.current.initState());
    expect(result.current.state).toEqual({
      history: [{ squares: s1 }],
      status: "Aのターン",
      result: null
    });
  });

  test("setGame()", () => {
    const { result, rerender } = renderHook(() => useGameService());

    const s1 = [null, null, null, null, null, null, null, null, null];
    const s2 = ["A", null, null, null, null, null, null, null, null];
    const s3 = ["A", "B", null, null, null, null, null, null, null];

    act(() => result.current.addHistory(0));
    act(() => result.current.addHistory(1));
    act(() => result.current.addHistory(3));
    act(() => result.current.setGame(2));
    expect(result.current.state).toEqual({
      history: [{ squares: s1 }, { squares: s2 }, { squares: s3 }],
      status: "Aのターン",
      result: null
    });

    act(() => result.current.setGame(1));
    expect(result.current.state).toEqual({
      history: [{ squares: s1 }, { squares: s2 }],
      status: "Bのターン",
      result: null
    });

    act(() => result.current.setGame(0));
    expect(result.current.state).toEqual({
      history: [{ squares: s1 }],
      status: "Aのターン",
      result: null
    });
  });
});
