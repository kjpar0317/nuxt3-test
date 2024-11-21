export type LayoutConfig = {
  preset: string;
  primary: string;
  surface: string | null;
  darkTheme: boolean;
  menuMode: string;
};

export type LayoutState = {
  staticMenuDesktopInactive: boolean;
  overlayMenuActive: boolean;
  profileSidebarVisible: boolean;
  configSidebarVisible: boolean;
  staticMenuMobileActive: boolean;
  menuHoverActive: boolean;
  activeMenuItem: any;
};

export const useLayout = defineStore("layout", () => {
  const layoutConfig = reactive<LayoutConfig>({
    preset: "Aura",
    primary: "emerald",
    surface: null,
    darkTheme: false,
    menuMode: "static",
  });

  const layoutState = reactive<LayoutState>({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
    activeMenuItem: null,
  });

  const setPrimary = (value: string) => {
    layoutConfig.primary = value;
  };

  const setSurface = (value: string) => {
    layoutConfig.surface = value;
  };

  const setPreset = (value: string) => {
    layoutConfig.preset = value;
  };

  const setActiveMenuItem = (item: any) => {
    layoutState.activeMenuItem = item.value || item;
  };

  const setMenuMode = (mode: string) => {
    layoutConfig.menuMode = mode;
  };

  const toggleDarkMode = () => {
    executeDarkModeToggle();
  };

  const executeDarkModeToggle = () => {
    layoutConfig.darkTheme = !layoutConfig.darkTheme;
    typeof document !== "undefined" &&
      document.documentElement.classList.toggle("app-dark");
  };

  const onMenuToggle = () => {
    if (layoutConfig.menuMode === "overlay") {
      layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
    }

    if (typeof window !== "undefined" && window.innerWidth > 991) {
      layoutState.staticMenuDesktopInactive =
        !layoutState.staticMenuDesktopInactive;
    } else {
      layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
    }
  };

  const resetMenu = () => {
    layoutState.overlayMenuActive = false;
    layoutState.staticMenuMobileActive = false;
    layoutState.menuHoverActive = false;
  };

  const isSidebarActive: ComputedRef<boolean> = computed(
    () => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive
  );

  const isDarkTheme: ComputedRef<boolean> = computed(
    () => layoutConfig.darkTheme
  );

  const getPrimary: ComputedRef<string> = computed(() => layoutConfig.primary);

  const getSurface: ComputedRef<string | null> = computed(
    () => layoutConfig.surface
  );

  return {
    layoutConfig: readonly(layoutConfig),
    layoutState: readonly(layoutState),
    onMenuToggle,
    isSidebarActive,
    isDarkTheme,
    getPrimary,
    getSurface,
    setActiveMenuItem,
    toggleDarkMode,
    setPrimary,
    setSurface,
    setPreset,
    resetMenu,
    setMenuMode,
  };
});

// export function useLayout() {
//   const layoutConfig = reactive<LayoutConfig>({
//     preset: "Aura",
//     primary: "emerald",
//     surface: null,
//     darkTheme: false,
//     menuMode: "static",
//   });

//   const layoutState = reactive<LayoutState>({
//     staticMenuDesktopInactive: false,
//     overlayMenuActive: false,
//     profileSidebarVisible: false,
//     configSidebarVisible: false,
//     staticMenuMobileActive: false,
//     menuHoverActive: false,
//     activeMenuItem: null,
//   });

//   const setPrimary = (value: string) => {
//     layoutConfig.primary = value;
//   };

//   const setSurface = (value: string) => {
//     layoutConfig.surface = value;
//   };

//   const setPreset = (value: string) => {
//     layoutConfig.preset = value;
//   };

//   const setActiveMenuItem = (item: any) => {
//     layoutState.activeMenuItem = item.value || item;
//   };

//   const setMenuMode = (mode: string) => {
//     layoutConfig.menuMode = mode;
//   };

//   const toggleDarkMode = () => {
//     executeDarkModeToggle();
//   };

//   const executeDarkModeToggle = () => {
//     layoutConfig.darkTheme = !layoutConfig.darkTheme;
//     typeof document !== "undefined" &&
//       document.documentElement.classList.toggle("app-dark");
//   };

//   const onMenuToggle = () => {
//     if (layoutConfig.menuMode === "overlay") {
//       layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
//     }

//     if (typeof window !== "undefined" && window.innerWidth > 991) {
//       layoutState.staticMenuDesktopInactive =
//         !layoutState.staticMenuDesktopInactive;
//     } else {
//       layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
//     }
//   };

//   const resetMenu = () => {
//     layoutState.overlayMenuActive = false;
//     layoutState.staticMenuMobileActive = false;
//     layoutState.menuHoverActive = false;
//   };

//   const isSidebarActive = computed(
//     () => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive
//   );

//   const isDarkTheme = computed(() => layoutConfig.darkTheme);

//   const getPrimary = computed(() => layoutConfig.primary);

//   const getSurface = computed(() => layoutConfig.surface);

//   return {
//     layoutConfig: readonly(layoutConfig),
//     layoutState: readonly(layoutState),
//     onMenuToggle,
//     isSidebarActive,
//     isDarkTheme,
//     getPrimary,
//     getSurface,
//     setActiveMenuItem,
//     toggleDarkMode,
//     setPrimary,
//     setSurface,
//     setPreset,
//     resetMenu,
//     setMenuMode,
//   };
// }
