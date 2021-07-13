import * as cache from "../../systems/D35E/module/cache.js";

Hooks.on('init', async () => {

    if (typeof Babele !== 'undefined') {

        const classEntries = await fetch("./modules/translation-d35e-compendium-es/compendium/D35E.classes.json")
            .then(response => response.json())
            .then(json => json.entries);
        const classTransformation = _.mapValues(classEntries, 'name');

        Babele.get().register({
            module: 'translation-d35e-compendium-es',
            lang: 'es',
            dir: 'compendium'
        });

        Babele.get().registerConverters({            
            "nameWithOriginal": (original, translation) => { return original !== translation ? `${translation} (${original})` : translation; },
            "classNamesArray": (classesArray) => {
                classesArray.map((classArray) => {
                    classArray[0] = classTransformation[classArray[0]]
                        ? classTransformation[classArray[0]]
                        : classArray[0];
                    return classArray;
                });
                return classesArray;
            }
        });
    }
});

Hooks.once('babele.ready', () => {
    console.info('translation-d35e-compendium-es | All translated, lets rebuild cache');
    cache.rebuildCache();
});
