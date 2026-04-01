// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Theme Stream - Quiz top page tabs navigation.
 *
 * @module     theme_stream/quizpagenav
 * @copyright  2026
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

const SELECTORS = {
    navButtons: '#mod_quiz_navblock .qn_buttons .qnbutton',
    navButtonCurrent: '#mod_quiz_navblock .qn_buttons .qnbutton.thispage',
    attemptForm: 'form#responseform, form[action*="/mod/quiz/attempt.php"]',
    tabsContainer: '.stream-quiz-page-tabs'
};

const parsePageFromUrl = (url) => {
    try {
        const parsed = new URL(url, window.location.origin);
        const raw = parsed.searchParams.get('page');
        // Moodle omite ?page=0 en la primera página del intento.
        if (raw === null || raw === '') {
            return 0;
        }
        const page = parseInt(raw, 10);
        return Number.isInteger(page) && page >= 0 ? page : null;
    } catch (error) {
        return null;
    }
};

const getPagesFromQuestionNav = () => {
    const pageMap = new Map();
    document.querySelectorAll(SELECTORS.navButtons).forEach((button) => {
        const page = parsePageFromUrl(button.href);
        if (page !== null && !pageMap.has(page)) {
            pageMap.set(page, button.href);
        }
    });

    return [...pageMap.entries()]
        .sort((a, b) => a[0] - b[0])
        .map(([page, href]) => ({page, href}));
};

const getCurrentPage = () => {
    const currentButton = document.querySelector(SELECTORS.navButtonCurrent);
    if (currentButton) {
        const navPage = parsePageFromUrl(currentButton.href);
        if (navPage !== null) {
            return navPage;
        }
    }

    const urlPage = parseInt(new URL(window.location.href).searchParams.get('page') || '0', 10);
    return Number.isInteger(urlPage) ? urlPage : 0;
};

const buildTabs = (pages, currentPage) => {
    const container = document.createElement('nav');
    // nav-pills evita márgenes/bordes de nav-tabs que recortan la primera pestaña.
    container.className = 'stream-quiz-page-tabs nav nav-pills mb-3';
    container.setAttribute('aria-label', 'Quiz pages');

    pages.forEach((pageData) => {
        const pageNumber = pageData.page + 1;
        const link = document.createElement('a');
        link.className = 'nav-link';
        link.href = pageData.href;
        link.textContent = `Página ${pageNumber}`;

        if (pageData.page === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }

        container.appendChild(link);
    });

    return container;
};

export const init = () => {
    if (document.querySelector(SELECTORS.tabsContainer)) {
        return;
    }

    const pages = getPagesFromQuestionNav();
    if (pages.length <= 1) {
        return;
    }

    const currentPage = getCurrentPage();
    const tabs = buildTabs(pages, currentPage);
    const attemptForm = document.querySelector(SELECTORS.attemptForm);

    if (attemptForm) {
        attemptForm.prepend(tabs);
    }
};
