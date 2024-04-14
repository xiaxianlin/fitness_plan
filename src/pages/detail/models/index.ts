import { useParams } from 'react-router-dom';
import { createContainer } from 'unstated-next';
import { getPlan } from '@services/plan';
import { useLiveQuery } from 'dexie-react-hooks';
import html2canvas from 'html2canvas';
import { useRef } from 'react';

const useContainer = () => {
  const { uid = '' } = useParams();

  const plan = useLiveQuery(() => getPlan(uid));
  const domRef = useRef<HTMLDivElement>(null);

  const download = () => {
    if (!domRef.current) return;
    // 先滚动到顶部，否则生成图片存在空白
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0; // 兼容safari老版本
    html2canvas(domRef.current).then((canvas: any) => {
      let img = document.createElement('a');
      img.href = canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
      img.download = '训练计划.jpg';
      img.click();
    });
  };

  return { uid, plan, domRef, download };
};

export const DetailModel = createContainer(useContainer);
export const useDetailModel = DetailModel.useContainer;
