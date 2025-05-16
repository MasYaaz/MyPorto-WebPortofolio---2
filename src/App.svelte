<script>
  import "./app.css";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { faHome, faPhone } from "@fortawesome/free-solid-svg-icons";
  import { onMount, tick } from "svelte";
  import { slide } from "svelte/transition";

  let halamanAktif = "section_1",
    menuTerbuka = false,
    terlihat = false,
    aboutTerlihat = false;

  function handleScroll() {
    const posisi = window.scrollY;
    if (posisi < 600) {
      halamanAktif = "section_1";
    } else if (posisi >= 600 && posisi < 1300) {
      halamanAktif = "section_2";
    } else if (posisi >= 1300 && posisi < 2000) {
      halamanAktif = "section_3";
    } else {
      halamanAktif = "section_4";
    }
    if (menuTerbuka) {
      menuTerbuka = false;
    }
  }

  function toggleMenu() {
    menuTerbuka = !menuTerbuka;
  }

  onMount(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  let gambarRef;
  let aboutRef;


onMount(() => {
  // buat fungsi async di dalam onMount
  const setupObserver = async () => {
    await tick();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === gambarRef) terlihat = true;
          if (entry.target === aboutRef) aboutTerlihat = true;
        }
      });
    },
    {
        threshold: 0.3, // setengah terlihat baru mulai animasi
      }
    );

    if (gambarRef) observer.observe(gambarRef);
    if (aboutRef) observer.observe(aboutRef);

    return () => {
      if (gambarRef) observer.unobserve(gambarRef);
      if (aboutRef) observer.unobserve(aboutRef);
    };
  };

  setupObserver(); // panggil fungsi async
  });
</script>

<header>
  <div
    class="w-full fixed top-0 z-50 pl-3 pr-3 md:pl-6 md:pr-6 h-10 md:h-14 flex bg-sky-200/80 justify-between"
  >
    <div class="pr-2 md:pr-5 basis-1/3 flex items-center">
      <FontAwesomeIcon icon={faHome} class="text-white p-1 w-5 h-5" />
      <p class="text-md font-bold uppercase">MyPorto</p>
    </div>

    <!-- Tombol hamburger -->
    <button
      class="md:hidden pr-2"
      on:click={toggleMenu}
      aria-label="tombol navbar"
    >
      <svg
        class="w-6 h-6 text-sky-800"
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
      <a
        href="#section_1"
        class="text-center mr-3 pb-1 text-[13px] md:text-[15px] md:mr-5 w-20 tracking-[1px] text-sky-600 hover:text-sky-400 border-b-2 hover:scale-105 transition-transform duration-75"
        class:border-sky-600={halamanAktif === "section_1"}
        class:scale-110={halamanAktif === "section_1"}
        class:border-transparent={halamanAktif !== "section_1"}>Home</a
      >
      <a
        href="#section_2"
        class="text-center ml-3 mr-3 pb-1 w-20 text-[13px] md:text-[15px] md:mr-5 tracking-[1px] text-sky-600 hover:text-sky-400 border-b-2 hover:scale-105 transition-transform duration-75"
        class:border-sky-600={halamanAktif === "section_2"}
        class:scale-110={halamanAktif === "section_2"}
        class:border-transparent={halamanAktif !== "section_2"}>About Me</a
      >
      <a
        href="#section_3"
        class="text-center ml-3 mr-3 pb-1 w-20 text-[13px] md:text-[15px] md:mr-5 tracking-[1px] text-sky-600 hover:text-sky-400 border-b-2 hover:scale-105 transition-transform duration-75"
        class:border-sky-600={halamanAktif === "section_3"}
        class:scale-110={halamanAktif === "section_3"}
        class:border-transparent={halamanAktif !== "section_3"}>My Skill</a
      >
      <a
        href="#section_4"
        class="text-center ml-3 mr-15 pb-1 w-20 text-[13px] md:text-[15px] md:mr-5 tracking-[1px] text-sky-600 hover:text-sky-400 border-b-2 hover:scale-105 transition-transform duration-75"
        class:border-sky-600={halamanAktif === "section_4"}
        class:scale-110={halamanAktif === "section_4"}
        class:border-transparent={halamanAktif !== "section_4"}>Portofolio</a
      >
      <button>
        <FontAwesomeIcon
          icon={faPhone}
          class="text-white w-5 h-5 md:w-6 md:h-6 md:ml-10 hover:text-red-600 hover:scale-110 transition-transform duration-150 cursor-pointer"
        />
      </button>
    </nav>
    <!-- Menu Mobile -->
    {#if menuTerbuka}
      <nav
        transition:slide={{ duration: 400 }}
        class="absolute left-0 top-12 w-full bg-sky-200 px-4 pb-4 shadow-md md:hidden"
      >
        <a
          href="#section_1"
          class="text-center block py-2 border-b border-sky-300 text-sky-700"
          >Home</a
        >
        <a
          href="#section_2"
          class="text-center block py-2 border-b border-sky-300 text-sky-700"
          >About</a
        >
        <a
          href="#section_3"
          class="text-center block py-2 border-b border-sky-300 text-sky-700"
          >Skills</a
        >
        <a href="#section_4" class="text-center block py-2 text-sky-700"
          >Portfolio</a
        >
      </nav>
    {/if}
  </div>
</header>
<main>
  <section
    class="w-full flex flex-col-reverse md:flex-row items-center justify-between min-h-screen bg-white scroll-mt-12 relative z-0 px-6 md:px-10 overflow-hidden"
    id="section_1"
  >
    <!-- Gambar -->
    <div
      bind:this={gambarRef}
      class="transition-all duration-700 ease-out transform md:basis-1/2 flex justify-center"
      class:translate-y-100={!terlihat}
      class:opacity-0={!terlihat}
      class:translate-y-15={terlihat}
      class:opacity-100={terlihat}
    >
      <img
        src="./images/fullbody.png"
        alt="Foto"
        class="h-[500px] transition-all duration-200 hover:scale-110 -translate-x-5 md:translate-x-0 md:translate-y-10 xl:translate-x-20 2xl:translate-x-30 md:h-[700px] lg:translate-y-20 lg:h-[900px] object-cover"
      />
    </div>

    <!-- Teks + Tombol -->
    <div
      class="flex flex-col justify-center items-center md:items-start md:basis-1/2 text-center md:text-left mt-8 md:mt-0 space-y-4"
    >
      <p
        bind:this={gambarRef}
        class="md:-translate-y-40 lg:text-8xl transition-all duration-700 ease-out transform text-5xl md:text-6xl font-display uppercase font-bold"
        class:-translate-y-10={!terlihat}
        class:opacity-0={!terlihat}
        class:translate-y-15={terlihat}
        class:opacity-100={terlihat}
      >
        Welcome
      </p>
      <p
        bind:this={gambarRef}
        class="md:-translate-y-45 lg:text-4xl lg:pl-5 transition-all duration-700 ease-out transform pl-0 md:pl-2 text-lg md:text-xl font-display uppercase tracking-[1.5px]"
        class:-translate-y-10={!terlihat}
        class:opacity-0={!terlihat}
        class:translate-y-10={terlihat}
        class:opacity-100={terlihat}
      >
        to my web
      </p>
      <a
        href="#section_2"
        bind:this={gambarRef}
        class="md:-translate-y-37 md:text-xl transition-all duration-300 ease-out transform ml-0 md:ml-4 hover:text-sky-300 rounded-xl text-sm md:text-md text-center py-2 px-5 font-display uppercase bg-white shadow"
        class:-translate-y-10={!terlihat}
        class:opacity-0={!terlihat}
        class:translate-y-10={terlihat}
        class:opacity-100={terlihat}
      >
        About Me
      </a>
    </div>
  </section>
<section
  class="w-full h-250 md:min-h-screen bg-sky-200 scroll-mt-12 px-6 md:px-16 lg:px-32 flex flex-col md:h-150 md:flex-row items-center justify-center gap-8"
  id="section_2"
>
  <!-- Gambar -->
  <img
  src="./images/foto-personal.jpg"
  alt="Foto Personal"
  bind:this={aboutRef}
  class="transition-all duration-700 ease-out w-full max-w-sm md:max-w-md object-cover h-auto rounded-3xl p-3 shadow-xl/25 transform"
  class:-translate-x-24={!aboutTerlihat}
  class:opacity-0={!aboutTerlihat}
  class:translate-x-0={aboutTerlihat}
  class:opacity-100={aboutTerlihat}
  />

  <!-- Konten -->
  <div class="md:-translate-y-15 flex flex-col items-center md:items-start text-center md:text-left">
    <!-- Judul -->
    <div class="text-white hover:text-sky-600 text-4xl md:text-6xl font-bold uppercase p-4 mb-4 rounded-2xl bg-sky-300 shadow-xl w-full">
      About Me
      <div class="mt-3 h-1 w-16 bg-white mx-auto md:mx-0 rounded"></div>
    </div>

    <!-- Deskripsi -->
    <div class="max-w-lg">
      <p class="mb-4 text-xl md:text-3xl font-bold text-sky-600">Sekilas Tentang Saya</p>
      <p class="mb-4 text-justify text-base md:text-xl text-sky-600">
        Saya adalah seorang Front-End developer yang telah berpengalaman dalam
        mendesain berbagai web dari yang sederhana sampai yang agak rumit.
      </p>
      <p class="text-justify text-base md:text-xl text-sky-600">
        Selain bisa programing, Saya juga memiliki banyak portofolio yang lain
        seperti fotografi, desain grafis dengan menggunakan Photoshop & Corel
        Draw, dan juga pengalaman dalam mengurus administrasi pendataan dan
        pencatatan.
      </p>
    </div>
  </div>
</section>

  <section
    class="w-full min-h-screen bg-sky-300 scroll-mt-12 z-20"
    id="section_3"
  ></section>
  <section
    class="w-full min-h-screen bg-sky-400 scroll-mt-12 z-30"
    id="section_4"
  ></section>
</main>

<style>
</style>
