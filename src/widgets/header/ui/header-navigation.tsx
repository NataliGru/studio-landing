import { DesktopNavigation } from './desktop-navigation';
import { MobileNavigation } from './mobile-navigation';
import { NavigationContainer } from './navigation-container';

export const HeaderNavigation = () => {
  return (
    <NavigationContainer>
      <MobileNavigation />

      <DesktopNavigation />
    </NavigationContainer>
  );
};
