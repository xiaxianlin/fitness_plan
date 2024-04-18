import { useExecModel } from '@pages/exec/models';
import MovementTimer from '@pages/exec/components/MovementTimer';

const RunView = () => {
  const { movement, next } = useExecModel();
  if (!movement) return null;
  return <MovementTimer key={movement.name} movement={movement} onNext={next} />;
};

export default RunView;
