'use client';

import { useEffect, useMemo, useState } from 'react';

type Props = {
  value: string;
};

export function Counter({ value }: Props) {
  const { target, suffix } = useMemo(() => {
    if (value === '24/7') {
      return { target: 24, suffix: '/7' };
    }
    const numeric = Number(value.replace(/[^0-9]/g, ''));
    return { target: numeric, suffix: '+' };
  }, [value]);

  const [count, setCount] = useState(0);

  useEffect(() => {
    const totalFrames = 45;
    let frame = 0;
    const step = Math.max(1, Math.ceil(target / totalFrames));
    const timer = window.setInterval(() => {
      frame += 1;
      setCount((prev) => {
        const next = prev + step;
        return next >= target || frame >= totalFrames ? target : next;
      });
      if (frame >= totalFrames) {
        window.clearInterval(timer);
      }
    }, 24);

    return () => window.clearInterval(timer);
  }, [target]);

  return <>{count}{suffix}</>;
}
