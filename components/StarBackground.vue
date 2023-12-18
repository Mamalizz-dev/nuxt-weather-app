<script setup>
import { loadSlim } from "tsparticles-slim";

const particlesInit = async (engine) => {
  //await loadFull(engine);
  await loadSlim(engine);
};
</script>

<template>
  <div class="fixed inset-0 w-full h-full">
    <vue-particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
      :options="{
        fullScreen: {
            enable: true,
            zIndex: -1
        },
        fpsLimit: 120,
        interactivity: {
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: '#ffffff',
          },
          links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1
        },
          move: {
            direction: '',
            enable: true,
            outMode: 'bounce',
            random: false,
            speed: 6,
            straight: true,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 30,
          },
          opacity: {
            value: 0.4,
          },
          shape: {
            type: 'circle',
          },
          size: {
                random: true,
                value: 1.3,
            },
        },
        detectRetina: true,
      }"
    />
  </div>
</template>
