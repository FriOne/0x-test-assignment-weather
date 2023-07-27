import { FC, ReactElement } from 'react';

import { ReactComponent as CloudyIcon } from '../../icons/cloudy.svg';
import { ReactComponent as HeavyRainIcon } from '../../icons/heavy-rain.svg';
import { ReactComponent as LightRainIcon } from '../../icons/light-rain.svg';
import { ReactComponent as RainIcon } from '../../icons/rain.svg';
import { ReactComponent as SunIcon } from '../../icons/sun.svg';
import { ReactComponent as ThunderIcon } from '../../icons/thunder.svg';

import { Condition } from '../../types';

import classes from './ConditionUrlIcon.module.css';

const existedIcons: Record<string, ReactElement> = {
  '1000': <SunIcon className={classes.icon} />,
  '1006': <CloudyIcon className={classes.icon} />,
  '1195': <HeavyRainIcon className={classes.icon} />,
  '1183': <LightRainIcon className={classes.icon} />,
  '1063': <LightRainIcon className={classes.icon} />,
  '1243': <RainIcon className={classes.icon} />,
  '1087': <ThunderIcon className={classes.icon} />,
};

type Props = {
  condition: Condition;
};

export const ConditionUrlIcon: FC<Props> = ({ condition }) => {
  const icon = existedIcons[condition.code];

  return icon ?? (
    <img
      className={classes.imageIcon}
      src={condition.icon}
      alt="Weather icon"
    />
  );
}
