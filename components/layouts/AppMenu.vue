<script setup>
import { ref } from "vue";

import AppMenuItem from "./AppMenuItem.vue";

const model = ref([
  {
    label: "Home",
    items: [{ label: "Dashboard", icon: "pi pi-fw pi-home", to: "/" }],
  },
  {
    label: "UI Components",
    items: [
      {
        label: "Form Layout",
        icon: "pi pi-fw pi-id-card",
        to: "/dashboard",
      },
      { label: "Input", icon: "pi pi-fw pi-check-square", to: "/dashboard" },
      {
        label: "Button",
        icon: "pi pi-fw pi-mobile",
        to: "/dashboard",
        class: "rotated-icon",
      },
      { label: "Table", icon: "pi pi-fw pi-table", to: "/dashboard" },
      { label: "List", icon: "pi pi-fw pi-list", to: "/dashboard" },
      { label: "Tree", icon: "pi pi-fw pi-share-alt", to: "/dashboard" },
    ],
  },
  {
    label: "Pages",
    icon: "pi pi-fw pi-briefcase",
    to: "/pages",
    items: [
      {
        label: "Landing",
        icon: "pi pi-fw pi-globe",
        to: "/dashboard",
      },
      {
        label: "Auth",
        icon: "pi pi-fw pi-user",
        items: [
          {
            label: "Login",
            icon: "pi pi-fw pi-sign-in",
            to: "/dashboard",
          },
          {
            label: "Error",
            icon: "pi pi-fw pi-times-circle",
            to: "/dashboard",
          },
          {
            label: "Access Denied",
            icon: "pi pi-fw pi-lock",
            to: "/dashboard",
          },
        ],
      },
      {
        label: "Crud",
        icon: "pi pi-fw pi-pencil",
        to: "/dashboard",
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
        label: "Documentation",
        icon: "pi pi-fw pi-book",
        to: "/dashboard",
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
