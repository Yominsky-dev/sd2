import { Logo as LobeLogo } from '@lobehub/ui';
import isEqual from 'fast-deep-equal';
import { type CSSProperties, memo } from 'react';
import { shallow } from 'zustand/shallow';

import { useAppStore } from '@/store';

import CustomLogo from './CustomLogo';
import KitchenLogo from './KitchenLogo';

export interface LogoProps {
  size?: number;
  style?: CSSProperties;
}

const Logo = memo<LogoProps>(({ size = 32, style }) => {
  const setting = useAppStore((st) => st.setting, isEqual);
  const themeMode = useAppStore((st) => st.themeMode, shallow);

  if (setting.logoType === 'kitchen') {
    return <KitchenLogo size={size * 0.75} style={style} themeMode={themeMode} />;
  }

  if (setting.logoType === 'custom') {
    return (
      <CustomLogo
        logoCustomTitle={setting.logoCustomTitle}
        logoCustomUrl={setting.logoCustomUrl}
        size={size}
        style={style}
      />
    );
  }

  return <LobeLogo extra="SD" size={size} style={style} type="combine" />;
});

export default Logo;
