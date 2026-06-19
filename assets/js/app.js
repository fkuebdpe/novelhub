const STORAGE_KEY = 'novel_hub_settings';
const API_BASE = 'assets/data';

let novels = [];
let currentNovel = null;
let currentChapter = null;
let settings = {
    theme: 'light',
    fontSize: 18,
    lineHeight: 1.8,
    fontFamily: 'serif',
    pageWidth: 80
};

document.addEventListener('DOMContentLoaded', async () => {
    loadSettings();
    initTheme();
    initNav();
    await loadData();
    
    const page = getPageName();
    switch(page) {
        case 'index':
            renderFeaturedNovels();
            renderLatestChapters();
            break;
        case 'novels':
            renderNovelsList();
            initFilters();
            break;
        case 'novel':
            loadNovelDetail();
            break;
        case 'read':
            loadChapter();
            initReadingSettings();
            break;
    }
});

function getPageName() {
    const path = window.location.pathname;
    const parts = path.split('/');
    const filename = parts[parts.length - 1] || 'index.html';
    return filename.replace('.html', '');
}

async function loadData() {
    try {
        const response = await fetch(`${API_BASE}/novels.json`);
        novels = await response.json();
    } catch (error) {
        console.error('Failed to load novels data:', error);
    }
}

function loadSettings() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        settings = { ...settings, ...JSON.parse(saved) };
    }
}

function saveSettings() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

function initTheme() {
    document.documentElement.setAttribute('data-theme', settings.theme);
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.innerHTML = settings.theme === 'dark' 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
        
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const themes = ['light', 'dark', 'sepia'];
    const currentIndex = themes.indexOf(settings.theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    settings.theme = themes[nextIndex];
    
    document.documentElement.setAttribute('data-theme', settings.theme);
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.innerHTML = settings.theme === 'dark' 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    }
    
    saveSettings();
}

function initNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

function renderFeaturedNovels() {
    const container = document.getElementById('featuredNovels');
    if (!container) return;
    
    const featured = novels.slice(0, 6);
    container.innerHTML = featured.map(novel => createNovelCard(novel)).join('');
    
    container.querySelectorAll('.novel-card').forEach(card => {
        card.addEventListener('click', () => {
            const novelId = card.dataset.id;
            window.location.href = `novel.html?id=${novelId}`;
        });
    });
}

function renderLatestChapters() {
    const container = document.getElementById('latestChapters');
    if (!container) return;
    
    const chapters = [];
    novels.forEach(novel => {
        if (novel.chapters && novel.chapters.length > 0) {
            const latestChapter = novel.chapters[novel.chapters.length - 1];
            chapters.push({
                ...latestChapter,
                novelTitle: novel.title,
                cover: novel.cover,
                novelId: novel.id
            });
        }
    });
    
    chapters.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    
    container.innerHTML = chapters.slice(0, 5).map(chapter => `
        <div class="chapter-item" data-novel="${chapter.novelId}" data-chapter="${chapter.id}">
            <div class="chapter-item-left">
                <div class="chapter-item-cover">
                    <img src="${chapter.cover}" alt="${chapter.novelTitle}">
                </div>
                <div class="chapter-item-info">
                    <h4>${chapter.title}</h4>
                    <p>${chapter.novelTitle}</p>
                </div>
            </div>
            <div class="chapter-item-time">${formatDate(chapter.updatedAt)}</div>
        </div>
    `).join('');
    
    container.querySelectorAll('.chapter-item').forEach(item => {
        item.addEventListener('click', () => {
            const novelId = item.dataset.novel;
            const chapterId = item.dataset.chapter;
            window.location.href = `read.html?novel=${novelId}&chapter=${chapterId}`;
        });
    });
}

function renderNovelsList() {
    const container = document.getElementById('novelsGrid');
    if (!container) return;
    
    container.innerHTML = novels.map(novel => createNovelCard(novel)).join('');
    
    container.querySelectorAll('.novel-card').forEach(card => {
        card.addEventListener('click', () => {
            const novelId = card.dataset.id;
            window.location.href = `novel.html?id=${novelId}`;
        });
    });
    
    renderPagination(1);
}

function createNovelCard(novel) {
    const rating = novel.rating || '4.0';
    const status = novel.status || 'ongoing';
    const chapterCount = novel.chapters ? novel.chapters.length : 0;
    
    return `
        <div class="novel-card" data-id="${novel.id}">
            <div class="novel-card-cover">
                <img src="${novel.cover}" alt="${novel.title}">
                <span class="novel-card-badge">${status.charAt(0).toUpperCase() + status.slice(1)}</span>
            </div>
            <div class="novel-card-content">
                <h3 class="novel-card-title">${novel.title}</h3>
                <p class="novel-card-author">By ${novel.author}</p>
                <div class="novel-card-tags">
                    <span class="novel-card-tag">${novel.genre}</span>
                </div>
                <div class="novel-card-stats">
                    <span><i class="fas fa-star"></i> ${rating}</span>
                    <span>${chapterCount} chapters</span>
                </div>
            </div>
        </div>
    `;
}

function initFilters() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const genreFilter = document.getElementById('genreFilter');
    const sortBy = document.getElementById('sortBy');
    
    const filterHandler = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const genre = genreFilter.value;
        const sort = sortBy.value;
        
        let filtered = novels.filter(novel => {
            const matchesSearch = novel.title.toLowerCase().includes(searchTerm) ||
                               novel.author.toLowerCase().includes(searchTerm);
            const matchesGenre = genre === 'all' || novel.genre === genre;
            return matchesSearch && matchesGenre;
        });
        
        filtered.sort((a, b) => {
            switch(sort) {
                case 'popular':
                    return (b.views || 0) - (a.views || 0);
                case 'latest':
                    return new Date(b.updatedAt) - new Date(a.updatedAt);
                case 'name':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });
        
        const container = document.getElementById('novelsGrid');
        if (container) {
            container.innerHTML = filtered.map(novel => createNovelCard(novel)).join('');
            
            container.querySelectorAll('.novel-card').forEach(card => {
                card.addEventListener('click', () => {
                    const novelId = card.dataset.id;
                    window.location.href = `novel.html?id=${novelId}`;
                });
            });
        }
    };
    
    searchInput?.addEventListener('input', filterHandler);
    searchBtn?.addEventListener('click', filterHandler);
    genreFilter?.addEventListener('change', filterHandler);
    sortBy?.addEventListener('change', filterHandler);
}

function renderPagination(currentPage) {
    const container = document.getElementById('pagination');
    if (!container) return;
    
    const totalPages = Math.ceil(novels.length / 12);
    let html = '';
    
    if (currentPage > 1) {
        html += `<button onclick="renderPagination(${currentPage - 1})">Previous</button>`;
    }
    
    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="${i === currentPage ? 'active' : ''}" onclick="renderPagination(${i})">${i}</button>`;
    }
    
    if (currentPage < totalPages) {
        html += `<button onclick="renderPagination(${currentPage + 1})">Next</button>`;
    }
    
    container.innerHTML = html;
}

async function loadNovelDetail() {
    const params = new URLSearchParams(window.location.search);
    const novelId = params.get('id');
    
    if (!novelId) {
        window.location.href = 'novels.html';
        return;
    }
    
    currentNovel = novels.find(n => n.id === novelId);
    
    if (!currentNovel) {
        window.location.href = 'novels.html';
        return;
    }
    
    document.getElementById('novelTitle').textContent = currentNovel.title;
    document.getElementById('novelAuthor').textContent = currentNovel.author;
    document.getElementById('novelGenre').textContent = currentNovel.genre;
    document.getElementById('novelStatus').textContent = currentNovel.status;
    document.getElementById('novelViews').textContent = formatNumber(currentNovel.views || 0);
    document.getElementById('novelRating').textContent = currentNovel.rating || '4.0';
    document.getElementById('novelChapters').textContent = `${currentNovel.chapters?.length || 0} chapters`;
    document.getElementById('novelDescription').textContent = currentNovel.description;
    document.getElementById('novelCover').src = currentNovel.cover;
    
    const readNowBtn = document.getElementById('readNowBtn');
    if (readNowBtn && currentNovel.chapters && currentNovel.chapters.length > 0) {
        readNowBtn.href = `read.html?novel=${novelId}&chapter=${currentNovel.chapters[0].id}`;
    }
    
    renderChaptersList();
    initChapterNav();
}

function renderChaptersList() {
    const container = document.getElementById('chapterItems');
    if (!container || !currentNovel?.chapters) return;
    
    const chapters = [...currentNovel.chapters].reverse();
    
    container.innerHTML = chapters.map(chapter => `
        <a href="read.html?novel=${currentNovel.id}&chapter=${chapter.id}" class="chapter-item-link">
            ${chapter.title}
        </a>
    `).join('');
}

function initChapterNav() {
    const prevBtn = document.getElementById('prevChapterBtn');
    const nextBtn = document.getElementById('nextChapterBtn');
    
    if (!currentNovel?.chapters) return;
    
    prevBtn?.addEventListener('click', () => {
        const params = new URLSearchParams(window.location.search);
        const chapterId = params.get('chapter');
        if (!chapterId) return;
        
        const currentIndex = currentNovel.chapters.findIndex(c => c.id === chapterId);
        if (currentIndex > 0) {
            window.location.href = `read.html?novel=${currentNovel.id}&chapter=${currentNovel.chapters[currentIndex - 1].id}`;
        }
    });
    
    nextBtn?.addEventListener('click', () => {
        const params = new URLSearchParams(window.location.search);
        const chapterId = params.get('chapter');
        
        let currentIndex = -1;
        if (chapterId) {
            currentIndex = currentNovel.chapters.findIndex(c => c.id === chapterId);
        }
        
        if (currentIndex < currentNovel.chapters.length - 1) {
            const nextIndex = currentIndex === -1 ? 0 : currentIndex + 1;
            window.location.href = `read.html?novel=${currentNovel.id}&chapter=${currentNovel.chapters[nextIndex].id}`;
        }
    });
}

async function loadChapter() {
    const params = new URLSearchParams(window.location.search);
    const novelId = params.get('novel');
    const chapterId = params.get('chapter');
    
    if (!novelId || !chapterId) {
        window.location.href = 'novels.html';
        return;
    }
    
    currentNovel = novels.find(n => n.id === novelId);
    
    if (!currentNovel) {
        window.location.href = 'novels.html';
        return;
    }
    
    currentChapter = currentNovel.chapters.find(c => c.id === chapterId);
    
    if (!currentChapter) {
        window.location.href = `novel.html?id=${novelId}`;
        return;
    }
    
    document.getElementById('chapterTitle').textContent = currentChapter.title;
    document.getElementById('novelName').textContent = currentNovel.title;
    document.getElementById('chapterNumber').textContent = `Chapter ${currentChapter.number}`;
    
    try {
        const response = await fetch(`${API_BASE}/chapters/${chapterId}.json`);
        const chapterData = await response.json();
        
        const contentContainer = document.getElementById('chapterContent');
        contentContainer.innerHTML = chapterData.content.split('\n').map(p => 
            p.trim() ? `<p>${p}</p>` : ''
        ).join('');
        
        applyReadingSettings();
    } catch (error) {
        console.error('Failed to load chapter:', error);
        document.getElementById('chapterContent').innerHTML = '<p>Failed to load chapter content.</p>';
    }
    
    initChapterNavigation();
    initTableOfContents();
}

function initChapterNavigation() {
    const prevBtn = document.getElementById('prevChapter');
    const nextBtn = document.getElementById('nextChapter');
    const backBtn = document.getElementById('backBtn');
    
    const currentIndex = currentNovel.chapters.findIndex(c => c.id === currentChapter.id);
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            window.location.href = `read.html?novel=${currentNovel.id}&chapter=${currentNovel.chapters[currentIndex - 1].id}`;
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < currentNovel.chapters.length - 1) {
            window.location.href = `read.html?novel=${currentNovel.id}&chapter=${currentNovel.chapters[currentIndex + 1].id}`;
        }
    });
    
    backBtn?.addEventListener('click', () => {
        window.location.href = `novel.html?id=${currentNovel.id}`;
    });
}

function initTableOfContents() {
    const tocBtn = document.getElementById('tableOfContentsBtn');
    const tocModal = document.getElementById('tableOfContentsModal');
    const closeTocModal = document.getElementById('closeTocModal');
    const tocList = document.getElementById('tocList');
    
    if (!tocBtn || !tocModal || !closeTocModal || !tocList) return;
    
    tocList.innerHTML = currentNovel.chapters.map((chapter, index) => `
        <div class="toc-item ${chapter.id === currentChapter.id ? 'active' : ''}" 
             data-chapter="${chapter.id}" 
             data-index="${index}">
            ${chapter.title}
        </div>
    `).join('');
    
    tocBtn.addEventListener('click', () => {
        tocModal.classList.add('active');
    });
    
    closeTocModal.addEventListener('click', () => {
        tocModal.classList.remove('active');
    });
    
    tocModal.addEventListener('click', (e) => {
        if (e.target === tocModal) {
            tocModal.classList.remove('active');
        }
    });
    
    tocList.querySelectorAll('.toc-item').forEach(item => {
        item.addEventListener('click', () => {
            const chapterId = item.dataset.chapter;
            window.location.href = `read.html?novel=${currentNovel.id}&chapter=${chapterId}`;
        });
    });
}

function initReadingSettings() {
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettingsModal = document.getElementById('closeSettingsModal');
    
    const fontSizeSlider = document.getElementById('fontSizeSlider');
    const fontSizeValue = document.getElementById('fontSizeValue');
    const lineHeightSlider = document.getElementById('lineHeightSlider');
    const lineHeightValue = document.getElementById('lineHeightValue');
    const pageWidthSlider = document.getElementById('pageWidthSlider');
    const pageWidthValue = document.getElementById('pageWidthValue');
    
    const fontSizeDecrease = document.getElementById('fontSizeDecrease');
    const fontSizeIncrease = document.getElementById('fontSizeIncrease');
    const fontFamily = document.getElementById('fontFamily');
    
    const themeOptions = document.querySelectorAll('.theme-option');
    
    if (!settingsBtn || !settingsModal || !closeSettingsModal) return;
    
    fontSizeSlider.value = settings.fontSize;
    fontSizeValue.textContent = `${settings.fontSize}px`;
    lineHeightSlider.value = settings.lineHeight;
    lineHeightValue.textContent = settings.lineHeight;
    pageWidthSlider.value = settings.pageWidth;
    pageWidthValue.textContent = `${settings.pageWidth}%`;
    fontFamily.value = settings.fontFamily;
    
    themeOptions.forEach(option => {
        if (option.dataset.theme === settings.theme) {
            option.classList.add('active');
        }
    });
    
    settingsBtn.addEventListener('click', () => {
        settingsModal.classList.add('active');
    });
    
    closeSettingsModal.addEventListener('click', () => {
        settingsModal.classList.remove('active');
    });
    
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            settingsModal.classList.remove('active');
        }
    });
    
    fontSizeSlider.addEventListener('input', (e) => {
        settings.fontSize = parseInt(e.target.value);
        fontSizeValue.textContent = `${settings.fontSize}px`;
        applyReadingSettings();
        saveSettings();
    });
    
    lineHeightSlider.addEventListener('input', (e) => {
        settings.lineHeight = parseFloat(e.target.value);
        lineHeightValue.textContent = settings.lineHeight;
        applyReadingSettings();
        saveSettings();
    });
    
    pageWidthSlider.addEventListener('input', (e) => {
        settings.pageWidth = parseInt(e.target.value);
        pageWidthValue.textContent = `${settings.pageWidth}%`;
        applyReadingSettings();
        saveSettings();
    });
    
    fontFamily.addEventListener('change', (e) => {
        settings.fontFamily = e.target.value;
        applyReadingSettings();
        saveSettings();
    });
    
    fontSizeDecrease?.addEventListener('click', () => {
        if (settings.fontSize > 14) {
            settings.fontSize--;
            fontSizeSlider.value = settings.fontSize;
            fontSizeValue.textContent = `${settings.fontSize}px`;
            applyReadingSettings();
            saveSettings();
        }
    });
    
    fontSizeIncrease?.addEventListener('click', () => {
        if (settings.fontSize < 28) {
            settings.fontSize++;
            fontSizeSlider.value = settings.fontSize;
            fontSizeValue.textContent = `${settings.fontSize}px`;
            applyReadingSettings();
            saveSettings();
        }
    });
    
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            themeOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            settings.theme = option.dataset.theme;
            document.documentElement.setAttribute('data-theme', settings.theme);
            
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) {
                themeToggle.innerHTML = settings.theme === 'dark' 
                    ? '<i class="fas fa-sun"></i>' 
                    : '<i class="fas fa-moon"></i>';
            }
            
            saveSettings();
        });
    });
    
    applyReadingSettings();
}

function applyReadingSettings() {
    const chapterContent = document.getElementById('chapterContent');
    if (!chapterContent) return;
    
    chapterContent.style.fontSize = `${settings.fontSize}px`;
    chapterContent.style.lineHeight = settings.lineHeight;
    chapterContent.style.fontFamily = settings.fontFamily === 'serif' 
        ? "'Noto Serif SC', serif" 
        : settings.fontFamily === 'monospace' 
            ? "'Courier New', monospace" 
            : "'Roboto', sans-serif";
    chapterContent.style.maxWidth = `${settings.pageWidth}%`;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 30) return `${days}d ago`;
    
    return date.toLocaleDateString();
}

function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}