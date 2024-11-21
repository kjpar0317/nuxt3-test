<script lang="ts" setup>
const { $gsap: gsap, $Draggable: Draggable } = useNuxtApp();

onMounted(() => {
  init();
});

function init() {
  // const slideWidth = 310;
  let xPos = 0;
  const card = document.querySelectorAll(".card-item");
  // alert(card[0].offsetWidth)
  const slideWidth = 310; // Temporary

  const ring = document.getElementById("ring");
  const wrapper = document.getElementById("wrapper");
  const mainContent = document.getElementById("stage");

  gsap?.set(ring, { rotationY: 180, cursor: "drag" });
  gsap?.set(card, {
    rotateY: (i: number) => i * -36,
    transformOrigin: "50% 50% 500px",
    z: -500,
    backgroundImage: (i: number) =>
      "url(https://picsum.photos/id/" + (i + 32) + "/600/400/)",
    backgroundPosition: (i: number) => getBgPos(i),
    backfaceVisibility: "hidden",
  });

  gsap?.timeline().from(card, {
    duration: 1.5,
    y: 200,
    opacity: 0,
    stagger: 0.1,
    ease: "expo",
  });

  Draggable?.create(wrapper, {
    trigger: mainContent,
    bounds: {
      target: mainContent,
      minX: 0,
      maxX: 0,
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    },
    type: "x",
    throwProps: true,
    allowNativeTouchScrolling: true,
    zIndexBoost: true,

    onDragStart: (e: any) => {
      if (e.touches) e.clientX = e.touches[0].clientX;
      xPos = Math.round(e.clientX);
      gsap?.set(".ring", { cursor: "grabbing" });
    },

    onDrag: (e: any) => {
      if (e.touches) e.clientX = e.touches[0].clientX;
      gsap?.to(".ring", {
        rotationY: "-=" + ((Math.round(e.clientX) - xPos) % 360),
      });
      console.log(xPos, e.clientX);
      xPos = Math.round(e.clientX);
    },

    onDragEnd: (e: any) => {
      gsap?.set(".ring", { cursor: "grab" });
    },
  });

  function getBgPos(i: number) {
    //returns the background-position string to create parallax movement in each image
    return (
      100 -
      (gsap?.utils.wrap(
        0,
        360,
        gsap?.getProperty(".ring", "rotationY") - 180 - i * 36
      ) /
        360) *
        500 +
      "px 0px"
    );
  }
}
</script>

<template>
  <div class="stage" id="stage">
    <div class="wrapper" id="wrapper">
      <div class="ring" id="ring">
        <div class="card-item"></div>
        <div class="card-item"></div>
        <div class="card-item"></div>
        <div class="card-item"></div>
        <div class="card-item"></div>
        <div class="card-item"></div>
        <div class="card-item"></div>
        <div class="card-item"></div>
        <div class="card-item"></div>
        <div class="card-item"></div>
        <div class="card-item"></div>
        <div class="card-item"></div>
        <div class="card-item"></div>
        <div class="card-item"></div>
        <div class="card-item"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stage,
.ring,
.card-item {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.stage {
  overflow: hidden;
  position: absolute;
}

.ring,
.card-item,
.wrapper {
  position: absolute;
}

.wrapper {
  perspective: 2000px;
  width: 310px;
  min-height: 400px;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
}
</style>
