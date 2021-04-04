// ----------------Minhas Funções -----------------------
function controleSlide(index, slide, direcao) {
  if (direcao == "next") {
    if (index === slide.length - 1) {
      index = 0
    } else {
      index++
    }
  } else {
    if (index === 0) {
      index = slide.length - 1
    } else {
      index--
    }
  }
  return index
}

// ----------------Seção Sobre - TABS -----------------------
;(() => {
  const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs")

  tabsContainer.addEventListener("click", (event) => {
    /* Se event.target contem a classe 'tab-item' e não contem a classe 'active' */
    if (
      event.target.classList.contains("tab-item") &&
      !event.target.classList.contains("active")
    ) {
      const target = event.target.getAttribute("data-target")

      // desativa a tab ativa
      tabsContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active")

      /* Ativa a nova tab */
      event.target.classList.add("active", "outer-shadow")

      /* Desativando a conteudo da tab*/
      aboutSection
        .querySelector(".tab-content.active")
        .classList.remove("active")

      // Ativando o novo conteúdo
      aboutSection.querySelector(target).classList.add("active")
    }
  })
})()

function bodyScrollkingToggle() {
  document.body.classList.toggle("stop-scrolling")
}

// ----------------Seção Portfolio - Filtros e Popup -----------------------
;(() => {
  const filterContainer = document.querySelector(".portfolio-filter"),
    portfolioItemsContainer = document.querySelector(".portfolio-itens"),
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = popup.querySelector(".pp-prev"),
    nextBtn = popup.querySelector(".pp-next"),
    closeBtn = popup.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
    projectDetailsBtn = popup.querySelector(".pp-project-details-btn")

  let itemIndex, slideIndex, screenshots

  //filtro
  filterContainer.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("filter-item") &&
      !event.target.classList.contains("active")
    ) {
      //Desativando filtro ativo
      filterContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active")

      //Ativando novo Filtro
      event.target.classList.add("active", "outer-shadow")
      const target = event.target.getAttribute("data-target")

      portfolioItems.forEach((item) => {
        if (target === item.getAttribute("data-category") || target === "all") {
          item.classList.remove("hide")
          item.classList.add("show")
        } else {
          item.classList.remove("show")
          item.classList.add("hide")
        }
      })
    }
  })

  portfolioItemsContainer.addEventListener("click", (event) => {
    if (event.target.closest(".portfolio-item-inner")) {
      const portfolioItem = event.target.closest(".portfolio-item-inner")
        .parentElement

      //Pega o index do item
      itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
        portfolioItem
      )

      screenshots = portfolioItems[itemIndex]
        .querySelector(".portfolio-item-img img")
        .getAttribute("data-screenshots")

      // converte screenshots em um array
      screenshots = screenshots.split(",")

      // Verifica se o projeto tem mais de 1 foto
      if (screenshots.length === 1) {
        prevBtn.style.display = "none"
        nextBtn.style.display = "none"
      } else {
        prevBtn.style.display = "block"
        nextBtn.style.display = "block"
      }

      slideIndex = 0
      popupToggle()
      popupSlideshow()
      popupDetails()
    }
  })
  closeBtn.addEventListener("click", () => {
    popupToggle()
    if (projectDetailsContainer.classList.contains("active")) {
      popupDetailsToggle()
    }
  })

  function popupToggle() {
    popup.classList.toggle("open")
    bodyScrollkingToggle()
  }

  function popupSlideshow() {
    const imgSrc = screenshots[slideIndex]
    const popupImg = popup.querySelector(".pp-img")

    // Ativando preload até que a imagem seja carregada
    popup.querySelector(".pp-loader").classList.add("active")

    // Popup recebe a imagem do projeto clicado dinamicamente
    popupImg.src = imgSrc

    popupImg.onload = () => {
      // Desativa o preloader
      popup.querySelector(".pp-loader").classList.remove("active")
    }

    // Modifica o contador dinamicamente
    popup.querySelector(".pp-counter").innerHTML = `${slideIndex + 1} de ${
      screenshots.length
    }`
  }

  // Próximo Slide
  nextBtn.addEventListener("click", () => {
    slideIndex = controleSlide(slideIndex, screenshots, "next")
    popupSlideshow()
  })

  // Anterior Slide
  prevBtn.addEventListener("click", () => {
    slideIndex = controleSlide(slideIndex, screenshots, "prev")
    popupSlideshow()
  })

  //Pegar dados dos projetos e colocar na popup
  function popupDetails() {
    // Verifica se o projeto tem detalhes
    if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")) {
      projectDetailsBtn.style.display = "none"
      return
    } else {
      projectDetailsBtn.style.display = "block"
      const details = portfolioItems[itemIndex].querySelector(
        ".portfolio-item-details"
      ).innerHTML
      const title = portfolioItems[itemIndex].querySelector(
        ".portfolio-item-title"
      ).innerHTML
      const category = portfolioItems[itemIndex].getAttribute("data-category")

      popup.querySelector(".pp-project-details").innerHTML = details
      popup.querySelector(".pp-title h2").innerHTML = title
      popup.querySelector(".pp-project-category").innerHTML = category
        .split("-")
        .join(" ")
    }
  }

  projectDetailsBtn.addEventListener("click", () => {
    popupDetailsToggle()
  })

  function popupDetailsToggle() {
    if (projectDetailsContainer.classList.contains("active")) {
      projectDetailsContainer.classList.remove("active")
      projectDetailsContainer.style.maxHeight = 0 + "px"

      projectDetailsBtn.querySelector("i").classList.remove("fa-minus")
      projectDetailsBtn.querySelector("i").classList.add("fa-plus")
    } else {
      projectDetailsBtn.querySelector("i").classList.remove("fa-plus")
      projectDetailsBtn.querySelector("i").classList.add("fa-minus")

      projectDetailsContainer.classList.add("active")
      projectDetailsContainer.style.maxHeight =
        projectDetailsContainer.scrollHeight + "px"
      popup.scrollTo(0, projectDetailsContainer.offsetTop)
    }
  }
})()

// ----------------Seção Depoimentos - Slide -----------------------
;(() => {
  const sliderContainer = document.querySelector(".testi-slider-container"),
    slides = sliderContainer.querySelectorAll(".testi-item"),
    slideWidth = sliderContainer.offsetWidth,
    prevBtn = document.querySelector(".testi-slider-nav .prev"),
    nextBtn = document.querySelector(".testi-slider-nav .next"),
    activeSlide = sliderContainer.querySelector(".testi-item.active")

  let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(
    activeSlide
  )

  // Configura a largura de todos os slides
  slides.forEach((slide) => {
    slide.style.width = slideWidth + "px"
  })

  // Configura a largura do container de slides
  sliderContainer.style.width = slideWidth * slides.length + "px"

  // Botão next
  nextBtn.addEventListener("click", () => {
    slideIndex = controleSlide(slideIndex, slides, "next")
    slider()
  })

  // Botão Prev
  prevBtn.addEventListener("click", () => {
    slideIndex = controleSlide(slideIndex, slides, "prev")
    slider()
  })

  function slider() {
    // Desativando sliders ativos
    sliderContainer
      .querySelector(".testi-item.active")
      .classList.remove("active")

    // Ativando novo Slide
    slides[slideIndex].classList.add("active")
    sliderContainer.style.marginLeft = -(slideWidth * slideIndex) + "px"
  }
  slider()
})()
