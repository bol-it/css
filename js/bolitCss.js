'use strict';
let bolitCss = {
    useLocalStorage:false,
    useDarkMode:false,
    darkMode:false,
    saveLocalStorage: function() {
        let bolitCSetting = {
            useLocalStorage: bolitCss.useLocalStorage,
            darkMode: bolitCss.darkMode,
        }
        localStorage.setItem('bolitCss', JSON.stringify(bolitCSetting));
    },
    loadLocalStorage: function() {
        let bolitCSetting = localStorage.getItem('bolitCss');
        if (!(bolitCSetting == null)) {
            bolitCSetting = JSON.parse(bolitCSetting);
            bolitCss.darkMode = bolitCSetting.darkMode;
            if ((bolitCss.darkMode) && (!(document.body.classList.contains('dark-mode'))))
            {
                bolitCss.darkLight();
            }
        }
    },
    clearLocalStorage:function() {
        localStorage.removeItem('bolitCss');
    },
    scrollStickyHeader:function() {
        let header = document.getElementById("top_header");
        let sticky = header.offsetTop;
        window.addEventListener('scroll', () => {
            this.scrollSticky()
        });
        this.scrollSticky = () => {
            if (window.pageYOffset > sticky) {
                header.classList.add("b-sticky");
            } else {
                header.classList.remove("b-sticky");
            }
        }
    },
    scrollSToUP:function() {
        let btn_to_up = document.getElementById("btn_to_up");
        document.addEventListener('scroll', () => {
            this.handleScroll();
        });
        this.handleScroll = () => {
            let scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            let GOLDEN_RATIO = 0.5;
            if ((document.documentElement.scrollTop / scrollableHeight ) > GOLDEN_RATIO) {
                if(!btn_to_up.classList.contains("b-showScrollBtn"));
                btn_to_up.classList.add("b-showScrollBtn");
            } else {
                if(btn_to_up.classList.contains("b-showScrollBtn"));
                btn_to_up.classList.remove("b-showScrollBtn");
            }
        }
        btn_to_up.addEventListener('click', () => {
            this.scrollToTop();
        });
        this.scrollToTop = () => {
            window.scrollTo({top: 0, behavior: "smooth"});
        }
    },
    darkLight: function() {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            if (bolitCss.useLocalStorage) {
                bolitCss.darkMode = false;
                bolitCss.saveLocalStorage();
            }
        }
        else {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            if (bolitCss.useLocalStorage) {
                bolitCss.darkMode = true;
                bolitCss.saveLocalStorage();
            }
        }
    },
    toggleLeftSidebar: function() {
        let x = document.getElementById("leftsidebar");
        let s = document.getElementById("sideBarOverlay");
        const screenWidth = window.outerWidth;
        if (x) {
            if (x.className.indexOf("b-hide-side") == -1) {
                x.classList.add('b-hide-side');
                if (screenWidth <= 768) {
                    bolitCss.toggleCloseSidebar();
                }
            } else {
                x.classList.remove("b-hide-side");
                //console.log(screenWidth);
                if (screenWidth <= 768) {
                    if (s) {
                        if (s.className.indexOf("b-show-over-side") == -1) {
                            s.classList.add('b-show-over-side');
                        }
                    }
                }
            }
        }
    },
    toggleRightSidebar: function() {
        let x = document.getElementById("rightsidebar");
        let s = document.getElementById("sideBarOverlay");
        const screenWidth = window.outerWidth;
        if (x) {
            if (x.className.indexOf("b-hide-side-right") == -1) {
                x.classList.add('b-hide-side-right');
                if (screenWidth <= 768) {
                    bolitCss.toggleCloseSidebar();
                }
            } else {
                x.classList.remove("b-hide-side-right");
                if (screenWidth <= 768) {
                    if (s) {
                        if (s.className.indexOf("b-show-over-side") == -1) {
                            s.classList.add('b-show-over-side');
                        }
                    }
                }
            }
        }
    },
    toggleCloseSidebar: function() {
        let l = document.getElementById("leftsidebar");
        let r = document.getElementById("rightsidebar");
        let s = document.getElementById("sideBarOverlay");
        if (l) {
            if (l.className.indexOf("b-hide-side") == -1) {
                l.classList.add('b-hide-side');
            }
        }
        if (r) {
            if (r.className.indexOf("b-hide-side-right") == -1) {
                r.classList.add('b-hide-side-right');
            }
        }
        if (s) {
            if (s.className.indexOf("b-show-over-side") != -1) {
                s.classList.remove('b-show-over-side');
            }
        }
    },
    toggleTab:function(e, id = null, style = null) {
        if (!style) {
            style = {
                tabClass: '', activeTabClass: 'b-active', activeTabPanel: ''
            };
        }
        if (id) {
            let target = e.target;
            let parentElements = target.parentElement;
            let tabs = [];
            for (let index = 0; index < parentElements.children.length; index++) {
                if (parentElements.children[index].className.indexOf("b-tab") !== -1) tabs.push(parentElements.children[index]);
            }
            for (let i = 0; i < tabs.length; i++) {
                tabs[i].classList.remove(style.activeTabClass);
                if (style.tabClass.length > 0) {
                    if (tabs[i].className.indexOf(style.tabClass) == -1) {
                        if (style.tabClass.length > 0) tabs[i].classList.add(style.tabClass);
                    }
                }
            }
            if (style.tabClass.length > 0) target.classList.remove(style.tabClass);
            if (style.activeTabClass.length > 0) target.classList.add(style.activeTabClass);
            let tabset = parentElements.parentElement;
            let btabpanels = null;
            for (let index = 0; index < tabset.children.length; index++) {
                if (tabset.children[index].className.indexOf("b-tabpanels") !== -1) btabpanels = tabset.children[index];
            }
            let tabpanels = [];
            for (let index = 0; index < btabpanels.children.length; index++) {
                if (btabpanels.children[index].className.indexOf("b-tab-panel") !== -1) tabpanels.push(btabpanels.children[index]);
            }
            for (let i = 0; i < tabpanels.length; i++) {
                if (style.activeTabPanel.length > 0) tabpanels[i].classList.remove(style.activeTabPanel);
                tabpanels[i].classList.remove("b-show");
            }
            let tabpanel = document.getElementById(id);
            if (style.activeTabPanel.length > 0) {
                if (tabpanel.className.indexOf(style.activeTabPanel) == -1) {
                    if (style.activeTabPanel.length > 0) tabpanel.classList.add(style.activeTabPanel);
                }
            }
            if (tabpanel.className.indexOf("b-show") == -1) {
                tabpanel.classList.add("b-show");
            }
        }
    },
    Timer:function(callback, delay) {
        let timerId, start, remaining = delay;
        this.resume = () => {
            start = new Date();
            timerId = setTimeout(() => {
                remaining = delay;
                this.resume();
                callback();
            }, remaining);
        };
        this.pause = () => {
            clearTimeout(timerId);
            remaining -= new Date() - start;
        };
        this.become = () => {
            clearTimeout(timerId);
            remaining = delay;

            this.resume();
        };
        this.resume();
    },
    slidershow:function(sliderContainer, setting) {
        let privates = {}, xDown, yDown, xUp, yUp, xDiff, yDiff;
        privates.default = {
            "prev": ".b-slide-prev",
            "next": ".b-slide-next",
            "count": 5,
            "count_view": 4,
            "indicators": ".b-slide-indicators",
            "touch": false,
        };
        privates.setting = Object.assign(privates.default, setting);
        privates.isAnimationEnd = true;
        privates.sel = {
            "sliderContainer": sliderContainer,
            "indicator_container": sliderContainer.querySelector(privates.setting.indicators),
            "indicators": sliderContainer.querySelector(privates.setting.indicators).children,
            "count": privates.setting.count,
            "prev": sliderContainer.querySelector(privates.setting.prev),
            "next": sliderContainer.querySelector(privates.setting.next),
            "width_indicators": 150,
            "count_view": privates.setting.count_view,
        };

        if (privates.sel.indicators !== null) {
            if (privates.sel.sliderContainer !== null) {
                if (privates.sel.sliderContainer.hasAttribute("data-count-slide")) {
                    let countSlide = parseInt(privates.sel.sliderContainer.dataset.countSlide, 10);
                    if ((countSlide) && (countSlide < 20)) {
                        privates.sel.count_view = countSlide;
                        privates.sel.count = countSlide + 1;
                        privates.sel.sliderContainer.style.setProperty('--count-slide-indicator', countSlide);
                    }
                }
                if (privates.sel.sliderContainer.offsetWidth > 0) {
                    let count_elements = privates.sel.count_view + 1;
                    let width_indicators = Math.floor(privates.sel.sliderContainer.offsetWidth / count_elements);
                    if (width_indicators > 100) {
                        privates.sel.width_indicators = width_indicators;
                        privates.sel.sliderContainer.style.setProperty('--w-slide-indicator', `${width_indicators}px`);
                    }
                }
                if (privates.sel.sliderContainer.hasAttribute("data-use-width-main-content")) {
                    let main_content = document.getElementsByClassName("b-main-content");
                    if (main_content !== undefined) {
                        let width_main = main_content[0].offsetWidth;
                        if (width_main > 50) {
                            width_main = width_main - 40;
                            let count_elements = privates.sel.count_view + 1;
                            let width_indicators = Math.floor(width_main / count_elements);
                            if (width_indicators > 100) {
                                privates.sel.width_indicators = width_indicators;
                                privates.sel.sliderContainer.style.setProperty('--w-slide-indicator', `${width_indicators}px`);
                            }
                        }
                    }
                }
            }
            privates.opt = {
                "position": 0,
                "count": privates.sel.count,
                "max_position": privates.sel.indicators.length - privates.sel.count + 1
            };
        }
        else {
            privates.opt = {
                "position": 0,
                "count": 0,
                "max_position": 0
            };
        }
        this.index = () => {
            return privates.opt.position;
        };
        this.start_slider = () => {
            if (privates.sel.indicators.length < privates.opt.count) {
                privates.sel.prev.style.display = "none";
                privates.sel.next.style.display = "none";
            }
            for (let index = 0; index < privates.sel.indicators.length; index++) {
                let element = privates.sel.indicators[index];
                element.style.position = 'relative';
            }
        };
        this.show_slider = () => {
            let position = - privates.sel.width_indicators * privates.opt.position;
            if (privates.opt.position == 0) {
                privates.sel.prev.classList.add('b-disabled');
            }
            else {
                privates.sel.prev.classList.remove('b-disabled');
            }
            if (privates.opt.position == privates.opt.max_position) {
                privates.sel.next.classList.add('b-disabled');
            }
            else {
                privates.sel.next.classList.remove('b-disabled');
            }
            privates.sel.indicator_container.style.marginLeft = position + 'px';
        };
        this.gotoS = (index) => {
            if (privates.opt.position != index) {
                if (index == privates.sel.indicators.length) index = 0;
                privates.opt.position = index;
                if (privates.opt.position > privates.opt.max_position) {
                    privates.opt.position = privates.opt.max_position;
                }
                this.show_slider();
            }
        };
        this.prev_slider = () => {
            if (privates.opt.max_position == 0) return;
            if (privates.opt.position == 0) return;
            privates.opt.position--;
            this.show_slider();
        };
        this.next_slider = () => {
            if (privates.opt.max_position == 0) return;
            if (privates.opt.position == privates.opt.max_position) return;
            privates.opt.position++;
            this.show_slider();
        };
        // Control
        if(privates.sel.prev !== null) {
            privates.sel.prev.addEventListener('click', () => {
                this.prev_slider();
            });
        }
        if(privates.sel.next !== null) {
            privates.sel.next.addEventListener('click', (event) => {
                this.next_slider();
            });
        }
        if (privates.sel.indicators !== null) {
            this.start_slider();
            this.show_slider();
        }
        return this;
    },
    slideshow:function(slideshowContainer, setting, lightbox = false) {
        let privates = {}, xDown, yDown, xUp, yUp, xDiff, yDiff;
        let sm = null;
        let lightbox_indicators = [];
        privates.default = {
            "wrap": ".b-slideshow-wrap",
            "prev": ".b-slideshow-prev",
            "next": ".b-slideshow-next",
            "indicators": ".b-slideshow-indicators",
            "slide_container": ".b-slide-container",
            "gallery": false,
            "touch": false,
            "autoplay": false,
            "autoplayDelay": 3000,
            "pauseOnFocus": true,
            "pauseOnHover": true
        };
        privates.setting = Object.assign(privates.default, setting);
        privates.isAnimationEnd = true;
        privates.sel = {
            "slideshowContainer": slideshowContainer,
            "wrap": slideshowContainer.querySelector(privates.setting.wrap),
            "children": slideshowContainer.querySelector(privates.setting.wrap).children,
            "indicator_container": slideshowContainer.querySelector(privates.setting.indicators),
            "slide_container": slideshowContainer.querySelector(privates.setting.slide_container),
            "indicators": slideshowContainer.querySelector(privates.setting.indicators).children,
            "prev": slideshowContainer.querySelector(privates.setting.prev),
            "next": slideshowContainer.querySelector(privates.setting.next)
        };
        if (slideshowContainer.hasAttribute("data-autoplay")) {
            let auto = slideshowContainer.dataset.autoplay;
            if (auto == 'true') privates.setting.autoplay = true;
        }
        if (slideshowContainer.hasAttribute("data-touch")) {
            let auto = slideshowContainer.dataset.touch;
            if (auto == 'true') privates.setting.touch = true;
        }
        if (privates.setting.gallery) {
            if (privates.sel.slide_container) {
                sm = new bolitCss.slidershow(privates.sel.slide_container);
            }
        }
        if (privates.sel.children !== null) {
            privates.opt = {
                "position": 0,
                "max_position": privates.sel.children.length
            };
        }
        else {
            privates.opt = {
                "position": 0,
                "max_position": 0
            };
        }
        this.indicator_change = () => {
            if (privates.sel.indicators !== null) {
                for (let i = 0; i < privates.sel.indicators.length; i++) {
                    privates.sel.indicators[i].classList.remove('b-active');
                }
                if (privates.opt.position < privates.opt.max_position) {
                    privates.sel.indicators[privates.opt.position].classList.add('b-active');
                }
                else {
                    privates.sel.indicators[0].classList.add('b-active');
                }
            }
        };
        this.auto_creator_indicator = () => {
            while (privates.sel.indicator_container.firstChild) {
                privates.sel.indicator_container.firstChild.remove()
            }
            for (let i = 0; i < privates.sel.children.length; i++) {
                let span = document.createElement('span');
                span.className = "b-dot";
                span.dataset.slideTo = i;
                privates.sel.indicator_container.append(span);
            }
            privates.sel.indicators = privates.sel.indicator_container.children;
            this.indicator_change();
        };
        this.auto_creator_control = () => {
            if (privates.sel.prev == null) {
                let span = document.createElement('span');
                let i = document.createElement('i');
                span.className = "b-slideshow-prev";
                i.className = "b-slideshow-icon b-arrow b-arrow-left";
                span.append(i);
                slideshowContainer.append(span);
                privates.sel.prev = slideshowContainer.querySelector(privates.setting.prev);
            }
            if (privates.sel.next == null) {
                let span = document.createElement('span');
                let i = document.createElement('i');
                span.className = "b-slideshow-next";
                i.className = "b-slideshow-icon b-arrow b-arrow-right";
                span.append(i);
                slideshowContainer.append(span);
                privates.sel.next = slideshowContainer.querySelector(privates.setting.next);
            }
        };
        if (slideshowContainer.hasAttribute("data-autocontrol")) {
            let auto = slideshowContainer.dataset.autocontrol;
            if (auto == 'true') this.auto_creator_control();
        }
        if (privates.sel.indicator_container !== null) {
            if (privates.sel.indicator_container.hasAttribute("data-auto-indicator")) {
                let auto = privates.sel.indicator_container.dataset.autoIndicator;
                if (auto == 'true') this.auto_creator_indicator();
            }
        }
        privates.sel.wrap.appendChild(privates.sel.children[0].cloneNode(true));

        this.goto = (index) => {
            if (index != privates.opt.position) {
                privates.opt.position = index - 1;
                this.next_slide();
            }
        };
        this.index = () => {
            return privates.opt.position;
        };
        this.prev_slide = () => {
            if (privates.opt.max_position == 0) return;
            if(!privates.isAnimationEnd) {
                return;
            }
            privates.isAnimationEnd = false;
            --privates.opt.position;
            if(privates.opt.position < 0) {
                privates.sel.wrap.classList.add('b-s-notransition');
                privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.max_position}00%)`;
                privates.opt.position = privates.opt.max_position - 1;
            }
            if (sm) {
                sm.gotoS(privates.opt.position);
            }
            this.indicator_change();
            setTimeout(() => {
                privates.sel.wrap.classList.remove('b-s-notransition');
                privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
            }, 10);
            privates.sel.wrap.addEventListener('transitionend', () => {
                privates.isAnimationEnd = true;
            });
            if(privates.setting.autoplay === true) {
                privates.timer.become();
            }
        };
        this.next_slide = () => {
            if (privates.opt.max_position == 0) return;
            if(!privates.isAnimationEnd) {
                return;
            }
            privates.isAnimationEnd = false;
            if(privates.opt.position < privates.opt.max_position) {
                ++privates.opt.position;
            }
            this.indicator_change();
            privates.sel.wrap.classList.remove('b-s-notransition');
            privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
            privates.sel.wrap.addEventListener('transitionend', () => {
                if(privates.opt.position >= privates.opt.max_position) {
                    privates.sel.wrap.style["transform"] = 'translateX(0)';
                    privates.sel.wrap.classList.add('b-s-notransition');
                    privates.opt.position = 0;
                }
                privates.isAnimationEnd = true;
            });
            if (sm) {
                sm.gotoS(privates.opt.position);
            }
            if(privates.setting.autoplay === true) {
                privates.timer.become();
            }
        };
        this.pause = () => {
            if(privates.setting.autoplay === true) {
                privates.timer.pause();
            }
        };
        this.become = (autoplayDelay = privates.setting.autoplayDelay) => {
            if(privates.setting.autoplay === true) {
                privates.setting.autoplayDelay = autoplayDelay;
                privates.timer.become();
            }
        };
        privates.hts = (e) => {
            xDown = e.touches[0].clientX;
            yDown = e.touches[0].clientY;
        };
        privates.htm = (e) => {
            if ( ! xDown || ! yDown ) {
                return;
            }
            xUp = e.touches[0].clientX;
            yUp = e.touches[0].clientY;

            xDiff = xDown - xUp;
            yDiff = yDown - yUp;

            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
                if ( xDiff > 0 ) {
                    this.next_slide();
                } else {
                    this.prev_slide();
                }
            }

            xDown = 0;
            yDown = 0;
        }
        if(privates.setting.autoplay === true) {
            privates.timer = new bolitCss.Timer(this.next_slide, privates.setting.autoplayDelay);
        }
        // Control
        if(privates.sel.prev !== null) {
            privates.sel.prev.addEventListener('click', () => {
                this.prev_slide();
            });
        }
        if(privates.sel.next !== null) {
            privates.sel.next.addEventListener('click', () => {
                this.next_slide();
            });
        }
        if (lightbox) {
            const id_lightbox = slideshowContainer.id;
            let l_indicators = document.getElementsByClassName("b-lightbox-img");
            for (let index = 0; index < l_indicators.length; index++) {
                let element = l_indicators[index];
                if (element.hasAttribute("data-target-lightbox")) {
                    if (element.dataset.targetLightbox == id_lightbox) {
                        if (element.hasAttribute("data-slide-to")) {
                            lightbox_indicators.push(element);
                        }
                    }
                }
            }
            if (lightbox_indicators.length > 0) {
                for (let i = 0; i < lightbox_indicators.length; i++) {
                    lightbox_indicators[i].addEventListener('click', (event) => {
                        let target = event.currentTarget;
                        if (target.hasAttribute("data-slide-to")) {
                            let index = target.dataset.slideTo;
                            this.goto(index);
                        }
                    });
                }
            }
        }
        if(privates.sel.indicators !== null) {
            for (let i = 0; i < privates.sel.indicators.length; i++) {
                privates.sel.indicators[i].addEventListener('click', (event) => {
                    let target = event.currentTarget;
                    if (target.hasAttribute("data-slide-to")) {
                        let index = target.dataset.slideTo;
                        this.goto(index);
                    }
                });
            }
        }
        if(privates.setting.touch === true) {
            privates.sel.slideshowContainer.addEventListener('touchstart', privates.hts, false);
            privates.sel.slideshowContainer.addEventListener('touchmove', privates.htm, false);
        }
        if(privates.setting.autoplay === true && privates.setting.pauseOnHover === true) {
            privates.sel.slideshowContainer.addEventListener('mouseenter', () => {
                privates.timer.pause();
            });

            privates.sel.slideshowContainer.addEventListener('mouseleave', () => {
                privates.timer.become();
            });
        }
    },
    toggleDisplay:function(target) {
        let element = document.getElementById(target);
        if (element != null) {
            element.style.display = element.style.display === 'none' ? '' : 'none';
        }
    },
    toggleShowHideByClass:function(target) {
        let element = document.getElementById(target);
        if (element != null) {
            if (element.classList.contains('b-hide')) {
                element.classList.remove('b-hide');
            }
            else {
                element.classList.add('b-hide');
            }
        }
    },
    closeModal:function(target) {
        let modal = document.getElementById(target);
        if (modal != null) {
            let modalcontent = modal.querySelector('.b-modal-content');
            let modalIn = null;
            let modalOut = null;
            if (modalcontent) {
                if (modalcontent.hasAttribute("data-modal-in")) {
                    modalIn = modalcontent.dataset.modalIn;
                }
                if (modalcontent.hasAttribute("data-modal-out")) {
                    modalOut = modalcontent.dataset.modalOut;
                }
            }
            if (modalIn) {
                modalcontent.classList.remove(modalIn);
            }
            if (modalOut) {
                modalcontent.classList.add(modalOut);
                setTimeout(() => {
                    modalcontent.classList.remove(modalOut);
                    modal.classList.remove('b-flex');
                }, 300);
            }
            else {
                modal.classList.remove('b-flex');
            }
        }
    },
    toggleModal:function(target) {
        let modal = document.getElementById(target);
        if (modal != null) {
            let modalcontent = modal.querySelector('.b-modal-content');
            let modalIn = null;
            let modalOut = null;
            if (modalcontent) {
                if (modalcontent.hasAttribute("data-modal-in")) {
                    modalIn = modalcontent.dataset.modalIn;
                }
                if (modalcontent.hasAttribute("data-modal-out")) {
                    modalOut = modalcontent.dataset.modalOut;
                }
            }
            if (modalOut) modalcontent.classList.remove(modalOut);
            if (modalIn) {
                modalcontent.classList.remove(modalIn);
                modalcontent.classList.add(modalIn);
            }
            modal.classList.remove("b-flex");
            modal.classList.add("b-flex");
            modal.focus();
        }
    },
    toggleLightbox:function(target) {
        let modal = document.getElementById(target);
        if (modal != null) {
            let modal_content = modal.querySelector('.b-modal-content');
            if (modal_content) {
                const pageWidth = document.documentElement.scrollWidth;
                const pageHeight = document.documentElement.scrollHeight;
                let width_content = Math.floor(pageHeight * 1.77 * 0.75);
                width_content = width_content - 110;
                if (width_content < 750) width_content = 750;
                modal_content.style.width = width_content + 'px';
                //console.log(width_content);
                bolitCss.toggleModal(target);
            }
        }
    },
    modal:function(modalContainer) {
        let modalcontent = modalContainer.querySelector('.b-modal-content');
        let modalIn = null;
        let modalOut = null;
        this.close = () => {
            if (modalIn) {
                modalcontent.classList.remove(modalIn);
            }
            if (modalOut) {
                modalcontent.classList.add(modalOut);
                setTimeout(() => {
                    modalcontent.classList.remove(modalOut);
                    modalContainer.classList.remove('b-flex');
                }, 300);
            }
            else {
                modalContainer.classList.remove('b-flex');
            }
        };
        if (modalcontent) {
            if (modalcontent.hasAttribute("data-modal-in")) {
                modalIn = modalcontent.dataset.modalIn;
            }
            if (modalcontent.hasAttribute("data-modal-out")) {
                modalOut = modalcontent.dataset.modalOut;
            }
        }
        let closemodals = modalContainer.querySelectorAll("[data-close-modal]");
        for (let i = 0; i < closemodals.length; i++) {
            closemodals[i].addEventListener('click', (event) => {
                this.close();
            });
        }
        if (!modalContainer.hasAttribute("data-mode-persistent")) {
            modalContainer.addEventListener('click', (event) => {
                if (event.target == event.currentTarget) this.close();
            });
            modalContainer.addEventListener('keydown', (event) => {
                if (event.keyCode == 27 ) {
                    this.close();
                }
            });
        }
    },
    snackbar:function(snackbarContainer) {
        let bsnackbar = snackbarContainer.querySelector(".b-snackbar");
        this.closeSnackbar = (event) => {
            let target = event.target;
            let parent = target.parentElement;
            while (!parent.classList.contains("b-snackbar")) {
                parent = parent.parentElement;
            }
            parent.classList.remove("b-snackbar-show");
        };
        let closesnackbar = snackbarContainer.querySelectorAll("[data-close-snackbar]");
        for (let i = 0; i < closesnackbar.length; i++) {
            closesnackbar[i].addEventListener('click', (event) => {
                this.closeSnackbar(event);
            });
        }
    },
    toggleSnackbar:function(setting) {
        let privates = {};
        privates.default = {
            "position": "bottom",
            "classSnackbar": null,
            "text": "test",
            "classClose": "b-closebtn b-closebtn-lg b-display-topright b-pa-0",
            "isprogress": true,
            "isclose": true,
            "width": null
        };
        privates.setting = Object.assign(privates.default, setting);
        let snackbarContainer = document.querySelector('.b-snackbar-container');
        if (snackbarContainer !== null) {
            let snackbarRoot = document.createElement('div');
            snackbarRoot.className = "b-snackbar-root";
            let snackbar = document.createElement('div');
            snackbar.className = "b-snackbar";
            snackbar.classList.add("b-snackbar-show");
            switch (privates.setting.position) {
                case 'bottom':
                    snackbar.classList.add("b-bottom");
                break;
                case 'top':
                    snackbar.classList.add("b-top");
                break;
                default:
                    snackbar.classList.add("b-bottom");
                break;
            }
            if (privates.setting.classSnackbar) {
                snackbar.classList.add(privates.setting.classSnackbar);
            }
            if (privates.setting.width) {
                snackbar.style.width = privates.setting.width;
            }
            if (privates.setting.isclose) {
                let span = document.createElement('span');
                span.className = privates.setting.classClose;
                span.dataset.closeSnackbar = '';
                snackbar.append(span);
            }
            let pText = document.createElement('p');
            pText.innerText = privates.setting.text;
            snackbar.append(pText);
            if (privates.setting.isprogress) {
                let progress = document.createElement('div');
                progress.className = "b-tn-progress";
                snackbar.append(progress);
            }
            snackbarRoot.append(snackbar);
            snackbarContainer.append(snackbarRoot);
            bolitCss.snackbar(snackbarRoot);
        }
    },
    slider:function(sliderContainer) {
        let slider = sliderContainer.querySelector('input[type="range"]');
        let output = sliderContainer.querySelector('.b-slider-value');
        output.innerHTML = slider.value;
        slider.oninput = function() {
          output.innerHTML = this.value;
        }
    },
    select:function(selectContainer) {
        this.isSelectOpen = false;
        this.close = (event) => {
           let target = event.target;
           this.isSelectOpen = false;
           target.blur();
        };
        selectContainer.addEventListener('change', (event) => {
            this.close(event);
        });
        selectContainer.addEventListener('focus', (event) => {
            this.isSelectOpen = true;
        });
        selectContainer.addEventListener('click', (event) => {
            this.isSelectOpen = !this.isSelectOpen;
            if (this.isSelectOpen) {
                this.close(event);
            }
        });

    },
    toasts:function(toastsContainer) {
        this.closeToasts = (event) => {
            let target = event.target;
            let parent = target.parentElement;
            while (!parent.classList.contains("b-toasts")) {
                parent = parent.parentElement;
            }
            parent.classList.remove("b-toasts-show");
        };
        let closetoasts = toastsContainer.querySelectorAll("[data-close-toasts]");
        for (let i = 0; i < closetoasts.length; i++) {
            closetoasts[i].addEventListener('click', (event) => {
                this.closeToasts(event);
            });
        }
    },
    toggleToasts:function(setting) {
        let privates = {};
        privates.default = {
            "classToasts": null,
            "header": "header",
            "text": "test",
            "classClose": "b-closebtn b-display-topright b-pa-0",
            "isclose": true
        };
        privates.setting = Object.assign(privates.default, setting);
        let toastsContainer = document.querySelector('.b-toasts-container');
        if (toastsContainer !== null) {
            let toastsRoot = toastsContainer.querySelector('.b-toasts-root');
            let newToasts = false;
            if (toastsRoot == null) {
                newToasts = true;
                toastsRoot = document.createElement('div');
                toastsRoot.className = "b-toasts-root";
            }
            let toasts = document.createElement('div');
            toasts.className = "b-toasts";
            toasts.classList.add("b-toasts-show");
            if (privates.setting.classToasts) {
                toasts.classList.add(privates.setting.classToasts);
            }
            if (privates.setting.isclose) {
                let span = document.createElement('span');
                span.className = privates.setting.classClose;
                span.dataset.closeToasts = '';
                toasts.append(span);
            }
            if (privates.setting.header) {
                let h4 = document.createElement('h4');
                h4.innerText = privates.setting.header;
                toasts.append(h4);
            }
            let pText = document.createElement('p');
            pText.innerText = privates.setting.text;
            toasts.append(pText);

            toastsRoot.prepend(toasts);
            if (newToasts) toastsContainer.append(toastsRoot);
            bolitCss.toasts(toasts);
        }
    },
    accordion:function(accordionContainer) {
        this.close = (event) => {
            let target = event.target;
            if (target.open) {
                let parent = target.parentElement;
                while (!parent.classList.contains("b-accordion")) {
                    parent = parent.parentElement;
                }
                let details = parent.querySelectorAll(".b-accordion > details[open]");
                for (let i = 0; i < details.length; i++) {
                    if (details[i] != target) {
                        details[i].open = false;
                    }
                }
            }
        };
        let closesnackbar = accordionContainer.getElementsByClassName("b-collapse");
        for (let i = 0; i < closesnackbar.length; i++) {
            closesnackbar[i].addEventListener('toggle', (event) => {
                this.close(event);
            });
        }
    },
    fileInput:function(fileContainer) {
        let inputFile = fileContainer.querySelector('input[type="file"]');
        let fileNameText = fileContainer.querySelector('.b-file-name-text');
        let buttonFile = fileContainer.querySelector('.b-file-input');
        let labelFile =  fileContainer.querySelector('label');
        if (inputFile.files.length == 0) {
            labelFile.dataset.content = '';
            if (inputFile.hasAttribute('multiple')) {
                fileNameText.innerText = 'Файлы не выбраны';
            }
            else {
                fileNameText.innerText = 'Файл не выбран';
            }
        }
        this.handleFiles = (event, mode = 'change') => {
            let target = event.target;
            let files = [];
            if (mode == 'drop') {
                event.preventDefault();
                buttonFile.classList.remove('b-grey-d-2');
                if (inputFile.hasAttribute('multiple')) {
                    files = event.dataTransfer.files;
                    inputFile.files = files;
                }
                else {
                    let dt  = new DataTransfer();
                    dt.items.add(event.dataTransfer.files[0]);
                    files = dt.files;
                    //console.log(files);
                    inputFile.files = files;
                    //inputFile.files = files[0];
                }
            }
            else {
                files = target.files;
            }
            function formatBytes(bytes, decimals = 2) {
                if (bytes === 0) return '0 Bytes';
                const k = 1024;
                const dm = decimals < 0 ? 0 : decimals;
                const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                const i = Math.floor(Math.log(bytes) / Math.log(k));
                return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
            }
            if (files.length > 1) {
                const lastDigit = files.length % 10;
                let sumSize = 0;
                for (let index = 0; index < files.length; index++) {
                    sumSize += files[index].size;
                }
                labelFile.dataset.content = 'Размер: ' + formatBytes(sumSize);
                if (lastDigit == 1 ) {
                    fileNameText.innerText = `Выбран ${files.length} файл`;
                }
                else {
                    if (lastDigit <= 4 ) {
                        if ((files.length < 14) && (files.length > 9)) {
                            fileNameText.innerText = `Выбрано ${files.length} файлов`;
                        }
                        else {
                            fileNameText.innerText = `Выбрано ${files.length} файла`;
                        }
                    }
                    if (lastDigit > 4 )  {
                        fileNameText.innerText = `Выбрано ${files.length} файлов`;
                    }
                }
            }
            else if (files.length == 1) {
                fileNameText.innerText = files[0].name;
                labelFile.dataset.content = 'Размер: ' + formatBytes(files[0].size);
            }
            else if (files.length == 0) {
                fileNameText.innerText = 'Файл не выбран';
                labelFile.dataset.content = '';
            }
        }
        inputFile.addEventListener("change",(event) => {
            this.handleFiles(event);
        }, false);
        if (inputFile.hasAttribute("data-drag-drop")) {
            if (typeof (window.FileReader) == 'undefined') {
                console.error('Drag&Drop Не поддерживается браузером!');
            }
            else {
                // Событие - перетаскивания файла
                labelFile.ondragover = function () {
                    buttonFile.classList.add('b-grey-d-2');
                    return false;
                };
                // Событие - отмена перетаскивания файла
                labelFile.ondragleave = function () {
                    buttonFile.classList.remove('b-grey-d-2');
                    return false;
                };
                labelFile.addEventListener('drop',(event) => {
                    this.handleFiles(event, "drop");
                }, false);
            }
        }
    },
    closeParent:function(container) {
        this.close = (event) => {
            let target = event.target;
            target.parentElement.style.display='none';
        }
        container.addEventListener('click', (event) => {
            this.close(event);
        })
    },
    toggleClear:function(target) {
        let clear = document.getElementById(target);
        if (clear != null) {
            if ((clear.tagName.toLowerCase() == 'input') || (clear.tagName.toLowerCase() == 'textarea')) clear.value = '';
        }
    },
    getSelectionText:function() {
        let selectedText = "";
        if (window.getSelection) {
            selectedText = window.getSelection().toString();
        }
        return selectedText;
    },
    selectElementText:function(el) {
        let range = document.createRange();
        range.selectNodeContents(el);
        let selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        let selectedText = bolitCss.getSelectionText();
        selection.removeAllRanges();
        return selectedText;
    },
    toggleCopy:function(target) {
        let copy = document.getElementById(target);
        let succesSettings = {
            "classToasts": 'b-success',
            "header": "",
            "text": "Успешно скопировано",
            "classClose": "b-closebtn b-display-topright b-pa-0",
            "isclose": true
        };
        let errorSettings = {
            "classToasts": 'b-error',
            "header": "",
            "text": "Ошибка при копировании",
            "classClose": "b-closebtn b-display-topright b-pa-0",
            "isclose": true
        };
        if (copy != null) {
            if ((copy.tagName.toLowerCase() == 'input') || (copy.tagName.toLowerCase() == 'textarea')) {
                navigator.clipboard.writeText(copy.value).then(() => {bolitCss.toggleToasts(succesSettings);},() => {bolitCss.toggleToasts(errorSettings);});
            }
            else {
                let selectedText = '';
                selectedText = bolitCss.selectElementText(copy);
                navigator.clipboard.writeText(selectedText).then(() => {bolitCss.toggleToasts(succesSettings);},() => {bolitCss.toggleToasts(errorSettings);});
            }
        }
    },
    scroll:function(el) {
        el.style.scrollBehavior = "smooth";
        let div = document.createElement('div');
        div.style.position = "absolute";
        div.style.left = "100%";
        div.style.top = "105%";
        div.style.margin = "-3em";
        div.style.display = "none";
        let btn = document.createElement('button');
        btn.className = "b-btn-icon b-btn-convex";
        btn.style.position = "fixed";
        let i = document.createElement('i');
        i.className = "b-r-arrow b-arrow-up";
        btn.append(i);
        div.append(btn);
        el.append(div);
        this.onScroll = (event) => {
            let target = event.target;
            const screenHeight = window.screen.height;
            if (target.scrollTop > Math.round(screenHeight / 2)) {
                div.style.display = "block";
              } else {
                div.style.display = "none";
              }
        }
        el.addEventListener('scroll', (event) => {
            this.onScroll(event);
        });
        this.toScroll = (event) => {
            el.scrollTop = 0;
        }
        btn.addEventListener('click', (event) => {
            this.toScroll(event);
        });
    },
    saferEval:function(expression, dataContext) {
        return new Function([], `var result; { result = ${expression} }; return result`)(dataContext);
    },
    toggle:function(toggleComponent) {
        let target = null;
        let settings = null;
        let toggle = toggleComponent.dataset.toggle;
        if (toggleComponent.hasAttribute("data-target")) {
            target = toggleComponent.dataset.target;
        }
        if (toggleComponent.hasAttribute("data-settings")) {
            settings = toggleComponent.dataset.settings;
            let settingsExpression = settings;
            settingsExpression === '' ? '{}' : settingsExpression;
            settings = bolitCss.saferEval(settingsExpression,{});
        }
        toggleComponent.addEventListener('click', (event) => {
            switch (toggle) {
                case 'modal':
                    if (target)  bolitCss.toggleModal(target);
                break;
                case 'lightbox':
                    if (target)  bolitCss.toggleLightbox(target);
                break;
                case 'darkLight':
                    if (bolitCss.useDarkMode) {
                        bolitCss.darkLight();
                    }
                break;
                case 'leftSidebar':
                    bolitCss.toggleLeftSidebar();
                break;
                case 'rightSidebar':
                    bolitCss.toggleRightSidebar();
                break;
                case 'closeSidebar':
                    bolitCss.toggleCloseSidebar();
                break;
                case 'tab':
                    if (target)  bolitCss.toggleTab(event, target, settings);
                break;
                case 'createSnackbar':
                    bolitCss.toggleSnackbar(settings);
                break;
                case 'createToasts':
                    bolitCss.toggleToasts(settings);
                break;
                case 'clear':
                    if (target)  bolitCss.toggleClear(target);
                break;
                case 'copy':
                    if (target)  bolitCss.toggleCopy(target);
                break;
            }
        });
    },
    walkDom:function(el, callback) {
        callback(el);
        el = el.firstElementChild;
        while (el) {
            bolitCss.walkDom(el, callback);
            el = el.nextElementSibling;
        }
    },
    loadDom:function(root) {
        bolitCss.walkDom(root, (el) => {
            let s;
            if (el.classList.contains('b-slideshow-container')) {
                s = new bolitCss.slideshow(el);
            }
            if (el.classList.contains('b-slideshow-gallery-container')) {
                if (!el.hasAttribute("data-lightbox")) {
                    s = new bolitCss.slideshow(el, {
                        "wrap": ".b-slideshow-wrap",
                        "prev": ".b-slideshow-prev",
                        "next": ".b-slideshow-next",
                        "indicators": ".b-slide-indicators",
                        "slide_container": ".b-slide-container",
                        "gallery": true,
                        "touch": false,
                        "autoplay": false,
                        "autoplayDelay": 3000,
                        "pauseOnFocus": true,
                        "pauseOnHover": true
                    });
                }
                else {
                    s = new bolitCss.slideshow(el, {
                        "wrap": ".b-slideshow-wrap",
                        "prev": ".b-slideshow-prev",
                        "next": ".b-slideshow-next",
                        "indicators": ".b-slide-indicators",
                        "slide_container": ".b-slide-container",
                        "gallery": true,
                        "touch": false,
                        "autoplay": false,
                        "autoplayDelay": 3000,
                        "pauseOnFocus": true,
                        "pauseOnHover": true
                    }, true);
                }
            }
            if (el.classList.contains('b-slide-container')) {
                if (el.hasAttribute("data-slider")) {
                    s = new bolitCss.slidershow(el);
                }
            }
            if (el.classList.contains('b-modal')) {
                s = new bolitCss.modal(el);
            }
            if (el.classList.contains('b-snackbar-root')) {
                s = new bolitCss.snackbar(el);
            }
            if (el.classList.contains('b-toasts')) {
                s = new bolitCss.toasts(el);
            }
            if (el.classList.contains('b-slider')) {
                s = new bolitCss.slider(el);
            }
            if (el.classList.contains('b-select')) {
                s = new bolitCss.select(el);
            }
            if (el.classList.contains('b-accordion')) {
                s = new bolitCss.accordion(el);
            }
            if (el.classList.contains('b-main-file')) {
                s = new bolitCss.fileInput(el);
            }
            if (el.hasAttribute("data-toggle")) {
                s = new bolitCss.toggle(el);
            }
            if (el.hasAttribute("data-close-parent")) {
                s = new bolitCss.closeParent(el);
            }
            if (el.hasAttribute("data-scroll")) {
                s = new bolitCss.scroll(el);
            }
            if (el.hasAttribute("data-use-local-storage")) {
                bolitCss.useLocalStorage = true;
                bolitCss.loadLocalStorage();
            }
            if (el.hasAttribute("data-use-dark-mode")) {
                if (el === document.body) {
                    bolitCss.useDarkMode = true;
                }
            }
        });
    },
    init:function() {
        let p;
        if (document.getElementById('top_header')) {
            p = new bolitCss.scrollStickyHeader();
        }
        if (document.getElementById('btn_to_up')) {
            p = new bolitCss.scrollSToUP();
        }
        bolitCss.loadDom(document.body);
        document.addEventListener('keydown', function(event){
            if (!(document.querySelector("input:focus") || document.querySelector("textarea:focus") || document.querySelector("select:focus"))) {
                //console.log(event.keyCode);
                if (event.shiftKey && event.keyCode == 68 ) {
                    if (bolitCss.useDarkMode) {
                        bolitCss.darkLight();
                    }
                }
                if (event.shiftKey && event.keyCode == 76 ) {
                    bolitCss.toggleLeftSidebar();
                }
                if (event.shiftKey && event.keyCode == 82 ) {
                    bolitCss.toggleRightSidebar();
                }
            }
        });
        document.body.onclick = (e) => {
            let target = e.target;
            let isDrop = false;
            let its_menu = false;
            let dropdownAll = document.getElementsByClassName('b-main-dropdown');
            for (let index = 0; index < dropdownAll.length; index++) {
                const element = dropdownAll[index];
                its_menu = target == element || element.contains(target);
                isDrop = isDrop || its_menu;
            }
            if (!isDrop) {
                let dropdown = document.body.getElementsByClassName('b-main-dropdown');
                for (let index = 0; index < dropdown.length; index++) {
                    const element = dropdown[index].querySelectorAll("input[type='checkbox']");
                    for (let index = 0; index < element.length; index++) {
                        if (element[index].checked) element[index].checked = false;
                    }
                }
            }
        }
    },
};
document.addEventListener("DOMContentLoaded", () => {bolitCss.init();});