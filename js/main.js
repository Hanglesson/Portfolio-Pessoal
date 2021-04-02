// ----------------Seção Sobre - TABS -----------------------
(() => {
    const aboutSection = document.querySelector(".about-section"),
        tabsContainer = document.querySelector(".about-tabs")

    tabsContainer.addEventListener("click", (event) => {
        /* Se event.target contem a classe 'tab-item' e não contem a classe 'active' */
        if (event.target.classList.contains("tab-item") &&
            !event.target.classList.contains("active")) {
            const target = event.target.getAttribute("data-target")
                // desativa a tab ativa
            tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active")
                /* Ativa a nova tab */
            event.target.classList.add("active", "outer-shadow")
                /* Desativando a conteudo da tab*/
            console.log(aboutSection.querySelector(".tab-content.active"))
            aboutSection.querySelector(".tab-content.active").classList.remove("active")
            console.log(aboutSection.querySelector(target))
                // Ativando o novo conteúdo
            aboutSection.querySelector(target).classList.add("active")
        }
    })
})()