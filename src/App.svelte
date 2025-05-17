<script>
  import "./app.css";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import {
    faCalendarAlt,
    faCameraAlt,
    faCameraRetro,
    faEnvelope,
    faGlobe,
    faHome,
    faMobileAlt,
    faMobileAndroid,
    faObjectUngroup,
    faPhone,
    faUser,
    faVideoCamera,
  } from "@fortawesome/free-solid-svg-icons";
  import { onMount, tick, onDestroy } from "svelte";
  import { slide } from "svelte/transition";

  let halamanAktif = "section_1";
  let menuTerbuka = false;
  let terlihat = false;
  let aboutTerlihat = false;
  let gambarRef;
  let aboutRef;
  let observer;

  function handleScroll() {
    const posisi = window.scrollY + 100; // tambahkan offset bila ada navbar

    const section1 = document.getElementById("section_1");
    const section2 = document.getElementById("section_2");
    const section3 = document.getElementById("section_3");
    const section4 = document.getElementById("section_4");

    const batas1 = section1?.offsetTop ?? 0;
    const batas2 = section2?.offsetTop ?? 0;
    const batas3 = section3?.offsetTop ?? 0;
    const batas4 = section4?.offsetTop ?? 0;

    if (posisi >= batas4) {
      halamanAktif = "section_4";
    } else if (posisi >= batas3) {
      halamanAktif = "section_3";
    } else if (posisi >= batas2) {
      halamanAktif = "section_2";
    } else {
      halamanAktif = "section_1";
    }

    // Tutup menu mobile ketika discroll
    if (menuTerbuka) {
      menuTerbuka = false;
    }
  }

  function toggleMenu() {
    menuTerbuka = !menuTerbuka;
  }

  onMount(async () => {
    window.addEventListener("scroll", handleScroll);
    await tick();

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === gambarRef) terlihat = true;
            if (entry.target === aboutRef) aboutTerlihat = true;
          }
        });
      },
      {
        threshold: 0.3, // Muncul 30% baru trigger animasi
      }
    );

    if (gambarRef) observer.observe(gambarRef);
    if (aboutRef) observer.observe(aboutRef);
  });

  onDestroy(() => {
    window.removeEventListener("scroll", handleScroll);
    if (observer) {
      if (gambarRef) observer.unobserve(gambarRef);
      if (aboutRef) observer.unobserve(aboutRef);
    }
  });
</script>

<header>
  <div
    class="w-full fixed top-0 z-50 pl-3 pr-3 md:pl-6 md:pr-6 h-10 md:h-12 lg:h-14 xl:h-16 flex bg-primary/80 justify-between"
  >
    <div class="pr-2 md:pr-5 basis-1/3 flex items-center">
      <FontAwesomeIcon icon={faHome} class="text-secondary p-1 w-5 h-5" />
      <p class="text-md font-bold uppercase text-secondary">MyPorto</p>
    </div>

    <!-- Tombol hamburger -->
    <button
      class="md:hidden pr-2 text-secondary"
      on:click={toggleMenu}
      aria-label="tombol navbar"
    >
      <svg
        class="w-6 h-6 text-secondary"
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
        class="text-center mr-3 pb-1 text-[13px] md:text-[15px] md:mr-5 w-20 tracking-[1px] text-secondary hover:text-light border-b-2 hover:scale-105 transition-transform duration-75"
        class:border-secondary={halamanAktif === "section_1"}
        class:scale-110={halamanAktif === "section_1"}
        class:border-transparent={halamanAktif !== "section_1"}>Home</a
      >
      <a
        href="#section_2"
        class="text-center ml-3 mr-3 pb-1 w-20 text-[13px] md:text-[15px] md:mr-5 tracking-[1px] text-secondary hover:text-light border-b-2 hover:scale-105 transition-transform duration-75"
        class:border-secondary={halamanAktif === "section_2"}
        class:scale-110={halamanAktif === "section_2"}
        class:border-transparent={halamanAktif !== "section_2"}>About Me</a
      >
      <a
        href="#section_3"
        class="text-center ml-3 mr-3 pb-1 w-20 text-[13px] md:text-[15px] md:mr-5 tracking-[1px] text-secondary hover:text-light border-b-2 hover:scale-105 transition-transform duration-75"
        class:border-secondary={halamanAktif === "section_3"}
        class:scale-110={halamanAktif === "section_3"}
        class:border-transparent={halamanAktif !== "section_3"}>My Skill</a
      >
      <a
        href="#section_4"
        class="text-center ml-3 mr-15 pb-1 w-20 text-[13px] md:text-[15px] md:mr-5 tracking-[1px] text-secondary hover:text-light border-b-2 hover:scale-105 transition-transform duration-75"
        class:border-secondary={halamanAktif === "section_4"}
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
        class="absolute left-0 top-10 w-full bg-primary/90 px-4 pb-4 shadow-md md:hidden"
      >
        <a
          href="#section_1"
          class="text-center block py-2 border-b border-light text-secondary"
          >Home</a
        >
        <a
          href="#section_2"
          class="text-center block py-2 border-b border-light text-secondary"
          >About</a
        >
        <a
          href="#section_3"
          class="text-center block py-2 border-b border-light text-secondary"
          >Skills</a
        >
        <a href="#section_4" class="text-center block py-2 text-secondary"
          >Portfolio</a
        >
      </nav>
    {/if}
  </div>
</header>
<main>
  <!-- Section 1 -->
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
        class="h-[500px] md:h-[700px] lg:h-[900px] object-cover transition-all duration-200 hover:scale-110 -translate-x-5 md:translate-x-0 md:translate-y-10 xl:translate-x-20 2xl:translate-x-30"
      />
    </div>

    <!-- Teks + Tombol -->
    <div
      class="flex flex-col justify-center items-center md:items-start md:basis-1/2 text-center md:text-left mt-8 md:mt-0 space-y-4"
    >
      <p
        bind:this={gambarRef}
        class="text-5xl md:text-6xl lg:text-8xl font-display uppercase font-bold transition-all duration-700 ease-out transform"
        class:-translate-y-10={!terlihat}
        class:opacity-0={!terlihat}
        class:translate-y-15={terlihat}
        class:opacity-100={terlihat}
      >
        Welcome
      </p>
      <p
        bind:this={gambarRef}
        class="text-lg md:text-xl lg:text-4xl lg:pl-5 font-display uppercase tracking-[1.5px] transition-all duration-700 ease-out transform"
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
        class="bg-dark3 hover:bg-dark4 text-secondary hover:text-light rounded-xl text-sm md:text-md md:text-xl py-2 px-5 font-display uppercase shadow transition-all duration-300 ease-out transform"
        class:-translate-y-10={!terlihat}
        class:opacity-0={!terlihat}
        class:translate-y-10={terlihat}
        class:opacity-100={terlihat}
      >
        About Me
      </a>
    </div>
  </section>

  <!-- Section 2 -->
  <section
    class="w-full min-h-screen bg-dark px-6 md:px-16 lg:px-32 py-12 flex flex-col md:flex-row items-start justify-center gap-8 md:pt-30"
    id="section_2"
  >
    <!-- KIRI: Gambar + Konten 1 di bawahnya -->
    <div class="flex flex-col gap-6 w-full md:w-3/5">
      <!-- Gambar -->
      <img
        src="./images/foto-personal.jpg"
        alt="Foto Personal"
        bind:this={aboutRef}
        class="w-full aspect-square object-cover rounded-3xl shadow-xl/25 transition-all duration-700 ease-out transform"
        class:-translate-x-24={!aboutTerlihat}
        class:opacity-0={!aboutTerlihat}
        class:translate-x-0={aboutTerlihat}
        class:opacity-100={aboutTerlihat}
      />
    </div>

    <!-- KANAN: Konten 2 -->
    <div
      class="flex p-5 pt-0 flex-col w-full md:w-2/5 text-center overflow-hidden text-secondary"
    >
      <div
        class="shadow-light shadow-2xl/10 flex flex-col text-center mb-10 md:text-justify text-secondary bg-dark2 p-6 rounded-2xl shadow-xl"
      >
        <h2
          class="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold uppercase mb-2"
        >
          Tentang Saya
        </h2>
        <p class="text-sm lg:text-lg xl:text-xl 2xl:text-2xl">
          Saya seorang Front-End developer yang terbiasa mendesain web dari yang
          sederhana sampai cukup kompleks. Saya juga memiliki pengalaman dalam
          fotografi, desain grafis menggunakan Photoshop & CorelDraw, serta
          administrasi dan pencatatan data.
        </p>
      </div>
      <div class="bg-dark2 p-2 mb-5 rounded-2xl shadow-xl shadow-light shadow-2xl/10">
        <h2
          class="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold uppercase mb-2"
        >
          Profil Saya
        </h2>
      </div>
      <div class="flex flex-col md:flex-row lg:flex-col gap-4 px-4">
        <!-- Kolom Kiri -->
        <div class="md:w-1/2 w-full lg:w-full">
          <div
            class="mb-6 flex flex-col items-center text-center md:text-center"
          >
            <FontAwesomeIcon icon={faUser} class="text-secondary fa-3x mb-3" />
            <p
              class="break-words w-full font-bold text-secondary text-sm md:text-sm lg:text-lg xl:text-xl 2xl:text-2xl"
            >
              Aflah Mahdi Yazdi
            </p>
          </div>
          <div
            class="mb-6 flex flex-col items-center text-center md:text-center"
          >
            <FontAwesomeIcon
              icon={faCalendarAlt}
              class="text-secondary fa-3x mb-3"
            />
            <p
              class="break-words w-full font-bold text-secondary text-sm md:text-sm lg:text-lg xl:text-xl 2xl:text-2xl"
            >
              22 Desember 2005
            </p>
          </div>
        </div>

        <!-- Kolom Kanan -->
        <div class="md:w-1/2 w-full lg:w-full">
          <div
            class="mb-6 flex flex-col items-center text-center md:text-center"
          >
            <FontAwesomeIcon
              icon={faEnvelope}
              class="text-secondary fa-3x mb-3"
            />
            <p
              class="break-words w-full font-bold text-secondary text-sm md:text-[12px] lg:text-lg xl:text-xl 2xl:text-2xl"
            >
              Diyaz.hal22@gmail.com
            </p>
          </div>
          <div
            class="mb-6 flex flex-col items-center text-center md:text-center"
          >
            <FontAwesomeIcon icon={faPhone} class="text-secondary fa-3x mb-3" />
            <p
              class="break-words w-full font-bold text-secondary text-sm md:text-sm lg:text-lg xl:text-xl 2xl:text-2xl"
            >
              +62-823-3304-4295
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section
    class="w-full min-h-screen bg-dark2 px-6 md:px-16 lg:px-32 py-12 flex flex-col items-center gap-8 md:pt-30"
    id="section_3"
  >
    <div
      class="bg-dark4 shadow-light shadow-2xl/20 p-2 md:p-5 mb-5 w-60 md:w-70 lg:w-80 xl:w-100 2xl:w-120 text-center rounded-2xl shadow-xl"
    >
      <h2
        class="text-3xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-black text-light uppercase mb-2"
      >
        MY SKILLS
      </h2>
    </div>
    <div class="flex flex-wrap 2xl:flex-nowrap justify-center gap-5 px-4">
      <div
        class="w-full md:w-[50%] xl:w-[40%] 2xl:w-1/4 mb-6 flex flex-col items-center text-center"
      >
        <FontAwesomeIcon icon={faGlobe} 
        class="text-secondary fa-5x md:fa-3x md:mb-3" />
        <p
          class="break-words w-full uppercase font-bold text-light p-2 text-2xl md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl"
        >
          Web Development
        </p>
        <div class="w-fit md:mt-1 md:w-80 md:h-fit xl:h-80 bg-light3 p-6 rounded-2xl shadow-light shadow-2xl/25">
          <p
            class="break-words w-full font-display text-dark2 text-sm md:text-sm lg:text-md xl:text-lg 2xl:text-xl"
          >
            Butuh website buat jualan online, atau website untuk admin kantor?
            Saya dapat membuatnya dengan menggunakan HTML, CSS dan juga
            Javascript. Di jamin responsif bisa dibuka di mana saja.
          </p>
        </div>
      </div>
      <div
        class="w-full md:w-[50%] xl:w-[40%] 2xl:w-1/4 mb-6 flex flex-col items-center text-center"
      >
        <FontAwesomeIcon
          icon={faMobileAlt}
          class="text-secondary fa-5x md:fa-3x md:mb-3"
        />
        <p
          class="break-words w-full uppercase font-bold text-light p-2 text-2xl md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl"
        >
          App Development
        </p>
        <div class="w-fit md:mt-1 md:w-80 md:h-fit xl:h-80 bg-light3 p-6 rounded-2xl shadow-light shadow-2xl/25">
          <p
            class="break-words w-full font-display text-dark2 text-sm md:text-sm lg:text-md xl:text-lg 2xl:text-xl"
          >
            Butuh website buat jualan online, atau website untuk admin kantor?
            Saya dapat membuatnya dengan menggunakan HTML, CSS dan juga
            Javascript. Di jamin responsif bisa dibuka di mana saja.
          </p>
        </div>
      </div>

      <div
        class="w-full md:w-[50%] xl:w-[40%] 2xl:w-1/4 mb-6 flex flex-col items-center text-center"
      >
        <FontAwesomeIcon icon={faObjectUngroup} 
        class="text-secondary fa-5x md:fa-3x md:mb-3" />
        <p
          class="break-words w-full uppercase font-bold text-light p-2 text-2xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl"
        >
          Desain Grafis
        </p>
        <div class="w-fit md:w-80 md:h-fit xl:h-80 bg-light3 p-6 rounded-2xl shadow-light shadow-2xl/25">
          <p
            class="break-words w-full font-display text-dark2 text-sm md:text-sm lg:text-md xl:text-lg 2xl:text-xl"
          >
            Butuh website buat jualan online, atau website untuk admin kantor?
            Saya dapat membuatnya dengan menggunakan HTML, CSS dan juga
            Javascript. Di jamin responsif bisa dibuka di mana saja.
          </p>
        </div>
      </div>
      <div
        class="w-full md:w-[50%] xl:w-[40%] 2xl:w-1/4 mb-6 flex flex-col items-center text-center"
      >
        <FontAwesomeIcon icon={faCameraAlt} 
        class="text-secondary fa-5x md:fa-3x md:mb-3" />
        <p
          class="break-words w-full uppercase font-bold text-light p-2 text-2xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl"
        >
          Fotografi
        </p>
        <div class="w-fit md:w-80 md:h-fit xl:h-80 bg-light3 p-6 rounded-2xl shadow-light shadow-2xl/25">
          <p
            class="break-words w-full font-display text-dark2 text-sm md:text-sm lg:text-md xl:text-lg 2xl:text-xl"
          >
            Butuh website buat jualan online, atau website untuk admin kantor?
            Saya dapat membuatnya dengan menggunakan HTML, CSS dan juga
            Javascript. Di jamin responsif bisa dibuka di mana saja.
          </p>
        </div>
      </div>
    </div>
  </section>
  <section class="w-full min-h-screen bg-dark z-30" id="section_4"></section>
</main>
