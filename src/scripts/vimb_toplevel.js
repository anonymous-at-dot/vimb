/* This script is injected only into toplevel frame. */
var VimbToplevel = {};

VimbToplevel.applyScrollObservers = function(pageId, serializer) {
    let doc = document;

    let onScroll = function() {
        let body    = doc.body,
            de      = doc.documentElement,
            percent = 0,
            fromTop = 0,
            max;

        if (!body || !de) {
            return;
        }

        let scrollTop    = Math.max(de.scrollTop, body.scrollTop),
            clientHeight = window.innerHeight,
            scrollHeight = Math.max(de.scrollHeight, body.scrollHeight);

        /* Get the maximum scrollable page size. This is the size of the */
        /* whole document - height of the viewport. */
        max = scrollHeight - clientHeight;
        if (max > 0) {
            percent = Math.round(scrollTop * 100 / max);
            fromTop = scrollTop;
        }

        window.webkit.messageHandlers.verticalScroll.postMessage(
            serializer(pageId, max, percent, fromTop)
        );
    };

    doc.addEventListener('scroll', onScroll);
    onScroll();
};
