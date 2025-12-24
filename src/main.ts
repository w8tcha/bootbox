import "./main.scss";
import "@fortawesome/fontawesome-free/css/all.css";

import './prism';
import AnchorJS from 'anchor-js';
import * as bootbox from '@w8tcha/bootbox';
import Mark from 'mark.js';
import lunr from 'lunr';

const duration = 500;

function removeHash(): void {
    history.pushState("", document.title, window.location.pathname + window.location.search);
}

// =======================
// Utility helpers
// =======================

let scrollTimer: number | undefined;

function fadeIn(el: HTMLElement, durationMs: number): void {
    el.style.opacity = '0';
    el.style.display = 'block';

    el.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: durationMs, fill: 'forwards' }
    );
}

function fadeOut(el: HTMLElement, durationMs: number, callback?: () => void): void {
    const animation = el.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: durationMs, fill: 'forwards' }
    );

    animation.onfinish = () => {
        el.style.display = 'none';
        callback?.();
    };
}

function scrollToY(y: number, callback?: () => void): void {
    window.scrollTo({ top: y, behavior: 'smooth' });

    if (callback) {
        setTimeout(callback, 500);
    }
}



function highlightTarget() {
    let hash = window.location.hash;
    let pathName = window.location.pathname;
    if (hash) {
        pathName += hash;
    }

    // Let's see if we have a matching sidebar link; if so, mark it as active
    let navLink = document.querySelector('.sidebar-menu .nav-link[href=".' + pathName + '"]');
    if (navLink) {
        document.querySelector('.sidebar-menu .nav-link')?.classList.remove('active');
        navLink.classList.add('active');
    }
}

try {
    const anchors = new AnchorJS();
    // Anchor.js --> add clickable page anchors to elements labeled with the `topic-anchor` class
    if(anchors) {
        anchors.options = {
            placement: 'left',
            visible: 'hover'
        };
        
        anchors.add('.topic-anchor');
    }
}
catch(error) {
    console.error(error);
}

document.addEventListener('DOMContentLoaded', function() {
// Prevent scrolling for "empty" (i.e. href="#") page anchors
    document.querySelectorAll<HTMLElement>('a[href="#"]').forEach(a => {
        a.addEventListener('click', (event: Event) => {
            event.preventDefault();
        });
    });

    document.querySelectorAll<HTMLElement>('.bb-hello-world').forEach(element => {
        element.addEventListener('click', (event: Event) => {
            bootbox.alert('Hello world!');
        });  
    }); 
});

// =======================
// Window events
// =======================

window.addEventListener('scroll', () => {
    if (scrollTimer) {
        clearTimeout(scrollTimer);
    }

    scrollTimer = window.setTimeout(() => {
        const widget = document.querySelector<HTMLElement>('.bb-scroll-widget');
        if (!widget) return;

        if (window.scrollY < 25) {
            fadeOut(widget, duration, removeHash);
        } else {
            fadeIn(widget, duration);
        }
    }, 800);
});

window.addEventListener('load', () => {
    const hash = window.location.hash;

    if (hash) {
        const target = document.querySelector<HTMLElement>(hash);
        if (target) {
            const targetTop = target.getBoundingClientRect().top + window.scrollY;
            if (targetTop < 75) {
                scrollToY(targetTop - 100);
            }
        }
    }

    highlightTarget();
});

// =======================
// Document delegated clicks
// =======================

document.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target) return;

    // Back to top
    const backToTop = target.closest('.back-to-top') as HTMLElement | null;
    if (backToTop) {
        e.preventDefault();
        scrollToY(0);
        return;
    }

    // Anchor links
    const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
    if (anchor && anchor.hash) {
        const section = document.querySelector<HTMLElement>(anchor.hash);
        if (section) {
            e.preventDefault();

            const top = section.getBoundingClientRect().top + window.scrollY - 100;
            scrollToY(top, () => {
                history.pushState(null, '', anchor.hash);
                highlightTarget();
            });
            return;
        }
    }

    // Sidebar menu links
    const navLink = target.closest('.sidebar-menu .nav-link') as HTMLAnchorElement | null;
    if (navLink) {
        const [baseUrl] = navLink.href.split('#');

        if (baseUrl && baseUrl.includes(window.location.pathname)) {
            const hash = navLink.hash;

            if (hash) {
                const section = document.querySelector<HTMLElement>(hash);
                if (section) {
                    e.preventDefault();

                    const top = section.getBoundingClientRect().top + window.scrollY - 100;
                    scrollToY(top, () => {
                        document
                            .querySelectorAll('.sidebar-menu .nav-link')
                            .forEach(el => el.classList.remove('active'));

                        navLink.classList.add('active');

                        history.pushState(null, '', hash);
                    });
                }
            } else {
                if (window.location.pathname === '/' && navLink.getAttribute('href') === '/') {
                    e.preventDefault();

                    document
                        .querySelectorAll('.sidebar-menu .nav-link')
                        .forEach(el => el.classList.remove('active'));

                    navLink.classList.add('active');

                    scrollToY(0, removeHash);
                }
            }
        }
    }
});

interface LunrDoc {
    id: string;
    title: string;
    body: string;
    url: string;
}

 let idx: lunr.Index;
 let docs: LunrDoc[] = [];

const searchForm = document.getElementById('search-form') as HTMLFormElement | null;
const searchBox = document.getElementById('lunr-search') as HTMLInputElement | null;

// =======================
// Search function
// =======================

function lunrSearch(term: string): void {
    const output = document.createElement('ul');
    output.id = 'search-results';
    output.className = 'list-group m-2';

    if (term) {
        const results = idx.search(term);

        if (results.length > 0) {
            results.forEach(result => {
                const doc = docs[Number(result.ref)];
                if (!doc) return;

                const { url, title, body: docBody } = doc;

                let excerpt: string;
                const metadataKeys = Object.keys(result.matchData.metadata);
                const key = metadataKeys[0];

                if (key) {
                    const content = result.matchData.metadata[key]?.body;
                    if (content?.position?.length) {
                        const [pos, len] = content.position[0];
                        excerpt =
                            '&hellip;' +
                            docBody.substring(
                                Math.max(0, pos - 60),
                                pos + len + 60
                            ) +
                            '&hellip;';
                    } else {
                        excerpt = docBody.substring(0, 60) + '&hellip;';
                    }
                } else {
                    excerpt = docBody.substring(0, 60) + '&hellip;';
                }

                // Highlight matches (mark.js)
                const temp = document.createElement('div');
                temp.innerHTML = `<span class="body">${excerpt}</span>`;
                // @ts-ignore – mark.js global
                new Mark(temp).mark(term);

                const li = document.createElement('li');
                li.className = 'lunr-search-result list-group-item';
                li.innerHTML = `
                    <a href="${url}" class="lunr-search-result-anchor">
                        <span class="lunr-search-result-title">${title}</span>
                        <span class="lunr-search-result-excerpt">${temp.innerHTML}</span>
                    </a>
                `;

                output.appendChild(li);
            });
        } else {
            output.innerHTML =
                '<li class="lunr-search-result m-3">No results found&hellip;</li>';
        }
    }

    // Bootbox modal
    bootbox.dialog({
        title: 'Search results',
        message: output,
        size: 'lg',
        backdrop: true,
        onEscape: true,
        scrollable: true
    });
}

// =======================
// Load Lunr index
// =======================

fetch('./index.json')
    .then(response => response.json())
    .then((json: LunrDoc[]) => {
        docs = json;

        idx = lunr(function () {
            this.ref('id');
            this.field('title');
            this.field('body');
            this.field('url');
            this.metadataWhitelist = ['position'];

            docs.forEach(doc => {
                this.add(doc);
            });
        });
    })
    .catch(error => {
        console.error(error);
    });

// =======================
// Form submit handler
// =======================

searchForm?.addEventListener('submit', e => {
    e.preventDefault();

    if (searchBox?.value) {
        lunrSearch(searchBox.value);
    }
});