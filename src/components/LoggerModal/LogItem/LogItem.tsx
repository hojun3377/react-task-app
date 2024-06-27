import { FC } from 'react';
import { ILogItem } from '../../../types';

type TLogItemProps = {
  logItem: ILogItem;
};

const LogItem: FC<TLogItemProps> = () => {
  return <div>LoggerItem</div>;
};

export default LogItem;
