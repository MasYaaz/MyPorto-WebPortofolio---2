<script>
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { slide } from "svelte/transition";
  import {
    faHome,
    faUser,
    faPenFancy,
    faBriefcase,
  } from "@fortawesome/free-solid-svg-icons";

  // Props yang diterima dari App.svelte (menggunakan two-way binding)
  export let halamanAktif;
  export let menuTerbuka; // Ini akan di-bind dua arah

  // Data Navigasi
  const navItems = [
    { id: "section_1", label: "Home", icon: faHome },
    { id: "section_2", label: "About Me", icon: faUser },
    { id: "section_3", label: "My Skills", icon: faPenFancy },
    { id: "section_4", label: "Portofolio", icon: faBriefcase },
  ];

  // Fungsi untuk mengalihkan status menu mobile
  function toggleMenu() {
    menuTerbuka = !menuTerbuka; // Langsung mengubah nilai prop 'menuTerbuka'
  }

  // Fungsi untuk navigasi dan menutup menu mobile
  function handleNavClick() {
    if (menuTerbuka) {
      menuTerbuka = false; // Langsung mengubah nilai prop 'menuTerbuka'
    }
  }
</script>

<header>
  <div
    class="fixed w-full top-0 z-50 px-6 md:px-10 lg:px-24 xl:px-32 h-14 md:h-16 2xl:h-20 flex bg-secondary shadow-lg justify-between"
  >
    <div class="basis-1/3 flex items-center">
      <img
        src="./light-theme.svg"
        alt="logo"
        class="w-15 md:w-20 lg:w-25 h-auto"
      />
    </div>

    <!-- Tombol hamburger -->
    <button
      class="md:hidden text-primary"
      on:click={toggleMenu}
      aria-label="tombol navbar"
    >
      <svg
        class="w-6 h-6 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>

    <!-- Ini Navbar dekstop -->
    <nav class="hidden md:flex basis-2/3 p-2 items-center justify-end">
      {#each navItems as item}
        <a
          href={"#" + item.id}
          class="font-primary text-center mr-4 pb-1 text-[13px] md:text-[15px] lg:mr-10 w-25 tracking-[1px] text-primary hover:text-green border-b-1 hover:scale-105 transition-transform duration-75"
          class:border-primary={halamanAktif === item.id}
          class:scale-110={halamanAktif === item.id}
          class:border-transparent={halamanAktif !== item.id}
        >
          {item.label}
        </a>
      {/each}
    </nav>
    <!-- Menu Mobile -->
    {#if menuTerbuka}
      <nav
        transition:slide={{ duration: 400 }}
        class="absolute right-0 top-12 w-full bg-secondary/90 px-4 pb-4 shadow-md md:hidden"
      >
        {#each navItems as item}
          <a
            href={"#" + item.id}
            class="font-primary text-left flex border-b text-primary p-2 justify-center"
            ><FontAwesomeIcon icon={item.icon} class="text-lg mr-2" />
            {item.label}</a
          >
        {/each}
      </nav>
    {/if}
  </div>
</header>
