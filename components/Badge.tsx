import classNames from 'classnames';
import { ReactNode } from 'react';

export const Badge = ({
  value,
  highlighted,
  onClickCallBack,
  children,
}: {
  value: string;
  highlighted?: boolean;
  onClickCallBack?: (value: string) => void;
  children?: ReactNode;
}) => {
  return (
    <span
      onClick={() => onClickCallBack && onClickCallBack(value)}
      className={classNames(
        {
          'bg-[#e6e6e6b2]': !highlighted,
          'bg-[#ff9f1c]': highlighted,
          'cursor-pointer': onClickCallBack,
        },
        'my-0.5 mr-2 flex items-center gap-1 rounded-lg px-1.5 py-[1px] text-xs text-black sm:font-medium',
      )}
    >
      {value}
      {children}
    </span>
  );
};
