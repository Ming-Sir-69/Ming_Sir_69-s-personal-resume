document.addEventListener('DOMContentLoaded', function() {
    // 创建滚动进度指示器
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);
    
    // 更新滚动进度
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        scrollIndicator.style.width = scrollPercent + '%';
    });

    // 添加页面加载动画
    setTimeout(function() {
        document.getElementById('loading').style.opacity = '0';
        setTimeout(function() {
            document.getElementById('loading').style.display = 'none';
            document.getElementById('app').style.display = 'block';
            
            // 添加内容淡入动画
            setTimeout(function() {
                document.querySelector('.container').classList.add('visible');
                
                // 添加淡入动画到各个元素
                const fadeElements = document.querySelectorAll('.fade-in');
                fadeElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, 100 * index);
                });
            }, 100);
        }, 500);
    }, 800);

    // 创建鼠标跟随效果
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    const cursorOutline = document.createElement('div');
    cursorOutline.className = 'cursor-outline';
    document.body.appendChild(cursorOutline);

    document.addEventListener('mousemove', function(e) {
        // 鼠标点
        cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        
        // 鼠标外环延迟跟随
        setTimeout(() => {
            cursorOutline.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        }, 50);
    });

    // 鼠标悬停交互
    const allLinks = document.querySelectorAll('a, button, .nav-item, .social-link, .contact-btn, .project-link a');
    
    allLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.opacity = '0.7';
            cursorDot.style.opacity = '0.9';
        });
        
        link.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '30px';
            cursorOutline.style.height = '30px';
            cursorOutline.style.opacity = '0.5';
            cursorDot.style.opacity = '0.7';
        });
    });

    // 添加悬停卡片效果
    const cardElements = document.querySelectorAll('.certificate-item, .skill-category, .timeline-content, .project-card, .education-container');
    cardElements.forEach(card => {
        card.classList.add('hover-card');
    });

    // 添加视差效果
    document.addEventListener('mousemove', function(e) {
        const moveX = (e.clientX - window.innerWidth / 2) / 50;
        const moveY = (e.clientY - window.innerHeight / 2) / 50;
        
        const parallaxElements = document.querySelectorAll('.parallax-layer');
        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-speed') || 1;
            el.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
        });
    });

    // 3D卡片效果
    document.querySelectorAll('.card-3d').forEach(card => {
        card.addEventListener('mousemove', e => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            const angleY = (e.clientX - cardCenterX) / 10;
            const angleX = (cardCenterY - e.clientY) / 10;
            
            card.querySelector('.card-3d-inner').style.transform = `rotateY(${angleY}deg) rotateX(${angleX}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.card-3d-inner').style.transform = 'rotateY(0) rotateX(0)';
        });
    });

    // 导航切换动画
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // 更新导航激活状态
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // 切换内容区域
            contentSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // 启用延迟和动画效果
            setTimeout(() => {
                document.getElementById(target).classList.add('active');
                animateContentSection(document.getElementById(target));
            }, 100);
        });
    });

    // 为标题添加特殊动画效果
    const nameElement = document.querySelector('.name');
    nameElement.classList.add('highlight-animation');

    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.classList.add('fade-in');
    });

    // 为头像添加动画 - 已禁用，确保头像保持固定
    const avatarContainer = document.querySelector('.avatar-container');
    // 不再添加浮动动画
    // avatarContainer.classList.add('float-animation');

    // 为社交媒体图标添加动画
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1}s`;
        link.classList.add('pulse-animation');
    });

    // 为证书图标添加动画
    const certificateIcons = document.querySelectorAll('.certificate-item i');
    certificateIcons.forEach(icon => {
        icon.classList.add('pulse-animation');
    });

    // 内容部分的动画函数
    function animateContentSection(section) {
        // 为所有子元素添加动画效果
        const elements = section.querySelectorAll('.certificate-item, .skill-category, .timeline-item, .project-card');
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100 + (index * 100));
        });
    }

    // 技能进度条动画
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }

    // 监听技能部分的显示
    const skillsSection = document.getElementById('skills');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // 微信二维码弹窗
    const wechatBtns = document.querySelectorAll('.wechat-btn');
    const wechatModal = document.getElementById('wechat-modal');
    const closeModal = document.querySelector('.close-modal');

    wechatBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            wechatModal.classList.add('show');
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', function() {
            wechatModal.classList.remove('show');
        });
    }

    // 点击模态框外部关闭
    wechatModal.addEventListener('click', function(e) {
        if (e.target === wechatModal) {
            wechatModal.classList.remove('show');
        }
    });

    // 添加背景视差效果
    window.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const headerElement = document.querySelector('.resume-header');
        const footerElement = document.querySelector('.resume-footer');
        
        if (headerElement) {
            headerElement.style.backgroundPosition = `${50 + (mouseX * 10)}% ${50 + (mouseY * 10)}%`;
        }
        
        if (footerElement) {
            footerElement.style.backgroundPosition = `${50 - (mouseX * 10)}% ${50 - (mouseY * 10)}%`;
        }
    });

    // 检测微信环境
    function isWechatBrowser() {
        return /MicroMessenger/i.test(navigator.userAgent);
    }

    // 微信环境适配
    if (isWechatBrowser()) {
        // 隐藏页面标题中的手机导航栏
        document.title = ' ';
        
        // 微信JSSDK配置（如果需要）
        if (typeof wx !== 'undefined') {
            // 配置微信分享功能
            wx.config({
                debug: false,
                appId: '', // 由于没有具体的微信公众号信息，这里留空
                timestamp: Date.now(),
                nonceStr: 'resume',
                signature: '',
                jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
            });
            
            wx.ready(function() {
                // 分享到朋友
                wx.updateAppMessageShareData({
                    title: '杨宸铭的个人简历',
                    desc: '工业工程专业 | 人因工程 | 供应链管理 | 系统优化',
                    link: window.location.href,
                    imgUrl: 'resource/白底证件照.jpg',
                    success: function() {}
                });
                
                // 分享到朋友圈
                wx.updateTimelineShareData({
                    title: '杨宸铭的个人简历',
                    link: window.location.href,
                    imgUrl: 'resource/白底证件照.jpg',
                    success: function() {}
                });
            });
        }
    }

    // 优化图片加载
    function lazyLoadImages() {
        const images = document.querySelectorAll('img');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        image.src = image.getAttribute('data-src') || image.src;
                        imageObserver.unobserve(image);
                    }
                });
            });
            
            images.forEach(image => {
                imageObserver.observe(image);
            });
        } else {
            // 兼容不支持IntersectionObserver的浏览器
            images.forEach(image => {
                image.src = image.getAttribute('data-src') || image.src;
            });
        }
    }

    // 调用懒加载图片
    lazyLoadImages();

    // 页面滚动时优化性能
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                // 添加滚动时的视差效果
                const scrollY = window.scrollY;
                const headerElement = document.querySelector('.resume-header');
                
                if (headerElement && scrollY < 500) {
                    headerElement.style.transform = `translateY(${scrollY * 0.2}px)`;
                }
                
                // 检测元素是否进入视口，添加动画
                const animateElements = document.querySelectorAll('.certificate-item, .skill-category, .timeline-item, .project-card');
                animateElements.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    const isVisible = rect.top < window.innerHeight - 100;
                    
                    if (isVisible) {
                        el.classList.add('fade-in');
                    }
                });
                
                ticking = false;
            });
            ticking = true;
        }
    });

    // 移动设备触摸优化
    document.addEventListener('touchstart', function() {}, {passive: true});

    // 图片预览功能
    function setupImagePreview() {
        // 获取所有需要预览的图片
        const previewImages = document.querySelectorAll('.exp-image, .project-image, .preview-image');
        const imageModal = document.querySelector('.image-modal');
        const modalImg = imageModal.querySelector('img');
        const closeButton = imageModal.querySelector('.close-image-modal');
        
        // 图片缩放控制相关元素
        const zoomInBtn = imageModal.querySelector('.zoom-in-btn');
        const zoomOutBtn = imageModal.querySelector('.zoom-out-btn');
        const resetZoomBtn = imageModal.querySelector('.reset-zoom-btn');
        const zoomIndicator = imageModal.querySelector('.zoom-indicator');
        
        // 图片缩放状态
        let currentZoom = 1;
        const zoomStep = 0.2; // 每次缩放步长
        const maxZoom = 3;    // 最大缩放倍数
        const minZoom = 0.5;  // 最小缩放倍数

        previewImages.forEach(img => {
            // 点击图片放大
            img.addEventListener('click', function() {
                modalImg.src = this.src;
                imageModal.classList.add('show');
                document.body.style.overflow = 'hidden'; // 禁止背景滚动
                
                // 重置缩放
                resetZoom();
                
                // 添加图片描述
                const imgAlt = this.alt;
                let tooltipEl = imageModal.querySelector('.image-tooltip');
                
                if (!tooltipEl) {
                    tooltipEl = document.createElement('div');
                    tooltipEl.className = 'image-tooltip';
                    imageModal.querySelector('.image-modal-content').appendChild(tooltipEl);
                }
                
                tooltipEl.textContent = imgAlt;
            });
        });

        // 关闭预览
        closeButton.addEventListener('click', function() {
            imageModal.classList.remove('show');
            document.body.style.overflow = ''; // 恢复背景滚动
        });

        imageModal.addEventListener('click', function(e) {
            if (e.target === imageModal) {
                imageModal.classList.remove('show');
                document.body.style.overflow = ''; // 恢复背景滚动
            }
        });
        
        // 添加键盘控制
        document.addEventListener('keyup', function(e) {
            if (imageModal.classList.contains('show')) {
                if (e.key === 'Escape') {
                    imageModal.classList.remove('show');
                    document.body.style.overflow = ''; // 恢复背景滚动
                } else if (e.key === '+' || e.key === '=') {
                    zoomIn();
                } else if (e.key === '-') {
                    zoomOut();
                } else if (e.key === '0') {
                    resetZoom();
                }
            }
        });
        
        // 添加项目模态框中图片的点击放大功能
        document.addEventListener('click', function(e) {
            if (e.target && e.target.classList.contains('project-modal-image')) {
                const projectModalImage = e.target;
                modalImg.src = projectModalImage.src;
                imageModal.classList.add('show');
                document.body.style.overflow = 'hidden'; // 禁止背景滚动
                
                // 重置缩放
                resetZoom();
                
                // 添加图片描述
                const imgAlt = projectModalImage.alt;
                let tooltipEl = imageModal.querySelector('.image-tooltip');
                
                if (!tooltipEl) {
                    tooltipEl = document.createElement('div');
                    tooltipEl.className = 'image-tooltip';
                    imageModal.querySelector('.image-modal-content').appendChild(tooltipEl);
                }
                
                tooltipEl.textContent = imgAlt;
            }
        });
        
        // 缩放功能
        function updateZoom() {
            modalImg.style.transform = `scale(${currentZoom})`;
            zoomIndicator.textContent = `缩放: ${Math.round(currentZoom * 100)}%`;
            zoomIndicator.style.opacity = '1';
            
            // 2秒后隐藏缩放指示器
            clearTimeout(zoomIndicator.fadeTimeout);
            zoomIndicator.fadeTimeout = setTimeout(() => {
                zoomIndicator.style.opacity = '0';
            }, 2000);
        }
        
        function zoomIn() {
            if (currentZoom < maxZoom) {
                currentZoom += zoomStep;
                updateZoom();
            }
        }
        
        function zoomOut() {
            if (currentZoom > minZoom) {
                currentZoom -= zoomStep;
                updateZoom();
            }
        }
        
        function resetZoom() {
            currentZoom = 1;
            updateZoom();
        }
        
        // 绑定缩放按钮事件
        zoomInBtn.addEventListener('click', zoomIn);
        zoomOutBtn.addEventListener('click', zoomOut);
        resetZoomBtn.addEventListener('click', resetZoom);
        
        // 添加鼠标滚轮缩放功能
        modalImg.addEventListener('wheel', function(e) {
            e.preventDefault();
            if (e.deltaY < 0) {
                zoomIn();
            } else {
                zoomOut();
            }
        });
    }

    // 初始化图片预览功能
    setupImagePreview();

    // 优化触摸设备上的图片预览
    if ('ontouchstart' in window) {
        const previewImages = document.querySelectorAll('.exp-image, .project-image, .preview-image');
        previewImages.forEach(img => {
            img.addEventListener('touchstart', function(e) {
                e.preventDefault();
                const modalImg = document.querySelector('.image-modal img');
                modalImg.src = this.src;
                document.querySelector('.image-modal').classList.add('show');
                document.body.style.overflow = 'hidden'; // 禁止背景滚动
            });
        });
    }
    
    // 添加打字效果
    function typeWriterEffect(element, text, speed, startDelay = 0) {
        let i = 0;
        element.textContent = '';
        
        setTimeout(() => {
            function typing() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typing, speed);
                }
            }
            typing();
        }, startDelay);
    }
    
    // 应用打字效果到首个部分的标题
    const firstSectionTitle = document.querySelector('#about .section-title');
    if (firstSectionTitle) {
        const originalText = firstSectionTitle.textContent;
        typeWriterEffect(firstSectionTitle, originalText, 100, 1000);
    }
    
    // 添加卷轴动画效果
    const timelineDots = document.querySelectorAll('.timeline-dot');
    timelineDots.forEach(dot => {
        dot.classList.add('pulse-animation');
    });
    
    // 初始动画
    document.querySelector('.active')?.classList.add('active');
    animateContentSection(document.querySelector('.content-section.active'));
    
    // 添加炫酷的滚动过渡效果
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const maxScroll = documentHeight - windowHeight;
        
        if (scrollTop > 50) {
            document.querySelector('.resume-nav').classList.add('sticky');
        } else {
            document.querySelector('.resume-nav').classList.remove('sticky');
        }
    });
    
    // 添加抖动效果到特定元素
    document.querySelectorAll('.shake-on-hover').forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.classList.add('shake-animation');
        });
        
        el.addEventListener('mouseleave', function() {
            this.classList.remove('shake-animation');
        });
    });
    
    // 添加点击波纹效果
    function createRipple(event) {
        const button = event.currentTarget;
        
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
        circle.className = 'ripple';
        
        const ripple = button.querySelector('.ripple');
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
    }
    
    document.querySelectorAll('.ripple-effect').forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // 添加夜间模式切换
    const themeToggle = document.getElementById('theme-toggle');
    
    themeToggle.addEventListener('click', function() {
        // 添加动画类
        const icon = this.querySelector('i');
        icon.classList.add('animate');
        
        // 切换主题
        document.body.classList.toggle('dark-theme');
        
        // 在动画结束后更新图标
        setTimeout(() => {
            if (document.body.classList.contains('dark-theme')) {
                icon.className = 'fas fa-sun';
                localStorage.setItem('theme', 'dark');
            } else {
                icon.className = 'fas fa-moon';
                localStorage.setItem('theme', 'light');
            }
            
            // 移除动画类，以便下次点击时重新触发动画
            setTimeout(() => {
                icon.classList.remove('animate');
            }, 600);
        }, 300);
    });
    
    // 检查本地存储中的主题偏好
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    // 初始化动态背景
    initDynamicBackground();
    initEducationTabs();
    initProjectCards();

    // 淡入动画
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });

    // 项目卡片翻转效果
    const projectCards = document.querySelectorAll('.interactive-project');
    
    projectCards.forEach(card => {
        const flipContainer = card.querySelector('.project-card-flip');
        
        // 鼠标进入时翻转
        card.addEventListener('mouseenter', () => {
            flipContainer.classList.add('is-flipped');
        });
        
        // 鼠标离开时恢复
        card.addEventListener('mouseleave', () => {
            flipContainer.classList.remove('is-flipped');
        });
        
        // 触摸设备支持
        card.addEventListener('touchstart', (e) => {
            e.preventDefault();
            flipContainer.classList.toggle('is-flipped');
        });
    });
});

// 初始化动态背景
function initDynamicBackground() {
    const dynamicBg = document.querySelector('.dynamic-bg');
    if (!dynamicBg) return;

    // 创建粒子
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // 随机设置大小、位置和延迟
        const size = Math.random() * 10 + 5;
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        const delay = Math.random() * 10;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}px`;
        particle.style.bottom = `${posY}px`;
        particle.style.animationDelay = `${delay}s`;
        
        dynamicBg.appendChild(particle);
    }
    
    // 创建技术线
    const techLines = document.querySelector('.tech-lines');
    if (techLines) {
        for (let i = 0; i < 5; i++) {
            const techLine = document.createElement('div');
            techLine.classList.add('tech-line');
            
            const posY = Math.random() * 100;
            const delay = Math.random() * 10;
            
            techLine.style.top = `${posY}%`;
            techLine.style.animationDelay = `${delay}s`;
            
            techLines.appendChild(techLine);
        }
    }
}

// 初始化教育标签页
function initEducationTabs() {
    const tabButtons = document.querySelectorAll('.edu-tab-btn');
    if (tabButtons.length === 0) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮和面板的active类
            document.querySelectorAll('.edu-tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelectorAll('.edu-tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            
            // 添加当前按钮的active类
            button.classList.add('active');
            
            // 显示对应的面板
            const target = button.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });
}

// 初始化项目卡片翻转效果
function initProjectCards() {
    const projectCards = document.querySelectorAll('.interactive-project');
    if (projectCards.length === 0) return;
    
    projectCards.forEach(card => {
        // 点击卡片正面触发翻转
        const cardFront = card.querySelector('.project-card-front');
        if (cardFront) {
            cardFront.addEventListener('click', () => {
                card.classList.add('flipped');
            });
        }
        
        // 点击返回按钮返回正面
        const backButton = card.querySelector('.btn-back-to-front');
        if (backButton) {
            backButton.addEventListener('click', (e) => {
                e.stopPropagation(); // 阻止事件冒泡
                card.classList.remove('flipped');
            });
        }
        
        // 添加查看完整内容按钮事件监听
        const viewDetailsButton = card.querySelector('.btn-view-full-details');
        if (viewDetailsButton) {
            viewDetailsButton.addEventListener('click', (e) => {
                e.stopPropagation(); // 阻止事件冒泡
                openProjectModal(card);
            });
        }
    });
}

// 项目详情模态框
const projectModal = document.getElementById('project-details-modal');
const closeProjectModalBtn = document.querySelector('.close-project-modal');
const closeProjectModalBtnFooter = document.querySelector('.close-project-modal-btn');

// 打开项目详情模态框
function openProjectModal(projectCard) {
    const projectTitle = projectCard.querySelector('.project-title').textContent;
    const projectPeriod = projectCard.querySelector('.project-period').textContent;
    const projectRole = projectCard.querySelector('.project-role') ? projectCard.querySelector('.project-role').textContent : '';
    const projectImage = projectCard.querySelector('.project-image').src;
    const projectTags = projectCard.querySelectorAll('.tech-tag');
    const projectOverview = projectCard.querySelector('.project-description p').textContent;
    const projectResponsibilities = projectCard.querySelectorAll('.project-responsibilities li');
    const projectAchievements = projectCard.querySelectorAll('.project-achievements li');
    
    // 设置模态框内容
    projectModal.querySelector('.project-modal-title').textContent = projectTitle;
    projectModal.querySelector('.project-modal-image').src = projectImage;
    projectModal.querySelector('.period-text').textContent = projectPeriod;
    projectModal.querySelector('.role-text').textContent = projectRole;
    
    // 设置技术标签
    const tagsContainer = projectModal.querySelector('.project-modal-tags');
    tagsContainer.innerHTML = '';
    projectTags.forEach(tag => {
        const newTag = document.createElement('div');
        newTag.classList.add('tech-tag');
        newTag.textContent = tag.textContent;
        tagsContainer.appendChild(newTag);
    });
    
    // 设置项目概述
    projectModal.querySelector('.project-modal-overview').textContent = projectOverview;
    
    // 设置项目职责
    const responsibilitiesContainer = projectModal.querySelector('.project-modal-responsibilities');
    responsibilitiesContainer.innerHTML = '';
    projectResponsibilities.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.textContent;
        responsibilitiesContainer.appendChild(li);
    });
    
    // 设置项目成果
    const achievementsContainer = projectModal.querySelector('.project-modal-achievements');
    achievementsContainer.innerHTML = '';
    projectAchievements.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.textContent;
        achievementsContainer.appendChild(li);
    });
    
    // 设置项目链接（如果有）
    const linksContainer = projectModal.querySelector('.project-modal-links');
    linksContainer.innerHTML = '';
    const projectLink = projectCard.querySelector('.project-achievements a');
    if (projectLink) {
        const link = document.createElement('a');
        link.href = projectLink.href;
        link.target = "_blank";
        link.innerHTML = '<i class="fab fa-github"></i> GitHub项目链接';
        linksContainer.appendChild(link);
    }
    
    // 显示模态框
    projectModal.classList.add('show');
    document.body.style.overflow = 'hidden'; // 防止背景滚动
}

// 关闭模态框
function closeProjectModal() {
    projectModal.classList.remove('show');
    document.body.style.overflow = '';
}

// 点击关闭按钮关闭模态框
closeProjectModalBtn.addEventListener('click', closeProjectModal);
closeProjectModalBtnFooter.addEventListener('click', closeProjectModal);

// 点击模态框背景关闭模态框
projectModal.addEventListener('click', function(e) {
    if (e.target === projectModal) {
        closeProjectModal();
    }
}); 