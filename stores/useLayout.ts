import { range } from "lodash-es";

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

type DivAction = "fade" | "transform" | "shuffle" | "none";

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

  function setPrimary(value: string) {
    layoutConfig.primary = value;
  }

  function setSurface(value: string) {
    layoutConfig.surface = value;
  }

  function setPreset(value: string) {
    layoutConfig.preset = value;
  }

  function setActiveMenuItem(item: any) {
    layoutState.activeMenuItem = item.value || item;
  }

  function setMenuMode(mode: string) {
    layoutConfig.menuMode = mode;
  }

  function toggleDarkMode() {
    executeDarkModeToggle();
  }

  function executeDarkModeToggle() {
    layoutConfig.darkTheme = !layoutConfig.darkTheme;
    typeof document !== "undefined" &&
      document.documentElement.classList.toggle("app-dark");
  }

  function onMenuToggle() {
    if (layoutConfig.menuMode === "overlay") {
      layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
    }

    if (typeof window !== "undefined" && window.innerWidth > 991) {
      layoutState.staticMenuDesktopInactive =
        !layoutState.staticMenuDesktopInactive;
    } else {
      layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
    }
  }

  function resetMenu() {
    layoutState.overlayMenuActive = false;
    layoutState.staticMenuMobileActive = false;
    layoutState.menuHoverActive = false;
  }

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

  function initAnimate(timeline: gsap.core.Timeline) {
    animateDivArea(timeline, ".div_area", "fade");
  }

  function animateDivArea(
    timeline: gsap.core.Timeline,
    target: string,
    action: DivAction
  ): gsap.core.Timeline {
    const animateDiv = document.querySelectorAll(".animate_div");
    const targetDiv = document.querySelectorAll(target);

    if (targetDiv.length > 0) {
      if (action === "fade" && animateDiv.length > 0) {
        timeline.fromTo(
          targetDiv,
          { opacity: 0 },
          {
            ease: "power3.inOut",
            duration: 0.6,
            scale: 1,
            stagger: 0.3,
            opacity: 1,
          }
        );
      } else if (action === "transform" && animateDiv.length > 0) {
        timeline.fromTo(
          targetDiv,
          { scale: 0.5, opacity: 0 },
          {
            ease: "power3.inOut",
            duration: 0.4,
            scale: 1,
            stagger: 0.2,
            opacity: 1,
          }
        );
      } else if (action === "shuffle") {
        range(0, targetDiv.length).forEach((index: number) => {
          if (index % 4 === 0) {
            timeline.fromTo(
              targetDiv[index],
              { x: -400, opacity: 0 },
              { x: 0, ease: "power3.inOut", duration: 0.4, opacity: 1 }
            );
          } else if (index % 4 === 1) {
            timeline.fromTo(
              targetDiv[index],
              { y: -400, opacity: 0 },
              { y: 0, ease: "power3.inOut", duration: 0.4, opacity: 1 }
            );
          } else if (index % 4 === 2) {
            timeline.fromTo(
              targetDiv[index],
              { x: 400, opacity: 0 },
              { x: 0, ease: "power3.inOut", duration: 0.4, opacity: 1 }
            );
          } else if (index % 4 === 3) {
            timeline.fromTo(
              targetDiv[index],
              { y: 400, opacity: 0 },
              { y: 0, ease: "power3.inOut", duration: 0.4, opacity: 1 }
            );
          }
        });
      }
      // timeline.progress(0).kill();
    }
    return timeline;
  }

  return {
    layoutConfig: readonly(layoutConfig),
    layoutState: readonly(layoutState),
    onMenuToggle,
    isSidebarActive,
    isDarkTheme,
    getPrimary,
    getSurface,
    initAnimate,
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
