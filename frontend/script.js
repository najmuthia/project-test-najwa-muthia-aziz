document.addEventListener("DOMContentLoaded", () => {
    let prevScrollPosition = window.pageYOffset;
  
    // Menampilkan/Menyembunyikan Navbar berdasarkan arah scroll
    window.addEventListener("scroll", () => {
      const currentScrollPosition = window.pageYOffset;
  
      if (prevScrollPosition > currentScrollPosition) {
        // Scroll ke atas menampilkan navbar
        document.querySelector(".scrolling-navbar").classList.remove("hidden");
      } else {
        // Scroll ke bawah menyembunyikan navbar
        document.querySelector(".scrolling-navbar").classList.add("hidden");
      }
  
      prevScrollPosition = currentScrollPosition;
    });
  
    // Menginisialisasi elemen select dan menambahkan event listener
    const itemsPerPageSelect = document.getElementById("floatingSelect");
    itemsPerPageSelect.addEventListener("change", handleItemsPerPageChange);
  
    const sortSelect = document.getElementById("sortBySelect");
    sortSelect.addEventListener("change", handleSortChange);
  
    // Mengatur parallax scrolling
    window.onscroll = applyParallaxEffect;
  
    // Menampilkan card secara dinamis
    generateCards();
  
    const initialItemsPerPage = getItemsPerPageFromLocalStorage() || 90;
    displayCards(initialItemsPerPage);
    itemsPerPageSelect.value = initialItemsPerPage;
    updateDisplayText(initialItemsPerPage);
  
    // Fungsi untuk menangani perubahan pada jumlah item per halaman
    function handleItemsPerPageChange() {
      const selectedItems = parseInt(itemsPerPageSelect.value, 10);
      saveItemsPerPageToLocalStorage(selectedItems);
      displayCards(selectedItems);
      updateDisplayText(selectedItems);
    }
  
    // Memperbarui teks jumlah item yang ditampilkan
    function updateDisplayText(itemsCount) {
      const displayTextElement = document.querySelector("#sort-list .text");
      const upperLimit = itemsCount < 100 ? itemsCount : 100;
      displayTextElement.textContent = `Showing 1 - ${upperLimit} of 100`;
    }
  
    // Mengontrol visibilitas kartu berdasarkan jumlah item per halaman
    function displayCards(cardsPerPage) {
      const cards = document.querySelectorAll(".card");
  
      // Sembunyikan semua kartu terlebih dahulu
      cards.forEach((card) => {
        card.style.display = "none";
      });
  
      // Tampilkan hanya kartu sesuai dengan jumlah per halaman
      for (let i = 0; i < cardsPerPage && i < cards.length; i++) {
        cards[i].style.display = "block";
      }
    }
  
    // Menangani perubahan pada opsi sortir
    function handleSortChange() {
      const selectedSortOption = sortSelect.value;
      saveSortPreferenceToLocalStorage(selectedSortOption);
      sortCards(selectedSortOption);
    }
  
    // Efek paralaks pada scroll
    function applyParallaxEffect() {
      const scrollPosition = window.pageYOffset;
  
      const bannerImage = document.querySelector(".banner img");
      if (bannerImage) {
        bannerImage.style.transform = `translateY(${-scrollPosition * 0.7}px)`;
      }
  
      const bannerHeaderText = document.querySelector(".banner-text h1");
      if (bannerHeaderText) {
        bannerHeaderText.style.transform = `translateX(${-scrollPosition * 0.7}px)`;
      }
  
      const bannerParagraph = document.querySelector(".banner-text p");
      if (bannerParagraph) {
        bannerParagraph.style.transform = `translateX(${-scrollPosition * 0.7}px)`;
      }
  
      // Menyembunyikan header saat scroll ke bawah dan menampilkan saat scroll ke atas
      const header = document.querySelector("header");
      if (header) {
        header.classList.toggle("inactive", prevScrollPosition <= scrollPosition);
      }
  
      prevScrollPosition = scrollPosition;
    }
  
    // Fungsi untuk menyimpan jumlah item per halaman ke localStorage
    function saveItemsPerPageToLocalStorage(count) {
      localStorage.setItem("itemsPerPage", count);
    }
  
    // Mendapatkan jumlah item per halaman dari localStorage
    function getItemsPerPageFromLocalStorage() {
      return parseInt(localStorage.getItem("itemsPerPage"), 10) || null;
    }
  
    // Fungsi untuk menyimpan preferensi sortir ke localStorage
    function saveSortPreferenceToLocalStorage(sortValue) {
      localStorage.setItem("sortPreference", sortValue);
    }
    
  });
  