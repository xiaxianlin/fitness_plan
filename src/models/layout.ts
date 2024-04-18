import { useState } from 'react';
import { createContainer } from 'unstated-next';

const useContainer = () => {
  const [title, setTitle] = useState('FITNESS');

  return { title, setTitle };
};

export const LayoutModel = createContainer(useContainer);
export const useLayoutModel = LayoutModel.useContainer;
