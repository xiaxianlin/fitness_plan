import './index.less';
import { FC, useEffect, useMemo } from 'react';
import { Button } from 'antd';
import { Movement, MovementType } from '@struct/model';
import { useCountDown } from '@hooks/useCountDown';
import { PauseCircleOutlined, PlayCircleOutlined, PoweroffOutlined } from '@ant-design/icons';

interface MovementTimerProps {
  movement: Movement;
  onNext?: () => void;
}

const MovementTimer: FC<MovementTimerProps> = ({ movement, onNext }) => {
  const resetTimer = useCountDown(movement.reset, { onFinish: onNext });
  const actionTimer = useCountDown(movement.action, { onFinish: resetTimer.start });

  const showPause = (actionTimer.running && !actionTimer.pausing) || (resetTimer.running && !resetTimer.pausing);
  const showContinue = actionTimer.pausing || resetTimer.pausing;
  const showReset = movement.type === MovementType.Counter && resetTimer.waiting;

  const showAction = useMemo(() => {
    if (movement.type === MovementType.Timer) {
      return !actionTimer.over;
    }
    return !resetTimer.running;
  }, [movement, resetTimer.running]);

  const info = useMemo(() => {
    if (showAction) {
      return { remain: actionTimer.remain, className: 'movement-action' };
    }
    if (resetTimer.running) {
      return { remain: resetTimer.remain, className: 'movement-reset' };
    }
    return;
  }, [actionTimer.remain, resetTimer.remain, showAction, resetTimer.running]);

  const pause = () => {
    if (actionTimer.running) {
      actionTimer.pause();
    }
    if (resetTimer.running) {
      resetTimer.pause();
    }
  };

  const keep = () => {
    if (actionTimer.pausing) {
      actionTimer.keep();
    }
    if (resetTimer.pausing) {
      resetTimer.keep();
    }
  };

  const reset = () => {
    resetTimer.start();
  };

  useEffect(() => {
    if (movement.type === MovementType.Timer) {
      actionTimer.start();
    }
  }, []);

  return (
    <div className="movement-timer">
      <h3>{movement?.name}</h3>
      <div className="movement-count">{info && <div className={info.className}>{info.remain}</div>}</div>
      <div className="movement-footer">
        {showPause && (
          <Button size="large" icon={<PauseCircleOutlined />} onClick={pause}>
            暂停
          </Button>
        )}
        {showContinue && (
          <Button size="large" icon={<PlayCircleOutlined />} onClick={keep}>
            继续
          </Button>
        )}
        {showReset && (
          <Button size="large" icon={<PoweroffOutlined />} onClick={reset}>
            休息
          </Button>
        )}
      </div>
    </div>
  );
};

export default MovementTimer;
