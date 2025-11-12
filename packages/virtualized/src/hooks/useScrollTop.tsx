import { useEffect, useEffectEvent, useRef, useState } from "react";

export const useScrollTop = (ref: React.RefObject<HTMLElement | null>) => {
  const [scrollTop, setScrollTop] = useState(0);
  const rafId = useRef<number | null>(null);

  /**
     * RequestAnimationFrame을 쓰는 이유
     * requestAnimationFrame은 브라우저가 **리페인트**하기 직전에 실행된다.
     * 브라우저는 보통 60fps로 화면을 업데이트합니다 (약 16.67ms마다 한 번).
     * 한 프레임의 실행 순서:
     * JavaScript 실행 → 스타일 계산 → 레이아웃(리플로우) → 페인트 → 컴포지팅 → 화면 표시
  
    const handleScroll = useEffectEvent(() => {
      setScrollTop(ref.current!.scrollTop);
    });
    시엔 state를 업데이트함 -> 리렌더링이 됨 -> 리플로우/리페인트 발생 -> 브라우저가 이미 이번 프레임을 처리중일수도 있음
    스크롤 이벤트하 "한" 프레임에 여러번 발생하면
    scroll event 1 → state 업데이트 → 리렌더링
    scroll event 2 → state 업데이트 → 리렌더링  
    scroll event 3 → state 업데이트 → 리렌더링
    
    한 프레임에 3번 리플로우/리페인트
  
    스크롤 이벤트가 한 프레임에 여러 번 발생해도:
    scroll event 1 → rAF 예약
    scroll event 2 → 이미 예약됨, 스킵
    scroll event 3 → 이미 예약됨, 스킵
    → 다음 프레임 시작 직전 → 1번만 state 업데이트 → 1번만 리플로우/리페인트
  
     * */
  const handleScroll = useEffectEvent(() => {
    if (rafId.current !== null) return;
    rafId.current = requestAnimationFrame(() => {
      setScrollTop(ref.current!.scrollTop);
      rafId.current = null;
    });
  });

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const controller = new AbortController();
    container.addEventListener("scroll", handleScroll, {
      signal: controller.signal,
    });
    return () => {
      controller.abort();
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [ref]);

  return scrollTop;
};
