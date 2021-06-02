Hooks.on('init', () => {

    if(typeof Babele !== 'undefined') {
        Babele.get().register({
            module: 'translation-D35E-compendium-es',
            lang: 'es',
            dir: 'compendium'
        });
    }
});