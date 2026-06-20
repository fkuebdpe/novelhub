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

const fallbackNovels = [
    {
        "id": "rebirth-of-the-legendary-sword-master",
        "title": "Rebirth of the Legendary Sword Master",
        "author": "Wei Qian",
        "genre": "Fantasy",
        "status": "ongoing",
        "rating": "4.8",
        "views": 2500000,
        "cover": "https://via.placeholder.com/300x400?text=Novel+Cover",
        "description": "After dying at the hands of his enemies, the legendary sword master Chen Fan is reborn back to his youth. Armed with the knowledge of his past life, he must now walk the path of cultivation again.",
        "updatedAt": "2024-01-15T10:30:00Z",
        "chapters": [
            { "id": "ch1", "number": 1, "title": "Rebirth", "wordCount": 3500, "updatedAt": "2024-01-01T08:00:00Z" },
            { "id": "ch2", "number": 2, "title": "The Path of Swords", "wordCount": 3200, "updatedAt": "2024-01-02T08:00:00Z" },
            { "id": "ch3", "number": 3, "title": "First Blood", "wordCount": 3800, "updatedAt": "2024-01-03T08:00:00Z" }
        ]
    },
    {
        "id": "the-emperors-concubine",
        "title": "The Emperor's Concubine",
        "author": "Ling Yue",
        "genre": "Romance",
        "status": "completed",
        "rating": "4.6",
        "views": 1800000,
        "cover": "https://via.placeholder.com/300x400?text=Novel+Cover",
        "description": "In the treacherous world of the imperial harem, a young girl from a fallen noble family must navigate through schemes and intrigues to survive.",
        "updatedAt": "2024-01-14T14:00:00Z",
        "chapters": [
            { "id": "tc1", "number": 1, "title": "Entering the Palace", "wordCount": 3000, "updatedAt": "2024-01-01T09:00:00Z" },
            { "id": "tc2", "number": 2, "title": "First Encounter", "wordCount": 3200, "updatedAt": "2024-01-02T09:00:00Z" }
        ]
    },
    {
        "id": "city-of-shadows",
        "title": "City of Shadows",
        "author": "Chen Mo",
        "genre": "Action",
        "status": "ongoing",
        "rating": "4.7",
        "views": 1200000,
        "cover": "https://via.placeholder.com/300x400?text=Novel+Cover",
        "description": "In the bustling metropolis, Lin Hao, a former special forces operative, is drawn into a dark underworld after his sister's disappearance.",
        "updatedAt": "2024-01-15T09:00:00Z",
        "chapters": [
            { "id": "sc1", "number": 1, "title": "The Missing Sister", "wordCount": 3400, "updatedAt": "2024-01-01T10:00:00Z" }
        ]
    },
    {
        "id": "journey-to-the-west-reborn",
        "title": "Journey to the West: Reborn",
        "author": "Wu Cheng'en Jr.",
        "genre": "Adventure",
        "status": "ongoing",
        "rating": "4.9",
        "views": 3200000,
        "cover": "https://via.placeholder.com/300x400?text=Novel+Cover",
        "description": "A modern man is mysteriously transported into the world of Journey to the West, becoming the legendary Monkey King.",
        "updatedAt": "2024-01-15T11:00:00Z",
        "chapters": [
            { "id": "jc1", "number": 1, "title": "Rebirth as the Monkey King", "wordCount": 4000, "updatedAt": "2024-01-01T11:00:00Z" }
        ]
    },
    {
        "id": "my-cute-roommate",
        "title": "My Cute Roommate",
        "author": "Xiao Mi",
        "genre": "Comedy",
        "status": "completed",
        "rating": "4.5",
        "views": 900000,
        "cover": "https://via.placeholder.com/300x400?text=Novel+Cover",
        "description": "Living with the energetic and quirky Su Xiaoxiao turns Lin Yu's ordinary life into a hilarious adventure.",
        "updatedAt": "2024-01-13T16:00:00Z",
        "chapters": [
            { "id": "mc1", "number": 1, "title": "The Unexpected Roommate", "wordCount": 2800, "updatedAt": "2024-01-01T14:00:00Z" }
        ]
    },
    {
        "id": "dragon-prince",
        "title": "Dragon Prince",
        "author": "Long Wei",
        "genre": "Fantasy",
        "status": "ongoing",
        "rating": "4.7",
        "views": 1500000,
        "cover": "https://via.placeholder.com/300x400?text=Novel+Cover",
        "description": "Born with the blood of ancient dragons, Prince Yan Long must hide his true nature from those who would fear him.",
        "updatedAt": "2024-01-15T12:00:00Z",
        "chapters": [
            { "id": "dc1", "number": 1, "title": "The Hidden Secret", "wordCount": 3300, "updatedAt": "2024-01-01T12:00:00Z" }
        ]
    }
];

const fallbackChapters = {
    "ch1": {
        "id": "ch1",
        "title": "Rebirth",
        "novelId": "rebirth-of-the-legendary-sword-master",
        "number": 1,
        "wordCount": 3500,
        "content": "The world spun around Chen Fan as he lay dying on the cold stone floor of the forbidden chamber. Blood trickled from the corner of his mouth, staining the ancient runes beneath him. His once-powerful body was now nothing but a shell, broken and empty.\n\n\"You thought you could defeat us, Chen Fan?\" A mocking voice echoed through the chamber. \"The Heavenly Sword Sect will never fall into the hands of a mere mortal.\"",
        "updatedAt": "2024-01-01T08:00:00Z"
    },
    "ch2": {
        "id": "ch2",
        "title": "The Path of Swords",
        "novelId": "rebirth-of-the-legendary-sword-master",
        "number": 2,
        "wordCount": 3200,
        "content": "Chen Fan opened his eyes to find himself lying on a rough wooden bed. The scent of aged wood and incense filled his nostrils. Sunlight streamed through the narrow window, casting warm patterns on the floor.\n\n\"Where am I?\" he whispered, his voice hoarse and unfamiliar. He looked down at his hands - they were small, calloused, but definitely not the hands of a powerful sword master. These were the hands of a child.",
        "updatedAt": "2024-01-02T08:00:00Z"
    },
    "tc1": {
        "id": "tc1",
        "title": "Entering the Palace",
        "novelId": "the-emperors-concubine",
        "number": 1,
        "wordCount": 3000,
        "content": "The grand gates of the imperial palace loomed before Li Wei as she stepped out of the sedan chair. Her heart raced with a mix of fear and anticipation. Once a noble lady, she was now entering the palace as a mere concubine, her family's fate resting on her shoulders.\n\nThe palace walls seemed to stretch endlessly, adorned with intricate carvings of dragons and phoenixes. Servants scurried about, their heads bowed in deference to the imperial family.",
        "updatedAt": "2024-01-01T09:00:00Z"
    },
    "sc1": {
        "id": "sc1",
        "title": "The Missing Sister",
        "novelId": "city-of-shadows",
        "number": 1,
        "wordCount": 3400,
        "content": "Lin Hao slammed the door to his apartment shut, his fists clenched in anger. The note on the table burned in his mind - his sister Lin Xue was gone, taken by someone or something he couldn't see.\n\n\"Xue'er...\" he whispered, staring at the empty chair where she usually sat. The apartment felt cold without her presence, without her laughter echoing through the rooms.",
        "updatedAt": "2024-01-01T10:00:00Z"
    },
    "jc1": {
        "id": "jc1",
        "title": "Rebirth as the Monkey King",
        "novelId": "journey-to-the-west-reborn",
        "number": 1,
        "wordCount": 4000,
        "content": "Zhang Wei had been reading Journey to the West for the hundredth time when the world suddenly shifted. One moment he was sitting in his apartment, and the next he found himself surrounded by towering trees and exotic creatures.\n\n\"What the...\" he muttered, looking down at his hands. They were covered in golden fur, and his body felt different - stronger, more agile. He lifted a hand and saw that he had five fingers, each tipped with sharp claws.",
        "updatedAt": "2024-01-01T11:00:00Z"
    },
    "mc1": {
        "id": "mc1",
        "title": "The Unexpected Roommate",
        "novelId": "my-cute-roommate",
        "number": 1,
        "wordCount": 2800,
        "content": "Lin Yu stood at the door of his new apartment, key in hand. He had just moved to the city for college and was looking forward to some peace and quiet. But as he opened the door, he was greeted by a scene he never expected.\n\nA girl with messy brown hair was sitting on his couch, eating a bowl of instant noodles while watching anime. She looked up at him with wide eyes, noodles hanging from her mouth.",
        "updatedAt": "2024-01-01T14:00:00Z"
    },
    "dc1": {
        "id": "dc1",
        "title": "The Hidden Secret",
        "novelId": "dragon-prince",
        "number": 1,
        "wordCount": 3300,
        "content": "Prince Yan Long paced restlessly in his chamber, his fingers brushing the golden scales that occasionally appeared on his arms. Since childhood, he had been warned never to reveal his secret - that he carried the blood of dragons in his veins.\n\n\"Your Highness,\" a servant called from outside the door. \"The king requests your presence in the throne room.\"",
        "updatedAt": "2024-01-01T12:00:00Z"
    }
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
        if (!response.ok) throw new Error('Network response was not ok');
        novels = await response.json();
    } catch (error) {
        console.warn('Failed to load novels data from JSON file, using fallback data:', error);
        novels = fallbackNovels;
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
        if (!response.ok) throw new Error('Network response was not ok');
        const chapterData = await response.json();
        
        const contentContainer = document.getElementById('chapterContent');
        contentContainer.innerHTML = chapterData.content.split('\n').map(p => 
            p.trim() ? `<p>${p}</p>` : ''
        ).join('');
        
        applyReadingSettings();
    } catch (error) {
        console.warn('Failed to load chapter from JSON file, using fallback data:', error);
        const fallbackData = fallbackChapters[chapterId];
        if (fallbackData) {
            const contentContainer = document.getElementById('chapterContent');
            contentContainer.innerHTML = fallbackData.content.split('\n').map(p => 
                p.trim() ? `<p>${p}</p>` : ''
            ).join('');
            applyReadingSettings();
        } else {
            document.getElementById('chapterContent').innerHTML = '<p>Failed to load chapter content.</p>';
        }
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