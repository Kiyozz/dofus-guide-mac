<script setup lang="ts"></script>

<template>
  <aside class="flex flex-col gap-[8px] m-[16px] max-w-[236px] min-h-[728px] p-[16px] bg-blur">
    <RouterLink to="/">
      <img src="/img/dofus_logo.png" class="mx-auto w-1/2 mt-1" />
    </RouterLink>
    <btn label="Guide" href="/guides" icon="/img/icon/guide.png" />

    <btn label="Équipements" href="/equipment" icon="/img/icon/equipement.png" />
    <btn label="Craft" href="/craft" icon="/img/icon/craft.png" />
    <btn label="Métier" href="/jobs" icon="/img/icon/metier.png" />
    <btn label="Forgemagie" href="/fm" icon="/img/icon/fm.png"></btn>
    <btn label="Organizer" href="/orga" icon="/img/icon/organiseur.png"></btn>
    <btn label="Groupe Finder" href="/gf" icon="/img/icon/gf.png"></btn>
    <btn label="Ocre" href="/orcre" icon="https://dofusguide.fr/img/items/be20c6f7420d5155.png"></btn>
    <btn label="Opti'Donjon" href="/donjons" icon="/img/icon/donjon.png"></btn>
    <btn label="Almanax" href="/almanax" icon="/img/icon/almanax.png"></btn>
    <btn label="Outils Externe" href="/externe" icon="/img/icon/extern.png"></btn>
    <span class="text-center mt-auto">Version</span>
  </aside>
</template>

<style scoped></style>
