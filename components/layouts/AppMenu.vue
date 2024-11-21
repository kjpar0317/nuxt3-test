<script setup lang="ts">
import AppMenuItem from "./AppMenuItem.vue";

type MenuModel = {
  label: string;
  icon?: string;
  to?: string;
  url?: string;
  class?: string;
  target?: string;
  separator?: string;
  items?: MenuModel[];
};

const model = ref<MenuModel[]>([
  {
    label: "Home",
    items: [{ label: "Home", icon: "pi pi-fw pi-home", to: "/" }],
  },
  {
    label: "UI Components",
    items: [
      {
        label: "Dashboard",
        icon: "pi pi-fw pi-id-card",
        to: "/dashboard",
      },
      { label: "Gsap Test", icon: "pi pi-fw pi-check-square", to: "/gsap" },
      {
        label: "Design Test",
        icon: "pi pi-fw pi-mobile",
        to: "/design",
        class: "rotated-icon",
      },
      { label: "Table", icon: "pi pi-fw pi-table", to: "/others" },
      { label: "List", icon: "pi pi-fw pi-list", to: "/others" },
      { label: "Tree", icon: "pi pi-fw pi-share-alt", to: "/others" },
    ],
  },
  {
    label: "Pages",
    icon: "pi pi-fw pi-briefcase",
    to: "/others",
    items: [
      {
        label: "Landing",
        icon: "pi pi-fw pi-globe",
        to: "/others",
      },
      {
        label: "Auth",
        icon: "pi pi-fw pi-user",
        items: [
          {
            label: "Login",
            icon: "pi pi-fw pi-sign-in",
            to: "/others",
          },
          {
            label: "Error",
            icon: "pi pi-fw pi-times-circle",
            to: "/others",
          },
          {
            label: "Access Denied",
            icon: "pi pi-fw pi-lock",
            to: "/others",
          },
        ],
      },
      {
        label: "Crud",
        icon: "pi pi-fw pi-pencil",
        to: "/others",
      },
    ],
  },
  {
    label: "Hierarchy",
    items: [
      {
        label: "Submenu 1",
        icon: "pi pi-fw pi-bookmark",
        items: [
          {
            label: "Submenu 1.1",
            icon: "pi pi-fw pi-bookmark",
            items: [
              { label: "Submenu 1.1.1", icon: "pi pi-fw pi-bookmark" },
              { label: "Submenu 1.1.2", icon: "pi pi-fw pi-bookmark" },
              { label: "Submenu 1.1.3", icon: "pi pi-fw pi-bookmark" },
            ],
          },
          {
            label: "Submenu 1.2",
            icon: "pi pi-fw pi-bookmark",
            items: [{ label: "Submenu 1.2.1", icon: "pi pi-fw pi-bookmark" }],
          },
        ],
      },
      {
        label: "Submenu 2",
        icon: "pi pi-fw pi-bookmark",
        items: [
          {
            label: "Submenu 2.1",
            icon: "pi pi-fw pi-bookmark",
            items: [
              { label: "Submenu 2.1.1", icon: "pi pi-fw pi-bookmark" },
              { label: "Submenu 2.1.2", icon: "pi pi-fw pi-bookmark" },
            ],
          },
          {
            label: "Submenu 2.2",
            icon: "pi pi-fw pi-bookmark",
            items: [{ label: "Submenu 2.2.1", icon: "pi pi-fw pi-bookmark" }],
          },
        ],
      },
    ],
  },
  {
    label: "Get Started",
    items: [
      {
        label: "About",
        icon: "pi pi-fw pi-book",
        to: "/about",
      },
      {
        label: "View Source",
        icon: "pi pi-fw pi-github",
        url: "https://github.com/primefaces/sakai-vue",
        target: "_blank",
      },
    ],
  },
]);
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item
        v-if="!item.separator"
        :item="item"
        :index="i"
      ></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>
